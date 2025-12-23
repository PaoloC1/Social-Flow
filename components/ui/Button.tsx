import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-full font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]';

    const variants: Record<ButtonVariant, string> = {
      primary:
        'bg-gradient-to-r from-[#12E7B6] to-[#2DD4FF] text-[#070A12] shadow-[0_10px_40px_rgba(18,231,182,0.25)] hover:brightness-110 focus-visible:ring-[#12E7B6]',
      secondary:
        'border border-white/10 text-[#E5E7EB] hover:border-[#12E7B6] hover:text-white focus-visible:ring-[#12E7B6]',
      ghost: 'text-[#E5E7EB] hover:text-white hover:bg-white/5 focus-visible:ring-[#12E7B6]',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          base,
          variants[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
