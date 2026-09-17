import React, { useState } from 'react';
import { Film, Sparkles, Layers, Sliders, Play, ExternalLink, Youtube, Copy, Check, RotateCcw } from 'lucide-react';
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
  return (
    <section id="film" className="relative py-12 md:py-16 bg-[#060B14] border-t border-b border-blue-900/40 overflow-hidden">
      {/* Cinematic subtle grid backdrop */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
          <span className="w-6 h-[1.5px] bg-yellow-400" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
            02 / THE FILM CONCEPT
          </span>
        </div>

        {/* Section Headline */}
        <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-8">
          A STORY WAITING TO BE LIVED
        </h2>

        {/* 12-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Trailer Video Preview & Direct Link */}
          <div className="lg:col-span-7 relative group">
            {/* Cinematic Frame */}
            <div className="relative overflow-hidden border border-blue-900/50 bg-black shadow-2xl">
              {isPlaying ? (
                <div className="relative w-full h-[280px] sm:h-[340px] md:h-[390px] bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${FILM_METADATA.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title="Chehra Films Official Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  {/* Top Bar with Return & Direct YouTube Link */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-auto">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/85 hover:bg-yellow-400 text-slate-200 hover:text-black border border-white/20 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>CLOSE PLAYER</span>
                    </button>

                    <a
                      href={FILM_METADATA.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/85 hover:bg-red-600 text-white border border-white/20 text-[10px] font-mono uppercase tracking-wider transition-colors"
                    >
                      <Youtube className="w-3 h-3 text-red-500 hover:text-white" />
                      <span>OPEN ON YOUTUBE</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-[280px] sm:h-[340px] md:h-[390px] group/card">
                  {/* Official Trailer Thumbnail */}
                  <img
                    src={FILM_METADATA.trailerThumbnail}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/maxresdefault.jpg';
                    }}
                    alt="Chehra Films Official Trailer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-95 group-hover/card:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-black/35 to-black/50" />

                  {/* Top: Trailer Link Bar with Direct YouTube Link & Copy Button */}
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10">
                    <a
                      href={FILM_METADATA.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/85 hover:bg-yellow-400 hover:text-black text-white border border-yellow-400/40 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider transition-all duration-200 shadow-xl backdrop-blur-md group/link"
                      title="Open trailer link in new tab"
                    >
                      <Youtube className="w-4 h-4 text-red-500 group-hover/link:text-black transition-colors" />
                      <span className="truncate max-w-[170px] sm:max-w-none text-yellow-300 group-hover/link:text-black">
                        {FILM_METADATA.trailerUrl}
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-300 group-hover/link:text-black" />
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-black/85 hover:bg-slate-800 text-slate-200 border border-white/20 text-[10px] font-mono tracking-wider transition-colors cursor-pointer backdrop-blur-sm"
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
                            <span>COPY</span>
                          </>
                        )}
                      </button>

                      {/* Anamorphic Scope Stamp */}
                      <div className="bg-[#060B14]/85 border border-blue-500/30 px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-slate-300 backdrop-blur-sm hidden sm:block">
                        SCOPE 2.39:1
                      </div>
                    </div>
                  </div>

                  {/* Center Play Trailer Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="pointer-events-auto group/btn flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-title font-black text-xs sm:text-sm uppercase tracking-[0.18em] transition-all duration-300 shadow-2xl shadow-yellow-500/30 hover:scale-105 cursor-pointer"
                      aria-label="Play Trailer Video"
                    >
                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                        <Play className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 ml-0.5" />
                      </div>
                      <span>PLAY TRAILER</span>
                    </button>
                  </div>

                  {/* Bottom Film Slate Overlays with Direct Trailer Destination */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-end justify-between border-t border-white/10 backdrop-blur-[2px] bg-black/70">
                    <div>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-yellow-400 uppercase tracking-widest font-semibold">
                        <Film className="w-3 h-3 text-yellow-400" />
                        <span>OFFICIAL TEASER • PARINDAA TRAVELS</span>
                      </div>
                      <div className="text-xs sm:text-sm font-title font-bold text-white uppercase tracking-wider mt-0.5">
                        CHEHRA FILMS • EXPERIMENTAL CINEMA
                      </div>
                    </div>

                    <a
                      href={FILM_METADATA.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-yellow-400 hover:text-black hover:bg-yellow-400 uppercase px-3 py-1 bg-black/85 border border-yellow-400/40 transition-all font-semibold flex items-center gap-1.5 shrink-0"
                    >
                      <span>WATCH LINK</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Decorative Subtle Accent Bar */}
            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-yellow-400/40 pointer-events-none" />
          </div>

          {/* Right: Editorial Narrative Content */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-[11px] font-mono tracking-[0.2em] text-yellow-400 uppercase flex items-center gap-2 font-semibold">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>THE PREMISE (SPOILER-FREE)</span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              Six strangers from opposing walks of life are brought together by an enigmatic invitation from an unnamed traveler. Their path cuts across high mountain glaciers, sacred riverside pyres, and windswept desert dunes.
            </p>

            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
              As roads turn treacherous and cellular signals fade, the masks they wear dissolve. What begins as a travel expedition rapidly shifts into an intense, unvarnished journey of truth, reconciliation, and profound human connection.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-l-2 border-yellow-400 pl-3.5 italic">
              &quot;We do not hire actors to pretend to be cold on a soundstage. We drive into the freezing altitudes of Spiti, turn the camera on, and let the real frost, real fatigue, and real silence tell the story.&quot;
            </p>

            {/* Technical Specifications Strip */}
            <div className="pt-2 border-t border-blue-900/40 space-y-1.5 font-mono text-[11px] text-slate-300">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Sliders className="w-3 h-3 text-yellow-400" /> CAMERA SYSTEM
                </span>
                <span className="text-white font-medium">{FILM_METADATA.technicalSpecs.format}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Layers className="w-3 h-3 text-yellow-400" /> SOUND DESIGN
                </span>
                <span className="text-white font-medium">{FILM_METADATA.technicalSpecs.audio}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <CinemaButton variant="primary" onClick={onWatchTeaser}>
                WATCH TEASER
              </CinemaButton>
              <CinemaButton variant="secondary" onClick={onExploreJourney}>
                EXPLORE THE JOURNEY
              </CinemaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
