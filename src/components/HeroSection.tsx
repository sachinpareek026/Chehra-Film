import React, { useState, useRef, useEffect } from 'react';
import { Play, Instagram, Youtube, Twitter, Compass, ExternalLink } from 'lucide-react';
import { CHARACTERS, FILM_METADATA } from '../data/cinemaData';
import { PathwayType } from '../types';

interface HeroSectionProps {
  onWatchFilm: () => void;
  onOpenNomination: (roleId?: string, type?: PathwayType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchFilm, onOpenNomination }) => {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const activeVideoRef = useRef<1 | 2>(1);
  const isFadingRef = useRef(false);

  // Hero background video requested by user
  const heroVideo =
    'https://res.cloudinary.com/x1dci3fh/video/upload/v1789638496/make_cloud_circulating_and_thu_gwr_video_mvp.mp4';
  const PLAYBACK_SPEED = 0.9;

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.playbackRate = PLAYBACK_SPEED;
  };

  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);

  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.playbackRate = PLAYBACK_SPEED;
      video1Ref.current.play().catch(() => {});
    }
    if (video2Ref.current) {
      video2Ref.current.playbackRate = PLAYBACK_SPEED;
    }

    let rafId: number;

    const monitorLoop = () => {
      const curVid = activeVideoRef.current === 1 ? video1Ref.current : video2Ref.current;
      const nxtVid = activeVideoRef.current === 1 ? video2Ref.current : video1Ref.current;

      if (curVid && nxtVid && curVid.duration && !isNaN(curVid.duration) && curVid.duration > 1) {
        // Crossfade 1.2s before the video reaches the end for seamless continuous looping
        const fadeLead = Math.min(1.4, Math.max(0.7, curVid.duration * 0.25));

        if (!isFadingRef.current && curVid.currentTime >= curVid.duration - fadeLead) {
          isFadingRef.current = true;
          nxtVid.currentTime = 0;
          nxtVid.playbackRate = PLAYBACK_SPEED;
          nxtVid.play().catch(() => {});

          const nextActive = activeVideoRef.current === 1 ? 2 : 1;
          setActiveVideo(nextActive);
          activeVideoRef.current = nextActive;

          // After fade transition (1000ms), unlock fading for next cycle
          setTimeout(() => {
            isFadingRef.current = false;
          }, 1100);
        }
      }

      rafId = requestAnimationFrame(monitorLoop);
    };

    rafId = requestAnimationFrame(monitorLoop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleVideoEnded = (videoId: 1 | 2) => {
    if (activeVideoRef.current === videoId) {
      const nextVideo = videoId === 1 ? video2Ref.current : video1Ref.current;
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.playbackRate = PLAYBACK_SPEED;
        nextVideo.play().catch(() => {});
      }
      const nextActive = videoId === 1 ? 2 : 1;
      setActiveVideo(nextActive);
      activeVideoRef.current = nextActive;
      isFadingRef.current = false;
    }
  };

  const activeRole = CHARACTERS[activeRoleIndex];

  const trailerCardNode = (
    <div className="w-full">
      <div
        onClick={onWatchFilm}
        className="group relative w-full aspect-video bg-black/90 border border-white/25 hover:border-yellow-400 overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl shadow-black/95 backdrop-blur-md"
        title="Click to play trailer"
      >
        {/* YouTube Video Preview Still - Full image covering */}
        <img
          src={FILM_METADATA.trailerThumbnail}
          alt="Chehra Films Official Trailer on YouTube"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/maxresdefault.jpg';
          }}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-md brightness-90 scale-105 group-hover:blur-none group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
        />

        {/* Subtle edge vignette gradient so the preview image itself is fully visible and covers the frame */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none group-hover:from-black/75 transition-colors" />

        {/* Overlay with subtle corner badges and center play icon allowing the preview image to fully show */}
        <div className="absolute inset-0 flex flex-col justify-between p-2 sm:p-3 pointer-events-none">
          {/* Top header bar */}
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-yellow-400 bg-black/75 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 border border-yellow-400/30 uppercase">
              TEASER
            </span>
            <div className="text-[8px] sm:text-[9px] font-mono text-white bg-black/75 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 border border-white/20 flex items-center gap-1">
              <Youtube className="w-2.5 h-2.5 text-red-500" />
              <span>4K</span>
            </div>
          </div>

          {/* Center Floating Play Button */}
          <div className="self-center my-auto">
            <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-xl shadow-black/70 group-hover:scale-115 group-hover:bg-yellow-300 transition-all duration-300">
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:ml-0.5 fill-black text-black" />
            </div>
          </div>

          {/* Bottom title metadata */}
          <div className="text-left drop-shadow-lg">
            <span className="font-title text-[9px] sm:text-xs md:text-sm font-black tracking-wider text-white uppercase group-hover:text-yellow-300 transition-colors block truncate">
              WATCH TRAILER
            </span>
            <span className="hidden sm:flex text-[9px] sm:text-[10px] font-mono text-slate-300 items-center gap-1.5">
              <span className="text-yellow-400 font-semibold">PARINDAA CINEMA</span>
              <span>•</span>
              <span>Click to Play</span>
            </span>
          </div>
        </div>
      </div>

      {/* Direct YouTube link bar */}
      <div className="mt-1 flex items-center justify-between text-[9px] sm:text-[10px] font-mono px-0.5">
        <span className="hidden sm:inline text-slate-400">TRAILER:</span>
        <a
          href={FILM_METADATA.trailerUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-yellow-400 hover:text-yellow-300 hover:underline flex items-center gap-1 tracking-wider uppercase font-semibold text-[9px] sm:text-[10px]"
          title="Open YouTube video directly"
        >
          <span>YOUTUBE</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-screen bg-[#060B14] text-white flex flex-col justify-between overflow-hidden border-b border-blue-900/30"
    >
      {/* Full-view Hero Background Video - Seamless Dual-Video Crossfade at 60% opacity with 0.9x playback speed */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer with 60% opacity containing dual crossfading video streams */}
        <div className="absolute inset-0 w-full h-full opacity-60">
          <video
            ref={video1Ref}
            src={heroVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => handleVideoEnded(1)}
            className={`absolute inset-0 w-full h-full object-cover object-center scale-100 transition-opacity duration-1000 ease-in-out ${
              activeVideo === 1 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <video
            ref={video2Ref}
            src={heroVideo}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => handleVideoEnded(2)}
            className={`absolute inset-0 w-full h-full object-cover object-center scale-100 transition-opacity duration-1000 ease-in-out ${
              activeVideo === 2 ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Localized shadow strictly behind text areas on the left; the center and right remain completely clear */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[60%] lg:w-[48%] bg-gradient-to-r from-[#060B14]/90 via-[#060B14]/55 to-transparent" />
        {/* Subtle base shadow at the bottom for footer blending */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060B14]/85 via-[#060B14]/30 to-transparent" />
        {/* Delicate top vignette just for nav bar contrast */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* =========================================================================
          TOP NAVIGATION BAR - Merged transparently with background image
          Left: Menu icon + [ABOUT, THE FILM, CHARACTERS, GALLERY, NOMINATION]
          Right: [FOLLOW US + Social Icons]
         ========================================================================= */}
      <header className="relative z-30 w-full bg-transparent shrink-0">
        <div className="max-w-[1700px] mx-auto flex items-stretch justify-between">
          {/* Left Navigation Strip */}
          <div className="flex items-center gap-4 sm:gap-8 py-4 px-4 sm:px-8 bg-transparent">
            {/* Minimalist Dual Line Hamburger Icon */}
            <button
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col justify-center gap-1.5 w-5 h-5 group cursor-pointer drop-shadow-md"
              aria-label="Navigation Menu"
            >
              <span className="w-5 h-[2px] bg-white group-hover:bg-yellow-400 transition-colors" />
              <span className="w-3.5 h-[2px] bg-white group-hover:w-5 group-hover:bg-yellow-400 transition-all" />
            </button>

            {/* Brand Logo with Official Chehra Films Emblem */}
            <a href="#hero" className="flex items-center group cursor-pointer" aria-label="Chehra Films Home">
              <img
                src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789634481/Add_a_subheading_7.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/chehra-logo.png';
                }}
                alt="Chehra Films Official Logo"
                referrerPolicy="no-referrer"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_14px_rgba(245,208,97,0.4)] shrink-0"
              />
            </a>

            {/* Nav Links Matching Reference Image Style */}
            <nav className="hidden md:flex items-center gap-6 pl-2">
              <a
                href="#about"
                className="text-[11px] font-semibold tracking-[0.2em] text-slate-200 hover:text-yellow-400 uppercase transition-colors drop-shadow-md"
              >
                ABOUT
              </a>
              <a
                href="#film"
                className="text-[11px] font-semibold tracking-[0.2em] text-slate-200 hover:text-yellow-400 uppercase transition-colors drop-shadow-md"
              >
                THE FILM
              </a>
              <a
                href="#characters"
                className="text-[11px] font-semibold tracking-[0.2em] text-slate-200 hover:text-yellow-400 uppercase transition-colors drop-shadow-md"
              >
                ROLES
              </a>
              <a
                href="#locations"
                className="text-[11px] font-semibold tracking-[0.2em] text-slate-200 hover:text-yellow-400 uppercase transition-colors drop-shadow-md"
              >
                GALLERY
              </a>
              <button
                onClick={() => onOpenNomination()}
                className="text-[11px] font-semibold tracking-[0.2em] text-yellow-400 hover:text-yellow-300 uppercase transition-colors cursor-pointer drop-shadow-md"
              >
                NOMINATION
              </button>
            </nav>
          </div>

          {/* Right Section: Follow Us + Social Icons */}
          <div className="flex items-center gap-3 sm:gap-5 px-4 sm:px-8 border-l border-white/10 bg-transparent">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-300 uppercase hidden sm:inline drop-shadow-md">
              FOLLOW US
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-yellow-400 transition-colors p-1 drop-shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={FILM_METADATA.trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-yellow-400 transition-colors p-1 drop-shadow-md"
                aria-label="YouTube Trailer"
                title="Watch Trailer on YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-yellow-400 transition-colors p-1 drop-shadow-md"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN HERO BODY (Minimalist, cinematic presentation allowing the background image to be fully shown)
          Left: Title + Logline + Action Buttons + Character Slider
          Right: Floating Video Trailer Card without the obstructive metadata stack
         ========================================================================= */}
      <div className="relative z-20 flex-1 max-w-[1700px] w-full mx-auto flex flex-col justify-between px-6 sm:px-10 lg:px-12 pt-2 sm:pt-4 pb-2 sm:pb-4 min-h-0">
        {/* Top Label Tag */}
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <span className="w-4 h-[1px] bg-yellow-400" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-yellow-400 uppercase font-semibold">
            PARINDAA ORIGINALS // AN UNWRITTEN CINEMATIC ODYSSEY
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-[10px] font-mono text-slate-300 hidden sm:inline tracking-widest uppercase">
            VOL. I (2026)
          </span>
        </div>

        {/* Center Stage: Title + Paragraph + Action Buttons */}
        <div className="mt-2 sm:mt-3 mb-auto py-0">
          <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {/* Cinematic Chehra Title Artwork (Transparent) */}
            <h1 className="mb-2 sm:mb-3 max-w-[240px] sm:max-w-[280px] md:max-w-sm lg:max-w-lg xl:max-w-xl">
              <img
                src="/chehra-title.png"
                alt="Chehra."
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-14 sm:max-h-18 md:max-h-22 lg:max-h-28 xl:max-h-32 object-contain object-left filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] select-none"
              />
              <span className="sr-only">Chehra.</span>
            </h1>

            {/* Submerged Storyline Live Ticker (Stranger Things / HBO inspired) */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-yellow-400/30 text-[10px] font-mono text-slate-300 mb-3 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-yellow-400 font-bold tracking-wider">LIVE PRODUCTION:</span>
              <span className="tracking-wide text-slate-200">2,400 KM OVERLAND • ZERO SCRIPT • 6 REAL LIVES</span>
            </div>

            {/* Compact Logline with enhanced legibility */}
            <p className="text-[13px] text-left text-slate-100 font-normal leading-relaxed mb-4 sm:mb-5 max-w-lg lg:max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Six unscripted lives cross paths on an unpredictable Himalayan convoy. Chehra strips away artificial studio sets to capture raw character truth across extreme Indian landscapes.
            </p>

            {/* Quick CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5">
              <button
                onClick={() => onOpenNomination(undefined, 'actor')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-title font-black text-[11px] lg:text-xs uppercase tracking-[0.18em] shadow-md shadow-yellow-500/20 hover:shadow-yellow-400/40 transition-all cursor-pointer"
              >
                APPLY AS ACTOR (100% REFUND)
              </button>

              <button
                onClick={() => onOpenNomination(undefined, 'participant')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-black/70 hover:bg-[#0E1B33] text-white border border-white/20 hover:border-yellow-400 hover:text-yellow-300 font-title font-bold text-[11px] lg:text-xs uppercase tracking-[0.18em] backdrop-blur-sm transition-all cursor-pointer"
              >
                PRE-BOOK EXPEDITION (₹1,000)
              </button>

              <button
                onClick={onWatchFilm}
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 text-slate-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span>WATCH 4K TEASER</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Character Role Slider (Left) & Floating Trailer Card */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-6 pb-2 sm:pb-5 -translate-y-3 sm:-translate-y-6">
          {/* Mobile-Only: Trailer Section positioned slightly above the Role Section */}
          <div className="block sm:hidden w-[60%] max-w-[250px] mb-1.5">
            {trailerCardNode}
          </div>

          {/* Left: Role Slider Indicator */}
          <div className="flex items-end gap-3 sm:gap-8 min-w-0 -translate-y-1 sm:-translate-y-2">
            {/* Vertical Dotted Indicator */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 shrink-0">
              {CHARACTERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`w-1 sm:w-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    activeRoleIndex === idx
                      ? 'h-3 sm:h-4 bg-yellow-400'
                      : 'h-1 sm:h-1.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Select character ${idx + 1}`}
                />
              ))}
            </div>

            {/* Vertical Role Data Block */}
            <div className="border-l border-white/15 pl-2.5 sm:pl-3.5 space-y-0.5 min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-yellow-400 block tracking-widest uppercase">
                0{activeRoleIndex + 1}
              </span>
              <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-400 block tracking-wider uppercase truncate">
                ROLE
              </span>
              <button
                onClick={() => onOpenNomination(activeRole.id, 'actor')}
                className="font-title text-[11px] sm:text-xs md:text-sm font-bold text-white hover:text-yellow-300 uppercase tracking-wide transition-colors text-left flex items-center gap-1 group cursor-pointer truncate"
              >
                <span className="truncate">{activeRole.name}</span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 font-normal font-mono shrink-0">
                  ({activeRole.ageRange})
                </span>
              </button>
            </div>

            <div className="hidden sm:block text-[10px] font-mono text-slate-300 pl-3.5 border-l border-white/10 max-w-xs drop-shadow-sm">
              <span className="text-yellow-400 font-semibold uppercase">{activeRole.archetype}</span>
              <p className="line-clamp-1 text-slate-300 text-[9px] mt-0.5">{activeRole.tagline}</p>
            </div>
          </div>

          {/* Right: Trailer Card at Bottom Right (Desktop Only) */}
          <div className="hidden sm:block sm:w-64 lg:w-72 shrink-0 self-end">
            {trailerCardNode}
          </div>
        </div>
      </div>
    </section>
  );
};
