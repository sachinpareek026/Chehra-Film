import React, { useState } from 'react';
import { Compass, Users, Camera, Clapperboard, Sparkles, Maximize2, X, Check, MapPin } from 'lucide-react';

interface PillarDetail {
  icon: React.ReactNode;
  tag: string;
  title: string;
  desc: string;
  image: string;
  deepDive: string;
  protocols: string[];
}

export const IntroductionSection: React.FC = () => {
  const [inspectedPillar, setInspectedPillar] = useState<PillarDetail | null>(null);

  const stats = [
    { value: '2,400+', unit: 'KM', label: 'High-Altitude Route', sub: 'Himalayas to Thar' },
    { value: '12', unit: 'ROLES', label: 'Casting Call', sub: '100% Refundable Deposit' },
    { value: '₹1,000', unit: 'TOKEN', label: 'Early Price Lock', sub: 'Save ₹1,500 before Oct 30' },
    { value: '2.39:1', unit: 'SCOPE', label: 'Anamorphic 4K', sub: 'Natural Light & Sound' },
  ];

  const pillars: PillarDetail[] = [
    {
      icon: <Compass className="w-5 h-5 text-yellow-400" />,
      tag: '01 / ROUTE',
      title: 'Unscripted Terrain',
      desc: 'Delhi • Manali • Spiti Valley • Kinnaur • Jaisalmer. 28 days on open highways.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      deepDive:
        'A continuous overland odyssey traversing sub-zero 13,000 ft Himalayan mountain passes down to the shifting sand dunes of the Thar desert. The route is not a backdrop; its altitude, weather, and physical isolation directly force honest character reactions.',
      protocols: [
        'Real-time convoy routing adjusting for sudden landslides & snowstorms',
        'Direct integration of roadside dhabas and local village encounters',
        'Zero soundstage or simulated green-screen filming'
      ]
    },
    {
      icon: <Users className="w-5 h-5 text-yellow-400" />,
      tag: '02 / ENSEMBLE',
      title: 'Real People As Cast',
      desc: 'Actors & participants travel together. Chemistry unfolds in natural motion.',
      image: '/characters/vandana.jpg',
      deepDive:
        'Selected lead characters and non-actor expedition participants live in identical conditions throughout the journey. Shared campfires, late-night roadside repairs, and morning chai dissolve rehearsed facades into genuine human camaraderie.',
      protocols: [
        'Ensemble cast travels together in shared expedition vehicles',
        'Spontaneous interactions recorded without rehearsals or retakes',
        'Safe, professional production protocols with 100% security deposit guarantee'
      ]
    },
    {
      icon: <Camera className="w-5 h-5 text-yellow-400" />,
      tag: '03 / CINEMA',
      title: 'Auteur Road Realism',
      desc: 'No green screens or fake soundstages. India itself becomes the co-director.',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
      deepDive:
        'Captured using Arri Alexa LF cinema cameras fitted with anamorphic prime lenses. Every scene relies strictly on natural twilight, bonfire flickers, and ambient acoustics—delivering a visceral, painterly quality that commercial sets cannot replicate.',
      protocols: [
        'Anamorphic 2.39:1 CinemaScope aspect ratio for monumental scale',
        'Field-recorded Dolby Atmos 3D soundscapes and microtonal instruments',
        'Minimalist camera footprint allowing characters total movement freedom'
      ]
    },
    {
      icon: <Clapperboard className="w-5 h-5 text-yellow-400" />,
      tag: '04 / RELEASE',
      title: 'Global Festival Run',
      desc: 'IMDb official credentials, premiere festival circuits, and worldwide digital release.',
      image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1000&q=80',
      deepDive:
        'Chehra is positioned for competitive entry into top international indie film festivals before a global digital premiere. Every verified actor and expedition contributor receives authenticated digital credentials and theatrical credit.',
      protocols: [
        'Official IMDb profile billing as lead cast or expedition contributor',
        'Invitations to red-carpet theatrical festival premieres',
        'Long-tail revenue participation for eligible lead performers'
      ]
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 bg-[#040813] border-t border-b border-white/10 overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-yellow-400" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
                01 / THE EXPERIMENTAL EXPEDITION
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
              A ROAD EXPEDITION <br />
              <span className="text-yellow-400">THAT BECOMES CINEMA.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-slate-300 font-light leading-relaxed border-l border-white/15 pl-4">
            India’s first unscripted narrative feature. We strip away artificial studios, taking 6 lead characters and an intimate convoy across India’s wildest mountain roads.
          </p>
        </div>

        {/* Editorial Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-[#070D1A] border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group"
            >
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white group-hover:text-yellow-400 transition-colors">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-widest">
                  {stat.unit}
                </span>
              </div>
              <div className="text-xs font-title font-bold uppercase tracking-wider text-slate-200">
                {stat.label}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Sleek Visual Pillars: Clean Exterior, Click to Inspect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => setInspectedPillar(pillar)}
              className="p-6 bg-[#070D1A] border border-white/10 hover:border-yellow-400 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xl relative overflow-hidden"
            >
              {/* Subtle top visual strip */}
              <div className="relative h-28 -mx-6 -mt-6 mb-4 overflow-hidden bg-black">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105 brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-[#070D1A]/50 to-transparent" />

                <div className="absolute top-3 left-3">
                  <div className="p-2 bg-black/80 border border-white/20 backdrop-blur-md">
                    {pillar.icon}
                  </div>
                </div>

                <div className="absolute bottom-2 right-3">
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-slate-300 group-hover:text-yellow-400 uppercase tracking-wider">
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>INSPECT</span>
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[9px] font-mono tracking-widest text-yellow-400 uppercase font-bold mb-1">
                  {pillar.tag}
                </div>
                <h3 className="font-title text-base font-bold text-white uppercase tracking-wide mb-2 group-hover:text-yellow-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-2">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400 group-hover:text-yellow-400 uppercase tracking-widest transition-colors">
                <span>VIEW DOSSIER</span>
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          INTERIOR PILLAR DOSSIER MODAL
         ========================================================================= */}
      {inspectedPillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setInspectedPillar(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#070D1A] border border-white/20 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-yellow-400 text-black text-[10px] font-mono font-black uppercase tracking-wider">
                  {inspectedPillar.tag}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  EXPEDITION ARCHITECTURE
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectedPillar(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Hero */}
            <div className="relative h-48 sm:h-56 mb-6 overflow-hidden border border-white/15">
              <img
                src={inspectedPillar.image}
                alt={inspectedPillar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {inspectedPillar.title}
                </h3>
              </div>
            </div>

            {/* Narrative Deep Dive */}
            <div className="mb-6 space-y-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                PHILOSOPHICAL & OPERATIONAL CORE
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                {inspectedPillar.deepDive}
              </p>
            </div>

            {/* Production Protocols */}
            <div className="p-5 bg-[#09101F] border border-white/10 mb-6">
              <div className="text-xs font-mono text-yellow-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>EXPEDITION PROTOCOLS</span>
              </div>
              <ul className="space-y-3">
                {inspectedPillar.protocols.map((proto, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-1.5" />
                    <span>{proto}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Bottom Close */}
            <div className="flex items-center justify-end pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setInspectedPillar(null)}
                className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-title font-bold text-xs uppercase tracking-wider"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
