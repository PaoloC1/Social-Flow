
import { Coach } from './types';

export const SURVEY_QUESTIONS = [
  "Mi sento teso quando sono con persone che non conosco bene.",
  "Sono socialmente un po' goffo.",
  "Trovo difficile chiedere informazioni ad altre persone.",
  "Spesso mi sento a disagio a feste o altre funzioni sociali.",
  "Quando sono in un gruppo di persone, ho difficoltà a pensare alle cose giuste di cui parlare.",
  "Mi ci vuole molto tempo per superare la mia timidezza in situazioni nuove.",
  "Mi è difficile agire in modo naturale quando incontro persone nuove.",
  "Mi sento nervoso quando parlo con qualcuno che ha autorità.",
  "Ho spesso dubbi sulla mia competenza sociale.",
  "Ho difficoltà a guardare qualcuno dritto negli occhi.",
  "Mi sento inibito nelle situazioni sociali.",
  "Trovo difficile parlare con gli sconosciuti.",
  "Sono più timido con membri del sesso opposto.",
  "Durante le conversazioni con nuove conoscenze, mi preoccupo di dire qualcosa di stupido."
];

export const SHYNESS_LEVELS = [
  { min: 14, max: 23, label: "Bassa", color: "text-green-500", desc: "La tua timidezza è lieve e situazionale. Sei già a buon punto!" },
  { min: 24, max: 32, label: "Medio-Bassa", color: "text-teal-500", desc: "Ti senti a disagio in contesti nuovi, ma riesci a sbloccarti velocemente." },
  { min: 33, max: 42, label: "Media", color: "text-amber-500", desc: "La timidezza influenza le tue scelte sociali. Allenarsi ti aiuterà molto." },
  { min: 43, max: 51, label: "Medio-Alta", color: "text-orange-500", desc: "Eviti spesso situazioni sociali per timore del giudizio. Siamo qui per te." },
  { min: 52, max: 70, label: "Alta", color: "text-rose-500", desc: "La timidezza è un ostacolo quotidiano. Il percorso sarà graduale e protetto." }
];

export const COACHES: Coach[] = [
  {
    id: 'c1',
    name: 'Marco Rossi',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    role: 'Il tuo amico estroverso',
    description: 'Specialista nel rompere il ghiaccio e small talk informale.',
    vibe: 'Energico',
    specialties: ['Amicizia', 'Small Talk'],
    personalityPrompt: "Sei Marco, amichevole ed estroverso. Usa il tu.",
    price: 20,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'c2',
    name: 'Giulia Bianchi',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    role: 'Recruiter HR Gentile',
    description: 'Ti aiuto a gestire l\'ansia da prestazione in ambito lavorativo.',
    vibe: 'Diretto',
    specialties: ['Lavoro', 'Colloqui'],
    personalityPrompt: "Sei Giulia, professionale ma empatica. Aiuta l'utente a strutturare il discorso.",
    price: 25,
    rating: 4.8,
    reviewCount: 56
  },
  {
    id: 'c3',
    name: 'Linda "Nonna"',
    avatarUrl: 'https://images.unsplash.com/photo-1551843022-4cc715e71d33?w=400&h=400&fit=crop',
    role: 'La zia rassicurante',
    description: 'Un porto sicuro per chi ha bisogno di iniziare con estrema calma.',
    vibe: 'Calmo',
    specialties: ['Coraggio Generale', 'Sfogarsi'],
    personalityPrompt: "Sei Linda, dolce e accogliente. Parla lentamente.",
    price: 20,
    rating: 5.0,
    reviewCount: 89
  }
];

export const MOCK_TOPICS = ["Rompere il ghiaccio", "Colloquio di lavoro", "Primo appuntamento", "Chiedere informazioni", "Ordinare al bar"];
