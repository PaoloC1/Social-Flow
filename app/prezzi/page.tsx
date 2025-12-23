import { useMemo, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Accordion } from '../../components/ui/Accordion';
import { Check, Sparkles } from 'lucide-react';

const features = [
  { label: 'Sessioni incluse', free: '1/mese', pro: '4/mese', pack: 'A scelta' },
  { label: 'Coach matching', free: 'Base', pro: 'Prioritario', pack: 'Su richiesta' },
  { label: 'Dashboard progressi', free: 'Limitata', pro: 'Completa', pack: 'Completa' },
  { label: 'Supporto chat', free: 'In 48h', pro: 'In 24h', pack: 'In 24h' },
  { label: 'Prenotazioni flessibili', free: 'Limitate', pro: 'Priorità', pack: 'Dipende dal pack' },
];

const faqItems = [
  { question: 'Posso cancellare quando voglio?', answer: 'Sì, disdici il rinnovo con un clic prima del prossimo ciclo di fatturazione.' },
  { question: 'Cosa succede alle sessioni non usate?', answer: 'Le sessioni del piano Pro non si accumulano. I pack hanno 3 mesi di validità.' },
  { question: 'Quali metodi di pagamento accettate?', answer: 'Carte di credito/debito e wallet principali. Ricevi la fattura via email.' },
  { question: 'Posso provare prima?', answer: 'Sì, hai 1 sessione gratuita al mese nel piano Free.' },
];

const packOptions = [
  { label: '1 sessione', price: 35 },
  { label: '5 sessioni', price: 150 },
  { label: '10 sessioni', price: 270 },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [selectedPack, setSelectedPack] = useState(packOptions[1].label);

  const proPrice = useMemo(() => {
    const monthly = 59;
    return annual ? 49 : monthly;
  }, [annual]);

  return (
    <div className="bg-[#070A12] text-[#E5E7EB]">
      <section className="relative overflow-hidden bg-[#0B1020]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#12E7B6]/10 via-transparent to-[#2DD4FF]/10 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-14 pt-20 md:pt-24">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-4">
              <Badge>Prezzi</Badge>
              <h1 className="text-4xl font-bold text-white md:text-5xl">Prezzi semplici, progressi reali</h1>
              <p className="text-lg text-[#94A3B8] max-w-3xl">
                Scegli se iniziare gratis, andare a ritmo con il piano Pro, oppure acquistare un pack di sessioni. Nessun costo nascosto.
              </p>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
                <button
                  className={`rounded-full px-4 py-2 transition ${!annual ? 'bg-[#12E7B6] text-[#070A12]' : 'text-[#E5E7EB]'}`}
                  onClick={() => setAnnual(false)}
                >
                  Mensile
                </button>
                <button
                  className={`rounded-full px-4 py-2 transition ${annual ? 'bg-[#12E7B6] text-[#070A12]' : 'text-[#E5E7EB]'}`}
                  onClick={() => setAnnual(true)}
                >
                  Annuale - risparmia 15%
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 rounded-2xl border border-[#12E7B6]/40 bg-white/5 px-4 py-3 text-sm text-[#12E7B6]">
              <Sparkles className="h-5 w-5" />
              <span>1 sessione gratis al mese, sempre.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#12E7B6]">Free</p>
                <h3 className="text-2xl font-bold text-white">Inizia gratis</h3>
              </div>
              <Badge className="text-xs">1 sessione/mese</Badge>
            </div>
            <p className="mt-4 text-sm text-[#94A3B8]">Per rompere il ghiaccio e capire come funziona SOCIAL FLOW.</p>
            <div className="mt-6 text-4xl font-bold text-white">€0</div>
            <p className="text-sm text-[#94A3B8]">per sempre</p>
            <Button className="mt-6 w-full">Inizia gratis</Button>
            <ul className="mt-6 space-y-3 text-sm text-[#94A3B8]">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />1 sessione/mese</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />Coach matching base</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />Accesso area riservata</li>
            </ul>
          </Card>

          <Card glow className="relative p-6 lg:p-8">
            <div className="absolute -top-3 right-6">
              <span className="rounded-full bg-[#12E7B6] px-3 py-1 text-xs font-bold text-[#070A12] shadow-[0_10px_30px_rgba(18,231,182,0.35)]">
                Consigliato
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#12E7B6]">Pro</p>
                <h3 className="text-2xl font-bold text-white">Coraggio costante</h3>
              </div>
              <Badge className="text-xs">Priorità</Badge>
            </div>
            <p className="mt-4 text-sm text-[#94A3B8]">4 sessioni al mese, feedback strutturato e prenotazioni prioritarie.</p>
            <div className="mt-6 text-4xl font-bold text-white">€{proPrice}</div>
            <p className="text-sm text-[#94A3B8]">{annual ? 'fatturato annualmente' : 'al mese'}</p>
            <Button className="mt-6 w-full">Scegli Pro</Button>
            <ul className="mt-6 space-y-3 text-sm text-[#94A3B8]">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />4 sessioni/mese incluse</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />Coach matching prioritario</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />Dashboard progressi completa</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />Riprogrammazioni flessibili</li>
            </ul>
          </Card>

          <Card className="p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#12E7B6]">Pack</p>
                <h3 className="text-2xl font-bold text-white">Paga a pacchetti</h3>
              </div>
              <Badge className="text-xs">Flessibile</Badge>
            </div>
            <p className="mt-4 text-sm text-[#94A3B8]">Scegli quante sessioni comprare ora e usale entro 3 mesi.</p>
            <div className="mt-4 space-y-3">
              {packOptions.map((pack) => (
                <label
                  key={pack.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-[#12E7B6]/50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="pack"
                      className="h-4 w-4 border-white/20 bg-[#0F172A] text-[#12E7B6] focus:ring-2 focus:ring-[#12E7B6]"
                      checked={selectedPack === pack.label}
                      onChange={() => setSelectedPack(pack.label)}
                    />
                    <span className="font-semibold">{pack.label}</span>
                  </div>
                  <span className="text-[#12E7B6] font-semibold">€{pack.price}</span>
                </label>
              ))}
            </div>
            <Button className="mt-6 w-full">Acquista pack</Button>
            <ul className="mt-6 space-y-3 text-sm text-[#94A3B8]">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />Prenotazioni flessibili</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />Coach dedicato su richiesta</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#12E7B6]" />Validità 3 mesi</li>
            </ul>
          </Card>
        </div>
        <p className="mt-6 text-center text-xs text-[#94A3B8]">
          Prezzi IVA incl. Continuando accetti Termini e Privacy. Disdici in qualsiasi momento.
        </p>
      </section>

      <section className="bg-[#0B1020] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-3">
            <Badge>Confronto</Badge>
            <h2 className="text-3xl font-bold text-white">Cosa include ogni piano</h2>
            <p className="text-[#94A3B8]">Trasparenza totale sulle differenze tra Free, Pro e Pack.</p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[#94A3B8]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-white">Caratteristica</th>
                  <th className="px-4 py-3 font-semibold">Free</th>
                  <th className="px-4 py-3 font-semibold">Pro</th>
                  <th className="px-4 py-3 font-semibold">Pack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {features.map((feature) => (
                  <tr key={feature.label} className="text-[#94A3B8]">
                    <td className="px-4 py-3 text-white">{feature.label}</td>
                    <td className="px-4 py-3">{feature.free}</td>
                    <td className="px-4 py-3">{feature.pro}</td>
                    <td className="px-4 py-3">{feature.pack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Badge>FAQ</Badge>
            <h2 className="mt-3 text-3xl font-bold text-white">Domande su pagamenti e disdette</h2>
            <p className="mt-2 text-[#94A3B8]">Risposte chiare su fatturazione, cancellazione e sessioni.</p>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
