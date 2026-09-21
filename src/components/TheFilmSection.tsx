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
    { label: 'ASPECT RATIO', val: '2.39:1 CinemaScope' },
    { label: 'SOUND FORMAT', val: 'Dolby Atmos Field Audio' },
    { label: 'RUNNING TIME', val: '118 Mins Feature' },
    { label: 'PRODUCTION', val: 'Unscripted Overland' },
  ];

  return (
    <section id="film" className="relative py-24 md:py-32 bg-[#090D15] border-t border-white/[0.08] text-[#EDE8DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400/90 uppercase font-medium">
                {FILM_METADATA.projectCode} // SHOWCASE
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#A5A196] uppercase">
                VOL. I
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8DF] tracking-tight uppercase leading-tight">
              {FILM_METADATA.projectTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A196] font-normal max-w-xl">
              {FILM_METADATA.projectSubtitle}. An unscripted narrative captured across 2,400 kilometers of high-altitude passes and remote river valleys.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/[0.04] border border-white/10 text-[#A5A196] font-mono text-[10px] uppercase tracking-wider">
              FESTIVAL PREVIEW
            </span>
            <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400/90 font-mono text-[10px] uppercase tracking-wider">
              4K ANAMORPHIC
            </span>
          </div>
        </div>

        {/* 1. Cinematic Video Player & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Video Frame (8 cols on lg) */}
          <div className="lg:col-span-8 relative group">
            <div className="relative overflow-hidden border border-white/15 bg-black aspect-video">
              {isPlaying ? (
                <div className="relative w-full h-full bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${FILM_METADATA.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title="Chehra Films - Official 4K Teaser"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/90 hover:bg-yellow-400/90 text-[#EDE8DF] hover:text-black border border-white/20 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>CLOSE PLAYER</span>
                    </button>
                    <a
                      href={FILM_METADATA.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/90 hover:bg-red-700 text-white border border-white/20 text-[10px] font-mono uppercase tracking-wider transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5 text-red-500" />
                      <span>OPEN IN YOUTUBE</span>
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
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-90 group-hover/card:scale-102 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-yellow-400/90 text-black font-mono font-medium text-[9px] uppercase tracking-wider">
                        4K PROLOGUE
                      </span>
                      <span className="text-[10px] font-mono text-[#A5A196] hidden sm:inline">
                        2.39:1 CINEMASCOPE
                      </span>
                    </div>

                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 hover:bg-white/10 text-[#A5A196] hover:text-white border border-white/15 text-[10px] font-mono tracking-wider transition-colors cursor-pointer"
                      title="Copy trailer link"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY LINK</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Center Floating Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover/card:bg-yellow-400/90 group-hover/card:text-black group-hover/card:border-yellow-400/90">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Bottom Slate Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between border-t border-white/10 bg-black/75">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-yellow-400/90" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[#EDE8DF]">
                        {FILM_METADATA.projectTitle} — OFFICIAL TEASER
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-yellow-400/90 uppercase tracking-wider flex items-center gap-1">
                      <span>WATCH</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Specifications (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 bg-[#0C111A] border border-white/10">
              <span className="text-[10px] font-mono text-yellow-400/90 uppercase tracking-widest font-medium block mb-2">
                OVERLAND LOGLINE
              </span>
              <p className="text-xs sm:text-sm text-[#EDE8DF] font-light leading-relaxed">
                Six strangers on a 2,400-kilometer Himalayan convoy with zero scripted dialogue. Travel dissolves into unscripted cinema.
              </p>
            </div>

            {/* Technical Specs 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {specs.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#0C111A] border border-white/10">
                  <span className="text-[9px] font-mono text-[#A5A196] block uppercase tracking-widest">
                    {item.label}
                  </span>
                  <span className="text-xs font-title font-medium text-[#EDE8DF] mt-1 block truncate">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={onWatchTeaser}
                className="w-full sm:flex-1 py-3 px-4 bg-yellow-400/90 hover:bg-yellow-300/90 text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                PLAY TEASER →
              </button>
              <button
                onClick={onExploreJourney}
                className="w-full sm:flex-1 py-3 px-4 bg-[#0C111A] hover:bg-[#151C28] text-[#EDE8DF] border border-white/15 hover:border-yellow-400/90 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                LOCATIONS →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

