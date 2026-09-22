import React from 'react';
import { CinemaButton } from './CinemaButton';

interface FinalCtaSectionProps {
  onJoinFilm: () => void;
  onNominateRole: () => void;
  onJoinCrew?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onJoinFilm, onNominateRole, onJoinCrew }) => {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 bg-[#070E1E] overflow-hidden flex items-center justify-center border-t border-white/10">
      {/* Background imagery: dark blue theme blend with moderate transparency, not overly dark */}
      <div
        className="absolute -top-12 sm:top-0 inset-x-0 -bottom-12 sm:bottom-0 w-full h-[calc(100%+6rem)] sm:h-full bg-cover bg-[center_top] sm:bg-center bg-no-repeat opacity-90 -translate-y-10 sm:translate-y-0 transition-transform duration-300"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(20, 40, 75, 0.32) 12%, rgba(12, 24, 48, 0.68) 58%, rgba(7, 14, 30, 0.86) 90%), url('https://res.cloudinary.com/x1dci3fh/image/upload/v1789634480/images_-_2026-09-14T173720.993.jpg')",
        }}
      />

      {/* Atmospheric theme color gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070E1E] via-[#0A1630]/40 to-[#070E1E] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,rgba(10,22,46,0.3)_60%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center -translate-y-6 sm:translate-y-0">
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

