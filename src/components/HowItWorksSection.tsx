import React, { useState } from 'react';
import { TIMELINE_STEPS } from '../data/cinemaData';
import { ChevronRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section
      id="journey"
      className="relative py-12 md:py-16 bg-[#060B14] border-t border-b border-blue-900/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-6 h-[1.5px] bg-yellow-400" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
                05 / PRODUCTION ROADMAP
              </span>
            </div>
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              HOW IT WORKS
            </h2>
          </div>

          <div className="text-slate-300 text-xs font-mono max-w-xs">
            From the initial casting call to worldwide festival and digital distribution.
          </div>
        </div>

        {/* Desktop Horizontal Cinematic Timeline (6 Steps) */}
        <div className="hidden lg:block relative mb-8">
          {/* Continuous Connecting Line */}
          <div className="absolute top-5 left-10 right-10 h-[2px] bg-blue-900/40 z-0" />
          <div
            className="absolute top-5 left-10 h-[2px] bg-yellow-400 z-0 transition-all duration-500 shadow-sm shadow-yellow-400/50"
            style={{ width: `${(activeStepIndex / 5) * 85}%` }}
          />

          <div className="grid grid-cols-6 gap-3 relative z-10">
            {TIMELINE_STEPS.map((step, index) => {
              const isActive = activeStepIndex === index;
              const isPast = index <= activeStepIndex;

              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
                >
                  {/* Step Node Marker */}
                  <div
                    className={`w-10 h-10 rounded-none flex items-center justify-center font-mono text-xs font-black border transition-all duration-300 ${
                      isActive
                        ? 'bg-yellow-400 border-yellow-300 text-black shadow-md shadow-yellow-500/30 scale-105'
                        : isPast
                        ? 'bg-[#0E1A33] border-yellow-400/80 text-yellow-400'
                        : 'bg-[#060B14] border-blue-900/50 text-slate-400 group-hover:border-yellow-400/60 group-hover:text-white'
                    }`}
                  >
                    {step.step}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-2.5">
                    <span className="font-title text-xs font-bold text-white tracking-wider block uppercase group-hover:text-yellow-400 transition-colors">
                      {step.title}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                      {step.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Feature Box (Desktop) */}
        <div className="hidden lg:block bg-[#0A1324] border border-blue-900/50 p-5 backdrop-blur-md shadow-lg">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-[11px] font-mono text-yellow-400 uppercase tracking-widest mb-1.5 font-semibold">
                <span>PHASE {TIMELINE_STEPS[activeStepIndex].step}</span>
                <span>•</span>
                <span>DURATION: {TIMELINE_STEPS[activeStepIndex].duration}</span>
              </div>
              <h3 className="font-title text-xl font-black text-white tracking-wide uppercase mb-2">
                {TIMELINE_STEPS[activeStepIndex].title} — {TIMELINE_STEPS[activeStepIndex].subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {TIMELINE_STEPS[activeStepIndex].description}
              </p>
            </div>

            <div className="p-3 bg-[#060B14] border border-blue-900/40 text-right min-w-[200px] shrink-0">
              <span className="text-[9px] font-mono text-slate-400 block uppercase">KEY DELIVERABLE</span>
              <span className="text-xs font-bold text-yellow-400 font-mono mt-0.5 block">
                {TIMELINE_STEPS[activeStepIndex].deliverable}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Step Cards Sequence */}
        <div className="lg:hidden space-y-3">
          {TIMELINE_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-3.5 bg-[#0A1324] border border-blue-900/50 relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="font-mono text-xs font-bold text-black bg-yellow-400 px-2 py-0.5">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-title text-sm font-bold text-white uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">
                    {step.subtitle} • {step.duration}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light mt-2 pl-2.5 border-l-2 border-yellow-400">
                {step.description}
              </p>
              <div className="mt-2.5 pt-1.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>DELIVERABLE:</span>
                <span className="text-yellow-400 font-bold">{step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-8 text-center">
          <a
            href="#nomination"
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.2em] text-yellow-400 hover:text-yellow-300 uppercase transition-colors"
          >
            <span>JOIN PHASE 02: OPEN NOMINATIONS</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
