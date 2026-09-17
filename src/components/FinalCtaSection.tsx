import React from 'react';
import { CinemaButton } from './CinemaButton';
import { Compass } from 'lucide-react';

interface FinalCtaSectionProps {
  onJoinFilm: () => void;
  onNominateRole: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onJoinFilm, onNominateRole }) => {
  return (
    <section className="relative py-16 md:py-20 bg-[#060B14] overflow-hidden flex items-center justify-center border-t border-blue-900/40">
      {/* Strongest Cinematic Image Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter grayscale-[10%] brightness-[0.4]"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/x1dci3fh/image/upload/v1789634480/images_-_2026-09-14T173720.993.jpg')",
        }}
      />

      {/* Cinematic Vignette & Grain */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#060B14]/70 to-[#060B14] pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-50 pointer-events-none" />

      {/* Anamorphic Scope Bars */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Initiative Badge */}
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-yellow-400/10 border border-yellow-400/30 text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase mb-4 font-semibold">
          <Compass className="w-3 h-3 text-yellow-400" />
          <span>CHEHRA FILMS • EXPEDITION VOL. I</span>
        </div>

        {/* Large Centered Text (Exact prompt requirement) */}
        <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight mb-3">
          YOUR JOURNEY<br />
          COULD BECOME<br />
          <span className="text-yellow-400">
            A FILM.
          </span>
        </h2>

        {/* Subtext (Exact prompt requirement) */}
        <p className="font-title text-sm sm:text-base text-slate-300 font-medium tracking-[0.2em] uppercase mb-6">
          The road is waiting.
        </p>

        {/* Buttons: JOIN THE FILM →, NOMINATE FOR A ROLE → */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <CinemaButton
            id="cta-join-film-btn"
            variant="primary"
            onClick={onJoinFilm}
            className="!px-6 !py-2.5 text-xs"
          >
            JOIN THE FILM
          </CinemaButton>

          <CinemaButton
            id="cta-nominate-role-btn"
            variant="secondary"
            onClick={onNominateRole}
            className="!px-6 !py-2.5 text-xs"
          >
            NOMINATE FOR A ROLE
          </CinemaButton>
        </div>

        <div className="mt-8 text-[10px] font-mono text-slate-400 tracking-widest uppercase font-medium">
          LIMITED CAST SLOTS • ROUTE DEPARTS SPRING 2026
        </div>
      </div>
    </section>
  );
};
