import React, { useState, useRef, useEffect } from 'react';
import { Play, ExternalLink, ArrowRight } from 'lucide-react';
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

  const heroVideo =
    'https://res.cloudinary.com/x1dci3fh/video/upload/v1789638496/make_cloud_circulating_and_thu_gwr_video_mvp.mp4';
  const PLAYBACK_SPEED = 0.85;

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
        const fadeLead = Math.min(1.4, Math.max(0.7, curVid.duration * 0.25));

        if (!isFadingRef.current && curVid.currentTime >= curVid.duration - fadeLead) {
          isFadingRef.current = true;
          nxtVid.currentTime = 0;
          nxtVid.playbackRate = PLAYBACK_SPEED;
          nxtVid.play().catch(() => {});

          const nextActive = activeVideoRef.current === 1 ? 2 : 1;
          setActiveVideo(nextActive);
          activeVideoRef.current = nextActive;

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
    <div className="w-full max-w-[220px] sm:max-w-[250px] lg:max-w-[240px] mx-auto lg:ml-auto">
      <div
        onClick={onWatchFilm}
        className="group relative w-full aspect-video bg-[#0A0E16] border border-white/15 hover:border-yellow-400/90 overflow-hidden cursor-pointer transition-colors duration-300 shadow-xl"
        title="Play Official 4K Teaser"
      >
        <img
          src={FILM_METADATA.trailerThumbnail}
          alt="Chehra Films - Official Trailer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/maxresdefault.jpg';
          }}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-102 transition-transform duration-500 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Framing & Minimalist Play Icon */}
        <div className="absolute inset-0 flex flex-col justify-between p-2.5 pointer-events-none">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono tracking-[0.2em] text-yellow-400/90 uppercase font-medium bg-black/70 px-1.5 py-0.5 border border-white/10">
              OFFICIAL TEASER
            </span>
            <span className="text-[8px] font-mono text-[#A5A196] bg-black/70 px-1 py-0.5 border border-white/10">
              4K
            </span>
          </div>

          <div className="self-center my-auto">
            <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-yellow-400/90 group-hover:text-black group-hover:border-yellow-400/90">
              <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-[#EDE8DF]">
            <span className="tracking-widest uppercase font-medium truncate">
              {FILM_METADATA.projectTitle}
            </span>
            <span className="text-[#A5A196] shrink-0 text-[8px]">PLAY →</span>
          </div>
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-[#A5A196] px-0.5">
        <span className="tracking-wider">ANAMORPHIC SCOPE</span>
        <a
          href={FILM_METADATA.trailerUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-yellow-400/90 hover:text-yellow-300/90 flex items-center gap-1 tracking-wider uppercase transition-colors"
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
      className="relative w-full min-h-screen bg-[#070A0F] text-[#EDE8DF] flex flex-col justify-between overflow-hidden pt-20 pb-8 sm:pb-12"
    >
      {/* Background Video Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 w-full h-full opacity-40">
          <video
            ref={video1Ref}
            src={heroVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => handleVideoEnded(1)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
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
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              activeVideo === 2 ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Natural Vignettes for legibility without color glowing */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[50%] bg-gradient-to-r from-[#070A0F] via-[#070A0F]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070A0F] via-[#070A0F]/60 to-transparent" />
      </div>

      {/* Main Editorial Presentation */}
      <div className="relative z-20 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Left Column: Serious Independent Cinema Presentation */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-6">
            {/* Project Code & Production Marker */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-sans font-semibold tracking-[0.14em] text-yellow-400/90 uppercase">
                {FILM_METADATA.projectCode}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[11px] font-sans font-medium tracking-[0.12em] text-[#B8B4AC] uppercase">
                CHEHRA FILMS
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="text-[11px] font-sans font-medium tracking-[0.12em] text-[#B8B4AC] uppercase hidden sm:inline">
                EXPERIMENTAL TRAVEL CINEMA
              </span>
            </div>

            {/* Official Title & Subtitle */}
            <div className="space-y-3">
              <div className="pt-2">
                <h1 className="font-title text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-[#F4F1EA] tracking-[0.02em] uppercase leading-[1.08]">
                  {FILM_METADATA.projectTitle}
                </h1>
                <p className="font-sans text-xs sm:text-sm md:text-base text-yellow-400/90 tracking-[0.12em] uppercase font-semibold mt-2.5">
                  {FILM_METADATA.projectSubtitle}
                </p>
                <p className="font-sans text-xs text-[#B8B4AC] tracking-[0.08em] uppercase font-medium mt-1">
                  India&apos;s 1st Experimental Cinema Project
                </p>
              </div>
            </div>

            {/* Auteur Logline */}
            <p className="text-base sm:text-lg text-[#B8B4AC] font-normal leading-[1.65] max-w-xl">
              An unscripted overland feature film across 2,400 kilometers of raw Indian terrain. Zero soundstages. Zero green screens. Real individuals navigating the sub-zero passes of the Himalayas and the ancient silence of the river.
            </p>

            {/* Restrained Action Controls */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#film"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400/90 hover:bg-yellow-300/90 text-[#070A0F] text-xs font-sans font-bold tracking-[0.06em] uppercase transition-all duration-300 shadow-sm shadow-yellow-400/15 border border-yellow-400/90"
              >
                <span>VIEW PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onOpenNomination(undefined, 'actor')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0E16] hover:bg-[#121824] text-[#F4F1EA] border border-white/20 hover:border-yellow-400/90 hover:text-yellow-400/90 text-xs font-sans font-bold tracking-[0.06em] uppercase transition-colors cursor-pointer"
              >
                <span>APPLY FOR ROLE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onWatchFilm}
                className="inline-flex items-center gap-2 px-4 py-3 text-[#B8B4AC] hover:text-[#F4F1EA] text-xs font-sans font-semibold tracking-[0.06em] uppercase transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-yellow-400/90 fill-yellow-400/90" />
                <span>WATCH TEASER</span>
              </button>
            </div>
          </div>

          {/* Right Column: 16:9 Scope Frame Preview */}
          <div className="lg:col-span-4 xl:col-span-4 self-end lg:self-end flex flex-col justify-end">
            {trailerCardNode}
          </div>
        </div>
      </div>

      {/* Bottom Character Dossier Rail (Editorial strip, no pulsing dots) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Character Indices */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-sans font-semibold tracking-[0.12em] text-[#B8B4AC]/60 uppercase mr-2 hidden md:inline">
              ROLES //
            </span>
            {CHARACTERS.map((char, idx) => (
              <button
                key={char.id}
                onClick={() => setActiveRoleIndex(idx)}
                className={`px-3 py-1.5 text-[10px] font-sans font-semibold tracking-[0.10em] uppercase transition-colors cursor-pointer border ${
                  activeRoleIndex === idx
                    ? 'border-yellow-400/90 text-[#F4F1EA] bg-white/[0.04]'
                    : 'border-white/[0.08] text-[#B8B4AC] hover:text-[#F4F1EA] hover:border-white/20'
                }`}
              >
                0{idx + 1} {char.name}
              </button>
            ))}
          </div>

          {/* Active Character Snapshot */}
          <div className="flex items-center gap-3 text-xs">
            <div className="w-1.5 h-1.5 bg-yellow-400/90" />
            <span className="font-sans text-[11px] text-[#B8B4AC]">
              {activeRole.archetype} —{' '}
              <span className="text-[#F4F1EA] font-semibold">{activeRole.tagline}</span>
            </span>
            <button
              onClick={() => onOpenNomination(activeRole.id, 'actor')}
              className="text-[10px] font-sans font-bold tracking-[0.08em] text-yellow-400/90 hover:text-yellow-300/90 uppercase underline ml-auto sm:ml-2 cursor-pointer transition-colors"
            >
              AUDITION →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

