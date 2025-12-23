
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { TranscriptionItem } from '../types';

export class LiveClient {
  private client: GoogleGenAI;
  // Use sessionPromise to manage race conditions and stale closures as per guidelines
  private sessionPromise: Promise<any> | null = null;
  private audioContext: AudioContext | null = null;
  private inputSource: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private stream: MediaStream | null = null;
  private nextStartTime = 0;
  private audioQueue: AudioBufferSourceNode[] = [];
  
  // Video state
  private videoElement: HTMLVideoElement | null = null;
  private videoInterval: number | null = null;
  
  public onTranscriptionUpdate: ((item: TranscriptionItem) => void) | null = null;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async connect(personalityPrompt: string, topic: string, videoPreviewElement: HTMLVideoElement | null) {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    this.videoElement = videoPreviewElement;
    
    // Configura la sessione
    const config = {
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: this.handleOpen.bind(this),
        onmessage: this.handleMessage.bind(this),
        onclose: () => console.log('Connection closed'),
        onerror: (err: any) => console.error('Connection error:', err),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
        },
        systemInstruction: `${personalityPrompt} 
        
        Stai parlando con una persona timida che vuole esercitarsi. 
        L'argomento scelto è: "${topic}". 
        
        IMPORTANTE: 
        1. Sii breve nelle risposte. Lascia spazio all'utente.
        2. Se l'utente esita, incoraggialo gentilmente.
        3. Parla SOLO in Italiano.
        4. Stai facendo una videochiamata. Sei amichevole e guardi l'utente.`,
        // Set to empty objects to enable default transcription models as per guidelines
        inputAudioTranscription: {},
        outputAudioTranscription: {},
      },
    };

    this.sessionPromise = this.client.live.connect(config);
    await this.sessionPromise;
  }

  private async handleOpen() {
    console.log('Session opened');
    await this.startMediaStream();
  }

  private async handleMessage(message: LiveServerMessage) {
    // Gestione audio in uscita (voce del modello)
    const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    if (audioData) {
        this.queueAudio(audioData);
    }

    if (message.serverContent?.outputTranscription?.text) {
        this.onTranscriptionUpdate?.({
            speaker: 'model',
            text: message.serverContent.outputTranscription.text
        });
    }

    if (message.serverContent?.inputTranscription?.text) {
        this.onTranscriptionUpdate?.({
            speaker: 'user',
            text: message.serverContent.inputTranscription.text
        });
    }

    // Gestione interruzioni
    if (message.serverContent?.interrupted) {
      this.stopAudioQueue();
    }
  }

  private async startMediaStream() {
    try {
      // Richiediamo sia audio che video
      this.stream = await navigator.mediaDevices.getUserMedia({ 
          audio: true, 
          video: { 
              width: { ideal: 640 }, 
              height: { ideal: 480 },
              facingMode: "user" 
          } 
      });
      
      // Setup Audio Input (16k)
      const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.inputSource = inputContext.createMediaStreamSource(this.stream);
      this.processor = inputContext.createScriptProcessor(4096, 1, 1);

      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const b64Data = this.pcmToB64(inputData);
        
        // Use sessionPromise.then to send real-time input safely as per guidelines
        this.sessionPromise?.then((session) => {
          session.sendRealtimeInput({
            media: {
              mimeType: 'audio/pcm;rate=16000',
              data: b64Data
            }
          });
        });
      };

      this.inputSource.connect(this.processor);
      this.processor.connect(inputContext.destination);

      // Setup Video Preview & Streaming
      if (this.videoElement) {
          this.videoElement.srcObject = this.stream;
          await this.videoElement.play().catch(e => console.error("Error playing video", e));
          
          // Avvia invio frame video all'IA
          this.startVideoStreaming();
      }

    } catch (err) {
      console.error("Error accessing media devices", err);
    }
  }

  private startVideoStreaming() {
      if (!this.videoElement) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const FPS = 1; 
      
      this.videoInterval = window.setInterval(() => {
          if (!this.videoElement || !ctx || !this.sessionPromise) return;
          
          canvas.width = this.videoElement.videoWidth * 0.5;
          canvas.height = this.videoElement.videoHeight * 0.5;
          
          ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
          
          const base64Data = canvas.toDataURL('image/jpeg', 0.6).split(',')[1];
          
          // Send video frames using session promise
          this.sessionPromise.then((session) => {
            session.sendRealtimeInput({
                media: {
                    mimeType: 'image/jpeg',
                    data: base64Data
                }
            });
          });
          
      }, 1000 / FPS);
  }

  private async queueAudio(base64Data: string) {
    if (!this.audioContext) return;

    try {
        const audioBuffer = await this.decodeAudioData(base64Data);
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        this.nextStartTime = Math.max(this.nextStartTime, now);
        
        source.start(this.nextStartTime);
        this.nextStartTime += audioBuffer.duration;
        
        this.audioQueue.push(source);
        
        source.onended = () => {
            const index = this.audioQueue.indexOf(source);
            if (index > -1) {
                this.audioQueue.splice(index, 1);
            }
        };

    } catch (e) {
        console.error("Audio decode error", e);
    }
  }

  private stopAudioQueue() {
    this.audioQueue.forEach(source => {
        try { source.stop(); } catch(e) {}
    });
    this.audioQueue = [];
    if(this.audioContext) {
        this.nextStartTime = this.audioContext.currentTime;
    }
  }

  async disconnect() {
    if (this.videoInterval) {
        clearInterval(this.videoInterval);
        this.videoInterval = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    if (this.processor) {
        this.processor.disconnect();
    }
    if (this.inputSource) {
        this.inputSource.disconnect();
    }
    if (this.audioContext) {
      await this.audioContext.close();
    }
    
    // Properly close live session
    if (this.sessionPromise) {
      this.sessionPromise.then(session => session.close());
      this.sessionPromise = null;
    }
    
    if(this.videoElement) {
        this.videoElement.srcObject = null;
    }
  }

  // --- Helpers implemented as per guidelines ---

  private pcmToB64(data: Float32Array): string {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return this.encode(new Uint8Array(int16.buffer));
  }

  private encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private async decodeAudioData(base64: string): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error("No Audio Context");
    
    const bytes = this.decode(base64);
    const dataInt16 = new Int16Array(bytes.buffer);
    const numChannels = 1;
    const sampleRate = 24000;
    const frameCount = dataInt16.length / numChannels;
    const buffer = this.audioContext.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  private decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}
