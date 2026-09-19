import React, { useState } from 'react';
import { CHARACTERS } from '../data/cinemaData';
import { CharacterRole } from '../types';
import {
  ArrowRight,
  UserCheck,
  MapPin,
  Eye,
  Star,
  Clapperboard,
  Sparkles,
  Compass,
  ShieldCheck,
  ChevronRight,
  Film,
  Volume2,
  Maximize2
} from 'lucide-react';
import { CinemaButton } from './CinemaButton';

interface CastSectionProps {
  onSelectRole: (roleId: string) => void;
  onInspectCharacter: (character: CharacterRole) => void;
}

export const CastSection: React.FC<CastSectionProps> = ({ onSelectRole, onInspectCharacter }) => {
  const [viewMode, setViewMode] = useState<'spotlight' | 'grid'>('spotlight');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(CHARACTERS[0].id);
  const [gridFilter, setGridFilter] = useState<'ALL' | 'FEMALE' | 'MALE'>('ALL');

  const selectedChar = CHARACTERS.find((c) => c.id === selectedCharacterId) || CHARACTERS[0];
  const selectedIndex = CHARACTERS.findIndex((c) => c.id === selectedChar.id);

  const filteredCharacters = CHARACTERS.filter((c) => {
    if (gridFilter === 'FEMALE') return c.gender === 'Female';
    if (gridFilter === 'MALE') return c.gender === 'Male';
    return true;
  });

  return (
    <section
      id="characters"
      className="relative py-20 md:py-28 bg-[#040813] border-t border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Focused, clean, visuals-first */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-4 h-[1px] bg-yellow-400" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
                03 / CASTING DOSSIER
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              SIX UNWRITTEN CHARACTERS
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
              Select any role to preview unscripted scene footage, soundstages & audition criteria.
            </p>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center p-1 bg-[#09101F] border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('spotlight')}
                className={`px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                  viewMode === 'spotlight'
                    ? 'bg-yellow-400 text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CINEMATIC SHOWCASE
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-yellow-400 text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                6-POSTER GALLERY
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: CINEMATIC SHOWCASE (Large Visuals, Minimal Exterior Text) */}
        {viewMode === 'spotlight' && (
          <div className="bg-[#070D1A] border border-white/15 shadow-2xl relative overflow-hidden">
            {/* Top Bar Ribbon */}
            <div className="px-5 py-2.5 bg-[#091122] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono tracking-widest uppercase">
              <div className="flex items-center gap-3">
                <span className="text-yellow-400 font-bold">
                  ROLE 0{selectedIndex + 1} OF 06
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">
                  {selectedChar.gender} • AGE {selectedChar.ageRange}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/40 text-yellow-300 font-bold">
                  100% REFUNDABLE UPON PRODUCTION COMPLETION
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
              
              {/* Visual Avatar Rail (Left 4 cols) */}
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#060B16] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase font-bold mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-yellow-400" />
                      <span>SELECT FACE</span>
                    </span>
                    <span className="text-yellow-400/80">CLICK TO VIEW</span>
                  </div>

                  <div className="space-y-2">
                    {CHARACTERS.map((char, idx) => {
                      const isActive = char.id === selectedChar.id;
                      return (
                        <button
                          key={char.id}
                          type="button"
                          onClick={() => setSelectedCharacterId(char.id)}
                          className={`w-full flex items-center justify-between p-2 transition-all text-left cursor-pointer border ${
                            isActive
                              ? 'bg-[#0E1C38] border-yellow-400 shadow-md'
                              : 'bg-transparent border-white/5 hover:border-white/20 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div
                                className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                                  isActive
                                    ? 'border-yellow-400 ring-2 ring-yellow-400/40 scale-105'
                                    : 'border-white/20 opacity-70 group-hover:opacity-100'
                                }`}
                              >
                                <img
                                  src={char.image}
                                  alt={char.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              {isActive && (
                                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-[#060B16]" />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono text-slate-400">
                                  0{idx + 1}
                                </span>
                                <h4
                                  className={`font-title text-sm font-bold uppercase tracking-wider ${
                                    isActive ? 'text-white' : 'text-slate-300'
                                  }`}
                                >
                                  {char.name}
                                </h4>
                              </div>
                              <p className="text-[11px] text-yellow-400/90 font-mono tracking-tight">
                                {char.archetype}
                              </p>
                            </div>
                          </div>

                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isActive ? 'text-yellow-400 translate-x-1' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#0A1324] border border-white/5 text-[10px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% deposit refunded upon shoot schedule completion.</span>
                </div>
              </div>

              {/* Massive Cinematic Visual Stage (Right 8 cols) */}
              <div
                className="lg:col-span-8 relative flex flex-col justify-end overflow-hidden group/stage cursor-pointer min-h-[460px] lg:min-h-[580px]"
                onClick={() => onInspectCharacter(selectedChar)}
              >
                {/* Full-bleed Portrait Visual with subtle zoom on hover */}
                <div className="absolute inset-0 z-0 bg-black">
                  <img
                    src={selectedChar.image}
                    alt={selectedChar.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter grayscale-[5%] brightness-90 contrast-105 group-hover/stage:scale-105 transition-all duration-1000 ease-out"
                  />
                  {/* Subtle Cinematic Vignette & Bottom Shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#060B14]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#060B14]/80 via-transparent to-transparent hidden lg:block" />

                  {/* Atmospheric Film Particles */}
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-yellow-400/80 blur-xs animate-ember-slow" />
                  <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 rounded-full bg-amber-400/90 blur-xs animate-ember-fast" />
                  <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-yellow-300/80 animate-ember-fast" />
                </div>

                {/* Top Corner Visual Pill */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <div className="px-3 py-1 bg-black/80 border border-white/20 text-[10px] font-mono text-yellow-400 uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 group-hover/stage:border-yellow-400 transition-colors">
                    <Maximize2 className="w-3 h-3" />
                    <span>CLICK FOR FULL DOSSIER</span>
                  </div>
                </div>

                {/* Bottom Stage Overlay: Clean, Punchy & Visually Balanced */}
                <div className="relative z-10 p-6 sm:p-8 bg-gradient-to-t from-[#050A14] via-[#050A14]/90 to-transparent">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-yellow-400/20 border border-yellow-400/50 text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-widest">
                      {selectedChar.archetype}
                    </span>
                    <span className="text-slate-400 font-mono text-xs">
                      • {selectedChar.filmingLocations[0]}
                    </span>
                  </div>

                  <h3 className="font-title text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none mb-2">
                    {selectedChar.name}
                  </h3>

                  <p className="text-sm sm:text-base text-yellow-300/90 font-light italic mb-4 max-w-xl">
                    &ldquo;{selectedChar.tagline}&rdquo;
                  </p>

                  {/* Single Clean Highlight Bar */}
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-300 mb-6 flex-wrap">
                    <div className="flex items-center gap-1.5 text-yellow-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedChar.filmingLocations.join(' • ')}</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div
                    className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <CinemaButton
                        id={`audition-btn-${selectedChar.id}`}
                        variant="primary"
                        onClick={() => onSelectRole(selectedChar.id)}
                        className="!px-6 !py-3 text-xs tracking-wider"
                      >
                        AUDITION AS {selectedChar.name}
                      </CinemaButton>

                      <CinemaButton
                        id={`inspect-btn-${selectedChar.id}`}
                        variant="outline"
                        onClick={() => onInspectCharacter(selectedChar)}
                        className="!px-5 !py-3 text-xs tracking-wider !border-white/30 hover:!border-white"
                      >
                        OPEN FULL DOSSIER
                      </CinemaButton>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      [CLICK CARD TO READ STORY ARC]
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* MODE 2: 6-POSTER VISUAL GALLERY */}
        {viewMode === 'grid' && (
          <div>
            {/* Filter Tabs */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                6 CHARACTER POSTERS • CLICK TO AUDITION OR INSPECT
              </span>

              <div className="flex items-center gap-1.5 p-1 bg-[#09101F] border border-white/10">
                {(['ALL', 'FEMALE', 'MALE'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setGridFilter(tab)}
                    className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                      gridFilter === tab
                        ? 'bg-yellow-400 text-black font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'ALL' ? 'ALL' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* 3x2 High-Impact Posters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCharacters.map((char) => (
                <div
                  key={char.id}
                  id={`character-card-${char.id}`}
                  onClick={() => onInspectCharacter(char)}
                  className="group relative h-[440px] bg-[#0A1324] border border-white/10 hover:border-yellow-400 overflow-hidden cursor-pointer shadow-xl transition-all duration-300 flex flex-col justify-end"
                >
                  <img
                    src={char.image}
                    alt={`${char.name} - Chehra Films`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-top filter grayscale-[5%] brightness-95 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#060B14]/40 to-black/20 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-black/80 border border-white/20 text-white backdrop-blur-md">
                      {char.gender} • AGE {char.ageRange}
                    </span>

                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-yellow-400 text-black backdrop-blur-md shadow-lg">
                      100% REFUND
                    </span>
                  </div>

                  {/* Bottom Info: Clean, Visual, Minimalist */}
                  <div className="relative z-10 p-5 bg-gradient-to-t from-[#050A14] via-[#050A14]/90 to-transparent">
                    <div className="text-[10px] font-mono tracking-[0.2em] text-yellow-400 uppercase font-bold mb-0.5">
                      {char.archetype}
                    </div>

                    <h3 className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-wide group-hover:text-yellow-400 transition-colors mb-1">
                      {char.name}
                    </h3>

                    <p className="text-xs text-slate-300 font-light italic mb-3 line-clamp-1">
                      &ldquo;{char.tagline}&rdquo;
                    </p>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRole(char.id);
                        }}
                        className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-yellow-400 hover:text-yellow-300 uppercase transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>AUDITION NOW</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>

                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-400" />
                        <span>DETAILS</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
