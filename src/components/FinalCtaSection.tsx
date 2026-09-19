import React from 'react';
import { CinemaButton } from './CinemaButton';
import { Compass } from 'lucide-react';

interface FinalCtaSectionProps {
  onJoinFilm: () => void;
  onNominateRole: () => void;
  onJoinCrew?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onJoinFilm, onNominateRole, onJoinCrew }) => {
  return (
    <section className="relative py-24 md:py-32 bg-[#050912] overflow-hidden flex items-center justify-center border-t border-white/10">
      {/* Clear background image with slight blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[2px] brightness-[0.75] contrast-[1.1] scale-105"
        style={{
          opacity: 0.85,
          backgroundImage:
            "url('https://res.cloudinary.com/x1dci3fh/image/upload/v1789634480/images_-_2026-09-14T173720.993.jpg')",
        }}
      />

      {/* Cinematic Vignette - tuned to keep the image clear while preserving text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050912] via-[#050912]/45 to-[#050912]/70 pointer-events-none" />

      {/* Anamorphic Scope Bars */}
      <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-black/80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Initiative Marker */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-4 h-[1px] bg-yellow-400" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
            11 / PRODUCTION WRAP & CALL
          </span>
          <span className="w-4 h-[1px] bg-yellow-400" />
        </div>

        {/* Large Typography */}
        <h2 className="font-title text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-tight mb-4">
          YOUR JOURNEY<br />
          COULD BECOME<br />
          <span className="text-yellow-400">
            A FILM.
          </span>
        </h2>

        {/* Subtext */}
        <p className="font-title text-xs sm:text-sm text-slate-300 font-medium tracking-[0.25em] uppercase mb-10">
          The road is waiting.
        </p>

        {/* 3 Pathway Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CinemaButton
            id="cta-join-film-btn"
            variant="primary"
            onClick={onJoinFilm}
            className="!px-7 !py-3.5 text-xs tracking-wider"
          >
            PRE-BOOK PARTICIPANT (₹1,000)
          </CinemaButton>

          <CinemaButton
            id="cta-nominate-role-btn"
            variant="secondary"
            onClick={onNominateRole}
            className="!px-7 !py-3.5 text-xs tracking-wider"
          >
            APPLY AS ACTOR (100% REFUND)
          </CinemaButton>

          {onJoinCrew && (
            <CinemaButton
              id="cta-join-crew-btn"
              variant="outline"
              onClick={onJoinCrew}
              className="!px-7 !py-3.5 text-xs tracking-wider !border-white/20 hover:!border-white"
            >
              JOIN AS CREW
            </CinemaButton>
          )}
        </div>

        <div className="mt-12 text-[10px] font-mono text-slate-300 tracking-widest uppercase font-medium">
          LIMITED CAST & EXPEDITION SEATS • DEPARTS OCTOBER 2026
        </div>
      </div>
    </section>
  );
};
