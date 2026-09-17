import React from 'react';
import { Camera, MapPin, Users, Clapperboard } from 'lucide-react';

export const IntroductionSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-12 md:py-16 bg-[#060B14] border-t border-b border-blue-900/40 overflow-hidden"
    >
      {/* Ambient background glow & subtle textures */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Marker */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-6 h-[1.5px] bg-yellow-400" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
            01 / MANIFESTO & ORIGIN
          </span>
        </div>

        {/* Primary and Secondary Headlines */}
        <div className="max-w-3xl">
          <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-yellow-400 mb-1.5">
            THIS IS NOT JUST A FILM.
          </h2>
          <h3 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-6">
            IT IS A JOURNEY THAT BECOMES CINEMA.
          </h3>
        </div>

        {/* 12-Column Grid for Editorial Text & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Paragraphs */}
          <div className="lg:col-span-7 space-y-3.5 text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
            <p className="border-l-2 border-yellow-400 pl-4 text-white/95 text-sm sm:text-base font-normal">
              Chehra Films is an experimental travel filmmaking initiative by Parindaa Travels, created to bring travel, storytelling and cinema together in one immersive experience.
            </p>
            <p className="text-slate-400 pl-4 leading-relaxed">
              Instead of building a film entirely inside studios and sets, the project takes its participants into real landscapes, real journeys and real experiences across India — allowing the journey itself to become part of the film.
            </p>
            <p className="text-slate-400 pl-4 leading-relaxed">
              Every turn of the road is unscripted; every dawn encounter on the ghats or high mountain pass is captured in raw 35mm grain. The people on this trip are not mere extras—they are the pulse and fabric of an unrepeatable cinematic creation.
            </p>
          </div>

          {/* Editorial Visual Pillar Block */}
          <div className="lg:col-span-5 border border-blue-900/50 bg-[#0A1324]/80 p-5 backdrop-blur-sm shadow-lg">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center justify-between border-b border-blue-900/40 pb-2">
              <span>CORE FORMULA</span>
              <span className="text-yellow-400 font-bold">EXPERIMENTAL VOL. I</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#060B14]/80 border border-blue-900/40 group hover:border-yellow-400/60 transition-colors">
                <MapPin className="w-4 h-4 text-yellow-400 mb-1.5" />
                <div className="text-[11px] uppercase font-title font-bold text-white tracking-wider">TRAVEL</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">4 States • 28 Days</div>
              </div>
              <div className="p-3 bg-[#060B14]/80 border border-blue-900/40 group hover:border-yellow-400/60 transition-colors">
                <Users className="w-4 h-4 text-yellow-400 mb-1.5" />
                <div className="text-[11px] uppercase font-title font-bold text-white tracking-wider">PEOPLE</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">Real Personalities</div>
              </div>
              <div className="p-3 bg-[#060B14]/80 border border-blue-900/40 group hover:border-yellow-400/60 transition-colors">
                <Camera className="w-4 h-4 text-yellow-400 mb-1.5" />
                <div className="text-[11px] uppercase font-title font-bold text-white tracking-wider">STORY</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">Improvised Arcs</div>
              </div>
              <div className="p-3 bg-[#060B14]/80 border border-blue-900/40 group hover:border-yellow-400/60 transition-colors">
                <Clapperboard className="w-4 h-4 text-yellow-400 mb-1.5" />
                <div className="text-[11px] uppercase font-title font-bold text-white tracking-wider">CINEMA</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">35mm & 4K Scope</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-900/40 text-[10px] text-slate-400 flex items-center justify-between font-mono">
              <span>PRODUCER</span>
              <span className="text-yellow-400 font-bold">Parindaa Travels</span>
            </div>
          </div>
        </div>

        {/* Display Banner: TRAVEL × PEOPLE × STORY × CINEMA */}
        <div className="mt-8 pt-6 border-t border-blue-900/40">
          <div className="flex flex-wrap items-center justify-between gap-3 py-3.5 px-5 bg-gradient-to-r from-blue-950/60 via-[#0A1324] to-[#060B14] border border-blue-800/40">
            <span className="font-title text-base sm:text-xl md:text-2xl font-black tracking-wider text-white uppercase">
              TRAVEL <span className="text-yellow-400">×</span> PEOPLE <span className="text-yellow-400">×</span> STORY <span className="text-yellow-400">×</span> CINEMA
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-yellow-400 uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
              <span>THE FORMULA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
