import { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ children, className, glow = false, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F172A]/80 to-[#111827]/70 shadow-[0_20px_80px_rgba(0,0,0,0.35)]',
        glow && 'border-[#12E7B6]/70 shadow-[0_20px_70px_rgba(18,231,182,0.15)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
