
import React, { useState, useRef, useEffect } from 'react';
import { AppState, Coach, UserProfile, UserRole, TranscriptionItem } from './types';
import { COACHES, MOCK_TOPICS, SURVEY_QUESTIONS, SHYNESS_LEVELS } from './constants';
import { LiveClient } from './services/liveClient';
import { RadarChart } from './components/RadarChart';
import { 
  Sparkles, ChevronRight, ShieldCheck, TrendingUp, Heart, Zap, 
  ArrowLeft, LayoutDashboard, Video, LogOut, Star, MessageSquare, 
  Target, BarChart3, History, Globe, Lock, Shield, ArrowUpRight,
  Menu, X, CheckCircle2, ChevronDown, Users, Briefcase, Coffee,
  Mail, Phone, MapPin
} from 'lucide-react';

export default function App() {
  // --- Routing & Auth State ---
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('USER');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState<UserProfile>({
    name: '', surname: '', birthDate: '', email: '', phone: '',
    surveyScore: 0, shynessLevel: '', couragePoints: 0,
    metrics: { fluidita: 3, entropia: 2, lagTime: 3, balbuzia: 2, centralita: 3, iniziativa: 2, volumeVoce: 4, contattoVisivo: 3 }
  });
  
  const [surveyAnswers, setSurveyAnswers] = useState<number[]>(new Array(14).fill(3));
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [transcripts, setTranscripts] = useState<TranscriptionItem[]>([]);

  // --- Handlers ---
  const handleAreaRiservata = () => {
    if (!isLoggedIn) {
      setState(AppState.LOGIN);
    } else {
      setState(userRole === 'USER' ? AppState.USER_DASHBOARD : AppState.COACH_DASHBOARD);
    }
  };

  const handleSurveySubmit = () => {
    const total = surveyAnswers.reduce((a, b) => a + b, 0);
    const level = SHYNESS_LEVELS.find(l => total >= l.min && total <= l.max);
    setUser({ ...user, surveyScore: total, shynessLevel: level?.label || 'Media', couragePoints: 50 });
    setIsLoggedIn(true); // Auto-login post survey for demo
    setUserRole('USER');
    setState(AppState.USER_SIGNUP_RESULTS);
  };

  // --- Global Components ---
  const Navbar = () => (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#070A12]/80 backdrop-blur-xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setState(AppState.HOME)}>
          <div className="bg-[#12E7B6] p-1.5 rounded-lg text-[#070A12]"><Sparkles className="w-5 h-5" /></div>
          <span className="text-xl font-extrabold tracking-tight text-white">SocialFlow</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-[#12E7B6] transition">Come funziona</a>
          <a href="#situations" className="hover:text-[#12E7B6] transition">Situazioni</a>
          <a href="#pricing" className="hover:text-[#12E7B6] transition">Prezzi</a>
          <a href="#contacts" className="hover:text-[#12E7B6] transition">Contatti</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleAreaRiservata}
            className="px-5 py-2.5 rounded-full glass text-sm font-bold hover:bg-white/5 transition border border-white/10"
          >
            Area riservata
          </button>
          <button 
            onClick={() => setState(AppState.USER_SIGNUP_STEP1)}
            className="hidden sm:block px-6 py-2.5 bg-[#12E7B6] text-[#070A12] rounded-full text-sm font-bold hover:brightness-110 transition shadow-[0_0_20px_rgba(18,231,182,0.3)]"
          >
            Inizia Ora
          </button>
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="bg-[#070A12] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-[#12E7B6] p-1.5 rounded-lg text-[#070A12]"><Sparkles className="w-5 h-5" /></div>
            <span className="text-xl font-bold text-white">SocialFlow</span>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed mb-6">
            La prima palestra digitale per il tuo coraggio sociale. 
            Allena le tue abilità in un ambiente protetto e senza giudizio.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center cursor-pointer hover:border-[#12E7B6] transition"><Globe className="w-5 h-5" /></div>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center cursor-pointer hover:border-[#12E7B6] transition"><Shield className="w-5 h-5" /></div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Piattaforma</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#features" className="hover:text-[#12E7B6] transition">Come funziona</a></li>
            <li><a href="#situations" className="hover:text-[#12E7B6] transition">Situazioni</a></li>
            <li><a href="#pricing" className="hover:text-[#12E7B6] transition">Prezzi</a></li>
            <li><a href="#contacts" className="hover:text-[#12E7B6] transition">Contatti</a></li>
            <li className="hover:text-[#12E7B6] cursor-pointer" onClick={() => setState(AppState.COACH_LANDING)}>Diventa Coach</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Azienda</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li className="hover:text-white cursor-pointer">Chi Siamo</li>
            <li className="hover:text-white cursor-pointer">Casi Studio</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Press Kit</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Legale</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Termini di Servizio</li>
            <li className="hover:text-white cursor-pointer">Cookie Settings</li>
            <li className="hover:text-white cursor-pointer">Disclaimer Medico</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-600">© 2024 SocialFlow. Non è un percorso clinico o terapeutico.</p>
        <p className="text-xs text-slate-600">Built with Gemini 3 Pro</p>
      </div>
    </footer>
  );

  // --- Views ---

  const renderHome = () => (
    <div className="bg-[#070A12] selection:bg-[#12E7B6]/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full -z-10 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 text-[#12E7B6] text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in">
              <ShieldCheck className="w-4 h-4" /> Spazio sicuro • 100% Privato
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-8 text-white tracking-tight">
              Allena la tua sicurezza, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#12E7B6] to-[#2DD4FF]">un'interazione</span> alla volta.
            </h1>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Sblocca il tuo potenziale sociale attraverso sessioni video con coach reali in un ambiente protetto. Trasforma la timidezza in una competenza.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => setState(AppState.USER_SIGNUP_STEP1)}
                className="bg-[#12E7B6] text-[#070A12] px-8 py-4 rounded-2xl font-extrabold text-lg shadow-[0_0_30px_rgba(18,231,182,0.2)] hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
              >
                Inizia da Timido <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setState(AppState.COACH_LANDING)}
                className="glass border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/5 transition"
              >
                Sono un Coach
              </button>
            </div>
            <p className="mt-6 text-slate-500 text-sm italic">Nessuna promessa miracolosa. Solo pratica e progressi reali.</p>
          </div>
          
          <div className="relative animate-float hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#12E7B6]/20 to-transparent rounded-[3rem] blur-3xl opacity-30"></div>
            <div className="glass border-white/10 p-4 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" 
                 className="rounded-[2.8rem] w-full object-cover grayscale-[20%] hover:grayscale-0 transition duration-700"
                 alt="Social Training" 
               />
               {/* UI Overlay Element */}
               <div className="absolute bottom-10 left-10 right-10 glass p-6 rounded-3xl border-white/10 flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center"><Video className="text-green-500" /></div>
                    <div><p className="text-white font-bold">Sessione Live</p><p className="text-slate-400 text-xs">Coach Giulia ti sta ascoltando</p></div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-[#12E7B6] rounded-full"></div>
                    <div className="w-1 h-6 bg-[#12E7B6] rounded-full"></div>
                    <div className="w-1 h-3 bg-[#12E7B6] rounded-full"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Adjusted spacing and icon styling */}
      <section className="border-y border-white/5 py-10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { icon: Heart, text: "Empatia 100%" },
             { icon: Shield, text: "Zero Giudizio" },
             { icon: Zap, text: "Risultati Rapidi" },
             { icon: Star, text: "Top Rating" }
           ].map((item, i) => (
             <div key={i} className="flex items-center justify-center gap-4 text-slate-400 font-bold group">
               <item.icon className="w-7 h-7 text-[#12E7B6] group-hover:scale-110 transition duration-300" />
               <span className="text-xs uppercase tracking-[0.2em]">{item.text}</span>
             </div>
           ))}
        </div>
      </section>

      {/* How it Works - Green Title and Description */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#12E7B6]">Come funziona l'allenamento</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Dall'autovalutazione iniziale alla pratica live guidata. SocialFlow ti accompagna passo dopo passo nella tua crescita sociale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { step: "01", title: "Autovalutazione", desc: "Completa un test psicometrico per capire il tuo livello di timidezza e le aree su cui lavorare.", icon: Target },
               { step: "02", title: "Scegli il Coach", desc: "Trova il mentore più adatto al tuo mood: dal coach rassicurante a quello più energico.", icon: Users },
               { step: "03", title: "Simula e Cresci", desc: "Affronta situazioni reali (colloqui, date, small talk) e ricevi feedback basati sui dati.", icon: BarChart3 }
             ].map((item, i) => (
               <div key={i} className="glass p-10 rounded-[2.5rem] border-white/5 group hover:border-[#12E7B6]/30 transition-all duration-500">
                 <div className="text-5xl font-black text-white/10 mb-6 group-hover:text-[#12E7B6]/10 transition">{item.step}</div>
                 <item.icon className="w-10 h-10 text-[#12E7B6] mb-6" />
                 <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                 <p className="text-slate-500 leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Situations Grid - Scrolling Strip Effect with Numbers */}
      <section id="situations" className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Situazioni reali, <br/>risultati concreti</h2>
              <p className="text-slate-400 text-lg">Allena il tuo muscolo sociale negli scenari che più ti preoccupano.</p>
            </div>
            <button onClick={() => setState(AppState.USER_SIGNUP_STEP1)} className="text-[#12E7B6] font-bold flex items-center gap-2 hover:gap-4 transition-all pb-2">
              Esplora tutti gli scenari <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Horizontal Scrolling Strip */}
          <div className="flex overflow-x-auto gap-6 pb-12 scrollbar-hide -mx-6 px-6 snap-x">
             {[
               { id: "01", title: "Colloquio Lavoro", icon: Briefcase, color: "blue", desc: "Gestisci l'ansia da prestazione e comunica il tuo valore." },
               { id: "02", title: "Primo Appuntamento", icon: Heart, color: "rose", desc: "Sii te stesso e crea una connessione autentica fin da subito." },
               { id: "03", title: "Rompere il Ghiaccio", icon: Zap, color: "amber", desc: "Avvia conversazioni con sconosciuti in modo naturale." },
               { id: "04", title: "Ordinare al Bar", icon: Coffee, color: "teal", desc: "Richiedi ciò di cui hai bisogno senza timore di disturbare." },
               { id: "05", title: "Parlare in Pubblico", icon: MessageSquare, color: "indigo", desc: "Mantieni la calma davanti a una piccola audience." }
             ].map((item, i) => (
               <div key={i} className="min-w-[320px] glass border-white/5 p-8 rounded-3xl hover:bg-white/5 transition cursor-pointer group snap-center relative overflow-hidden">
                 {/* Gradient Number */}
                 <div className="absolute top-4 right-8 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#12E7B6] to-[#2DD4FF] opacity-30 group-hover:opacity-100 transition duration-500">{item.id}</div>
                 
                 <div className="flex items-start gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition"><item.icon className="w-7 h-7 text-[#12E7B6]" /></div>
                 </div>
                 <h4 className="font-bold text-xl mb-4">{item.title}</h4>
                 <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Pricing Section Placeholder */}
      <section id="pricing" className="py-24 bg-[#070A12]">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-12">Piani di Crescita</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
               {[
                 { title: "Starter", price: "Gratis", features: ["1 Test Timidezza", "1 Sessione 5m", "Analisi Base"] },
                 { title: "Pro", price: "€29/mese", features: ["Test Illimitati", "4 Sessioni 15m", "Analisi Radar Avanzata", "Coach Premium"], highlight: true },
                 { title: "Elite", price: "€69/mese", features: ["Test Illimitati", "Sessioni Illimitate", "Supporto Prioritario", "Percorso Certificato"] }
               ].map((p, i) => (
                 <div key={i} className={`p-10 rounded-[2.5rem] border ${p.highlight ? 'bg-white/5 border-[#12E7B6]/50 shadow-[0_0_30px_rgba(18,231,182,0.1)]' : 'glass border-white/5'}`}>
                    <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                    <div className="text-4xl font-black mb-8 text-white">{p.price}</div>
                    <ul className="space-y-4 mb-10">
                      {p.features.map(f => <li key={f} className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-[#12E7B6]" /> {f}</li>)}
                    </ul>
                    <button className={`w-full py-4 rounded-xl font-bold transition ${p.highlight ? 'bg-[#12E7B6] text-[#070A12]' : 'bg-white/5 text-white'}`}>Scegli Piano</button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 px-6 border-t border-white/5 bg-white/[0.01]">
         <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
               <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8">Hai domande? <br/> Siamo qui per te.</h2>
                  <p className="text-slate-400 text-lg mb-12 max-w-md">Contatta il nostro team di supporto o prenota una chiamata informativa gratuita.</p>
                  <div className="space-y-6">
                     <div className="flex items-center gap-4"><div className="w-12 h-12 glass rounded-2xl flex items-center justify-center"><Mail className="w-5 h-5 text-[#12E7B6]" /></div><div><p className="text-xs font-bold text-slate-500 uppercase">Email</p><p className="text-white">support@socialflow.it</p></div></div>
                     <div className="flex items-center gap-4"><div className="w-12 h-12 glass rounded-2xl flex items-center justify-center"><Phone className="w-5 h-5 text-[#12E7B6]" /></div><div><p className="text-xs font-bold text-slate-500 uppercase">WhatsApp</p><p className="text-white">+39 333 1234567</p></div></div>
                  </div>
               </div>
               <div className="glass p-10 rounded-[2.5rem] border-white/10">
                  <form className="space-y-6">
                     <div className="grid sm:grid-cols-2 gap-6">
                        <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nome</label><input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-1 focus:ring-[#12E7B6] outline-none" placeholder="Il tuo nome" /></div>
                        <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email</label><input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-1 focus:ring-[#12E7B6] outline-none" placeholder="nome@email.it" /></div>
                     </div>
                     <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Messaggio</label><textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-1 focus:ring-[#12E7B6] outline-none h-32" placeholder="Come possiamo aiutarti?"></textarea></div>
                     <button className="w-full py-4 bg-[#12E7B6] text-[#070A12] font-black rounded-xl hover:brightness-110 transition">Invia Messaggio</button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );

  const renderLogin = () => (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] border-white/10 text-center">
        <div className="bg-[#12E7B6] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 text-[#070A12]"><Lock className="w-8 h-8" /></div>
        <h2 className="text-3xl font-bold mb-4">Area Riservata</h2>
        <p className="text-slate-500 mb-10">Inserisci le tue credenziali per accedere al tuo piano di allenamento.</p>
        <div className="space-y-4 text-left mb-8">
           <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email</label><input type="email" placeholder="nome@esempio.it" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-[#12E7B6] outline-none" /></div>
           <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Password</label><input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-[#12E7B6] outline-none" /></div>
        </div>
        <button 
          onClick={() => { setIsLoggedIn(true); setState(AppState.USER_DASHBOARD); }}
          className="w-full bg-[#12E7B6] text-[#070A12] py-4 rounded-xl font-bold hover:brightness-110 transition mb-4"
        >
          Accedi
        </button>
        <button onClick={() => setState(AppState.HOME)} className="text-slate-500 text-sm font-medium hover:text-white transition flex items-center justify-center gap-2 mx-auto"><ArrowLeft className="w-4 h-4" /> Torna alla Home</button>
      </div>
    </div>
  );

  const renderSignupStep1 = () => (
    <div className="min-h-screen bg-[#070A12] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] border-white/10">
        <div className="mb-10"><div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="w-1/4 h-full bg-[#12E7B6] shadow-[0_0_10px_rgba(18,231,182,0.5)]"></div></div><p className="text-[10px] font-bold text-[#12E7B6] mt-4 uppercase tracking-widest">Step 1 di 4: Identità</p></div>
        <h2 className="text-3xl font-bold mb-8">Benvenuto su SocialFlow.</h2>
        <div className="space-y-6">
          <div className="group"><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nome</label><input value={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-[#12E7B6] outline-none transition" placeholder="Es. Mario" /></div>
          <div className="group"><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email</label><input value={user.email} onChange={e => setUser({...user, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-[#12E7B6] outline-none transition" placeholder="nome@email.it" /></div>
          <button onClick={() => setState(AppState.USER_SIGNUP_SURVEY)} className="w-full py-4 bg-[#12E7B6] text-[#070A12] font-bold rounded-xl shadow-xl hover:scale-[1.01] transition mt-8">Vai al Test Sociale</button>
          <button onClick={() => setState(AppState.HOME)} className="w-full text-slate-500 text-sm font-medium hover:text-white transition">Annulla</button>
        </div>
      </div>
    </div>
  );

  const renderSurvey = () => (
    <div className="min-h-screen bg-[#070A12] p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full glass p-10 rounded-[3rem] border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
           <div><h2 className="text-2xl font-bold text-white">Profilazione Scientifica</h2><p className="text-slate-500 text-sm">Basato sulla scala Cheek & Buss</p></div>
           <div className="bg-[#12E7B6]/10 text-[#12E7B6] px-4 py-2 rounded-xl font-bold text-sm">Valuta 1-5</div>
        </div>
        
        <div className="space-y-12 max-h-[50vh] overflow-y-auto pr-6 scrollbar-hide mb-10">
          {SURVEY_QUESTIONS.map((q, i) => (
            <div key={i} className="space-y-4 animate-fade-in" style={{animationDelay: `${i*0.05}s`}}>
              <p className="font-medium text-slate-200 text-lg leading-relaxed">{i+1}. {q}</p>
              <div className="flex justify-between items-center gap-3">
                {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} onClick={() => {
                    const newArr = [...surveyAnswers];
                    newArr[i] = v;
                    setSurveyAnswers(newArr);
                  }} className={`flex-1 h-14 rounded-2xl border font-black text-xl transition-all duration-300 ${surveyAnswers[i] === v ? 'bg-[#12E7B6] border-[#12E7B6] text-[#070A12] scale-105' : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/20 hover:text-white'}`}>{v}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 flex justify-between items-center">
           <p className="text-xs text-slate-500 max-w-[200px]">Rispondi sinceramente per un risultato accurato.</p>
           <button onClick={handleSurveySubmit} className="bg-[#12E7B6] text-[#070A12] px-10 py-4 rounded-2xl font-bold text-lg hover:brightness-110 shadow-[0_0_20px_rgba(18,231,182,0.2)] transition">Completa Analisi</button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-[#070A12] flex selection:bg-[#12E7B6]/30">
      {/* Sidebar Desktop */}
      <aside className="w-80 border-r border-white/5 hidden lg:flex flex-col p-8 sticky top-0 h-screen bg-black/20">
        <div className="flex items-center gap-2 mb-12" onClick={() => setState(AppState.HOME)}>
          <div className="bg-[#12E7B6] p-1.5 rounded-lg text-[#070A12]"><Sparkles className="w-5 h-5" /></div>
          <span className="text-xl font-extrabold text-white">SocialFlow</span>
        </div>
        
        <nav className="space-y-3 flex-1">
          <button onClick={() => setState(AppState.USER_DASHBOARD)} className="w-full flex items-center gap-3 p-4 bg-white/5 text-[#12E7B6] rounded-2xl font-bold border border-white/5"><LayoutDashboard className="w-5 h-5"/> Dashboard</button>
          <button onClick={() => setState(AppState.COACH_SELECTION)} className="w-full flex items-center gap-3 p-4 text-slate-400 hover:text-white transition font-bold group"><Video className="w-5 h-5 group-hover:text-[#12E7B6] transition"/> Prenota Pratica</button>
          <button className="w-full flex items-center gap-3 p-4 text-slate-400 hover:text-white transition font-bold group"><BarChart3 className="w-5 h-5 group-hover:text-[#12E7B6] transition"/> Statistiche</button>
          <button className="w-full flex items-center gap-3 p-4 text-slate-400 hover:text-white transition font-bold group"><History className="w-5 h-5 group-hover:text-[#12E7B6] transition"/> Storico</button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
           <div className="bg-gradient-to-br from-[#12E7B6]/10 to-transparent p-6 rounded-[2rem] border border-[#12E7B6]/20 mb-6">
              <p className="text-[10px] font-bold text-[#12E7B6] uppercase mb-2">Pro tips</p>
              <p className="text-sm text-slate-300 font-medium">Prova a mantenere il contatto visivo per almeno 3 secondi.</p>
           </div>
           <button onClick={() => { setIsLoggedIn(false); setState(AppState.HOME); }} className="flex items-center gap-3 p-4 text-rose-500 hover:text-rose-400 font-bold transition"><LogOut className="w-5 h-5"/> Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">Bentornato, {user.name || 'Esploratore'}</h1>
            <p className="text-slate-500 font-medium">Oggi è un ottimo giorno per un micro-passo avanti.</p>
          </div>
          <div className="flex items-center gap-4 glass p-3 rounded-3xl border-white/10">
             <div className="flex items-center gap-2 px-4 py-2 bg-[#12E7B6]/10 text-[#12E7B6] rounded-2xl font-bold">
                <Target className="w-4 h-4" /> <span>{user.couragePoints} CP</span>
             </div>
             <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center font-bold text-white uppercase">{user.name?.[0] || 'U'}</div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 glass p-10 rounded-[3rem] border-white/5 shadow-2xl">
             <div className="flex justify-between items-center mb-12">
                <h3 className="text-xl font-bold flex items-center gap-3 text-white"><TrendingUp className="text-[#12E7B6]"/> Analisi del Coraggio</h3>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Aggiornato 1h fa</div>
             </div>
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <RadarChart 
                    metrics={user.metrics} 
                    target={{ fluidita: 5, entropia: 1, lagTime: 1, balbuzia: 1, centralita: 4, iniziativa: 4, volumeVoce: 5, contattoVisivo: 5 }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#12E7B6]/5 to-transparent blur-3xl pointer-events-none"></div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-[#12E7B6]/20 transition">
                    <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><ArrowUpRight className="w-4 h-4 text-[#12E7B6]" /> Prossimo Step</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Migliora la fluidità verbale chiedendo 2 domande aperte in più nella prossima sessione.</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Milestone Raggiunta</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Il tuo volume della voce è ora nel range ottimale per gli ambienti pubblici.</p>
                  </div>
                </div>
             </div>
          </div>
          
          {/* Quick Action Card */}
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-[#12E7B6] to-[#2DD4FF] p-10 rounded-[3rem] shadow-xl text-[#070A12] flex flex-col justify-between group cursor-pointer hover:shadow-[0_0_40px_rgba(18,231,182,0.2)] transition-all">
               <div>
                 <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Pronto per iniziare?</h3>
                 <p className="font-bold opacity-80 mb-8">Hai 2 crediti sessione pronti per essere usati.</p>
               </div>
               <button 
                onClick={() => setState(AppState.COACH_SELECTION)}
                className="w-full bg-white text-[#070A12] py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-2 group-hover:scale-[1.02] transition"
               >
                 Allena Ora <ChevronRight className="w-5 h-5" />
               </button>
            </div>
            
            <div className="glass p-8 rounded-[3rem] border-white/5">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> Statistiche Globali</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-xs text-slate-500 font-bold uppercase">Sessioni Totali</span> <span className="text-white font-black">12</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-slate-500 font-bold uppercase">Tempo Pratica</span> <span className="text-white font-black">180m</span></div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2"><div className="w-2/3 h-full bg-[#12E7B6]"></div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const renderCoachSelection = () => (
    <div className="min-h-screen bg-[#070A12] p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <button onClick={() => setState(AppState.USER_DASHBOARD)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-[#12E7B6] transition"><ArrowLeft className="w-5 h-5"/> Dashboard</button>
          <div className="text-center"><h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Il tuo Coach</h2><p className="text-slate-500 font-medium">Seleziona la persona con cui ti senti più a tuo agio.</p></div>
          <div className="w-20"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {COACHES.map(coach => (
            <div key={coach.id} className="glass rounded-[3.5rem] p-10 border-white/5 flex flex-col hover:border-[#12E7B6]/30 transition-all duration-500 group">
               <div className="relative mb-8 w-fit mx-auto">
                 <img src={coach.avatarUrl} className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl border-2 border-white/5 group-hover:border-[#12E7B6]/50 transition duration-500" />
                 <div className="absolute -bottom-2 -right-2 bg-[#12E7B6] text-[#070A12] p-2 rounded-xl shadow-lg font-bold text-xs"><Star className="w-3 h-3 fill-[#070A12]" /> {coach.rating}</div>
               </div>
               
               <div className="text-center mb-8">
                 <h3 className="text-2xl font-bold text-white mb-1">{coach.name}</h3>
                 <p className="text-[#12E7B6] text-xs font-black uppercase tracking-widest">{coach.role}</p>
               </div>

               <div className="bg-white/5 rounded-3xl p-6 mb-8 flex-1">
                 <p className="text-slate-400 text-sm leading-relaxed italic">"{coach.description}"</p>
                 <div className="flex flex-wrap gap-2 mt-6">
                    {coach.specialties.map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-500 font-bold border border-white/5">{s}</span>)}
                 </div>
               </div>

               <button 
                 onClick={() => { setSelectedCoach(coach); setState(AppState.TOPIC_SELECTION); }} 
                 className="w-full py-5 rounded-2xl bg-white text-[#070A12] font-black hover:bg-[#12E7B6] hover:scale-[1.02] transition-all"
               >
                 Seleziona Coach
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- Router ---
  switch (state) {
    case AppState.HOME: return renderHome();
    case AppState.LOGIN: return renderLogin();
    case AppState.USER_SIGNUP_STEP1: return renderSignupStep1();
    case AppState.USER_SIGNUP_SURVEY: return renderSurvey();
    case AppState.USER_SIGNUP_RESULTS: return (
      <div className="min-h-screen bg-[#12E7B6] flex items-center justify-center p-6 text-[#070A12] text-center">
        <div className="max-w-md animate-fade-in">
          <div className="w-24 h-24 bg-[#070A12] rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl"><Target className="w-12 h-12 text-[#12E7B6]" /></div>
          <h2 className="text-sm uppercase tracking-[0.3em] font-black opacity-60 mb-4">Profilo Analizzato</h2>
          <h1 className="text-7xl font-black mb-8 tracking-tighter">{user.shynessLevel}</h1>
          <p className="text-xl font-bold mb-12 opacity-80 leading-relaxed">Il tuo percorso personalizzato è pronto. Iniziamo con obiettivi piccoli ma significativi.</p>
          <button onClick={() => setState(AppState.USER_DASHBOARD)} className="w-full bg-[#070A12] text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:scale-[1.02] transition">Vedi Dashboard</button>
        </div>
      </div>
    );
    case AppState.USER_DASHBOARD: return renderDashboard();
    case AppState.COACH_SELECTION: return renderCoachSelection();
    default: return renderHome();
  }
}
