import React, { useState } from 'react';
import { Quote, Compass, ShieldCheck, Maximize2, X, Film, Volume2, Award, Clapperboard } from 'lucide-react';

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
    icon: <Clapperboard className="w-4 h-4 text-yellow-400" />
  },
  {
    title: 'AUTHENTICITY',
    tagline: 'Natural Light & Sonic Truth',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Shot exclusively in natural twilight, midnight campfires, and ambient acoustic field recordings.',
    directorNote:
      'Artificial cinema floods scenes with high-wattage generator lamps. We wait for the golden hour over Spiti’s craggy peaks and film by the flicker of dried pine wood campfires in the sub-zero night. The camera lens breathes with the atmosphere.',
    technicalManifesto:
      'Arri Alexa LF sensor calibrated to ISO 3200 for natural candle and firelight illumination. 3D spatial field audio captures the microtonal whistle of mountain gales.',
    icon: <Compass className="w-4 h-4 text-yellow-400" />
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
    <section id="philosophy" className="relative py-20 md:py-28 bg-[#040813] border-t border-b border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Editorial Section Marker */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-4 h-[1px] bg-yellow-400" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
            08 / MANIFESTO
          </span>
          <span className="w-4 h-[1px] bg-yellow-400" />
        </div>

        <Quote className="w-8 h-8 text-yellow-400/30 mx-auto mb-4" />

        {/* Grand Typography */}
        <h2 className="font-title text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
          WE DON&apos;T JUST FILM INDIA.
        </h2>

        <div className="font-title text-3xl sm:text-4xl md:text-6xl font-black text-yellow-400 tracking-tight uppercase leading-tight mb-8">
          WE EXPERIENCE IT.
        </div>

        {/* Short, high-impact paragraph */}
        <p className="max-w-xl mx-auto text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-12">
          Mainstream cinema simulates life inside soundstages. We strip away artificiality, take real people onto unscripted Indian highways, and let the truth of the journey shape the cinema.
        </p>

        {/* 3 Visual Manifesto Cards: Visuals First, Click to Inspect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {MANIFESTO_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              onClick={() => setActivePillar(pillar)}
              className="group p-6 bg-[#070D1A] border border-white/10 hover:border-yellow-400 transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Header Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400">
                  {pillar.icon}
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-slate-400 group-hover:text-yellow-400 uppercase tracking-wider">
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>READ NOTE</span>
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-yellow-400 font-bold mb-1">
                  {pillar.title}
                </div>
                <h4 className="font-title text-base font-bold text-white uppercase tracking-wide mb-2 group-hover:text-yellow-400 transition-colors">
                  {pillar.tagline}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                  {pillar.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400 group-hover:text-yellow-400 uppercase tracking-widest transition-colors">
                <span>DIRECTOR&apos;S MANIFESTO</span>
                <span className="text-yellow-400">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          INTERIOR MANIFESTO MODAL
         ========================================================================= */}
      {activePillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setActivePillar(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#070D1A] border border-white/20 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-yellow-400 text-black text-[10px] font-mono font-black uppercase tracking-wider">
                  MANIFESTO PILLAR
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  {activePillar.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActivePillar(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Header */}
            <div className="relative h-48 sm:h-56 mb-6 overflow-hidden border border-white/15">
              <img
                src={activePillar.image}
                alt={activePillar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-widest block mb-1">
                  {activePillar.title}
                </span>
                <h3 className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {activePillar.tagline}
                </h3>
              </div>
            </div>

            {/* Director's Note */}
            <div className="mb-6 space-y-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                DIRECTOR&apos;S REFLECTION
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                {activePillar.directorNote}
              </p>
            </div>

            {/* Technical Execution */}
            <div className="p-4 bg-[#050A14] border border-white/10 mb-6">
              <div className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-yellow-400" />
                <span>TECHNICAL & ACOUSTIC MANIFESTO</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {activePillar.technicalManifesto}
              </p>
            </div>

            {/* Modal Bottom Close */}
            <div className="flex items-center justify-end pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActivePillar(null)}
                className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-title font-bold text-xs uppercase tracking-wider"
              >
                CLOSE MANIFESTO
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
