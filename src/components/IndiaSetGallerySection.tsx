import React, { useState } from 'react';
import { INDIA_LOCATIONS } from '../data/cinemaData';
import { FilmLocation } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const IndiaSetGallerySection: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<FilmLocation | null>(null);

  const scrollLeft = () => {
    const container = document.getElementById('india-gallery-scroll');
    if (container) {
      container.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('india-gallery-scroll');
    if (container) {
      container.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="locations" className="relative py-12 md:py-16 bg-[#060B14] border-t border-b border-blue-900/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-6 h-[1.5px] bg-yellow-400" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
            06 / REAL ON-LOCATION SOUNDSTAGES
          </span>
        </div>

        {/* Section Headline & Text */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-2">
              INDIA BECOMES THE SET
            </h2>
            <p className="font-title text-sm sm:text-base text-yellow-400 font-extrabold uppercase tracking-wide mb-1.5">
              Mountains. Temples. Roads. Villages. Rivers. People.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl leading-relaxed">
              The country itself becomes part of the film. No polystyrene walls, no green screens, no studio artificiality.
            </p>
          </div>

          {/* Gallery Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Previous Location"
              className="p-2 border border-blue-900/60 bg-[#0A1324] hover:bg-yellow-400 hover:text-black hover:border-yellow-400 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next Location"
              className="p-2 border border-blue-900/60 bg-[#0A1324] hover:bg-yellow-400 hover:text-black hover:border-yellow-400 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Cinematic Image Gallery */}
      <div
        id="india-gallery-scroll"
        className="flex gap-4 sm:gap-5 overflow-x-auto px-4 sm:px-8 pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {INDIA_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            onClick={() => setActiveLocation(loc)}
            className="group relative shrink-0 w-[260px] sm:w-[320px] md:w-[360px] h-[360px] sm:h-[400px] bg-[#0B2545] border border-blue-600/40 overflow-hidden cursor-pointer snap-start transition-all duration-300 hover:border-yellow-400 shadow-lg"
          >
            {/* Vibrant Blue Underlying Base for Transparent Bleed */}
            <div className="absolute inset-0 bg-[#0A2540]" />

            {/* Cinematic Background Image with 60% Transparency */}
            <img
              src={loc.image}
              alt={loc.state}
              referrerPolicy="no-referrer"
              className="relative w-full h-full object-cover object-center opacity-60 filter grayscale-[10%] group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
            />

            {/* Blue Color Overlay Tint */}
            <div className="absolute inset-0 bg-blue-900/30 pointer-events-none mix-blend-color" />

            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B14]/90 via-[#060B14]/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

            {/* Quick Expand Icon */}
            <div className="absolute top-3 right-3 z-10 p-1.5 bg-[#060B14]/80 border border-blue-500/30 text-slate-300 group-hover:text-yellow-400 group-hover:border-yellow-400 transition-colors backdrop-blur-md">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Location Inspection */}
      {activeLocation && (
        <div className="fixed inset-0 z-50 bg-[#060B14]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#0A1324] border border-blue-900/60 overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveLocation(null)}
              className="absolute top-3 right-3 z-20 p-1.5 bg-black/80 border border-white/20 text-white hover:text-yellow-400 cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-[360px] sm:h-[520px] bg-[#0A2540]">
              <img
                src={activeLocation.image}
                alt="Chehra on-location set"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-60"
              />
              <div className="absolute inset-0 bg-blue-900/30 pointer-events-none mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1324] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
