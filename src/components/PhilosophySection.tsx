import React from 'react';
import { Quote, Sparkles, Compass } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="about" className="relative py-12 md:py-16 bg-[#060B14] border-t border-b border-blue-900/40 overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Editorial Section Marker */}
        <div className="inline-flex items-center gap-2.5 mb-4">
          <span className="w-6 h-[1.5px] bg-yellow-400" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
            07 / MANIFESTO & ARTISTIC ETHOS
          </span>
          <span className="w-6 h-[1.5px] bg-yellow-400" />
        </div>

        <Quote className="w-8 h-8 text-yellow-400/30 mx-auto mb-3" />

        {/* Large Typography: Exact prompt requirement */}
        <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-1">
          WE DON&apos;T WANT TO JUST FILM INDIA.
        </h2>

        <div className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400 tracking-tight uppercase leading-tight mb-6">
          WE WANT TO EXPERIENCE IT.
        </div>

        {/* Supporting Paragraph Explaining Experimental Travel Filmmaking */}
        <div className="max-w-2xl mx-auto space-y-3 text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
          <p>
            Mainstream cinema builds soundstages to simulate life. We do the opposite: we strip away artificiality, take a lean crew and authentic individuals onto unscripted Indian highways, and let the unpredictability of the journey shape the drama.
          </p>

          <p className="text-slate-400 text-xs leading-relaxed">
            When our caravan crosses a cloudburst in Himachal, or arrives at a forgotten desert temple at 3 AM, that raw sensory truth enters the script. Travel becomes the camera’s co-director. The emotions captured on screen are lived in real time by the cast and participants who dared to set out on the road.
          </p>
        </div>

        {/* Philosophy Core Pillars */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 bg-[#0A1324] border border-blue-900/50">
            <div className="flex items-center gap-1.5 text-yellow-400 text-[11px] font-mono tracking-widest uppercase mb-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>RADICAL SPONTANEITY</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-body">
              Every morning’s shooting itinerary responds directly to local weather, highway encounters, and genuine character evolution.
            </p>
          </div>

          <div className="p-4 bg-[#0A1324] border border-blue-900/50">
            <div className="flex items-center gap-1.5 text-yellow-400 text-[11px] font-mono tracking-widest uppercase mb-1.5 font-semibold">
              <Compass className="w-3.5 h-3.5 text-yellow-400" />
              <span>NATURAL LIGHT & SOUND</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-body">
              Shooting during twilight, dawn, and midnight fires using prime high-speed lenses and binaural field acoustic microphones.
            </p>
          </div>

          <div className="p-4 bg-[#0A1324] border border-blue-900/50">
            <div className="flex items-center gap-1.5 text-yellow-400 text-[11px] font-mono tracking-widest uppercase mb-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>TRANSPARENT REVENUE</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-body">
              A community-first cinema architecture with 100% contribution refund intent and direct lead-actor revenue participation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
