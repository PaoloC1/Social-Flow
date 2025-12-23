import { FormEvent, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Accordion } from '../../components/ui/Accordion';

const contactMethods = [
  {
    title: 'Email support',
    desc: 'Risposte dettagliate entro 24h lavorative.',
    action: 'support@socialflow.ai',
  },
  {
    title: 'WhatsApp / Telefono',
    desc: 'Messaggi e chiamate brevi per organizzare le sessioni.',
    action: '+39 000 000 0000',
  },
  {
    title: 'Centro assistenza',
    desc: 'Guide rapide per account, prenotazioni e fatturazione.',
    action: 'Vai al centro assistenza',
  },
];

const faqs = [
  { question: 'Come prenoto una sessione?', answer: 'Dalla tua area riservata scegli coach e orario. Puoi riprogrammare fino a 12h prima.' },
  { question: 'Posso cambiare coach?', answer: 'Sì, puoi cambiare coach in qualsiasi momento secondo disponibilità.' },
  { question: 'Come funziona la fatturazione?', answer: 'Addebito mensile o per pack. Ricevi fattura elettronica in automatico.' },
  { question: 'I dati sono protetti?', answer: 'Usiamo crittografia e conserviamo solo ciò che serve per il servizio.' },
  { question: 'Offrite supporto emergenze?', answer: 'No, non gestiamo emergenze. In caso di urgenza contatta i numeri nazionali di aiuto.' },
  { question: 'Serve scaricare app?', answer: 'No, funziona via web. Ricevi i link alle sessioni direttamente via email.' },
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
    consent: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.topic || !formData.message || !formData.consent) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setTimeout(
      () =>
        setFormData({
          name: '',
          email: '',
          topic: '',
          message: '',
          consent: false,
        }),
      500
    );
  };

  return (
    <div className="bg-[#070A12] text-[#E5E7EB]">
      <section className="relative overflow-hidden bg-[#0B1020]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#12E7B6]/10 via-transparent to-[#2DD4FF]/10 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-14 pt-20 md:flex-row md:items-center md:pt-24">
          <div className="flex-1 space-y-5">
            <Badge>Contattaci</Badge>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">Siamo qui per aiutarti</h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl">
              Rispondiamo velocemente a dubbi su sessioni, pagamenti e privacy. Se sei timido, scrivici: ti risponderemo con tono umano e zero pressione.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Scrivici ora</Button>
              <Button variant="secondary" size="lg">Consulta le FAQ</Button>
            </div>
            <p className="text-sm text-[#94A3B8]">Tempi di risposta: 24h lavorative. No gestione emergenze.</p>
          </div>
          <Card className="flex-1 p-6 lg:p-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-[#12E7B6]">Contatti rapidi</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {contactMethods.map((method) => (
                  <div key={method.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-base font-semibold text-white">{method.title}</p>
                    <p className="mt-2 text-sm text-[#94A3B8]">{method.desc}</p>
                    <p className="mt-3 text-sm font-semibold text-[#12E7B6]">{method.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl grid gap-10 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#12E7B6]">Modulo di contatto</p>
              <h2 className="text-2xl font-bold text-white">Raccontaci cosa ti serve</h2>
            </div>
            {status === 'success' && (
              <span className="rounded-full bg-[#12E7B6]/20 px-3 py-1 text-xs font-semibold text-[#12E7B6]">
                Messaggio inviato
              </span>
            )}
          </div>
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white" htmlFor="name">
                  Nome e cognome
                </label>
                <input
                  id="name"
                  className="w-full rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3 text-sm text-white outline-none ring-[#12E7B6] focus:ring-2"
                  placeholder="Come possiamo chiamarti?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3 text-sm text-white outline-none ring-[#12E7B6] focus:ring-2"
                  placeholder="nome@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white" htmlFor="topic">
                Tema
              </label>
              <select
                id="topic"
                className="w-full rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3 text-sm text-white outline-none ring-[#12E7B6] focus:ring-2"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                required
              >
                <option value="">Seleziona un tema</option>
                <option value="sessioni">Sessioni e prenotazioni</option>
                <option value="fatturazione">Fatturazione e piani</option>
                <option value="privacy">Privacy e dati</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white" htmlFor="message">
                Messaggio
              </label>
              <textarea
                id="message"
                className="w-full rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3 text-sm text-white outline-none ring-[#12E7B6] focus:ring-2"
                rows={5}
                placeholder="Raccontaci il contesto o la domanda"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-[#94A3B8]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-[#0F172A] text-[#12E7B6] focus:ring-2 focus:ring-[#12E7B6]"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                required
              />
              <span>
                Accetto il trattamento dei dati per essere ricontattato. SOCIAL FLOW non gestisce emergenze cliniche.
              </span>
            </label>
            {status === 'error' && (
              <p className="text-sm font-semibold text-[#FB7185]">
                Compila tutti i campi e accetta il consenso per inviare.
              </p>
            )}
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Invia messaggio
            </Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-white">Tempi e orari</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#94A3B8]">
              <li><span className="text-white">Tempi di risposta:</span> entro 24h lavorative.</li>
              <li><span className="text-white">Orari:</span> Lun-Ven 9:00 - 19:00 CET.</li>
              <li><span className="text-white">Emergenze:</span> non gestiamo emergenze. Contatta i servizi nazionali di aiuto.</li>
            </ul>
          </Card>
          <Card className="p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-white">Dove siamo</h3>
            <p className="mt-2 text-sm text-[#94A3B8]">Operiamo online, con coach in tutta Italia.</p>
            <div className="mt-4 h-48 rounded-xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#111827]">
              <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]">Mappa in arrivo</div>
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-[#0B1020] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-3">
            <Badge>FAQ</Badge>
            <h2 className="text-3xl font-bold text-white">Domande frequenti</h2>
            <p className="text-[#94A3B8]">Risposte rapide su sessioni, pagamenti e privacy.</p>
          </div>
          <div className="mt-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
