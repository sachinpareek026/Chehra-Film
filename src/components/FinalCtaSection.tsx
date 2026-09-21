import React from 'react';
import { CinemaButton } from './CinemaButton';

interface FinalCtaSectionProps {
  onJoinFilm: () => void;
  onNominateRole: () => void;
  onJoinCrew?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onJoinFilm, onNominateRole, onJoinCrew }) => {
  return (
    <section className="relative py-28 md:py-36 bg-[#05070B] overflow-hidden flex items-center justify-center border-t border-white/10">
      {/* Background imagery: 80% opacity fitting full layout */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 20%, #05070B 90%), url('https://res.cloudinary.com/x1dci3fh/image/upload/v1789634480/images_-_2026-09-14T173720.993.jpg')",
        }}
      />

      {/* Atmospheric theme color gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070B] via-[#05070B]/60 to-[#05070B] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Initiative Marker */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="w-6 h-[1px] bg-yellow-400/60" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400/90 uppercase">
            11 / PRODUCTION CALL
          </span>
          <span className="w-6 h-[1px] bg-yellow-400/60" />
        </div>

        {/* Headline */}
        <h2 className="font-title text-3xl sm:text-4xl md:text-[52px] not-italic font-bold text-[#F4F1EA] tracking-[0.02em] leading-[1.12] mb-6">
          Your journey could become <br />
          <span className="not-italic text-yellow-400/90 font-bold">a feature film.</span>
        </h2>

        {/* Subtext */}
        <p className="font-sans text-xs sm:text-sm text-[#B8B4AC] font-medium tracking-[0.14em] uppercase mb-12 max-w-md mx-auto">
          Snow. Mountains. Faith. Adventure. Cinema.
        </p>

        {/* 3 Pathway Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CinemaButton
            id="cta-join-film-btn"
            variant="primary"
            onClick={onJoinFilm}
            className="!px-8 !py-4 text-xs tracking-widest font-medium"
          >
            BOOK SEAT (₹2,000 TOKEN)
          </CinemaButton>

          <CinemaButton
            id="cta-nominate-role-btn"
            variant="secondary"
            onClick={onNominateRole}
            className="!px-8 !py-4 text-xs tracking-widest font-medium"
          >
            APPLY AS ACTOR (100% REFUND)
          </CinemaButton>

          {onJoinCrew && (
            <CinemaButton
              id="cta-join-crew-btn"
              variant="outline"
              onClick={onJoinCrew}
              className="!px-8 !py-4 text-xs tracking-widest font-medium !border-white/20 hover:!border-white"
            >
              JOIN AS CREW
            </CinemaButton>
          )}
        </div>

        <div className="mt-14 text-[10px] font-sans font-semibold text-[#B8B4AC]/70 tracking-[0.14em] uppercase">
          24 – 31 DECEMBER 2026 • VAISHNO DEVI × GULMARG × SRINAGAR • STRICT 20-SEAT CONVOY
        </div>
      </div>
    </section>
  );
};

