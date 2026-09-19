import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Film,
  Compass,
  Wrench,
  ShieldCheck,
  Tag,
  ArrowRight,
  Maximize2,
  X,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { CinemaButton } from './CinemaButton';
import { PathwayType } from '../types';

interface FaqItem {
  id: string;
  category: 'actor' | 'participant' | 'crew' | 'general';
  question: string;
  answer: string;
  highlight?: string;
  legalClause?: string;
  relatedDoc?: string;
}

const FAQS: FaqItem[] = [
  // ACTOR FAQS
  {
    id: 'actor-refund',
    category: 'actor',
    question: 'How does the 100% Refund Policy work for actors?',
    answer:
      'Submitting your audition or nomination is 100% free. If officially selected by the directorial team for a character role, an actor places a refundable production security deposit to guarantee their reserved convoy seat, costume sizing, and call sheet schedule. Exactly 100% of this deposit is wired back to your bank account immediately upon completing your scheduled on-location shoot.',
    highlight: '100% REFUND GUARANTEED UPON SHOOT COMPLETION',
    legalClause: 'Section 8.3 (Direct Wire Refund Protocol): Production security deposits are transferred back via NEFT/RTGS within 48 hours of shoot wrap with zero deduction.',
    relatedDoc: 'Standard Actor Cast Participation Agreement'
  },
  {
    id: 'actor-fee',
    category: 'actor',
    question: 'Are there any audition or nomination submission fees?',
    answer:
      'Absolutely not. Chehra Films charges zero audition fees, zero agency cuts, and zero screening charges. Any creator or individual can submit their portfolio or audition monologue at no cost.',
    legalClause: 'Section 1.2 (Zero Audition Fees): Chehra Films commits to open-access artistic casting without financial barrier or middleman commission.',
    relatedDoc: 'Chehra Open Talent Manifesto'
  },
  {
    id: 'actor-cancel',
    category: 'actor',
    question: 'What happens if an actor needs to cancel after being cast?',
    answer:
      'If you provide written notice to the directorial desk at least 14 days prior to convoy roll-out, your entire security deposit is refunded in full with zero deduction so your role can be re-cast.',
    legalClause: 'Section 8.5 (Cancellation Window): Written cancellation at 14+ days grants 100% unconditional deposit return.',
    relatedDoc: 'Cancellation & Re-Casting Protocols'
  },
  {
    id: 'actor-experience',
    category: 'actor',
    question: 'Do I need professional theatre or film acting experience?',
    answer:
      'No. Chehra is rooted in cinematic realism and unvarnished human emotion. We are looking for genuine faces, raw presence, and authentic stories. Both first-timers and experienced artists are evaluated equally.',
    legalClause: 'Section 2.1 (Talent Assessment): Auditions are evaluated on psychological presence, voice texture, and observational depth.',
    relatedDoc: 'Directorial Casting Guidelines'
  },

  // PARTICIPANT FAQS
  {
    id: 'participant-pricing',
    category: 'participant',
    question: 'How does the ₹1,000 token & ₹11,000 expedition pricing work?',
    answer:
      'You only pay a ₹1,000 token today to reserve your seat in the expedition convoy. Paying the token permanently locks your registration at the early-bird rate of ₹11,000, protecting you from future price hikes. The remaining balance is settled 7 days prior to departure.',
    highlight: 'LOCK ₹11,000 EXPEDITION RATE WITH ₹1,000 TOKEN',
    legalClause: 'Section 5.1 (Price Lock Guarantee): The initial ₹1,000 token protects the traveler against all peak-winter vehicle lease rate surges.',
    relatedDoc: 'Expedition Convoy Booking Terms'
  },
  {
    id: 'participant-hike',
    category: 'participant',
    question: 'Why does the expedition rate increase after October 30?',
    answer:
      'High-altitude mountain permits, specialized winter vehicle convoy leases, and remote camp bookings surge during peak winter. Registrations received after October 30 will increase by ₹1,500 (totaling ₹12,500). Booking now guarantees the ₹11,000 rate.',
    highlight: '+₹1,500 RATE INCREASE AFTER OCTOBER 30',
    legalClause: 'Section 5.4 (Peak Winter Logistics Surcharge): Government pass permits and heating provisions surge in late autumn.',
    relatedDoc: 'Winter Convoy Logistics Schedule'
  },
  {
    id: 'participant-inclusions',
    category: 'participant',
    question: 'What is included in the ₹11,000 participant package?',
    answer:
      'Your booking includes curated inter-state convoy transit across the entire 2,400+ km route, verified twin-sharing base camps & mountain stays, daily breakfast & bonfire dinners, mountain route permits, and front-row immersion witnessing a feature film shot in real time.',
    legalClause: 'Section 7.1 (Logistical Inclusions): Vehicle fuel, verified stays, permits, and shared group logistics covered without hidden add-ons.',
    relatedDoc: 'Participant Journey Schedule & Menu'
  },
  {
    id: 'participant-role',
    category: 'participant',
    question: 'Can participants appear on camera during the journey?',
    answer:
      'Yes! While participants travel primarily for the expedition, candid moments, campfire interactions, and road journey sequences will naturally be captured for the feature film and documentary cut with your consent.',
    legalClause: 'Section 9.2 (Documentary Appearance Consent): On-camera moments are voluntary and accredited in film contributor credits.',
    relatedDoc: 'Contributor Release Agreement'
  },

  // CREW FAQS
  {
    id: 'crew-fee',
    category: 'crew',
    question: 'What is the opportunity structure for technical crew members?',
    answer:
      'Selected technical crew members receive subsidized logistics, dedicated equipment freight trucks, cross-state vehicle transit, and base camp lodging. Unlike commercial film sets where you work in isolation, here you co-direct and shoot a live narrative on wheels.',
    legalClause: 'Section 10.1 (Crew Freight & Lodging): Specialized gear transport vehicles and high-altitude lodging provided by production.',
    relatedDoc: 'Technical Crew Operation Protocol'
  },
  {
    id: 'crew-credits',
    category: 'crew',
    question: 'What credits and showreel footage do crew members receive?',
    answer:
      'All department heads and camera assistants receive verified IMDb credits, raw 4K rushes for their personal showreels, and official accreditation in global festival film screening catalogues.',
    legalClause: 'Section 10.4 (Showreel Rights): Crew members receive unwatermarked 4K footage licenses for personal career portfolios.',
    relatedDoc: 'Crew Intellectual Property & Credit Rider'
  },

  // GENERAL FAQS
  {
    id: 'general-safety',
    category: 'general',
    question: 'What safety protocols and medical provisions are in place?',
    answer:
      'Every convoy vehicle travels with satellite tracking, certified mountain drivers, oxygen cylinders, emergency first-aid kits, and dedicated expedition leads from Parindaa Travels who know the terrain intimately.',
    legalClause: 'Section 12.3 (High-Altitude Emergency Protocol): Immediate descent vehicles and medical escort accompany convoy at all times above 10,000 ft.',
    relatedDoc: 'Expedition Health & Mountain Safety Manual'
  },
];

type CategoryFilter = 'all' | 'actor' | 'participant' | 'crew' | 'general';

interface FaqSectionProps {
  onOpenNomination: (roleId?: string, pathway?: PathwayType) => void;
}

const CATEGORY_INFO: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  actor: {
    label: 'ACTOR CASTING & 100% REFUND',
    icon: <Film className="w-3.5 h-3.5 text-yellow-400" />,
    color: 'border-yellow-400/30 text-yellow-300'
  },
  participant: {
    label: 'EXPEDITION SEATS & TOKEN PRICING',
    icon: <Compass className="w-3.5 h-3.5 text-cyan-400" />,
    color: 'border-cyan-400/30 text-cyan-300'
  },
  crew: {
    label: 'TECHNICAL CREW & SHOWREEL',
    icon: <Wrench className="w-3.5 h-3.5 text-amber-400" />,
    color: 'border-amber-400/30 text-amber-300'
  },
  general: {
    label: 'SAFETY, PROTOCOLS & CONVOY',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
    color: 'border-emerald-400/30 text-emerald-300'
  }
};

// One representative sample question for each category to show upfront
const SAMPLE_FAQ_IDS = [
  'actor-refund',        // Actor sample
  'participant-pricing', // Participant sample
  'crew-fee',            // Crew sample
  'general-safety'       // General / Logistics sample
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenNomination }) => {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([
    'actor-refund',
    'participant-pricing',
  ]);
  const [inspectedFaq, setInspectedFaq] = useState<FaqItem | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Upfront questions: 1 sample per category
  const sampleFaqs = FAQS.filter((faq) => SAMPLE_FAQ_IDS.includes(faq.id));
  const remainingFaqs = FAQS.filter((faq) => !SAMPLE_FAQ_IDS.includes(faq.id));

  return (
    <section
      id="faq"
      className="relative py-20 md:py-28 bg-[#040813] border-t border-b border-white/10 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-yellow-400" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400 uppercase font-bold">
                10 / TRANSPARENCY & CLARITY
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              Key transparency questions curated by pathway: actor refund escrow, expedition seat price locks, technical crew benefits, and mountain safety.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-white/5 border border-white/15 text-slate-300 font-mono text-[10px] uppercase tracking-wider">
              {showAllFaqs ? 'SHOWING ALL 11 QUESTIONS' : 'SHOWING 4 ESSENTIAL QUESTIONS'}
            </span>
          </div>
        </div>

        {/* Two Core Assurance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            onClick={() => setInspectedFaq(FAQS[0])}
            className="group p-5 bg-[#070D1A] border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 flex items-start gap-4 cursor-pointer shadow-lg"
          >
            <div className="p-2.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono tracking-widest text-yellow-400 uppercase font-bold">
                  ACTOR REFUND GUARANTEE
                </span>
                <span className="text-[9px] font-mono text-slate-400 group-hover:text-yellow-400 uppercase tracking-wider flex items-center gap-1">
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>TERMS</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                <strong className="text-white font-medium">100% of the actor security deposit</strong> is wired back directly to your bank account upon shoot completion. Zero audition fees.
              </p>
            </div>
          </div>

          <div
            onClick={() => setInspectedFaq(FAQS[4])}
            className="group p-5 bg-[#070D1A] border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 flex items-start gap-4 cursor-pointer shadow-lg"
          >
            <div className="p-2.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 shrink-0 mt-0.5">
              <Tag className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                  PARTICIPANT PRICE LOCK
                </span>
                <span className="text-[9px] font-mono text-slate-400 group-hover:text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>TERMS</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Reserve with a <strong className="text-white font-medium">₹1,000 token</strong> to permanently freeze the early-bird rate and safeguard against late-winter transport surcharges.
              </p>
            </div>
          </div>
        </div>

        {/* Primary View: One Curated Question per Category */}
        <div className="space-y-4">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-yellow-400 font-bold">CORE ESSENTIAL QUESTIONS (1 PER CATEGORY)</span>
            <span className="text-slate-500 hidden sm:inline">CLICK QUESTION TO EXPAND ANSWER</span>
          </div>

          <div className="space-y-3">
            {sampleFaqs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              const meta = CATEGORY_INFO[faq.category];
              return (
                <div
                  key={faq.id}
                  className={`border transition-all duration-200 ${
                    isOpen
                      ? 'border-yellow-400/50 bg-[#08101E] shadow-lg shadow-black/40'
                      : 'border-white/10 bg-[#070D1A] hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-mono px-2 py-0.5 border bg-white/5 uppercase font-bold shrink-0 flex items-center gap-1.5 ${meta?.color || 'text-slate-300'}`}>
                        {meta?.icon}
                        <span>{faq.category}</span>
                      </span>
                      <span className="font-title text-sm sm:text-base font-bold text-white tracking-wide">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-none flex items-center justify-center border border-white/10 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-yellow-400 text-black border-yellow-400' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 space-y-3">
                      <p>{faq.answer}</p>
                      
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        {faq.highlight ? (
                          <div className="inline-block text-[10px] font-mono tracking-widest font-semibold px-2.5 py-1 bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 uppercase">
                            ✓ {faq.highlight}
                          </div>
                        ) : <div />}

                        {faq.legalClause && (
                          <button
                            type="button"
                            onClick={() => setInspectedFaq(faq)}
                            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-400 hover:text-yellow-400 uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>READ FORMAL CLAUSE</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Expanded Section with Remaining Grouped Questions */}
          {showAllFaqs && (
            <div className="pt-6 space-y-6 animate-fade-in">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-cyan-400 font-bold">ADDITIONAL PRODUCTION & DETAILED FAQS ({remainingFaqs.length} MORE)</span>
                <span className="text-slate-500 hidden sm:inline">FULL LEGAL & AUDITION DIRECTORY</span>
              </div>

              <div className="space-y-3">
                {remainingFaqs.map((faq) => {
                  const isOpen = openItems.includes(faq.id);
                  const meta = CATEGORY_INFO[faq.category];
                  return (
                    <div
                      key={faq.id}
                      className={`border transition-all duration-200 ${
                        isOpen
                          ? 'border-yellow-400/50 bg-[#08101E] shadow-lg shadow-black/40'
                          : 'border-white/10 bg-[#070D1A] hover:border-white/20'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(faq.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] font-mono px-2 py-0.5 border bg-white/5 uppercase font-bold shrink-0 flex items-center gap-1.5 ${meta?.color || 'text-slate-300'}`}>
                            {meta?.icon}
                            <span>{faq.category}</span>
                          </span>
                          <span className="font-title text-sm sm:text-base font-bold text-white tracking-wide">
                            {faq.question}
                          </span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-none flex items-center justify-center border border-white/10 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 bg-yellow-400 text-black border-yellow-400' : 'text-slate-400'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 space-y-3">
                          <p>{faq.answer}</p>
                          
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            {faq.highlight ? (
                              <div className="inline-block text-[10px] font-mono tracking-widest font-semibold px-2.5 py-1 bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 uppercase">
                                ✓ {faq.highlight}
                              </div>
                            ) : <div />}

                            {faq.legalClause && (
                              <button
                                type="button"
                                onClick={() => setInspectedFaq(faq)}
                                className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-400 hover:text-yellow-400 uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>READ FORMAL CLAUSE</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Expand / Collapse Control Button */}
          <div className="pt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#070D1A] hover:bg-[#0A1428] border border-white/20 hover:border-yellow-400 text-slate-200 hover:text-white font-mono text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
            >
              <span>{showAllFaqs ? '▲ COLLAPSE TO ESSENTIAL QUESTIONS' : `▼ EXPAND ALL ${FAQS.length} QUESTIONS (${remainingFaqs.length} MORE)`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERIOR FAQ & LEGAL CLAUSE MODAL
         ========================================================================= */}
      {inspectedFaq && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setInspectedFaq(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#070D1A] border border-white/20 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-yellow-400 text-black text-[10px] font-mono font-black uppercase tracking-wider">
                  LEGAL & TRANSPARENCY
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  DOCUMENTATION
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectedFaq(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Heading */}
            <h3 className="font-title text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-4">
              {inspectedFaq.question}
            </h3>

            {/* Answer Body */}
            <div className="p-4 bg-[#050811] border border-white/10 mb-6 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {inspectedFaq.answer}
            </div>

            {/* Formal Legal Clause */}
            {inspectedFaq.legalClause && (
              <div className="p-4 bg-[#050A14] border border-emerald-500/30 mb-6 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                    BINDING CONTRACTUAL PROVISION
                  </span>
                  <p className="text-xs font-mono text-slate-200 leading-relaxed">
                    {inspectedFaq.legalClause}
                  </p>
                </div>
              </div>
            )}

            {/* Related Agreement Reference */}
            {inspectedFaq.relatedDoc && (
              <div className="text-xs font-mono text-slate-400 mb-6 flex items-center gap-2">
                <FileText className="w-4 h-4 text-yellow-400" />
                <span>REFERENCED AGREEMENT: <strong className="text-white">{inspectedFaq.relatedDoc}</strong></span>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setInspectedFaq(null)}
                className="px-4 py-2 bg-transparent border border-white/20 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider"
              >
                CLOSE
              </button>

              <CinemaButton
                variant="primary"
                onClick={() => {
                  const cat = inspectedFaq.category;
                  setInspectedFaq(null);
                  if (cat === 'actor') onOpenNomination(undefined, 'actor');
                  else if (cat === 'participant') onOpenNomination(undefined, 'participant');
                  else if (cat === 'crew') onOpenNomination(undefined, 'crew');
                  else onOpenNomination();
                }}
                className="text-xs !py-2.5 !px-5"
              >
                APPLY UNDER THIS TERM
              </CinemaButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
