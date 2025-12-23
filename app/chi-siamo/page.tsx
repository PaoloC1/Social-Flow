import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Accordion } from '../../components/ui/Accordion';

const values = [
  {
    title: 'Sicurezza psicologica',
    desc: 'Spazi guidati senza giudizio, con coach formati all’ascolto empatico.',
  },
  {
    title: 'Progressi misurabili',
    desc: 'Esercizi strutturati e metriche di coraggio sociale che monitorano i tuoi passi.',
  },
  {
    title: 'Coach selezionati',
    desc: 'Professionisti verificati per esperienza e sensibilità nelle dinamiche sociali.',
  },
  {
    title: 'Privacy prima di tutto',
    desc: 'Sessioni riservate e dati protetti; tu decidi cosa condividere.',
  },
];

const steps = [
  { title: 'Valuti', desc: 'Compili un breve profilo e il test di timidezza per capire da dove partire.' },
  { title: 'Ti alleni', desc: 'Simulazioni e role-play con coach reali per provare le situazioni che temi di più.' },
  { title: 'Misuri i progressi', desc: 'Ricevi feedback concreti, punteggi di coraggio e piani di miglioramento.' },
];

const team = [
  { role: 'Head of Coaching', bio: 'Guida la selezione dei coach e supervisiona le metodologie di allenamento.' },
  { role: 'Product Lead', bio: 'Costruisce esperienze semplici e accoglienti, pensate per chi è timido.' },
  { role: 'Lead Psychologist', bio: 'Definisce i confini etici e il perimetro non-clinico del percorso.' },
  { role: 'Community Coach', bio: 'Aiuta gli utenti a trasformare piccoli passi in abitudini di coraggio.' },
];

const faqs = [
  { question: 'È terapia?', answer: 'No, è un percorso di allenamento alle abilità sociali con coach specializzati, non sostituisce supporto clinico.' },
  { question: 'Posso scegliere il coach?', answer: 'Sì, puoi selezionare tra i coach disponibili in base allo stile e alle aree di focus.' },
  { question: 'Come gestite la privacy?', answer: 'I dati sono protetti e condivisi solo con il tuo coach. Puoi usare nickname e scegliere cosa raccontare.' },
  { question: 'Serve esperienza precedente?', answer: 'No, partiamo da esercizi semplici e aumentiamo la complessità in base al tuo ritmo.' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#070A12] text-[#E5E7EB]">
      <section className="relative overflow-hidden bg-[#0B1020]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#12E7B6]/10 via-transparent to-[#2DD4FF]/10 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-20 lg:flex-row lg:items-center lg:pt-24">
          <div className="flex-1 space-y-6">
            <Badge>Chi siamo</Badge>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Aiutiamo le persone timide a praticare interazioni reali, con coach che ascoltano davvero.
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl">
              Creiamo uno spazio protetto dove esercitare conversazioni, presentazioni e piccoli atti di coraggio sociale. Non terapia, ma allenamento pratico.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Inizia da Timido</Button>
              <Button variant="secondary" size="lg">Parla con un coach</Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#94A3B8]">
              <span>Sessioni 1:1 riservate</span>
              <span className="h-4 w-px bg-white/10" />
              <span>Focus su situazioni quotidiane</span>
            </div>
          </div>
          <Card className="flex-1 space-y-6 p-6 lg:p-8">
            <p className="text-sm font-semibold text-[#12E7B6]">Il nostro manifesto</p>
            <p className="text-2xl font-semibold text-white">
              Coraggio sociale, un passo alla volta. Ci concentriamo sull’esperienza umana: voce, sguardo, presenza.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm text-[#94A3B8]">
              <div className="rounded-xl bg-white/5 p-3">Tecniche di role-play empatico</div>
              <div className="rounded-xl bg-white/5 p-3">Feedback in tempo reale</div>
              <div className="rounded-xl bg-white/5 p-3">Esercizi personalizzati</div>
              <div className="rounded-xl bg-white/5 p-3">Progressi tracciati</div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-white">I nostri valori</h2>
          <p className="text-sm text-[#94A3B8] max-w-xl">
            Un’esperienza pensata per rispettare i tempi e i confini di chi è timido, mantenendo chiarezza e trasparenza.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title} className="p-6 transition hover:-translate-y-1 hover:border-[#12E7B6]/70 hover:shadow-[0_20px_70px_rgba(18,231,182,0.12)]">
              <h3 className="text-lg font-semibold text-white">{value.title}</h3>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">{value.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#0B1020] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-3">
            <Badge>Come lavoriamo</Badge>
            <h2 className="text-3xl font-bold text-white">Un percorso semplice e guidato</h2>
            <p className="text-[#94A3B8] max-w-2xl">
              Ti accompagniamo in piccoli passi, con esercizi pratici e supporto reale.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="relative p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-lg font-bold text-[#12E7B6]">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-3">
          <Badge>Il team</Badge>
          <h2 className="text-3xl font-bold text-white">Persone reali, per supporto reale</h2>
          <p className="text-[#94A3B8] max-w-2xl">
            Ogni coach è formato per accompagnarti con empatia e struttura, rispettando i tuoi tempi.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Card key={member.role} className="p-6 transition hover:-translate-y-1 hover:border-[#12E7B6]/70">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#12E7B6]/30 to-[#2DD4FF]/30" />
              <h3 className="mt-4 text-lg font-semibold text-white">{member.role}</h3>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">{member.bio}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#0B1020] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="p-6 lg:p-8">
              <Badge>Il nostro approccio</Badge>
              <h3 className="mt-4 text-2xl font-semibold text-white">Cosa siamo e cosa non siamo</h3>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                SOCIAL FLOW è una palestra digitale per il coraggio sociale. Non facciamo diagnosi, non gestiamo emergenze, non sostituiamo un percorso terapeutico.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-[#12E7B6]/30 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-[#12E7B6]">Siamo</p>
                  <ul className="mt-2 space-y-2 text-sm text-[#E5E7EB]">
                    <li>Allenamento pratico e progressivo</li>
                    <li>Coach reali e feedback mirato</li>
                    <li>Confini chiari e rispetto dei tempi</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Non siamo</p>
                  <ul className="mt-2 space-y-2 text-sm text-[#94A3B8]">
                    <li>Psicoterapia o supporto clinico</li>
                    <li>Gestione di crisi o emergenze</li>
                    <li>Un luogo di giudizio o performance</li>
                  </ul>
                </div>
              </div>
            </Card>
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
                <p className="text-lg font-semibold text-white">Parliamone</p>
                <p className="mt-2 text-sm text-[#94A3B8]">Scrivici e raccontaci dove vuoi più sicurezza.</p>
                <div className="mt-4 flex gap-3">
                  <Button>Inizia gratis</Button>
                  <Button variant="secondary">Contattaci</Button>
                </div>
              </div>
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
