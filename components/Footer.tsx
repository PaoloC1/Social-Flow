import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070A12]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-white">
            <div className="rounded-lg bg-[#12E7B6] px-2 py-1 text-sm font-black tracking-tight text-[#070A12]">
              SF
            </div>
            <span className="text-lg font-bold tracking-tight">SOCIAL FLOW</span>
          </div>
          <p className="mt-3 text-sm text-[#94A3B8]">
            SOCIAL FLOW non è un servizio clinico o terapeutico.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold text-[#94A3B8]">
          <Link href="/termini" className="transition hover:text-white">
            Termini
          </Link>
          <Link href="/privacy" className="transition hover:text-white">
            Privacy
          </Link>
          <Link href="/disclaimer" className="transition hover:text-white">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
