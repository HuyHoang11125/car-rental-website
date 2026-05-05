import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8 text-sm', text: 'text-lg' },
    md: { icon: 'w-10 h-10 text-lg', text: 'text-xl' },
    lg: { icon: 'w-12 h-12 text-xl', text: 'text-2xl' },
  };

  return (
    <Link href="/" className={cn('flex items-center gap-3 no-underline group', className)}>
      <div
        className={cn(
          'rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-extrabold text-black font-[Playfair_Display,serif] transition-transform duration-300 group-hover:scale-105',
          sizes[size].icon
        )}
      >
        É
      </div>
      <span
        className={cn(
          'font-bold tracking-[3px] text-gold-gradient font-[Playfair_Display,serif]',
          sizes[size].text
        )}
      >
        ÉLITE
      </span>
    </Link>
  );
}
