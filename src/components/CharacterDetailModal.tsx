import React from 'react';
import { X, MapPin, Sparkles, Clapperboard, Check } from 'lucide-react';
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
      className="fixed inset-0 z-50 bg-[#060B14]/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative max-w-4xl w-full bg-[#0A1324] border border-blue-900/60 shadow-2xl overflow-hidden my-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/40 bg-[#060B14]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
            <span className="font-title text-xs uppercase tracking-wider text-white font-bold">
              CHARACTER DOSSIER • {character.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer"
            aria-label="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Portrait and Key Stats */}
          <div className="md:col-span-5 relative bg-[#060B14]">
            <img
              src={character.image}
              alt={character.name}
              referrerPolicy="no-referrer"
              className="w-full h-72 md:h-full object-cover object-top filter grayscale-[5%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1324] via-transparent to-transparent md:hidden" />
          </div>

          {/* Right Column: Character Narrative & Audition Breakdown */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-yellow-400 uppercase mb-1 font-semibold">
                {character.gender} • AGE {character.ageRange} • {character.archetype}
              </div>
              <h3 className="font-title text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
                {character.name}
              </h3>
              <p className="text-xs text-slate-300 italic">
                &ldquo;{character.tagline}&rdquo;
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono tracking-widest text-slate-300 uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>PSYCHOLOGICAL PROFILE & NARRATIVE ROLE</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {character.description}
              </p>
            </div>

            {character.physicalTrait && (
              <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 text-xs font-mono text-yellow-300">
                <strong className="text-yellow-400">DIRECTOR NOTE:</strong> {character.physicalTrait}
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-mono tracking-widest text-slate-300 uppercase flex items-center gap-2">
                <Clapperboard className="w-3.5 h-3.5 text-yellow-400" />
                <span>KEY SCENE EXCERPT</span>
              </h4>
              <div className="p-4 bg-[#060B14] border border-blue-900/40 text-xs font-mono text-slate-300 leading-relaxed italic">
                {character.keyScenePreview}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono tracking-widest text-slate-300 uppercase flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                <span>PRINCIPAL FILMING LOCATIONS</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {character.filmingLocations.map((loc) => (
                  <span
                    key={loc}
                    className="px-2.5 py-1 bg-[#060B14] border border-blue-900/50 text-xs text-slate-300 font-mono"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-blue-900/40 flex items-center justify-between gap-4">
              <div className="text-[11px] font-mono text-slate-400">
                <Check className="w-3.5 h-3.5 text-yellow-400 inline mr-1" />
                Open to first-time actors
              </div>
              <CinemaButton
                variant="primary"
                onClick={() => {
                  onClose();
                  onNominate(character.id);
                }}
              >
                NOMINATE FOR {character.name}
              </CinemaButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
