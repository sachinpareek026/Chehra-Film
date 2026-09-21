import React from 'react';

interface ChehraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const ChehraLogo: React.FC<ChehraLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto',
    xl: 'h-24 w-auto',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Chehra Films Logo Image */}
      <img
        src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789634481/Add_a_subheading_7.png"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/chehra-logo.png';
        }}
        alt="Chehra Films Logo"
        referrerPolicy="no-referrer"
        className={`${sizeClasses[size]} object-contain drop-shadow-[0_0_12px_rgba(245,208,97,0.4)] transition-transform duration-300 hover:scale-105 shrink-0`}
      />

      {showText && (
        <div className="flex flex-col justify-center text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-title text-base sm:text-lg font-black tracking-[0.18em] text-white group-hover:text-yellow-400/90 transition-colors uppercase leading-none">
              CHEHRA FILMS
            </span>
          </div>
          <span className="text-[8.5px] font-mono tracking-[0.22em] text-yellow-400/90 uppercase font-semibold mt-1">
            PARINDAA TRAVELS
          </span>
        </div>
      )}
    </div>
  );
};
