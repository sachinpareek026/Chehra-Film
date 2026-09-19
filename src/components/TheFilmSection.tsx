import React, { useState } from 'react';
import {
  Film,
  Play,
  ExternalLink,
  Youtube,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import { CinemaButton } from './CinemaButton';
import { FILM_METADATA } from '../data/cinemaData';

interface TheFilmSectionProps {
  onWatchTeaser: () => void;
  onExploreJourney: () => void;
}

export const TheFilmSection: React.FC<TheFilmSectionProps> = ({ onWatchTeaser, onExploreJourney }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(FILM_METADATA.trailerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const specs = [
    { label: 'FORMAT', val: '4K CinemaScope 2.39:1' },
    { label: 'AUDIO', val: 'Dolby Atmos Spatial' },
    { label: 'RUNTIME', val: '118 Mins Feature' },
    { label: 'PREMIERE', val: '2026 Festival Circuit' },
  ];

  return (
    <section id="film" className="relative py-20 md:py-28 bg-[#040813] border-t border-b border-white/10 overflow-hidden">
      {/* Subtle ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Visuals First */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-4 h-[1px] bg-yellow-400" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
                02 / OFFICIAL CINEMA SHOWCASE
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              CHEHRA <span className="text-yellow-400 font-light">•</span> THE FEATURE FILM
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
              4K cinematic footage captured along 2,400 KM of extreme Indian terrain.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px] uppercase tracking-wider">
              OFFICIAL SELECTION 2026
            </span>
            <span className="px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 font-mono text-[10px] uppercase tracking-wider">
              2.39:1 ANAMORPHIC
            </span>
          </div>
        </div>

        {/* 1. Cinematic Video Player & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Main Video Frame (8 cols on lg) */}
          <div className="lg:col-span-8 relative group">
            <div className="relative overflow-hidden border border-white/15 bg-black shadow-2xl shadow-black/80 aspect-video">
              {isPlaying ? (
                <div className="relative w-full h-full bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${FILM_METADATA.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title="Chehra Films Official Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/90 hover:bg-yellow-400 text-slate-200 hover:text-black border border-white/20 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>CLOSE PLAYER</span>
                    </button>
                    <a
                      href={FILM_METADATA.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/90 hover:bg-red-500 text-white text-[10px] font-mono uppercase tracking-wider transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5 text-white" />
                      <span>YOUTUBE 4K</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full group/card cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <img
                    src={FILM_METADATA.trailerThumbnail}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/maxresdefault.jpg';
                    }}
                    alt="Chehra Films Official Trailer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-95 group-hover/card:scale-105 group-hover/card:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-auto">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-yellow-400 text-black font-mono font-bold text-[9px] uppercase tracking-wider">
                        4K PROLOGUE
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 hidden sm:inline">
                        2.39:1 CINEMASCOPE
                      </span>
                    </div>

                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/80 hover:bg-slate-800 text-slate-200 border border-white/20 text-[10px] font-mono tracking-wider transition-colors cursor-pointer backdrop-blur-sm"
                      title="Copy trailer video link"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-300" />
                          <span>COPY LINK</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Center Floating Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-2xl shadow-yellow-500/50 group-hover/card:scale-110 group-hover/card:bg-yellow-300 transition-all duration-300">
                      <Play className="w-7 h-7 fill-black text-black ml-1" />
                    </div>
                  </div>

                  {/* Bottom Slate Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-between border-t border-white/10 bg-black/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-title font-bold text-white uppercase tracking-wider">
                        WATCH OFFICIAL TEASER
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                      <span>CLICK TO PLAY</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Specifications (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 bg-[#070D1A] border border-white/10">
              <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest font-bold block mb-1">
                OVERLAND LOGLINE
              </span>
              <p className="text-sm text-white font-light leading-relaxed">
                Six strangers on a 2,400 KM Himalayan caravan with zero script. Travel dissolves into pure cinema.
              </p>
            </div>

            {/* Technical Specs 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              {specs.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#070D1A] border border-white/10">
                  <span className="text-[9px] font-mono text-yellow-400 block uppercase tracking-widest font-semibold">
                    {item.label}
                  </span>
                  <span className="text-xs font-title font-bold text-slate-200 mt-0.5 block truncate">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <CinemaButton variant="primary" onClick={onWatchTeaser} className="flex-1 !py-3 !text-xs">
                WATCH TEASER
              </CinemaButton>
              <CinemaButton variant="secondary" onClick={onExploreJourney} className="flex-1 !py-3 !text-xs">
                LOCATION MAP
              </CinemaButton>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
