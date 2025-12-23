
import { GoogleGenAI, Type } from '@google/genai';
import { FeedbackData, TranscriptionItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFeedback(transcripts: TranscriptionItem[]): Promise<FeedbackData> {
  const conversationText = transcripts
    .map(t => `${t.speaker.toUpperCase()}: ${t.text}`)
    .join('\n');

  const prompt = `
    Analizza la seguente trascrizione di una conversazione di pratica sociale tra un utente timido e un coach IA.
    
    Conversazione:
    ${conversationText}
    
    Fornisci un feedback strutturato, empatico e costruttivo per l'utente timido (USER).
    Valuta su una scala da 1 a 100 quanto l'utente è riuscito a gestire l'interazione.
  `;

  // Use gemini-3-flash-preview for general text tasks as per model selection guidelines
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Punteggio da 0 a 100" },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 punti di forza mostrati" },
          improvements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 aree di miglioramento specifiche" },
          summary: { type: Type.STRING, description: "Un breve riassunto incoraggiante" },
          conversationTip: { type: Type.STRING, description: "Un consiglio pratico per la prossima volta" }
        },
        required: ['score', 'strengths', 'improvements', 'summary', 'conversationTip']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Nessuna risposta dall'IA");
  
  return JSON.parse(text) as FeedbackData;
}
