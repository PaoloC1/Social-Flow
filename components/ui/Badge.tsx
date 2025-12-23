import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export function Badge({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#12E7B6]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
