import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Social Flow',
  description: 'Palestra digitale per il coraggio sociale',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className="bg-[#070A12] text-[#E5E7EB]">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#070A12]`}>
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
