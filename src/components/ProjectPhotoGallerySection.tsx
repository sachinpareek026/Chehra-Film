import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  Film,
  Sparkles,
  Info
} from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: string;
  location: string;
  description: string;
  aspectRatio: string;
}

export const PROJECT_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1791484486/file_000000007c40821199a2e8f785b83ea1.png',
    title: 'Visual Horizon & Atmosphere',
    category: 'PRODUCTION STILL',
    location: 'Kashmir High Valley // Location Scouting',
    description: 'Cinematic tone framing capturing the stark, atmospheric beauty and raw emotional backdrop of the expedition route.',
    aspectRatio: '3:4'
  },
  {
    id: 'photo-6',
    url: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1791484480/IMG-20260923-WA0001.jpg',
    title: 'Soundstage of the Wild',
    category: 'SET SCOUTING',
    location: 'Pahalgam Ridge // Dusk Sequence',
    description: 'Dusk lighting tests across mountain topography, exploring real atmospheric fog and twilight cinematography.',
    aspectRatio: '3:4'
  },
  {
    id: 'photo-2',
    url: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1791484484/file_000000003c6c82089e1bd053466ee2e3.png',
    title: 'Filmmaking On Ground',
    category: 'BEHIND THE SCENES',
    location: 'Winter Expedition // Field Setup',
    description: 'Documenting the practical, guerrilla filmmaking approach where nature acts as the living, breathing soundstage.',
    aspectRatio: '3:4'
  },
  {
    id: 'photo-3',
    url: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1791484487/file_00000000e3d881fa8dc08acaecf30f04.png',
    title: 'Cast & Character In Character',
    category: 'CHARACTER REHEARSAL',
    location: 'Convoy Journey // Natural Lighting',
    description: 'Spontaneous candid portraits capturing the emotional intensity and psychological realism central to Chehra Films.',
    aspectRatio: '3:4'
  },
  {
    id: 'photo-4',
    url: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1791484481/file_00000000595c81f5b2ee66924b91d6b9.png',
    title: 'Camera Department & Rig',
    category: 'CINEMATOGRAPHY',
    location: 'Mountain Passes // Anamorphic Test',
    description: 'Calibrating optics and frame compositions under sub-zero conditions to achieve high-contrast, filmic texture.',
    aspectRatio: '3:4'
  },
  {
    id: 'photo-5',
    url: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1791484480/IMG-20261008-WA0002.jpg',
    title: 'Expedition Basecamp & Travel Convoy',
    category: 'EXPEDITION CHRONICLE',
    location: 'Kashmir Valley // Basecamp Life',
    description: 'The real collective journey — actors, participants, and crew living, dining, and traveling together through untamed terrains.',
    aspectRatio: '3:4'
  }
];

export const ProjectPhotoGallerySection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mouse drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < maxScroll - 10);

    const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);

    // Approximate active item
    const itemWidth = 320; // approximate card width + gap
    const index = Math.min(
      PROJECT_PHOTOS.length - 1,
      Math.max(0, Math.round(el.scrollLeft / itemWidth))
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 340;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-gallery-card]');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!activePhoto && !bannerModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
        setBannerModalOpen(false);
      } else if (activePhoto && e.key === 'ArrowLeft') {
        const idx = PROJECT_PHOTOS.findIndex((p) => p.id === activePhoto.id);
        if (idx > 0) setActivePhoto(PROJECT_PHOTOS[idx - 1]);
      } else if (activePhoto && e.key === 'ArrowRight') {
        const idx = PROJECT_PHOTOS.findIndex((p) => p.id === activePhoto.id);
        if (idx < PROJECT_PHOTOS.length - 1) setActivePhoto(PROJECT_PHOTOS[idx + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, bannerModalOpen]);

  return (
    <section
      id="project-gallery"
      className="relative py-20 sm:py-28 bg-[#040711] border-t border-white/[0.08] text-[#EDE8DF] overflow-hidden"
    >
      {/* Ambient background glow & film grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(234,179,8,0.04),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-mono text-[10px] sm:text-xs tracking-wider uppercase font-semibold">
                <Camera className="w-3 h-3 text-yellow-400" />
                PROJECT PHOTO GALLERY
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] sm:text-xs font-mono text-zinc-400 tracking-wider uppercase">
                3:4 PRODUCTION STILLS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-title font-bold text-white tracking-wide uppercase">
              On-Location &amp; Production Stills
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans leading-relaxed">
              Real visuals captured across our location scouting, camera tests, and expedition journey in Kashmir. Cropped in cinematic 3:4 portrait aspect ratio. Scroll or drag horizontally to view all frames.
            </p>
          </div>

          {/* Controls: Prev/Next & Counter */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">
              <span className="text-yellow-400 font-bold">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>{String(PROJECT_PHOTOS.length).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous photos"
                className={`w-10 h-10 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'border-white/20 bg-white/5 text-white hover:bg-yellow-400/20 hover:border-yellow-400 hover:text-yellow-400 active:scale-95'
                    : 'border-white/5 bg-white/[0.02] text-zinc-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next photos"
                className={`w-10 h-10 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollRight
                    ? 'border-white/20 bg-white/5 text-white hover:bg-yellow-400/20 hover:border-yellow-400 hover:text-yellow-400 active:scale-95'
                    : 'border-white/5 bg-white/[0.02] text-zinc-600 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Panoramic Still: Placed in between description words and photo gallery */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0A0E1A] shadow-2xl relative group">
          <div className="relative aspect-[21/9] sm:aspect-[2.5/1] w-full max-h-[380px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/x1dci3fh/image/upload/v1791484898/file_0000000037a881f49f7b9d6eb635f2cb.png"
              alt="Chehra Films Kashmir Production Panorama"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out cursor-pointer"
              onClick={() => setBannerModalOpen(true)}
            />

            {/* Click to expand button */}
            <button
              type="button"
              onClick={() => setBannerModalOpen(true)}
              aria-label="Expand panoramic still"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-yellow-400 hover:text-black text-white border border-white/20 transition-all cursor-pointer backdrop-blur-md shadow-lg opacity-80 group-hover:opacity-100"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Gallery Track */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {PROJECT_PHOTOS.map((photo, index) => (
              <div
                key={photo.id}
                data-gallery-card
                onClick={() => {
                  if (!hasMovedRef.current) {
                    setActivePhoto(photo);
                  }
                }}
                className="group relative shrink-0 w-[260px] sm:w-[290px] md:w-[320px] snap-start cursor-pointer transition-all duration-300"
              >
                {/* 3:4 Aspect Ratio Container: Clean full-bleed photo without inner text or badges */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0A0E1A] shadow-xl group-hover:border-yellow-400/60 group-hover:shadow-2xl group-hover:shadow-yellow-400/10 transition-all duration-300">
                  {/* Photo with 3:4 crop */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle hover expand icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-yellow-400 flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Micro thumbnail status */}
                <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] font-mono text-zinc-500">
                  <span className="truncate max-w-[200px]">{photo.title}</span>
                  <span className="text-zinc-600">0{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar & Quick Indicator Dots */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 shrink-0">
              EXPEDITION REEL
            </span>
            <div className="w-36 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden shrink-0">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(16, scrollProgress)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-yellow-400/90 font-bold shrink-0">
              {Math.round(scrollProgress)}%
            </span>
          </div>

          {/* Quick Click Dot Indicators */}
          <div className="flex items-center gap-2">
            {PROJECT_PHOTOS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Scroll to photo ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 bg-yellow-400'
                    : 'w-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Click any still to enlarge &amp; inspect</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row bg-[#080C16] border border-white/15 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-yellow-400 hover:text-black border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Image Area with 3:4 framing */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-4 sm:p-8 min-h-[360px] md:min-h-[520px]">
              <div className="relative aspect-[3/4] max-h-[75vh] w-auto overflow-hidden rounded-lg shadow-2xl border border-white/20">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Prev / Next within modal */}
              {PROJECT_PHOTOS.findIndex((p) => p.id === activePhoto.id) > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const idx = PROJECT_PHOTOS.findIndex((p) => p.id === activePhoto.id);
                    if (idx > 0) setActivePhoto(PROJECT_PHOTOS[idx - 1]);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-yellow-400 hover:text-black border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {PROJECT_PHOTOS.findIndex((p) => p.id === activePhoto.id) < PROJECT_PHOTOS.length - 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const idx = PROJECT_PHOTOS.findIndex((p) => p.id === activePhoto.id);
                    if (idx < PROJECT_PHOTOS.length - 1) setActivePhoto(PROJECT_PHOTOS[idx + 1]);
                  }}
                  className="absolute right-4 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-yellow-400 hover:text-black border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Right Information Dossier */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#090D18]">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2">
                  <span className="text-yellow-400 font-bold uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <span>
                    STILL {String(PROJECT_PHOTOS.findIndex((p) => p.id === activePhoto.id) + 1).padStart(2, '0')} / {String(PROJECT_PHOTOS.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-title text-xl font-bold text-white mb-2 leading-tight">
                  {activePhoto.title}
                </h3>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                      LOCATION &amp; ROUTE
                    </label>
                    <p className="text-xs font-mono text-zinc-300 mt-0.5">
                      {activePhoto.location}
                    </p>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                      CURATORIAL NOTES
                    </label>
                    <p className="text-xs text-zinc-300 font-sans mt-0.5 leading-relaxed">
                      {activePhoto.description}
                    </p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-md border border-white/10 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-yellow-400 font-bold">
                      <Info className="w-3.5 h-3.5" />
                      CINEMA SPECIFICATION
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Aspect Ratio: 3:4 Vertical Frame
                    </p>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Format: Raw Production Exposure
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick thumbnail strip in modal */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  QUICK SELECT
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {PROJECT_PHOTOS.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePhoto(p)}
                      className={`relative w-10 h-13 shrink-0 rounded overflow-hidden border transition-all cursor-pointer ${
                        p.id === activePhoto.id
                          ? 'border-yellow-400 ring-1 ring-yellow-400'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={p.url}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Panoramic Banner Lightbox Modal */}
      {bannerModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setBannerModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#080C16] border border-white/15 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setBannerModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-yellow-400 hover:text-black border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close panorama view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 uppercase tracking-wider mb-1">
                  <Film className="w-3.5 h-3.5" />
                  MASTER PRODUCTION STILL // PANORAMA
                </div>
                <h4 className="font-title text-base sm:text-lg font-bold text-white">
                  Kashmir Winter Expedition Landscape &amp; Convoy Route
                </h4>
              </div>
            </div>

            <div className="p-2 sm:p-4 bg-black flex items-center justify-center overflow-auto max-h-[70vh]">
              <img
                src="https://res.cloudinary.com/x1dci3fh/image/upload/v1791484898/file_0000000037a881f49f7b9d6eb635f2cb.png"
                alt="Production Panorama Full View"
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-md shadow-2xl"
              />
            </div>

            <div className="p-4 bg-[#090D18] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <span>Aspect: 2.5:1 Anamorphic Frame • Chehra Films Production Archive</span>
              <button
                type="button"
                onClick={() => setBannerModalOpen(false)}
                className="px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
              >
                Close Frame
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
