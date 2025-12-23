import { useState, HTMLAttributes, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  defaultOpenIndex?: number;
}

export function Accordion({ items, defaultOpenIndex = -1, className, ...props }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  return (
    <div className={clsx('divide-y divide-white/5 rounded-2xl border border-white/10', className)} {...props}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <button
            key={item.question}
            className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#12E7B6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
            onClick={() => setOpenIndex(isOpen ? -1 : index)}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">{item.question}</p>
                <div
                  className={clsx(
                    'mt-2 text-sm text-[#94A3B8] transition-all',
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                  )}
                >
                  <div className="pb-3 pr-8 leading-relaxed">{item.answer}</div>
                </div>
              </div>
              <ChevronDown
                className={clsx(
                  'h-5 w-5 text-[#94A3B8] transition-transform',
                  isOpen && 'rotate-180 text-[#12E7B6]'
                )}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
