import React, { useState } from 'react';
import { X, Film, Sliders, ExternalLink, Youtube } from 'lucide-react';
import { FILM_METADATA } from '../data/cinemaData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [aspectRatio, setAspectRatio] = useState<'scope' | 'flat' | 'academy'>('flat');

  if (!isOpen) return null;

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'scope':
        return 'aspect-[2.39/1]';
      case 'flat':
        return 'aspect-[16/9]';
      case 'academy':
        return 'aspect-[4/3]';
      default:
        return 'aspect-[16/9]';
    }
  };

  return (
    <div
      id="video-player-modal"
      className="fixed inset-0 z-50 bg-[#05070B]/95 backdrop-blur-md flex flex-col justify-between p-2 sm:p-6"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 z-20 bg-[#05070B]">
        <div className="flex items-center gap-3">
          <Film className="w-4 h-4 text-yellow-400/90" />
          <span className="font-serif text-xs sm:text-sm text-white tracking-widest uppercase">
            CHEHRA FILMS • OFFICIAL TEASER
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-yellow-400/90 px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/20 uppercase">
            <Youtube className="w-3 h-3 text-red-400" /> Theatrical Cut
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* External YouTube Link */}
          <a
            href={FILM_METADATA.trailerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono text-yellow-400/90 hover:text-white border border-yellow-400/30 hover:border-yellow-400/90 transition-colors uppercase tracking-wider"
          >
            <span>WATCH ON YOUTUBE</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Aspect Ratio Switcher */}
          <div className="hidden md:flex items-center gap-1 text-[10px] font-mono border border-white/10 px-2 py-1 bg-white/[0.02]">
            <Sliders className="w-3 h-3 text-yellow-400/90 mr-1" />
            <button
              type="button"
              onClick={() => setAspectRatio('flat')}
              className={`px-1.5 py-0.5 uppercase cursor-pointer ${
                aspectRatio === 'flat' ? 'text-yellow-400/90 font-bold bg-yellow-400/20' : 'text-white/50'
              }`}
            >
              16:9
            </button>
            <button
              type="button"
              onClick={() => setAspectRatio('scope')}
              className={`px-1.5 py-0.5 uppercase cursor-pointer ${
                aspectRatio === 'scope' ? 'text-yellow-400/90 font-bold bg-yellow-400/20' : 'text-white/50'
              }`}
            >
              2.39:1
            </button>
            <button
              type="button"
              onClick={() => setAspectRatio('academy')}
              className={`px-1.5 py-0.5 uppercase cursor-pointer ${
                aspectRatio === 'academy' ? 'text-yellow-400/90 font-bold bg-yellow-400/20' : 'text-white/50'
              }`}
            >
              4:3
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Video Area with YouTube iframe */}
      <div className="flex-1 flex items-center justify-center relative my-4 overflow-hidden px-2">
        <div
          className={`relative w-full max-w-5xl max-h-[75vh] bg-black border border-white/15 shadow-2xl overflow-hidden transition-all duration-500 ${getAspectClass()}`}
        >
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${FILM_METADATA.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
            title="Chehra Films Official Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Bottom Information Strip */}
      <div className="px-4 py-3 border-t border-white/10 bg-[#05070B] max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-white/50">
        <div className="flex items-center gap-3">
          <span className="text-yellow-400/90 font-semibold">CHEHRA FILMS</span>
          <span>•</span>
          <span>THE LIFE OF NANDI • PARINDAA TRAVELS</span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="hidden sm:inline text-white/40">Direct URL:</span>
          <a
            href={FILM_METADATA.trailerUrl}
            target="_blank"
            rel="noreferrer"
            className="text-yellow-400/90 hover:underline flex items-center gap-1 font-mono"
          >
            <span>{FILM_METADATA.trailerUrl}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
