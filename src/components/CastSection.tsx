import React, { useState } from 'react';
import { CHARACTERS } from '../data/cinemaData';
import { CharacterRole } from '../types';
import { ArrowRight, UserCheck, MapPin, Eye } from 'lucide-react';

interface CastSectionProps {
  onSelectRole: (roleId: string) => void;
  onInspectCharacter: (character: CharacterRole) => void;
}

export const CastSection: React.FC<CastSectionProps> = ({ onSelectRole, onInspectCharacter }) => {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <section
      id="characters"
      className="relative py-12 md:py-16 bg-[#060B14] border-t border-b border-blue-900/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-6 h-[1.5px] bg-yellow-400" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
                03 / CASTING DOSSIER
              </span>
            </div>
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              THE FILM NEEDS ITS CHARACTERS
            </h2>
          </div>

          <div className="md:text-right flex md:flex-col gap-3 md:gap-0.5">
            <span className="text-sm sm:text-base font-title font-black text-yellow-400 tracking-wider uppercase">
              Six roles.
            </span>
            <span className="text-xs sm:text-sm font-title text-slate-300 tracking-wider uppercase">
              Six personalities.
            </span>
            <span className="text-xs font-title font-bold text-blue-400 tracking-widest uppercase">
              One journey.
            </span>
          </div>
        </div>

        {/* 3x2 Desktop Grid for 6 Character Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {CHARACTERS.map((char) => {
            const isHovered = hoveredRole === char.id;

            return (
              <div
                key={char.id}
                id={`character-card-${char.id}`}
                onMouseEnter={() => setHoveredRole(char.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className="group relative h-[360px] sm:h-[400px] overflow-hidden border border-blue-900/50 bg-[#0A1324] cursor-pointer shadow-lg transition-all duration-300 hover:border-yellow-400"
                onClick={() => onSelectRole(char.id)}
              >
                {/* Character Portrait Image */}
                <img
                  src={char.image}
                  alt={`${char.name} - Chehra Films Role`}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-top filter grayscale-[5%] contrast-110 transition-all duration-500 ease-out ${
                    isHovered ? 'scale-105 brightness-[0.45]' : 'brightness-[0.90]'
                  }`}
                />

                {/* Base Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#060B14]/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

                {/* Top Badge: Role Metadata */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-[#060B14]/80 border border-blue-500/30 text-white backdrop-blur-md">
                      {char.gender} • AGE {char.ageRange}
                    </span>
                  </div>
                  {char.physicalTrait && (
                    <span className="hidden sm:inline-block px-1.5 py-0.5 text-[8px] font-mono tracking-wider text-yellow-300 bg-yellow-400/10 border border-yellow-400/40 backdrop-blur-md font-semibold">
                      {char.physicalTrait}
                    </span>
                  )}
                </div>

                {/* Bottom Base Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col justify-end transition-all duration-300 ease-out">
                  {/* Archetype Label */}
                  <div className="text-[9px] font-mono tracking-[0.2em] text-yellow-400 uppercase mb-0.5 font-semibold">
                    {char.archetype}
                  </div>

                  {/* Character Name */}
                  <h3 className="font-title text-xl sm:text-2xl font-black tracking-wide text-white uppercase mb-0.5 group-hover:text-yellow-300 transition-colors">
                    {char.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[11px] text-slate-300 font-light italic mb-2 line-clamp-1">
                    &ldquo;{char.tagline}&rdquo;
                  </p>

                  {/* Role Description - Revealed on hover with smooth transition */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isHovered ? 'max-h-40 opacity-100 mb-2.5' : 'max-h-0 opacity-0 mb-0'
                    }`}
                  >
                    <p className="text-[11px] text-slate-200 leading-relaxed font-light mb-2 border-l-2 border-yellow-400 pl-2 line-clamp-3">
                      {char.description}
                    </p>

                    <div className="flex items-center gap-1 text-[9px] font-mono text-slate-300 mb-1">
                      <MapPin className="w-2.5 h-2.5 text-yellow-400" />
                      <span>{char.filmingLocations.join(' • ')}</span>
                    </div>
                  </div>

                  {/* Hover Action Strip */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRole(char.id);
                      }}
                      className="group/btn flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-[0.18em] text-yellow-400 hover:text-yellow-300 uppercase transition-colors"
                    >
                      <UserCheck className="w-3 h-3" />
                      <span>NOMINATE ROLE</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectCharacter(char);
                      }}
                      title="Inspect character scene breakdown"
                      className="p-1 text-slate-400 hover:text-yellow-400 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Casting Notes Banner */}
        <div className="mt-8 p-4 bg-[#0A1324]/90 border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-300 max-w-2xl leading-relaxed">
            <span className="text-yellow-400 font-bold uppercase tracking-wider mr-1.5">CASTING NOTE:</span>
            No formal theatrical credentials required. Raw truth and screen honesty triumph over theatrical technique. Shortlisted nominees will undergo online chemistry tests before on-location departure.
          </div>
          <button
            onClick={() => onSelectRole(CHARACTERS[0].id)}
            className="text-[11px] font-mono font-bold tracking-[0.18em] text-yellow-400 hover:text-yellow-300 uppercase underline underline-offset-4 cursor-pointer whitespace-nowrap"
          >
            OPEN AUDITION FORM →
          </button>
        </div>
      </div>
    </section>
  );
};
