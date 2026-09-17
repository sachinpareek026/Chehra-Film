import React from 'react';
import { CinemaButton } from './CinemaButton';
import { Check } from 'lucide-react';

interface ActorVsParticipantSectionProps {
  onSelectActor: () => void;
  onSelectParticipant: () => void;
}

export const ActorVsParticipantSection: React.FC<ActorVsParticipantSectionProps> = ({
  onSelectActor,
  onSelectParticipant,
}) => {
  return (
    <section id="nomination" className="relative py-12 md:py-16 bg-[#060B14] border-t border-b border-blue-900/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <span className="w-6 h-[1.5px] bg-yellow-400" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
              08 / TWO PATHWAYS OF INVOLVEMENT
            </span>
            <span className="w-6 h-[1.5px] bg-yellow-400" />
          </div>
          <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
            CHOOSE YOUR ROLE ON THE ROAD
          </h2>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm font-light">
            Whether leading a character arc or joining the expedition as a participant, your footprint will be indelibly etched into this film.
          </p>
        </div>

        {/* Split-Screen 50/50 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 border border-blue-900/50 bg-[#0A1324] shadow-xl">
          {/* LEFT: BECOME AN ACTOR */}
          <div className="relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden group border-b lg:border-b-0 lg:border-r border-blue-900/50">
            {/* Background Image with Ambient Warmth */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#0A1324]/85 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="text-[10px] font-mono tracking-[0.2em] text-yellow-400 uppercase mb-2 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <span>PATHWAY 01</span>
              </div>

              {/* Exact user headline requirement */}
              <h3 className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
                BECOME AN ACTOR
              </h3>

              {/* Exact user bullet points */}
              <div className="space-y-2.5 mb-5 text-xs sm:text-sm text-slate-200 font-light">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Step into a character.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Travel with the project.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Become part of the film.</span>
                </div>
              </div>

              <div className="p-3 bg-[#060B14]/90 border border-yellow-400/40 text-[11px] font-mono text-yellow-300 leading-relaxed mb-6">
                ★ Eligible for defined revenue participation share and IMDb featured actor billing.
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <CinemaButton
                id="apply-as-actor-btn"
                variant="primary"
                onClick={onSelectActor}
                className="w-full sm:w-auto !py-2.5 !px-5 text-xs"
              >
                APPLY AS ACTOR
              </CinemaButton>
            </div>
          </div>

          {/* RIGHT: BECOME A PARTICIPANT */}
          <div className="relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden group">
            {/* Background Image with Cool Blue/Slate Tones */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#0A1324]/85 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase mb-2 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>PATHWAY 02</span>
              </div>

              {/* Exact user headline requirement */}
              <h3 className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
                BECOME A PARTICIPANT
              </h3>

              {/* Exact user bullet points */}
              <div className="space-y-2.5 mb-5 text-xs sm:text-sm text-slate-200 font-light">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Travel with the filmmaking journey.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Experience the locations.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Become part of something created along the way.</span>
                </div>
              </div>

              <div className="p-3 bg-[#060B14]/90 border border-blue-500/40 text-[11px] font-mono text-blue-300 leading-relaxed mb-6">
                ★ 100% eligible contribution refund proposed model once project revenues are achieved.
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <CinemaButton
                id="join-as-participant-btn"
                variant="secondary"
                onClick={onSelectParticipant}
                className="w-full sm:w-auto !py-2.5 !px-5 text-xs"
              >
                JOIN AS PARTICIPANT
              </CinemaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
