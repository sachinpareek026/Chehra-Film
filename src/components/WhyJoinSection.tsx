import React, { useState } from 'react';
import { BENEFITS } from '../data/cinemaData';
import {
  Clapperboard,
  ShieldCheck,
  TrendingUp,
  Compass,
  Film,
  Award,
  ArrowUpRight,
  Maximize2,
  X,
  Check
} from 'lucide-react';

interface BenefitDetailedInfo {
  legalClause: string;
  deliverables: string[];
  operationalMechanism: string;
  quote: string;
  visualImage: string;
}

const BENEFIT_EXTENDED_DATA: Record<string, BenefitDetailedInfo> = {
  b1: {
    legalClause: 'Section 4.1 (On-Location Filming Protocol): No artificial soundstage simulations. All scenes captured on location with authentic acoustic and optical lighting.',
    deliverables: [
      'Multi-camera 4K anamorphic setups during real transit',
      'Ambient natural lighting in high-altitude terrain',
      'Unscripted character dialogues captured live on field mics'
    ],
    operationalMechanism: 'Direct integration of real road conditions, local chai stall stops, and atmospheric mountain weather directly into the narrative script.',
    quote: 'The terrain does not wait for a second take; life unfolds at 60 frames per second.',
    visualImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80'
  },
  b2: {
    legalClause: 'Section 8.3 (Actor Deposit Refund Assurance): Confident estimation and full production assurity that 100% of the actor deposit is refunded upon post-release production cost recovery.',
    deliverables: [
      'Direct bank wire refund within 14 days of achieving cost-recovery milestone',
      'Written production assurance agreement countersigned before convoy rollout',
      'Zero audition, screening, or talent agency deduction'
    ],
    operationalMechanism: 'Post-release cost recovery model designed to sponsor the actors\' trip bare minimum and refund 100% of deposits as the film achieves commercial success.',
    quote: 'Artistic talent should be protected, respected, and fully reimbursed as our film hits commercial milestones.',
    visualImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80'
  },
  b3: {
    legalClause: 'Section 11.2 (Long-Tail Revenue Participation): Eligible lead actors and contributors receive fractional revenue sharing across international streaming OTT licenses and festival sales.',
    deliverables: [
      'Documented revenue participation agreement',
      'Quarterly royalty distribution statements post-release',
      'Direct attribution across international digital sales'
    ],
    operationalMechanism: 'Equitable profit alignment sharing cinematic upside with the actual faces seen on screen.',
    quote: 'When the film succeeds globally, the artists who brought it to life share in the harvest.',
    visualImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957419/Win_win_case_-_Revenue_participation.jpg'
  },
  b4: {
    legalClause: 'Section 6.2 (Overland Transit Logistics): 2,400+ KM across 4 states, spanning high-altitude Himalayan passes of Spiti to the sand dunes of Thar.',
    deliverables: [
      'Specially fitted all-terrain convoy transit vehicles',
      'Verified mountain base camps, homestays, and desert tents',
      'High-altitude inner-line permits and road safety clearances'
    ],
    operationalMechanism: 'A curated expedition route connecting remote geographic marvels inaccessible via conventional commercial tourism.',
    quote: 'We travel through landscapes where GPS gives way to raw mountain horizons.',
    visualImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957420/Travel_india.jpg'
  },
  b5: {
    legalClause: 'Section 9.4 (Accreditation & Digital Credentials): Official IMDb listing, festival program billing, and archival digital credit for all participants.',
    deliverables: [
      'Verified IMDb film contributor profile link',
      'Theatrical festival screening premiere invitations',
      'High-resolution promotional stills for professional portfolios'
    ],
    operationalMechanism: 'Authentic film festival circuit submission with formal cast & contributor documentation.',
    quote: 'More than a travel memory—a permanent footprint in the archives of cinema.',
    visualImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957420/Become_part_of_the_film.webp'
  },
  b6: {
    legalClause: 'Section 14.1 (Media Archive & Showreel Access): Full access to the private high-definition digital archive of expedition footage and unscripted recordings.',
    deliverables: [
      'Personal 4K video cut of your expedition journey',
      'Access to behind-the-scenes photography master files',
      'Lifetime Chehra Community membership pass'
    ],
    operationalMechanism: 'Dedicated post-production archival team curating custom showreel packages for each expedition member.',
    quote: 'Ten years from now, you will look back at this film and remember the dust, the campfire, and the truth.',
    visualImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957420/Memory_for_life.png'
  }
};

export const WhyJoinSection: React.FC = () => {
  const [inspectedBenefitId, setInspectedBenefitId] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Clapperboard':
        return <Clapperboard className="w-4 h-4 text-yellow-400/90" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-yellow-400/90" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-yellow-400/90" />;
      case 'Film':
        return <Film className="w-4 h-4 text-yellow-400/90" />;
      case 'Award':
        return <Award className="w-4 h-4 text-yellow-400/90" />;
      default:
        return <Award className="w-4 h-4 text-yellow-400/90" />;
    }
  };

  const activeBenefit = BENEFITS.find((b) => b.id === inspectedBenefitId);
  const activeExtended = inspectedBenefitId ? BENEFIT_EXTENDED_DATA[inspectedBenefitId] : null;

  return (
    <section
      id="why-join"
      className="relative py-24 md:py-32 bg-[#080C14] border-t border-white/[0.08] text-[#EDE8DF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-yellow-400/90 uppercase font-medium">
                05 // PRODUCTION FRAMEWORK
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#A5A196] uppercase">
                PARTICIPANT RIGHTS
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F4F1EA] tracking-[0.02em] uppercase leading-[1.15]">
              WHY PARTICIPATE IN CHEHRA
            </h2>
          </div>

          <p className="text-[#B8B4AC] text-xs sm:text-sm font-normal font-sans max-w-md leading-[1.6]">
            A radical departure from manufactured cinema. Real unscripted overland logistics, genuine financial alignment, and authenticated festival credit.
          </p>
        </div>

        {/* 3x2 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const ext = BENEFIT_EXTENDED_DATA[benefit.id];
            return (
              <div
                key={benefit.id}
                onClick={() => setInspectedBenefitId(benefit.id)}
                className="group relative p-6 sm:p-7 bg-[#0C111A] border border-white/10 hover:border-yellow-400/90 transition-colors duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Visual Top Image Strip - Dark Blue Transparent, Zero tabs/text inside */}
                {ext && (
                  <div className="relative h-32 -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 mb-5 overflow-hidden bg-[#020817]">
                    <img
                      src={ext.visualImage}
                      alt={benefit.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter contrast-105 brightness-95 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Slight dark blue color effect */}
                    <div className="absolute inset-0 bg-[#061536]/25 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-blue-950/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Text Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 bg-white/5 border border-white/10 flex items-center justify-center text-yellow-400/90">
                      {getIcon(benefit.iconName)}
                    </div>
                    <span className="text-[10px] font-sans font-semibold tracking-[0.14em] text-yellow-400/90">
                      {benefit.number} / 06
                    </span>
                  </div>

                  <h3 className="font-title text-lg sm:text-xl font-semibold text-[#F4F1EA] uppercase tracking-[0.02em] group-hover:text-yellow-400/90 transition-colors mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-xs text-[#B8B4AC] font-normal font-sans leading-[1.6] mb-6 line-clamp-2">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom Tag & Click Indicator */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400/90 font-medium">
                    {benefit.highlight}
                  </span>
                  <div className="flex items-center gap-1 text-[#68665E] group-hover:text-yellow-400/90 transition-colors text-xs font-mono">
                    <span className="text-[9px] uppercase tracking-wider hidden sm:inline">DOSSIER</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assurance Strip */}
        <div className="mt-12 p-5 bg-[#0C111A] border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-400 shrink-0" />
            <span className="text-xs font-mono text-[#EDE8DF]/90">
              <strong className="text-[#EDE8DF]">LEGAL & FINANCIAL ASSURANCE:</strong> All participant roles are backed by a countersigned written production agreement prior to convoy departure.
            </span>
          </div>

          <a
            href="#faq"
            className="text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 uppercase underline underline-offset-4 whitespace-nowrap"
          >
            VIEW AUDITION TERMS →
          </a>
        </div>
      </div>

      {/* VALUE ARCHITECTURE MODAL */}
      {activeBenefit && activeExtended && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setInspectedBenefitId(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A0E16] border border-white/20 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-yellow-400/90 text-black text-[10px] font-mono font-medium uppercase tracking-wider">
                  PILLAR {activeBenefit.number} / 06
                </span>
                <span className="text-xs font-mono text-[#A5A196] uppercase tracking-widest">
                  VALUE DOSSIER
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectedBenefitId(null)}
                className="p-1.5 text-[#A5A196] hover:text-white transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Hero Banner inside Modal */}
            <div className="relative h-48 sm:h-56 mb-5 overflow-hidden border border-white/10 bg-[#020817]">
              <img
                src={activeExtended.visualImage}
                alt={activeBenefit.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-110 opacity-50"
              />
              <div className="absolute inset-0 bg-[#030d29]/70 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-blue-950/50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E16] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Title Block outside the photo */}
            <div className="mb-6">
              <span className="text-[10px] font-mono text-yellow-400/90 font-medium uppercase tracking-widest block mb-1">
                {activeBenefit.highlight}
              </span>
              <h3 className="font-title text-2xl sm:text-3xl font-normal text-[#EDE8DF] uppercase tracking-tight">
                {activeBenefit.title}
              </h3>
            </div>

            {/* Quote Block */}
            <div className="p-4 bg-[#080C14] border-l-2 border-yellow-400/90 mb-6 text-xs sm:text-sm text-yellow-300/90 italic font-light">
              &ldquo;{activeExtended.quote}&rdquo;
            </div>

            {/* Operational Mechanism */}
            <div className="mb-6 space-y-2">
              <div className="text-[10px] font-mono text-[#A5A196] uppercase tracking-widest font-medium">
                OPERATIONAL ARCHITECTURE
              </div>
              <p className="text-xs sm:text-sm text-[#EDE8DF]/90 leading-relaxed font-light">
                {activeExtended.operationalMechanism}
              </p>
            </div>

            {/* Key Deliverables Checklist */}
            <div className="p-5 bg-[#0C111A] border border-white/10 mb-6">
              <div className="text-xs font-mono text-yellow-400/90 font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>FORMAL DELIVERABLES & RIGHTS</span>
              </div>
              <ul className="space-y-3">
                {activeExtended.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#A5A196] font-light">
                    <span className="w-1.5 h-1.5 bg-yellow-400/90 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal / Policy Clause */}
            <div className="p-4 bg-[#080C14] border border-emerald-500/20 mb-8 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-medium uppercase tracking-widest block mb-1">
                  BINDING POLICY PROTOCOL
                </span>
                <p className="text-xs font-mono text-[#A5A196] leading-relaxed">
                  {activeExtended.legalClause}
                </p>
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setInspectedBenefitId(null)}
                className="px-6 py-2.5 bg-yellow-400/90 hover:bg-yellow-300/90 text-black font-medium text-xs uppercase tracking-wider transition-colors cursor-pointer"
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

