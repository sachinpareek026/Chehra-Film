import React, { useState } from 'react';
import { INDIA_LOCATIONS } from '../data/cinemaData';
import { FilmLocation } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin, Compass, Camera } from 'lucide-react';
import { CinemaButton } from './CinemaButton';

interface LocationEnhancedInfo {
  tagline: string;
  terrain: string;
  acoustic: string;
  filmingDays: string;
}

const LOCATION_DETAILS: Record<string, LocationEnhancedInfo> = {
  'loc-1': {
    tagline: 'Living Root Bridges & Sacred Khasi Forest',
    terrain: 'Ancient sub-tropical cloud valley canopy',
    acoustic: 'Cascading waterfalls, natural cave reverberation',
    filmingDays: 'Days 04 – 07 // Principal Photography'
  },
  'loc-2': {
    tagline: 'Deep Ocean Trench & Glass Bottom Reefs',
    terrain: 'Coral atoll, volcanic reefs and secluded coves',
    acoustic: 'Tidal surges, hydrophone ocean acoustics',
    filmingDays: 'Days 18 – 22 // Marine Convoy'
  },
  'loc-3': {
    tagline: 'Krem Chympe River Cave System',
    terrain: 'Subterranean limestone tunnels & natural waterfalls',
    acoustic: 'Stalactite echo, water drip acoustic chambers',
    filmingDays: 'Days 08 – 11 // Low-Light Soundstage'
  },
  'loc-4': {
    tagline: 'Mawsynram Monsoonal Torrential Cascades',
    terrain: 'Precipitous gorges, perpetual mist & rainforest',
    acoustic: 'High-frequency cloudburst spatial soundscape',
    filmingDays: 'Days 12 – 15 // Weather Climax'
  },
  'loc-5': {
    tagline: 'Himalayan High Altitude Ridge Passes',
    terrain: 'Sub-zero tundra, scree slopes and cloud oceans',
    acoustic: 'High wind vortex, zero-clutter high-altitude silence',
    filmingDays: 'Days 23 – 28 // Climax Filming'
  }
};

export const IndiaSetGallerySection: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<FilmLocation | null>(null);

  const scrollLeft = () => {
    const container = document.getElementById('india-gallery-scroll');
    if (container) {
      container.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('india-gallery-scroll');
    if (container) {
      container.scrollBy({ left: 460, behavior: 'smooth' });
    }
  };

  const activeMeta = activeLocation ? LOCATION_DETAILS[activeLocation.id] || LOCATION_DETAILS['loc-1'] : null;

  return (
    <section id="locations" className="relative py-20 md:py-28 bg-[#040813] border-t border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Section Tag & Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-4 h-[1px] bg-yellow-400" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
                07 / ON-LOCATION SOUNDSTAGES
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              INDIA BECOMES THE SET
            </h2>
            <p className="mt-1 text-slate-400 text-xs sm:text-sm font-light">
              Zero green screens or synthetic sets. Real geological monuments filmed in 4K anamorphic.
            </p>
          </div>

          {/* Gallery Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-2 hidden sm:inline">
              SCROLL / CLICK CARD FOR SOUNDSTAGE DOSSIER
            </span>
            <button
              onClick={scrollLeft}
              aria-label="Previous Location"
              className="p-3 border border-white/10 bg-[#09101F] hover:border-yellow-400 hover:text-yellow-400 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next Location"
              className="p-3 border border-white/10 bg-[#09101F] hover:border-yellow-400 hover:text-yellow-400 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Cinematic Image Gallery (Focus on visuals outside) */}
      <div
        id="india-gallery-scroll"
        className="flex gap-6 overflow-x-auto px-4 sm:px-8 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {INDIA_LOCATIONS.map((loc, index) => (
          <div
            key={loc.id}
            onClick={() => setActiveLocation(loc)}
            className="group relative shrink-0 w-[290px] sm:w-[380px] md:w-[440px] h-[360px] sm:h-[420px] bg-[#09101F] border border-white/10 overflow-hidden cursor-pointer snap-start transition-all duration-500 hover:border-yellow-400 shadow-2xl"
          >
            {/* Cinematic Image */}
            <img
              src={loc.image}
              alt={loc.state}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
            />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040813] via-transparent to-black/30 pointer-events-none" />

            {/* Top Label */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-black/80 border border-white/20 backdrop-blur-md">
                STAGE 0{index + 1}
              </span>
              <div className="p-1.5 bg-black/80 border border-white/20 text-slate-300 group-hover:text-yellow-400 group-hover:border-yellow-400 transition-colors backdrop-blur-md flex items-center gap-1.5 text-[9px] font-mono font-semibold">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">INSPECT</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Full View (Show rich details inside) */}
      {activeLocation && activeMeta && (
        <div className="fixed inset-0 z-50 bg-[#03060E]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-[#080E1C] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#050A14] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
                <span className="font-title text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
                  SOUNDSTAGE DOSSIER • {activeLocation.state}
                </span>
              </div>

              <button
                onClick={() => setActiveLocation(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="relative h-[280px] sm:h-[400px]">
                <img
                  src={activeLocation.image}
                  alt={activeLocation.state}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E1C] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeLocation.state}</span>
                  </div>
                  <h3 className="font-title text-3xl sm:text-4xl font-black text-white uppercase mt-1">
                    {activeLocation.title}
                  </h3>
                  <p className="text-sm text-yellow-200/90 font-light italic mt-1">
                    {activeMeta.tagline}
                  </p>
                </div>
              </div>

              {/* Rich Technical Breakdown Inside */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#050A14] border border-white/10">
                    <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider block font-bold">
                      GEOLOGICAL TERRAIN
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      {activeMeta.terrain}
                    </p>
                  </div>

                  <div className="p-4 bg-[#050A14] border border-white/10">
                    <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider block font-bold">
                      SPATIAL ACOUSTICS
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      {activeMeta.acoustic}
                    </p>
                  </div>

                  <div className="p-4 bg-[#050A14] border border-white/10">
                    <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider block font-bold">
                      FILMING SCHEDULE
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      {activeMeta.filmingDays}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 flex items-start gap-3">
                  <Camera className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Every location listed in this dossier is fully pre-scouted by Chehra production teams with environmental permits secured. Cast and convoy participants travel directly to these soundstages with complete support caravans.
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveLocation(null)}
                    className="px-5 py-2.5 bg-yellow-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-yellow-300 transition-colors cursor-pointer"
                  >
                    RETURN TO GALLERY
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
