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
  Check,
  FileText,
  Lock
} from 'lucide-react';
import { CinemaButton } from './CinemaButton';

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
      'Multi-camera 4K Arri Alexa LF setups during real transit',
      'Ambient natural lighting in high-altitude terrain',
      'Unscripted character dialogues captured live on field mics'
    ],
    operationalMechanism: 'Direct integration of real road conditions, local chai stall stops, and atmospheric mountain weather directly into the narrative script.',
    quote: 'The terrain does not wait for a second take; life unfolds at 60 frames per second.',
    visualImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80'
  },
  b2: {
    legalClause: 'Section 8.3 (Actor Deposit Refund Assurance): 100% of the production security deposit placed by selected cast members is disbursed in full upon completion of their shoot schedule.',
    deliverables: [
      'Direct bank wire refund within 48 hours of shoot wrap',
      'Written legal guarantee countersigned before convoy rollout',
      'Zero audition, screening, or talent agency deduction'
    ],
    operationalMechanism: 'Escrow-backed production guarantee protecting independent creators from exploitative casting costs.',
    quote: 'Artistic talent should be protected, respected, and fully reimbursed.',
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
    visualImage: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1000&q=80'
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
    visualImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
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
    visualImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1000&q=80'
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
    visualImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
  }
};

export const WhyJoinSection: React.FC = () => {
  const [inspectedBenefitId, setInspectedBenefitId] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Clapperboard':
        return <Clapperboard className="w-5 h-5 text-yellow-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 'Film':
        return <Film className="w-5 h-5 text-yellow-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-400" />;
      default:
        return <Award className="w-5 h-5 text-yellow-400" />;
    }
  };

  const activeBenefit = BENEFITS.find((b) => b.id === inspectedBenefitId);
  const activeExtended = inspectedBenefitId ? BENEFIT_EXTENDED_DATA[inspectedBenefitId] : null;

  return (
    <section
      id="why-join"
      className="relative py-20 md:py-28 bg-[#040813] border-t border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Visuals & Purpose First */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-yellow-400" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
                04 / VALUE ARCHITECTURE
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              WHY JOIN CHEHRA?
            </h2>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            A radical departure from manufactured cinema. Real unscripted overland logistics, genuine financial alignment, and authenticated festival credit.
          </p>
        </div>

        {/* 3x2 Editorial Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const ext = BENEFIT_EXTENDED_DATA[benefit.id];
            return (
              <div
                key={benefit.id}
                onClick={() => setInspectedBenefitId(benefit.id)}
                className="group relative p-6 sm:p-7 bg-[#070D1A] border border-white/10 hover:border-yellow-400 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl overflow-hidden"
              >
                {/* Visual Top Accent Image Strip */}
                {ext && (
                  <div className="relative h-32 -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 mb-5 overflow-hidden bg-black">
                    <img
                      src={ext.visualImage}
                      alt={benefit.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter contrast-105 brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-[#070D1A]/50 to-transparent" />
                    
                    {/* Floating Top Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                      <div className="w-8 h-8 bg-black/80 border border-white/20 flex items-center justify-center backdrop-blur-md">
                        {getIcon(benefit.iconName)}
                      </div>
                      <span className="px-2 py-0.5 bg-black/80 text-[10px] font-mono font-bold tracking-widest text-yellow-400 border border-white/20 backdrop-blur-md">
                        {benefit.number} / 06
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-3">
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-slate-300 group-hover:text-yellow-400 uppercase tracking-wider">
                        <Maximize2 className="w-2.5 h-2.5" />
                        <span>INSPECT</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Core Text Info */}
                <div>
                  <h3 className="font-title text-lg sm:text-xl font-bold text-white uppercase tracking-wide group-hover:text-yellow-400 transition-colors mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-6 line-clamp-2">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom Tag & Click Indicator */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400/90 font-bold">
                    {benefit.highlight}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-yellow-400 transition-colors text-xs font-mono">
                    <span className="text-[9px] uppercase tracking-wider hidden sm:inline">DOSSIER</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assurance Strip */}
        <div className="mt-12 p-5 bg-[#09101F] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-200">
              <strong className="text-white">LEGAL & FINANCIAL TRANSPARENCY:</strong> All participant tokens backed by formal written agreement before convoy departure.
            </span>
          </div>

          <a
            href="#faq"
            className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 uppercase underline underline-offset-4 whitespace-nowrap"
          >
            VIEW REFUND TERMS →
          </a>
        </div>
      </div>

      {/* =========================================================================
          INTERIOR VALUE ARCHITECTURE MODAL (Comprehensive Telemetry & Clauses)
         ========================================================================= */}
      {activeBenefit && activeExtended && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setInspectedBenefitId(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#070D1A] border border-white/20 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-yellow-400 text-black text-[10px] font-mono font-black uppercase tracking-wider">
                  PILLAR {activeBenefit.number} / 06
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  VALUE DOSSIER
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectedBenefitId(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Hero Banner inside Modal */}
            <div className="relative h-48 sm:h-56 mb-6 overflow-hidden border border-white/15">
              <img
                src={activeExtended.visualImage}
                alt={activeBenefit.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-widest block mb-1">
                    {activeBenefit.highlight}
                  </span>
                  <h3 className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    {activeBenefit.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-4 bg-[#050811] border-l-2 border-yellow-400 mb-6 text-xs sm:text-sm text-yellow-300/90 italic font-light">
              &ldquo;{activeExtended.quote}&rdquo;
            </div>

            {/* Operational Mechanism */}
            <div className="mb-6 space-y-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                OPERATIONAL ARCHITECTURE
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                {activeExtended.operationalMechanism}
              </p>
            </div>

            {/* Key Deliverables Checklist */}
            <div className="p-5 bg-[#09101F] border border-white/10 mb-6">
              <div className="text-xs font-mono text-yellow-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>FORMAL DELIVERABLES & RIGHTS</span>
              </div>
              <ul className="space-y-3">
                {activeExtended.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal / Policy Clause */}
            <div className="p-4 bg-[#050A14] border border-emerald-500/20 mb-8 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                  BINDING POLICY PROTOCOL
                </span>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">
                  {activeExtended.legalClause}
                </p>
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setInspectedBenefitId(null)}
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
