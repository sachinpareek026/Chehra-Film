import React, { useState } from 'react';
import { Compass, ShieldCheck, Maximize2, X, Film, Clapperboard } from 'lucide-react';

interface ManifestoPillar {
  title: string;
  tagline: string;
  image: string;
  excerpt: string;
  directorNote: string;
  technicalManifesto: string;
  icon: React.ReactNode;
}

const MANIFESTO_PILLARS: ManifestoPillar[] = [
  {
    title: 'SPONTANEITY',
    tagline: 'The Highway As Screenwriter',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Itineraries adapt to dawn mist, roadside chai stalls, and natural character chemistry.',
    directorNote:
      'We do not write manufactured dialogue in quiet metropolitan rooms. The road introduces dust, puncture delays, unexpected rainstorms, and accidental encounters with village elders. In Chehra, these are not interruptions—they are the turning points of the narrative.',
    technicalManifesto:
      'Continuous rolling cameras with dual audio boom mics capture dialogue in raw ambient environments without synthetic acoustic studio looping (ADR).',
    icon: <Clapperboard className="w-4 h-4 text-yellow-400/90" />
  },
  {
    title: 'AUTHENTICITY',
    tagline: 'Natural Light & Sonic Truth',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Shot exclusively in natural twilight, midnight campfires, and ambient acoustic field recordings.',
    directorNote:
      'Artificial cinema floods scenes with high-wattage generator lamps. We wait for the golden hour over mountain peaks and film by the flicker of dried pine wood campfires in the sub-zero night. The camera lens breathes with the atmosphere.',
    technicalManifesto:
      'Large format cinema sensor calibrated for natural candle and firelight illumination. Spatial audio field recorders capture the microtonal whistle of mountain gales.',
    icon: <Compass className="w-4 h-4 text-yellow-400/90" />
  },
  {
    title: 'TRANSPARENCY',
    tagline: 'Artist Alignment & Direct Honor',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Community-first cinema alignment with 100% refund eligibility for lead character contributors.',
    directorNote:
      'For decades, independent cinema has suffered from opaque auditions, hidden casting fees, and unfulfilled promises. Chehra establishes an unshakeable ethical code: zero audition charges, a 100% security deposit reimbursement upon shoot wrap, and permanent IMDb credentials.',
    technicalManifesto:
      'Formal written agreements executed prior to convoy departure, guaranteeing legal safety, financial clarity, and verifiable digital festival credits.',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />
  }
];

export const PhilosophySection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<ManifestoPillar | null>(null);

  return (
    <section id="philosophy" className="relative py-24 md:py-32 bg-[#090D15] border-t border-white/[0.08] text-[#EDE8DF] overflow-hidden">
      {/* Background Video with 70% opacity */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
          src="https://res.cloudinary.com/x1dci3fh/video/upload/v1788120738/AQMBbpZw0O27IfOX0FfiwjYewf9od743cEPsbx7NeMCl2TTnHx6WX-iF-tKwCPhKGLymGw_0P8LS0TdAIe8p1z0.mp4"
        />
        {/* Cinematic subtle edge fade overlays to harmonize with neighboring sections */}
        <div className="absolute inset-0 bg-[#090D15]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090D15] via-transparent to-[#090D15] pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Editorial Section Marker */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400/90 uppercase font-medium">
            04 // CINEMATIC MANIFESTO
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#A5A196] uppercase">
            DIRECTOR&apos;S CODE
          </span>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-title not-italic text-3xl sm:text-4xl md:text-[42px] leading-[1.18] font-bold text-[#F4F1EA] tracking-[0.02em] uppercase max-w-3xl mx-auto">
          WE DO NOT MERELY FILM INDIA. <br />
          <span className="text-yellow-400/90 not-italic">WE IMMERSE WITHIN IT.</span>
        </h2>

        {/* High-impact narrative */}
        <p className="max-w-2xl mx-auto text-[#B8B4AC] text-xs sm:text-sm font-normal font-sans leading-[1.65] mt-6 mb-14">
          Mainstream cinema simulates life inside soundstages. We strip away artificiality, take real people onto unscripted Indian highways, and let the truth of the journey shape the cinema.
        </p>

        {/* 3 Visual Manifesto Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {MANIFESTO_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              onClick={() => setActivePillar(pillar)}
              className="group p-6 bg-[#0C111A] border border-white/10 hover:border-yellow-400/90 transition-colors duration-300 cursor-pointer relative flex flex-col justify-between"
            >
              {/* Header Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="p-2.5 bg-white/[0.03] border border-white/10 text-yellow-400/90">
                  {pillar.icon}
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] font-sans font-semibold text-[#B8B4AC] group-hover:text-yellow-400/90 uppercase tracking-[0.14em] transition-colors">
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>NOTE</span>
                </span>
              </div>

              <div>
                <div className="text-[10px] font-sans uppercase tracking-[0.14em] text-yellow-400/90 font-semibold mb-1">
                  {pillar.title}
                </div>
                <h3 className="font-title text-base font-semibold text-[#F4F1EA] uppercase tracking-[0.02em] mb-2 group-hover:text-yellow-400/90 transition-colors">
                  {pillar.tagline}
                </h3>
                <p className="text-xs text-[#B8B4AC] leading-[1.6] font-normal font-sans line-clamp-2">
                  {pillar.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#68665E] group-hover:text-yellow-400/90 uppercase tracking-widest transition-colors">
                <span>DIRECTOR&apos;S DOSSIER</span>
                <span className="text-yellow-400/90">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERIOR MANIFESTO MODAL */}
      {activePillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setActivePillar(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0E16] border border-white/20 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-yellow-400/90 text-black text-[10px] font-mono font-medium uppercase tracking-wider">
                  MANIFESTO PILLAR
                </span>
                <span className="text-xs font-mono text-[#A5A196] uppercase tracking-widest">
                  {activePillar.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActivePillar(null)}
                className="p-1.5 text-[#A5A196] hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Header - Dark Blue Transparent, No Text Inside */}
            <div className="relative h-48 sm:h-56 mb-5 overflow-hidden border border-white/10 bg-[#020817]">
              <img
                src={activePillar.image}
                alt={activePillar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-110 opacity-50"
              />
              <div className="absolute inset-0 bg-[#030d29]/70 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-blue-950/50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E16] via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="mb-6">
              <span className="text-[10px] font-mono text-yellow-400/90 font-medium uppercase tracking-widest block mb-1">
                {activePillar.title}
              </span>
              <h3 className="font-title text-2xl sm:text-3xl font-normal text-[#EDE8DF] uppercase tracking-tight">
                {activePillar.tagline}
              </h3>
            </div>

            {/* Director's Note */}
            <div className="mb-6 space-y-2">
              <div className="text-[10px] font-mono text-[#A5A196] uppercase tracking-widest font-medium">
                DIRECTOR&apos;S REFLECTION
              </div>
              <p className="text-xs sm:text-sm text-[#EDE8DF]/90 leading-relaxed font-light">
                {activePillar.directorNote}
              </p>
            </div>

            {/* Technical Execution */}
            <div className="p-4 bg-[#0C111A] border border-white/10 mb-6">
              <div className="text-[10px] font-mono text-yellow-400/90 font-medium uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-yellow-400/90" />
                <span>TECHNICAL & ACOUSTIC MANIFESTO</span>
              </div>
              <p className="text-xs text-[#A5A196] font-light leading-relaxed">
                {activePillar.technicalManifesto}
              </p>
            </div>

            {/* Modal Bottom Close */}
            <div className="flex items-center justify-end pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActivePillar(null)}
                className="px-6 py-2.5 bg-yellow-400/90 hover:bg-yellow-300/90 text-black font-medium text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                CLOSE MANIFESTO →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

