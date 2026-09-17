import React, { useState } from 'react';
import { BENEFITS } from '../data/cinemaData';
import { Clapperboard, ShieldCheck, TrendingUp, Compass, Film, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyJoinSection: React.FC = () => {
  const [activeBenefitIndex, setActiveBenefitIndex] = useState<number>(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Clapperboard':
        return <Clapperboard className="w-5 h-5 text-yellow-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-yellow-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-yellow-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-yellow-400" />;
      case 'Film':
        return <Film className="w-5 h-5 text-yellow-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
    }
  };

  const activeBenefit = BENEFITS[activeBenefitIndex];

  // Orbital positions for 6 nodes on desktop (radius = ~185px)
  const orbitalRadius = 185;

  return (
    <section
      id="why-join"
      className="relative py-12 md:py-16 bg-[#060B14] border-t border-b border-blue-900/40 overflow-hidden"
    >
      {/* Subtle radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <span className="w-6 h-[1.5px] bg-yellow-400" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
              04 / PARTICIPATION & VALUE MODEL
            </span>
            <span className="w-6 h-[1.5px] bg-yellow-400" />
          </div>
          <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
            WHY JOIN THIS FILM?
          </h2>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm font-light max-w-lg mx-auto">
            A radical fusion of real cinema production, uncharted Indian expedition routes, and transparent financial alignment.
          </p>
        </div>

        {/* DESKTOP VIEW: Circular / Orbital Interactive Interface */}
        <div className="hidden lg:block relative h-[460px] max-w-3xl mx-auto">
          {/* Orbital Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px] h-[370px] rounded-full border border-blue-800/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-dashed border-yellow-400/20 pointer-events-none" />

          {/* Central Interactive Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-[#0A1324] border-2 border-yellow-400 shadow-xl shadow-blue-950/70 flex flex-col items-center justify-center p-4 text-center z-20 backdrop-blur-md">
            <span className="text-[9px] font-mono tracking-[0.25em] text-yellow-400 uppercase mb-0.5 font-semibold">
              BENEFIT {activeBenefit.number} / 06
            </span>
            <h3 className="font-title text-base font-bold text-white tracking-wide uppercase mb-1 line-clamp-1">
              {activeBenefit.title}
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed font-light line-clamp-3">
              {activeBenefit.description}
            </p>
            <div className="mt-2 px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/40 text-[9px] font-mono text-yellow-300 uppercase font-semibold">
              {activeBenefit.highlight}
            </div>
          </div>

          {/* 6 Circular Nodes Orbiting Around the Center */}
          {BENEFITS.map((benefit, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * orbitalRadius;
            const y = Math.sin(angle) * orbitalRadius;
            const isActive = activeBenefitIndex === index;

            return (
              <div
                key={benefit.id}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                className="absolute top-1/2 left-1/2 z-30"
              >
                <button
                  type="button"
                  onClick={() => setActiveBenefitIndex(index)}
                  onMouseEnter={() => setActiveBenefitIndex(index)}
                  className={`group relative flex items-center gap-2.5 p-2 rounded-none transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-[#0E1A33] border-yellow-400 text-white shadow-md shadow-yellow-500/20 scale-105'
                      : 'bg-[#0A1324]/90 border-blue-900/50 text-slate-300 hover:border-yellow-400/70 hover:bg-[#0E1E3D]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center border transition-colors shrink-0 ${
                      isActive
                        ? 'border-yellow-400 bg-yellow-400 text-black'
                        : 'border-blue-800/40 bg-blue-950/40 text-yellow-400 group-hover:border-yellow-400'
                    }`}
                  >
                    {isActive ? (
                      React.cloneElement(getIcon(benefit.iconName), { className: 'w-4 h-4 text-black' })
                    ) : (
                      React.cloneElement(getIcon(benefit.iconName), { className: 'w-4 h-4 text-yellow-400' })
                    )}
                  </div>

                  <div className="text-left pr-1.5">
                    <div className="text-[8px] font-mono text-yellow-400 uppercase tracking-widest font-semibold">
                      {benefit.number}
                    </div>
                    <div className="text-[11px] font-title font-bold uppercase tracking-wider text-white whitespace-nowrap">
                      {benefit.title}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* MOBILE & TABLET VIEW: Vertical Interactive Sequence */}
        <div className="lg:hidden space-y-3 max-w-xl mx-auto">
          {BENEFITS.map((benefit, index) => {
            const isActive = activeBenefitIndex === index;

            return (
              <div
                key={benefit.id}
                onClick={() => setActiveBenefitIndex(index)}
                className={`border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-yellow-400 bg-[#0E1A33]'
                    : 'border-blue-900/40 bg-[#0A1324]/80 hover:border-blue-700/60'
                }`}
              >
                <div className="p-3.5 flex items-start gap-3">
                  <div
                    className={`w-8 h-8 shrink-0 flex items-center justify-center border ${
                      isActive
                        ? 'border-yellow-400 bg-yellow-400 text-black'
                        : 'border-blue-800/40 bg-blue-950/40 text-yellow-400'
                    }`}
                  >
                    {isActive ? (
                      React.cloneElement(getIcon(benefit.iconName), { className: 'w-4 h-4 text-black' })
                    ) : (
                      React.cloneElement(getIcon(benefit.iconName), { className: 'w-4 h-4 text-yellow-400' })
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-mono text-yellow-400 uppercase tracking-wider font-semibold">
                        BENEFIT {benefit.number}
                      </span>
                      {benefit.highlight && (
                        <span className="text-[8px] font-mono text-yellow-300 bg-yellow-400/10 px-1.5 py-0.5 border border-yellow-400/30 font-medium">
                          {benefit.highlight}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-title font-bold text-white uppercase tracking-wider mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Disclaimer Box */}
        <div className="mt-8 max-w-3xl mx-auto p-3 bg-[#0A1324]/80 border border-blue-900/50 flex items-start gap-2.5 text-[11px] text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Legal & Transparency Note:</strong> The 100% refund model and revenue participation framework are subject to project terms, defined milestone budgets, and formal bilateral participation agreements executed prior to expedition launch.
          </p>
        </div>
      </div>
    </section>
  );
};
