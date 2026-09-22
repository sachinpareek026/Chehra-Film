import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface CinemaButtonProps {
  id?: string;
  variant?: 'primary' | 'secondary' | 'play' | 'ghost' | 'outline';
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  showArrow?: boolean;
}

export const CinemaButton: React.FC<CinemaButtonProps> = ({
  id,
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  showArrow = true,
}) => {
  if (variant === 'play') {
    return (
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label="Play Film"
        className={`group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-yellow-400/90 text-[#EDE8DF] hover:text-[#070A0F] border border-white/25 hover:border-yellow-400/90 transition-colors duration-300 focus:outline-none cursor-pointer ${className}`}
      >
        <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5 fill-current transition-transform duration-200 group-hover:scale-105" />
      </button>
    );
  }

  const baseStyles =
    'group relative inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 text-[11px] md:text-xs font-sans font-semibold md:font-bold tracking-[0.06em] uppercase transition-colors duration-200 select-none cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed';

  if (variant === 'primary') {
    return (
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} bg-yellow-400/90 hover:bg-yellow-300/90 text-[#070A0F] border border-yellow-400/90 shadow-sm shadow-yellow-400/15 transition-all duration-300 ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#070A0F]" />
          )}
        </span>
      </button>
    );
  }

  if (variant === 'secondary' || variant === 'outline') {
    return (
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} bg-[#0A0E16] text-[#EDE8DF] border border-white/20 hover:border-yellow-400/90 hover:text-yellow-400/90 ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-current" />
          )}
        </span>
      </button>
    );
  }

  // Ghost variant
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} text-[#A5A196] hover:text-[#EDE8DF] border-b border-transparent hover:border-yellow-400/90 px-2 py-1.5 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
        {showArrow && (
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-yellow-400/90" />
        )}
      </span>
    </button>
  );
};

