import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const links = [
  { href: '/', label: 'Home' },
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/prezzi', label: 'Prezzi' },
  { href: '/contatti', label: 'Contatti' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#070A12]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2 text-white" onClick={() => setOpen(false)}>
          <div className="rounded-lg bg-[#12E7B6] px-2 py-1 text-sm font-black tracking-tight text-[#070A12]">
            SF
          </div>
          <span className="text-lg font-bold tracking-tight">SOCIAL FLOW</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-[#94A3B8] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'transition hover:text-white',
                pathname === link.href && 'text-white underline decoration-[#12E7B6] decoration-2 underline-offset-8'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#12E7B6] md:inline-flex"
        >
          Area riservata
        </Link>

        <button
          className="inline-flex items-center rounded-full border border-white/10 p-2 text-white transition hover:border-[#12E7B6] md:hidden"
          aria-label="Apri menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-[#0B1020] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-semibold text-[#94A3B8] transition hover:text-white',
                  pathname === link.href && 'text-white'
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-full border border-white/10 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-[#12E7B6]"
              onClick={() => setOpen(false)}
            >
              Area riservata
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
