import React, { useState } from 'react';
import { INDIA_LOCATIONS } from '../data/cinemaData';
import { FilmLocation } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react';

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
    <section id="locations" className="relative py-24 md:py-32 bg-[#080C14] border-t border-white/[0.08] text-[#EDE8DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Section Tag & Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400/90 uppercase font-medium">
                03 // NATURAL SETS
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#A5A196] uppercase">
                SOUNDSTAGE DOSSIER
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F4F1EA] tracking-[0.02em] uppercase leading-[1.15]">
              INDIA AS THE SOUNDSTAGE
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B4AC] font-normal font-sans max-w-xl leading-[1.6]">
              Zero green screens or synthetic sets. Real geological monuments filmed in 4K anamorphic CinemaScope.
            </p>
          </div>

          {/* Gallery Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#A5A196] uppercase tracking-widest mr-2 hidden sm:inline">
              SCROLL / INSPECT DOSSIER
            </span>
            <button
              onClick={scrollLeft}
              aria-label="Previous Location"
              className="p-3 border border-white/10 bg-[#0C111A] hover:border-yellow-400/90 hover:text-yellow-400/90 text-[#EDE8DF] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next Location"
              className="p-3 border border-white/10 bg-[#0C111A] hover:border-yellow-400/90 hover:text-yellow-400/90 text-[#EDE8DF] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Cinematic Image Gallery */}
      <div
        id="india-gallery-scroll"
        className="flex gap-6 overflow-x-auto px-4 sm:px-8 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {INDIA_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            onClick={() => setActiveLocation(loc)}
            className="group relative shrink-0 w-[290px] sm:w-[380px] md:w-[440px] h-[360px] sm:h-[420px] bg-[#020817] border border-blue-900/40 hover:border-sky-400/80 overflow-hidden cursor-pointer snap-start transition-all duration-300"
          >
            {/* Cinematic Image - Dark Blue Transparent */}
            <img
              src={loc.image}
              alt={loc.state}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-110 opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 ease-out"
            />

            {/* Rich Dark Blue Transparent Overlays */}
            <div className="absolute inset-0 bg-[#030d29]/70 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-blue-950/50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-[#020b22]/60 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Full View */}
      {activeLocation && activeMeta && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-[#0A0E16] border border-white/20 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0C111A] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400/90" />
                <span className="font-title text-xs sm:text-sm font-medium tracking-widest text-[#EDE8DF] uppercase">
                  SOUNDSTAGE DOSSIER // {activeLocation.state}
                </span>
              </div>

              <button
                onClick={() => setActiveLocation(null)}
                className="p-1 text-[#A5A196] hover:text-white cursor-pointer transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="relative h-[280px] sm:h-[400px] bg-[#020817] overflow-hidden">
                <img
                  src={activeLocation.image}
                  alt={activeLocation.state}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center opacity-50"
                />
                <div className="absolute inset-0 bg-[#030d29]/70 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-blue-950/50 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E16] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Title and Metadata outside the photo */}
              <div className="px-6 sm:px-8 pt-6 pb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-yellow-400/90 uppercase tracking-widest font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeLocation.state}</span>
                </div>
                <h3 className="font-title text-2xl sm:text-3xl font-normal text-[#EDE8DF] uppercase mt-1">
                  {activeLocation.title}
                </h3>
                <p className="text-sm text-yellow-300/90 font-light italic mt-1">
                  {activeMeta.tagline}
                </p>
              </div>

              {/* Technical Breakdown */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#0C111A] border border-white/10">
                    <span className="text-[10px] font-mono text-yellow-400/90 uppercase tracking-wider block font-medium">
                      GEOLOGICAL TERRAIN
                    </span>
                    <p className="text-xs text-[#A5A196] mt-1 font-light">
                      {activeMeta.terrain}
                    </p>
                  </div>

                  <div className="p-4 bg-[#0C111A] border border-white/10">
                    <span className="text-[10px] font-mono text-yellow-400/90 uppercase tracking-wider block font-medium">
                      SPATIAL ACOUSTICS
                    </span>
                    <p className="text-xs text-[#A5A196] mt-1 font-light">
                      {activeMeta.acoustic}
                    </p>
                  </div>

                  <div className="p-4 bg-[#0C111A] border border-white/10">
                    <span className="text-[10px] font-mono text-yellow-400/90 uppercase tracking-wider block font-medium">
                      FILMING SCHEDULE
                    </span>
                    <p className="text-xs text-[#A5A196] mt-1 font-light">
                      {activeMeta.filmingDays}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <Camera className="w-4 h-4 text-yellow-400/90 shrink-0 mt-0.5" />
                  <p className="text-xs text-[#A5A196] leading-relaxed font-light">
                    Every location listed in this dossier is fully pre-scouted by Chehra production teams with environmental permits secured. Cast and convoy participants travel directly to these soundstages with complete support caravans.
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveLocation(null)}
                    className="px-6 py-2.5 bg-yellow-400/90 hover:bg-yellow-300/90 text-[#070A0F] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    RETURN TO GALLERY →
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

