import React, { useState } from 'react';
import { CHARACTERS } from '../data/cinemaData';
import { CharacterRole } from '../types';
import {
  ArrowRight,
  UserCheck,
  Eye,
  Compass,
  ShieldCheck,
  ChevronRight,
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
      className="relative py-24 md:py-32 bg-[#090D15] border-t border-white/[0.08] text-[#EDE8DF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400/90 uppercase font-medium">
                02 // ENSEMBLE CALL
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#A5A196] uppercase">
                OPEN AUDITIONS
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F4F1EA] tracking-[0.02em] uppercase leading-[1.15]">
              SEVEN UNWRITTEN CHARACTERS
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B4AC] font-normal font-sans max-w-xl leading-[1.6]">
              Select any role to inspect background backstory and audition criteria. Zero casting charges; 100% refund eligible upon post-release cost recovery.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
              <span className="px-2 py-0.5 bg-yellow-400 text-black font-bold uppercase tracking-wider">
                LAST DATE TO APPLY: 20TH NOV
              </span>
              <span className="px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/40 text-yellow-300 font-semibold">
                TOTAL: ₹16,000 (100% REFUNDABLE DEPOSIT)
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 font-semibold">
                ₹3,000 SECURITY BOOKING AFTER SELECTION
              </span>
            </div>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center p-1 bg-[#0C111A] border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('spotlight')}
                className={`px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                  viewMode === 'spotlight'
                    ? 'bg-yellow-400/90 text-black font-semibold'
                    : 'text-[#A5A196] hover:text-[#EDE8DF]'
                }`}
              >
                CINEMATIC SPOTLIGHT
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-yellow-400/90 text-black font-semibold'
                    : 'text-[#A5A196] hover:text-[#EDE8DF]'
                }`}
              >
                POSTER GALLERY
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: CINEMATIC SHOWCASE (Large Visuals, Minimal Exterior Text) */}
        {viewMode === 'spotlight' && (
          <div className="bg-[#0C111A] border border-white/15 relative overflow-hidden">
            {/* Top Bar Ribbon */}
            <div className="px-5 py-3 bg-[#0E1420] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono tracking-widest uppercase">
              <div className="flex items-center gap-3">
                <span className="text-yellow-400/90 font-medium">
                  ROLE 0{selectedIndex + 1} OF 0{CHARACTERS.length}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[#A5A196]">
                  {selectedChar.gender} • AGE {selectedChar.ageRange}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-yellow-300 font-bold bg-yellow-400/20 px-2 py-0.5 border border-yellow-400/40">
                  LAST DATE: 20 NOV
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400/90 font-medium">
                  TOTAL ₹16,000 • ₹3,000 SECURITY AFTER SELECTION
                </span>
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 font-medium">
                  100% REFUND DEPOSIT UPON COST RECOVERY
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
              
              {/* Visual Avatar Rail (Left 4 cols) */}
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0A0E16] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-[#A5A196] uppercase font-medium mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-yellow-400/90" />
                      <span>SELECT ROLE</span>
                    </span>
                    <span className="text-yellow-400/80">CHOOSE PROFILE</span>
                  </div>

                  <div className="space-y-1.5">
                    {CHARACTERS.map((char, idx) => {
                      const isActive = char.id === selectedChar.id;
                      return (
                        <button
                          key={char.id}
                          type="button"
                          onClick={() => setSelectedCharacterId(char.id)}
                          className={`w-full flex items-center justify-between p-2.5 transition-colors text-left cursor-pointer border ${
                            isActive
                              ? 'bg-[#141B26] border-yellow-400/90'
                              : 'bg-transparent border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div
                                className={`w-11 h-11 overflow-hidden border transition-all ${
                                  isActive
                                    ? 'border-yellow-400/90'
                                    : 'border-white/20 opacity-70'
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
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400/90 border border-black" />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono text-[#68665E]">
                                  0{idx + 1}
                                </span>
                                <h4
                                  className={`font-title text-sm font-medium uppercase tracking-wider ${
                                    isActive ? 'text-[#EDE8DF]' : 'text-[#A5A196]'
                                  }`}
                                >
                                  {char.name}
                                </h4>
                              </div>
                              <p className="text-[10px] text-yellow-400/90 font-mono tracking-tight">
                                {char.archetype}
                              </p>
                            </div>
                          </div>

                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isActive ? 'text-yellow-400/90 translate-x-0.5' : 'text-[#68665E]'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#0C111A] border border-yellow-400/25 text-[10px] text-[#A5A196] space-y-1 font-mono">
                  <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Total ₹16,000 • ₹3,000 Security After Selection</span>
                  </div>
                  <p className="text-slate-400 text-[9px] font-sans">
                    Zero audition fees. 100% security deposit refund estimation upon post-release cost recovery. Last date to apply: <strong className="text-white">20th Nov</strong>.
                  </p>
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
                    className="w-full h-full object-cover object-top filter grayscale-[5%] brightness-90 contrast-105 group-hover/stage:scale-102 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-[#0C111A]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0C111A]/80 via-transparent to-transparent hidden lg:block" />
                </div>

                {/* Top Corner Visual Pill */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <div className="px-3 py-1 bg-black/80 border border-white/20 text-[10px] font-mono text-yellow-400/90 uppercase tracking-widest flex items-center gap-1.5 group-hover/stage:border-yellow-400/90 transition-colors">
                    <Maximize2 className="w-3 h-3" />
                    <span>INSPECT FULL DOSSIER</span>
                  </div>
                </div>

                {/* Bottom Stage Overlay */}
                <div className="relative z-10 p-6 sm:p-8 bg-gradient-to-t from-[#0C111A] via-[#0C111A]/90 to-transparent">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-yellow-400/20 border border-yellow-400/40 text-[10px] font-mono text-yellow-400/90 uppercase tracking-widest">
                      {selectedChar.archetype}
                    </span>
                  </div>

                  <h3 className="font-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F4F1EA] uppercase tracking-[0.02em] leading-tight mb-2">
                    {selectedChar.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-yellow-300/90 font-medium italic mb-6 max-w-xl leading-[1.6]">
                    &ldquo;{selectedChar.tagline}&rdquo;
                  </p>

                  {/* Actions Bar */}
                  <div
                    className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <CinemaButton
                        id={`audition-btn-${selectedChar.id}`}
                        variant="primary"
                        onClick={() => onSelectRole(selectedChar.id)}
                        className="!px-6 !py-3 text-xs tracking-wider"
                      >
                        AUDITION AS {selectedChar.name} (LAST DATE: 20 NOV)
                      </CinemaButton>

                      <CinemaButton
                        id={`inspect-btn-${selectedChar.id}`}
                        variant="outline"
                        onClick={() => onInspectCharacter(selectedChar)}
                        className="!px-5 !py-3 text-xs tracking-wider !border-white/20 hover:!border-white"
                      >
                        OPEN FULL DOSSIER
                      </CinemaButton>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-mono text-yellow-300 font-bold block">
                        TOTAL ₹16,000 • ₹3,000 SECURITY AFTER SELECTION
                      </span>
                      <span className="text-[10px] font-mono text-[#68665E] uppercase tracking-widest block">
                        100% REFUND ESTIMATION POST-RELEASE
                      </span>
                    </div>
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
              <span className="text-xs font-mono text-[#A5A196] uppercase tracking-widest">
                {CHARACTERS.length} CHARACTER DOSSIERS • LAST DATE: 20TH NOV
              </span>

              <div className="flex items-center gap-1.5 p-1 bg-[#0C111A] border border-white/10">
                {(['ALL', 'FEMALE', 'MALE'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setGridFilter(tab)}
                    className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                      gridFilter === tab
                        ? 'bg-yellow-400/90 text-black font-semibold'
                        : 'text-[#A5A196] hover:text-[#EDE8DF]'
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
                  className="group relative h-[450px] bg-[#0C111A] border border-white/10 hover:border-yellow-400/90 overflow-hidden cursor-pointer transition-colors duration-300 flex flex-col justify-end"
                >
                  <img
                    src={char.image}
                    alt={`${char.name} - Chehra Films`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-top filter grayscale-[5%] brightness-90 group-hover:scale-102 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-[#0C111A]/40 to-black/20 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2 py-0.5 text-[9px] font-mono font-medium tracking-widest uppercase bg-black/80 border border-white/20 text-[#EDE8DF]">
                      {char.gender} • AGE {char.ageRange}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase bg-amber-500 text-black">
                        20 NOV
                      </span>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-semibold tracking-widest uppercase bg-yellow-400 text-black">
                        100% REFUND
                      </span>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="relative z-10 p-5 bg-gradient-to-t from-[#0C111A] via-[#0C111A]/95 to-transparent">
                    <div className="text-[10px] font-mono tracking-[0.2em] text-yellow-400/90 uppercase font-medium mb-0.5">
                      {char.archetype}
                    </div>

                    <h3 className="font-title text-2xl sm:text-3xl font-semibold text-[#F4F1EA] uppercase tracking-[0.02em] group-hover:text-yellow-400/90 transition-colors mb-1">
                      {char.name}
                    </h3>

                    <p className="text-xs text-[#B8B4AC] font-normal font-sans italic mb-2 line-clamp-1">
                      &ldquo;{char.tagline}&rdquo;
                    </p>

                    <div className="p-2 bg-black/70 border border-white/10 text-[10px] font-mono text-slate-300 flex items-center justify-between mb-3">
                      <span className="text-yellow-300 font-bold">Total: ₹16,000</span>
                      <span className="text-emerald-400 font-medium">₹3,000 Security After Selection</span>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRole(char.id);
                        }}
                        className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-yellow-400/90 hover:text-yellow-300/90 uppercase transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>AUDITION NOW</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>

                      <span className="text-[10px] font-mono text-[#68665E] uppercase flex items-center gap-1">
                        <Eye className="w-3 h-3" />
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

