import React, { useState } from 'react';
import { Compass, Users, Camera, Clapperboard, ChevronRight, Maximize2, X, Check } from 'lucide-react';

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
    { value: '2,400+', unit: 'KM', label: 'Overland Route', sub: 'Himalayas to the Great Indian Desert' },
    { value: '06', unit: 'ROLES', label: 'Unscripted Characters', sub: '100% Refundable Security Deposit' },
    { value: '₹2,000', unit: 'TOKEN', label: 'Expedition Lock', sub: 'Secures Seat & Contributor Credit' },
    { value: '2.39:1', unit: 'SCOPE', label: 'Anamorphic 4K', sub: 'Natural Light & Environmental Audio' },
  ];

  const pillars: PillarDetail[] = [
    {
      icon: <Compass className="w-4 h-4 text-yellow-400/90" />,
      tag: '01 / TERRAIN',
      title: 'Unscripted Route',
      desc: 'Delhi • Katra • Gulmarg • Srinagar • Spiti • Thar. 28 days of uninterrupted road travel.',
      image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957420/Travel_india.jpg',
      deepDive:
        'A continuous overland odyssey traversing sub-zero 13,000-foot Himalayan mountain passes down to the shifting sand dunes of the Thar desert. The route is not a scenic backdrop; its altitude, weather, and physical isolation directly evoke genuine character reactions.',
      protocols: [
        'Real-time convoy routing responding to mountain passes and seasonal conditions',
        'Direct integration of roadside dhabas and local village encounters',
        'Zero soundstage or simulated green-screen filming'
      ]
    },
    {
      icon: <Users className="w-4 h-4 text-yellow-400/90" />,
      tag: '02 / ENSEMBLE',
      title: 'Real People As Cast',
      desc: 'Actors & participants travel together. Chemistry unfolds in natural motion.',
      image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957432/Rahul.png',
      deepDive:
        'Selected lead characters and non-actor expedition participants live in identical conditions throughout the journey. Shared campfires, late-night roadside halts, and morning tea dissolve rehearsed facades into genuine human camaraderie.',
      protocols: [
        'Ensemble cast travels together in shared expedition vehicles',
        'Spontaneous interactions recorded without artificial retakes',
        'Safe, professional production protocols with 100% security deposit guarantee'
      ]
    },
    {
      icon: <Camera className="w-4 h-4 text-yellow-400/90" />,
      tag: '03 / CINEMA',
      title: 'Auteur Road Realism',
      desc: 'No green screens or fake soundstages. India itself becomes the co-director.',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
      deepDive:
        'Captured using Arri Alexa LF cinema cameras fitted with anamorphic prime lenses. Every scene relies strictly on natural twilight, bonfire flickers, and ambient acoustics—delivering a visceral, painterly quality that commercial sets cannot replicate.',
      protocols: [
        'Anamorphic 2.39:1 CinemaScope aspect ratio for monumental scale',
        'Field-recorded Dolby Atmos 3D soundscapes and ambient mountain acoustics',
        'Minimalist camera footprint allowing characters total movement freedom'
      ]
    },
    {
      icon: <Clapperboard className="w-4 h-4 text-yellow-400/90" />,
      tag: '04 / RELEASE',
      title: 'Global Festival Run',
      desc: 'IMDb official credentials, premiere festival circuits, and worldwide digital release.',
      image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957412/Show.jpg',
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
      className="relative py-24 md:py-32 bg-[#080C14] border-t border-white/[0.08] text-[#EDE8DF]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400/90 uppercase font-medium">
                01 // THE EXPEDITION
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#A5A196] uppercase">
                DIRECTOR&apos;S NOTE
              </span>
            </div>
            <h2 className="font-title text-[47px] leading-[53.2px] font-bold text-[#EDE8DF] tracking-tight uppercase">
              India&apos;s 1st <br />
              <span className="text-yellow-400/90">Experimental Travel Cinema Project</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#A5A196] font-light leading-relaxed border-l border-white/15 pl-4">
            India&apos;s first unscripted narrative feature. We strip away artificial studios, taking 7 lead characters and an intimate convoy across India&apos;s wildest mountain roads.
          </p>
        </div>

        {/* Editorial Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-[#0C111A] border border-white/10 hover:border-yellow-400/50 transition-colors group"
            >
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-title text-2xl sm:text-3xl md:text-4xl font-normal text-[#EDE8DF] group-hover:text-yellow-400/90 transition-colors">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono text-yellow-400/90 font-medium uppercase tracking-widest">
                  {stat.unit}
                </span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#EDE8DF]">
                {stat.label}
              </div>
              <div className="text-[10px] font-mono text-[#68665E] mt-1">
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
              className="p-5 bg-[#0C111A] border border-white/10 hover:border-yellow-400/90 transition-colors flex flex-col justify-between group cursor-pointer relative"
            >
              {/* Top image thumbnail */}
              <div className="relative h-48 sm:h-52 -mx-5 -mt-5 mb-4 overflow-hidden bg-black">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-105 brightness-90 group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <div className="p-2 bg-black/80 border border-white/15">
                    {pillar.icon}
                  </div>
                </div>

                <div className="absolute bottom-2 right-3">
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-[#A5A196] group-hover:text-yellow-400/90 uppercase tracking-wider">
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>DOSSIER</span>
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[9px] font-mono tracking-widest text-yellow-400/90 uppercase font-medium mb-1">
                  {pillar.tag}
                </div>
                <h3 className="font-title text-sm sm:text-base font-normal text-[#EDE8DF] uppercase tracking-wide mb-2 group-hover:text-yellow-400/90 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#A5A196] font-light leading-relaxed line-clamp-2">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#68665E] group-hover:text-yellow-400/90 uppercase tracking-widest transition-colors">
                <span>VIEW PROTOCOLS</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar Dossier Modal */}
      {inspectedPillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setInspectedPillar(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0E16] border border-white/20 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-yellow-400/90 text-black text-[10px] font-mono font-medium uppercase tracking-wider">
                  {inspectedPillar.tag}
                </span>
                <span className="text-xs font-mono text-[#A5A196] uppercase tracking-widest">
                  EXPEDITION ARCHITECTURE
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectedPillar(null)}
                className="p-1.5 text-[#A5A196] hover:text-white transition-colors cursor-pointer"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Hero */}
            <div className="relative h-56 sm:h-64 mb-6 overflow-hidden border border-white/15">
              <img
                src={inspectedPillar.image}
                alt={inspectedPillar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E16] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-title text-2xl sm:text-3xl font-normal text-[#EDE8DF] uppercase tracking-tight">
                  {inspectedPillar.title}
                </h3>
              </div>
            </div>

            {/* Narrative Deep Dive */}
            <div className="mb-6 space-y-2">
              <div className="text-[10px] font-mono text-[#A5A196] uppercase tracking-widest font-medium">
                PHILOSOPHICAL & OPERATIONAL CORE
              </div>
              <p className="text-xs sm:text-sm text-[#EDE8DF] leading-relaxed font-light">
                {inspectedPillar.deepDive}
              </p>
            </div>

            {/* Production Protocols */}
            <div className="p-5 bg-[#0E1420] border border-white/10 mb-6">
              <div className="text-xs font-mono text-yellow-400/90 font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>EXPEDITION PROTOCOLS</span>
              </div>
              <ul className="space-y-3">
                {inspectedPillar.protocols.map((proto, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#A5A196] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/90 shrink-0 mt-1.5" />
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
                className="px-6 py-2.5 bg-yellow-400/90 hover:bg-yellow-300/90 text-black font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                CLOSE DOSSIER →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

