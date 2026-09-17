import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface CinemaButtonProps {
  id?: string;
  variant?: 'primary' | 'secondary' | 'play' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
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
        className={`group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-400/95 backdrop-blur-md border-2 border-yellow-300 text-black shadow-2xl shadow-yellow-500/30 transition-all duration-300 hover:scale-110 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 ${className}`}
      >
        <span className="absolute -inset-2 rounded-full border-2 border-yellow-400/40 animate-ping opacity-40 pointer-events-none" />
        <Play className="w-7 h-7 md:w-8 md:h-8 ml-1 text-black fill-black transition-transform duration-300 group-hover:scale-110" />
      </button>
    );
  }

  const baseStyles =
    'group relative inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 text-xs md:text-sm font-bold tracking-[0.18em] uppercase transition-all duration-300 select-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  if (variant === 'primary') {
    return (
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold shadow-lg shadow-yellow-500/25 hover:shadow-yellow-400/40 hover:-translate-y-0.5 active:translate-y-0 border border-yellow-300 rounded-none ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-black" />
          )}
        </span>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} bg-[#0b162c]/80 backdrop-blur-md text-white border border-blue-500/30 hover:border-yellow-400 hover:text-yellow-300 hover:bg-[#102244] hover:-translate-y-0.5 active:translate-y-0 shadow-md ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-yellow-400" />
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
      className={`${baseStyles} text-slate-300 hover:text-yellow-400 border-b border-transparent hover:border-yellow-400 px-3 py-2 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-yellow-400" />
        )}
      </span>
    </button>
  );
};
