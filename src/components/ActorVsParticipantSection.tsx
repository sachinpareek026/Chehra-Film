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
    <section id="nomination" className="relative py-20 md:py-24 bg-[#05070B] border-t border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-yellow-400/90" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400/90 uppercase">
              TWO PATHWAYS OF INVOLVEMENT
            </span>
            <span className="w-6 h-[1px] bg-yellow-400/90" />
          </div>
          <h2 className="font-title text-2xl sm:text-3xl md:text-4xl text-[#F4F1EA] tracking-[0.02em] uppercase leading-[1.18] font-semibold">
            CHOOSE YOUR ROLE ON THE ROAD
          </h2>
          <p className="mt-3 text-[#B8B4AC] text-xs sm:text-sm font-normal font-sans max-w-xl mx-auto leading-relaxed">
            Whether leading an unscripted character arc or joining the expedition caravan as a traveler, your presence is captured in the fabric of this film.
          </p>
        </div>

        {/* Split-Screen 50/50 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-[#070B12]">
          {/* LEFT: BECOME AN ACTOR */}
          <div className="relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden group border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Subtle Textured Background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700 filter grayscale"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#070B12]/90 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="text-[10px] font-sans font-semibold tracking-[0.14em] text-yellow-400/90 uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/90" />
                <span>PATHWAY 01</span>
              </div>

              <h3 className="font-title text-2xl sm:text-3xl text-[#F4F1EA] tracking-[0.02em] mb-5 font-semibold">
                BECOME AN ACTOR
              </h3>

              <div className="space-y-3 mb-8 text-xs sm:text-sm text-[#B8B4AC] font-normal font-sans">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 border border-yellow-400/50 flex items-center justify-center text-yellow-400/90 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Step into a defined character persona.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 border border-yellow-400/50 flex items-center justify-center text-yellow-400/90 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Travel with the directorial unit across raw terrain.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 border border-yellow-400/50 flex items-center justify-center text-yellow-400/90 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>100% refundable security deposit post-release upon cost recovery.</span>
                </div>
              </div>

              <div className="p-3.5 bg-white/[0.02] border border-white/10 text-[11px] font-sans text-[#B8B4AC] leading-relaxed mb-8">
                ★ 100% post-release deposit refund assurance • Official IMDb actor page credit • Festival delegation pass.
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <CinemaButton
                id="apply-as-actor-btn"
                variant="primary"
                onClick={onSelectActor}
                className="w-full sm:w-auto"
              >
                APPLY AS ACTOR
              </CinemaButton>
            </div>
          </div>

          {/* RIGHT: BECOME A PARTICIPANT */}
          <div className="relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700 filter grayscale"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#070B12]/90 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="text-[10px] font-sans font-semibold tracking-[0.14em] text-yellow-400/90 uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/90" />
                <span>PATHWAY 02</span>
              </div>

              <h3 className="font-title text-2xl sm:text-3xl text-[#F4F1EA] tracking-[0.02em] mb-5 font-semibold">
                BECOME A PARTICIPANT
              </h3>

              <div className="space-y-3 mb-8 text-xs sm:text-sm text-[#B8B4AC] font-normal font-sans">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 border border-yellow-400/50 flex items-center justify-center text-yellow-400/90 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Travel with the filmmaking journey across Kashmir.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 border border-yellow-400/50 flex items-center justify-center text-yellow-400/90 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Gulmarg Ski 2-Day Certificate Course under Experts Training Program.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 border border-yellow-400/50 flex items-center justify-center text-yellow-400/90 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>₹2,000 token today; ₹13,000 early bird (₹14,500 after 20 Nov).</span>
                </div>
              </div>

              <div className="p-3.5 bg-white/[0.02] border border-white/10 text-[11px] font-sans text-[#B8B4AC] leading-relaxed mb-8">
                ★ Includes 7 nights / 8 days travel, stays in Katra, Gulmarg & Dal Lake houseboat, and Gulmarg Ski 2-day certificate course.
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <CinemaButton
                id="join-as-participant-btn"
                variant="secondary"
                onClick={onSelectParticipant}
                className="w-full sm:w-auto"
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
