import React from 'react';
import { X, MapPin, Compass, Clapperboard, Check, Film, User, Volume2, ShieldAlert } from 'lucide-react';
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
      className="fixed inset-0 z-50 bg-[#030712]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      {/* Widescreen Character Dossier Container */}
      <div className="relative max-w-5xl w-full bg-[#070D1B] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#040813] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="font-title text-xs sm:text-sm uppercase tracking-widest text-white font-bold">
                OFFICIAL CHARACTER DOSSIER
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-mono text-yellow-400 font-semibold tracking-wider uppercase">
                {character.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2-Column Deep Dive */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Full-Height Dramatic Character Visual Stage (5 cols) */}
          <div className="md:col-span-5 relative bg-black min-h-[300px] md:min-h-full">
            <img
              src={character.image}
              alt={character.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070D1B] via-[#070D1B]/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#070D1B]" />
            
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-[10px] font-mono text-yellow-400 uppercase tracking-widest backdrop-blur-md">
                {character.gender} • AGE {character.ageRange}
              </span>
              <span className="px-2.5 py-1 bg-yellow-400 text-black text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                100% REFUND
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 md:hidden">
              <h3 className="font-title text-3xl font-black text-white uppercase tracking-tight">
                {character.name}
              </h3>
              <p className="text-xs text-yellow-300 italic">
                &ldquo;{character.tagline}&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Complete Story Arc & Audition Guide (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* Header Titles */}
            <div className="border-b border-white/10 pb-4">
              <div className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-bold mb-1">
                ARCHETYPE: {character.archetype}
              </div>
              <h3 className="hidden md:block font-title text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
                {character.name}
              </h3>
              <p className="text-sm text-yellow-300/90 italic font-light">
                &ldquo;{character.tagline}&rdquo;
              </p>
            </div>

            {/* Deep Narrative Arc */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono tracking-widest text-slate-300 uppercase flex items-center gap-2 font-bold">
                <Compass className="w-3.5 h-3.5 text-yellow-400" />
                <span>NARRATIVE ARC & PSYCHOLOGICAL BACKSTORY</span>
              </h4>
              <div className="p-4 bg-[#050A14] border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed font-light space-y-2">
                <p>{character.description}</p>
              </div>
            </div>

            {/* Unscripted Turning Point */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono tracking-widest text-yellow-400 uppercase flex items-center gap-2 font-bold">
                <Clapperboard className="w-3.5 h-3.5 text-yellow-400" />
                <span>KEY UNSCRIPTED SCENE PREVIEW</span>
              </h4>
              <div className="p-4 bg-yellow-400/5 border border-yellow-400/30 text-xs sm:text-sm font-light text-slate-200 leading-relaxed italic">
                {character.keyScenePreview}
              </div>
            </div>

            {/* Physical Traits / Casting Criteria */}
            {character.physicalTrait && (
              <div className="p-3 bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
                <strong className="text-yellow-400">PHYSICAL NOTE:</strong>
                <span>{character.physicalTrait}</span>
              </div>
            )}

            {/* Filming Soundstages */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono tracking-widest text-slate-300 uppercase flex items-center gap-2 font-bold">
                <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                <span>PRINCIPAL FILMING SOUNDSTAGES</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {character.filmingLocations.map((loc) => (
                  <span
                    key={loc}
                    className="px-3 py-1 bg-[#050A14] border border-white/15 text-xs text-slate-200 font-mono"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Audition Guarantee Note & CTA */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-300 font-light flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-medium">100% Refundable Security Deposit:</strong>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Upon completing your scheduled shoot itinerary, 100% of the cast deposit is refunded immediately to your account.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-slate-400">
                  Open to raw talent & seasoned actors. Zero submission fee.
                </span>
                <CinemaButton
                  variant="primary"
                  onClick={() => {
                    onClose();
                    onNominate(character.id);
                  }}
                  className="w-full sm:w-auto !py-3 !px-6 text-xs tracking-wider"
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
