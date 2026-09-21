import React, { useState, useRef, useEffect } from 'react';
import { Play, ArrowRight } from 'lucide-react';
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
        <div className="max-w-3xl space-y-6 mt-[25px] sm:mt-0 pl-0 ml-0 mr-0">
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
          <div className="space-y-2">
            <div className="pt-1">
              <h1 className="font-title text-[50px] font-bold text-[#F4F1EA] tracking-[0.02em] uppercase leading-[1.12]">
                {FILM_METADATA.projectTitle}
              </h1>
              <p className="font-sans text-[11px] sm:text-xs text-yellow-400/90 tracking-[0.12em] uppercase font-semibold mt-1.5">
                {FILM_METADATA.projectSubtitle}
              </p>
              <p className="font-sans text-[10px] sm:text-[11px] text-[#B8B4AC] tracking-[0.08em] uppercase font-medium mt-0.5">
                India&apos;s 1st Experimental Cinema Project
              </p>
            </div>
          </div>

          {/* Auteur Logline */}
          <p className="text-[10px] sm:text-sm text-[#B8B4AC] font-normal leading-[1.65] max-w-xl mr-[2px] sm:mr-0 pt-[2px] pb-[3px] sm:py-0 pr-[57px] sm:pr-0 pl-0">
            An unscripted overland feature film across 2,400 kilometers of raw Indian terrain. Zero soundstages. Zero green screens. Real individuals navigating the sub-zero passes of the Himalayas and the ancient silence of the river.
          </p>

          {/* Restrained Action Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-[10px] sm:pt-2 text-[18px] sm:text-base">
            <a
              href="#film"
              className="inline-flex items-center gap-2 px-4 py-[9px] sm:px-6 sm:py-3 bg-yellow-400/90 hover:bg-yellow-300/90 text-[#070A0F] text-xs font-sans font-bold tracking-[0.06em] uppercase transition-all duration-300 shadow-sm shadow-yellow-400/15 border border-yellow-400/90"
            >
              <span className="text-[12px] sm:text-xs">VIEW PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onOpenNomination(undefined, 'actor')}
              className="inline-flex items-center gap-2 px-4 py-[9px] sm:px-6 sm:py-3 bg-[#0A0E16] hover:bg-[#121824] text-[#F4F1EA] border border-white/20 hover:border-yellow-400/90 hover:text-yellow-400/90 text-xs font-sans font-bold tracking-[0.06em] uppercase transition-colors cursor-pointer"
            >
              <span>APPLY FOR ROLE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={FILM_METADATA.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 pt-[10px] pb-[11px] sm:py-3 text-[#B8B4AC] hover:text-[#F4F1EA] text-xs font-sans font-semibold tracking-[0.06em] uppercase transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-yellow-400/90 fill-yellow-400/90" />
              <span>WATCH TEASER</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Character Dossier Rail (Editorial strip, no pulsing dots) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/[0.08] mt-[33px] sm:mt-0 ml-0 sm:mx-auto">
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

