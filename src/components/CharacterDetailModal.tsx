import React from 'react';
import { X, MapPin, Compass, Clapperboard, Check } from 'lucide-react';
import { CharacterRole } from '../types';
import { CinemaButton } from './CinemaButton';

interface CharacterDetailModalProps {
  character: CharacterRole | null;
  onClose: () => void;
  onNominate: (roleId: string) => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  character,
  onClose,
  onNominate,
}) => {
  if (!character) return null;

  return (
    <div
      id="character-detail-modal"
      className="fixed inset-0 z-50 bg-[#05070B]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      {/* Widescreen Character Dossier Container */}
      <div className="relative max-w-5xl w-full bg-[#080D17] border border-white/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#05070B] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-yellow-400/90 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="font-serif text-xs uppercase tracking-widest text-white font-normal">
                CHARACTER DOSSIER
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs font-mono text-yellow-400/90 tracking-wider uppercase">
                {character.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2-Column Deep Dive */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Full-Height Dramatic Character Visual Stage (5 cols) */}
          <div className="md:col-span-5 relative bg-black min-h-[320px] md:min-h-full">
            <img
              src={character.image}
              alt={character.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D17] via-[#080D17]/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#080D17]" />
            
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-[10px] font-mono text-white/80 uppercase tracking-widest backdrop-blur-md">
                {character.gender} • AGE {character.ageRange}
              </span>
              <span className="px-2.5 py-1 bg-yellow-400/90 text-black text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                100% REFUND
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 md:hidden">
              <h3 className="font-title text-2xl text-[#F4F1EA] uppercase tracking-[0.02em] font-semibold">
                {character.name}
              </h3>
              <p className="text-xs text-yellow-300/90 italic font-sans font-medium">
                &ldquo;{character.tagline}&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Complete Story Arc & Audition Guide (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* Header Titles */}
            <div className="border-b border-white/10 pb-4">
              <div className="text-[10px] font-sans tracking-[0.14em] text-yellow-400/90 uppercase font-semibold mb-1">
                ARCHETYPE: {character.archetype}
              </div>
              <h3 className="hidden md:block font-title text-3xl text-[#F4F1EA] uppercase tracking-[0.02em] mb-2 font-semibold">
                {character.name}
              </h3>
              <p className="text-sm text-[#F4F1EA]/90 italic font-sans font-medium leading-[1.6]">
                &ldquo;{character.tagline}&rdquo;
              </p>
            </div>

            {/* Deep Narrative Arc */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-sans tracking-[0.14em] text-[#B8B4AC] uppercase flex items-center gap-2 font-semibold">
                <Compass className="w-3.5 h-3.5 text-yellow-400/90" />
                <span>NARRATIVE ARC & PSYCHOLOGICAL BACKSTORY</span>
              </h4>
              <div className="p-4 bg-white/[0.02] border border-white/10 text-xs sm:text-sm text-[#B8B4AC] leading-[1.65] font-normal font-sans space-y-2">
                <p>{character.description}</p>
              </div>
            </div>

            {/* Unscripted Turning Point */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-sans tracking-[0.14em] text-yellow-400/90 uppercase flex items-center gap-2 font-semibold">
                <Clapperboard className="w-3.5 h-3.5 text-yellow-400/90" />
                <span>KEY UNSCRIPTED SCENE PREVIEW</span>
              </h4>
              <div className="p-4 bg-yellow-400/5 border border-yellow-400/20 text-xs sm:text-sm font-normal text-[#F4F1EA]/90 leading-[1.65] italic font-sans">
                {character.keyScenePreview}
              </div>
            </div>

            {/* Physical Traits / Casting Criteria */}
            {character.physicalTrait && (
              <div className="p-3 bg-white/[0.02] border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
                <strong className="text-yellow-400/90">PHYSICAL NOTE:</strong>
                <span>{character.physicalTrait}</span>
              </div>
            )}

            {/* Filming Soundstages */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono tracking-widest text-white/60 uppercase flex items-center gap-2 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-yellow-400/90" />
                <span>PRINCIPAL FILMING SOUNDSTAGES</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {character.filmingLocations.map((loc) => (
                  <span
                    key={loc}
                    className="px-3 py-1 bg-white/[0.03] border border-white/10 text-xs text-white/80 font-mono"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Audition Guarantee Note & CTA */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 text-xs text-white/70 font-light flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-medium">100% Refundable Security Deposit:</strong>
                  <p className="text-[11px] text-white/50 mt-0.5 font-sans">
                    Upon completing your scheduled shoot itinerary, 100% of the cast security deposit is wired back directly to your bank account.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-white/50">
                  Open to raw talent & seasoned actors. Zero submission fee.
                </span>
                <CinemaButton
                  variant="primary"
                  onClick={() => {
                    onClose();
                    onNominate(character.id);
                  }}
                  className="w-full sm:w-auto"
                >
                  AUDITION AS {character.name}
                </CinemaButton>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
