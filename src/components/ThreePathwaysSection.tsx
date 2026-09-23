import React, { useState } from 'react';
import { CinemaButton } from './CinemaButton';
import {
  Check,
  Compass,
  Film,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Maximize2,
  X,
  Clock,
  MapPin,
  Calendar,
  Award,
  HelpCircle
} from 'lucide-react';
import { PathwayType } from '../types';

interface ThreePathwaysSectionProps {
  onSelectPathway: (pathway: PathwayType) => void;
}

interface PathwayDetail {
  id: PathwayType;
  number: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  heroImage: string;
  pricingTag: string;
  pricingSubtitle: string;
  guaranteeText: string;
  overview: string;
  keyPerks: string[];
  timeline: { phase: string; details: string }[];
  deliverables: string[];
  ctaText: string;
}

const PATHWAY_DATA: Record<PathwayType, PathwayDetail> = {
  actor: {
    id: 'actor',
    number: '01',
    badge: 'TOTAL ₹16,000',
    badgeColor: 'bg-yellow-400 text-black',
    title: 'AS AN ACTOR',
    subtitle: 'Lead Character Arc • Unscripted Cinema Realism',
    heroImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957437/Shankar.png',
    pricingTag: 'TOTAL ₹16,000 (100% REFUNDABLE)',
    pricingSubtitle: 'Zero fee to apply. ₹3,000 security booking amount payable only AFTER role selection. Last date: 20th Nov.',
    guaranteeText: 'Total amount ₹16,000 is a 100% refundable production security deposit returned upon post-release cost recovery. Only ₹3,000 security booking amount is due upon selection. Balance cleared 20 days prior to departure. Last date to apply: 20 Nov 2026.',
    overview:
      'Step directly into the shoes of one of the 7 lead character personas across extreme Himalayan terrain. You travel with the production convoy, improvising dialogue against real-life natural light, dawn mist, and roadside encounters.',
    keyPerks: [
      'Official IMDb lead character billing & international festival premiere accreditation',
      'Dedicated multi-camera coverage with 4K Arri Alexa LF & Anamorphic lenses',
      'Total ₹16,000 (100% refundable production security deposit upon cost recovery)',
      '₹3,000 security booking amount payable only AFTER role selection',
      'Free audition upload (last date to apply: 20th November)'
    ],
    timeline: [
      { phase: 'Application Deadline', details: 'Final date to submit audition / nomination: 20th November 2026' },
      { phase: 'Selection & Booking', details: 'Selected actors pay ₹3,000 security booking amount to confirm role contract' },
      { phase: 'Expedition Rollout', details: 'Convoy departs Delhi on 24 December 2026 for 8-day shoot across Kashmir' },
      { phase: 'Release & 100% Refund', details: 'Full deposit refunded as film recovers production costs post-release' }
    ],
    deliverables: [
      'IMDb Actor Page Credit',
      'Personal 4K Showreel Cut',
      'Festival Premiere Red Carpet Pass',
      'Exclusive Unscripted Behind-The-Scenes Featurette'
    ],
    ctaText: 'APPLY AS ACTOR (LAST DATE: 20 NOV)'
  },
  participant: {
    id: 'participant',
    number: '02',
    badge: '₹2,000 SECURITY',
    badgeColor: 'bg-yellow-400 text-black',
    title: 'AS A PARTICIPANT',
    subtitle: 'Front-Row Convoy Immersion • No Auditions Required',
    heroImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957421/Participant.jpg',
    pricingTag: '₹13,000 FINAL RATE',
    pricingSubtitle: 'Lock with ₹2,000 security booking amount today. Early bird ₹13,000; rises to ₹14,500 after 20 Nov.',
    guaranteeText: '₹13,000 early-bird final rate locked with ₹2,000 security booking amount. Balance ₹11,000 cleared 20 days prior to departure. Two-sharing accommodation preserved.',
    overview:
      'Join the live production convoy as a traveler and witness a feature film being made in real time across Kashmir. Experience Katra & Vaishno Devi, Gulmarg Ski 2-day certificate course under experts training program, and Dal Lake in Srinagar.',
    keyPerks: [
      'Guaranteed seat in the 7-night / 8-day Kashmir winter expedition convoy (24 - 31 Dec)',
      'Gulmarg Ski 2-Day Certificate Course under Experts Training Program with gear & instructor included',
      'Two-sharing verified accommodations across Katra, Gulmarg, and Srinagar (houseboat)',
      '₹2,000 security booking amount locks the ₹13,000 early-bird rate'
    ],
    timeline: [
      { phase: 'Security Booking', details: 'Pay ₹2,000 now to freeze ₹13,000 early-bird expedition rate' },
      { phase: 'Balance Settlement', details: 'Remaining balance cleared at least 20 days prior to trip start' },
      { phase: 'Expedition Rollout', details: 'Depart with the cast and camera trucks on 24 December 2026' }
    ],
    deliverables: [
      'Official Film Contributor IMDb Credit',
      'Documentary Cut Feature Appearance (with consent)',
      'High-Resolution Expedition Photo Archive',
      'Chehra Production Member Pass'
    ],
    ctaText: 'LOCK SEAT (₹2,000 SECURITY)'
  },
  crew: {
    id: 'crew',
    number: '03',
    badge: '₹2,000 SECURITY',
    badgeColor: 'bg-emerald-500 text-black',
    title: 'AS CREW MEMBER',
    subtitle: 'Cinematography • Field Sound • Art & Logistics',
    heroImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957420/Crew.jpg',
    pricingTag: 'FINAL ₹13,000',
    pricingSubtitle: 'Subsidized logistics contribution. ₹2,000 security booking amount payable upon selection; balance cleared 20 days before departure.',
    guaranteeText: 'Final amount ₹13,000 covering high-altitude transport, base camp stays, and gear freight. ₹2,000 security booking amount payable only upon official selection.',
    overview:
      'Bring your technical craft to a live road movie. Shoot anamorphic cinema on location, capture microtonal ambient soundscapes, or coordinate high-altitude mountain logistics under real-world documentary conditions.',
    keyPerks: [
      'Head of Department & Assistant crew credits across festival & theatrical cuts',
      'Hands-on operation with high-end camera rigs, drones, and Dolby field audio mics',
      'All cross-country freight truck transit & high-altitude mountain base camp lodging covered',
      'Subsidized ₹13,000 final amount with ₹2,000 security booking upon selection'
    ],
    timeline: [
      { phase: 'Portfolio Review', details: 'Technical leads evaluate submissions on rolling basis' },
      { phase: 'Selection & Booking', details: 'Pay ₹2,000 security booking amount upon official role confirmation' },
      { phase: 'On-Location Shoot', details: 'Full 8-day expedition production across Kashmir (24 - 31 Dec)' }
    ],
    deliverables: [
      'IMDb Departmental Crew Accreditation',
      'Raw Master 4K B-Roll & Audio Stems for Personal Reel',
      'Official Crew Production Gear Kit',
      'Festival Premiere Industry Pass'
    ],
    ctaText: 'APPLY AS TECHNICAL CREW'
  }
};

export const ThreePathwaysSection: React.FC<ThreePathwaysSectionProps> = ({
  onSelectPathway,
}) => {
  const [inspectedPathway, setInspectedPathway] = useState<PathwayType | null>(null);

  const activeModalData = inspectedPathway ? PATHWAY_DATA[inspectedPathway] : null;

  return (
    <section id="nomination" className="relative py-20 md:py-28 bg-[#040813] border-t border-b border-white/10 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Clean, Minimalist, Visuals First */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-yellow-400/90" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400/90 uppercase font-bold">
                09 / THREE PATHWAYS INTO CHEHRA
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F4F1EA] tracking-[0.02em] uppercase leading-[1.15]">
              CHOOSE YOUR INVOLVEMENT
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#B8B4AC] font-normal font-sans leading-[1.6]">
            Whether leading on camera with a 100% post-release cost-recovery refund (Total ₹16k / ₹3k security after selection), securing an expedition seat with a ₹2,000 security booking, or capturing sound and visuals as technical crew.
          </p>
        </div>

        {/* 3 Visual-First Editorial Pathway Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* CARD 1: PARTICIPANT */}
          <div
            className="group relative bg-[#070D1A] border border-white/10 hover:border-blue-400/80 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer"
            onClick={() => setInspectedPathway('participant')}
          >
            {/* Top Visual Banner */}
            <div className="relative h-64 overflow-hidden bg-[#020817]">
              <img
                src={PATHWAY_DATA.participant.heroImage}
                alt="Participant Pathway - Chehra Films"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-105 brightness-95 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#061536]/25 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-blue-950/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Body: Clean & Punchy */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-blue-300 text-[10px] font-sans uppercase font-semibold tracking-[0.14em]">
                    <Compass className="w-3 h-3" />
                    PATHWAY 01
                  </span>
                  <span className="px-2.5 py-0.5 bg-blue-950 border border-blue-400/40 text-blue-300 text-[9px] font-sans font-bold uppercase tracking-wider">
                    EARLY LOCK ₹2,000
                  </span>
                </div>
                <h3 className="font-title text-2xl font-semibold text-[#F4F1EA] uppercase tracking-[0.02em] group-hover:text-blue-300 transition-colors mb-1">
                  AS A PARTICIPANT
                </h3>
                <p className="text-xs text-blue-300 font-sans font-medium mb-4">
                  Front-Row Convoy • Zero Auditions
                </p>

                {/* Micro Pricing Banner */}
                <div className="p-3.5 bg-[#050A16] border border-blue-500/30 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-blue-300 uppercase tracking-wider font-bold">
                      EARLY BIRD RATE
                    </span>
                    <span className="text-[10px] font-mono text-white/50 line-through">
                      ₹14,500 after 20 Nov
                    </span>
                  </div>
                  <div className="text-xl font-title font-bold text-[#F4F1EA] mt-0.5">
                    ₹13,000 <span className="text-xs font-mono text-blue-300 font-normal">/ TOTAL</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-1">
                    Lock seat with ₹2,000 security booking amount
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10">
                <CinemaButton
                  id="apply-participant-pathway-btn"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPathway('participant');
                  }}
                  className="w-full !py-3.5 text-xs tracking-wider"
                >
                  LOCK SEAT (₹2,000 SECURITY)
                </CinemaButton>
              </div>
            </div>
          </div>

          {/* CARD 2: ACTOR (Featured In Between with Highlighted Border) */}
          <div
            className="group relative bg-[#091224] border-2 border-yellow-400/90 hover:border-yellow-300/90 transition-all duration-300 shadow-2xl shadow-yellow-400/10 flex flex-col justify-between overflow-hidden cursor-pointer"
            onClick={() => setInspectedPathway('actor')}
          >
            {/* Top Visual Banner */}
            <div className="relative h-64 overflow-hidden bg-[#020817]">
              <img
                src={PATHWAY_DATA.actor.heroImage}
                alt="Actor Pathway - Chehra Films"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter contrast-105 brightness-95 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#061536]/25 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-blue-950/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091224] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Body: Clean & Punchy */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-yellow-400/90 text-[10px] font-sans uppercase font-semibold tracking-[0.14em]">
                    <Film className="w-3 h-3" />
                    PATHWAY 02
                  </span>
                  <span className="px-2.5 py-0.5 bg-yellow-400/90 text-black text-[9px] font-sans font-bold uppercase tracking-wider">
                    100% REFUND
                  </span>
                </div>
                <h3 className="font-title text-2xl font-semibold text-[#F4F1EA] uppercase tracking-[0.02em] group-hover:text-yellow-400/90 transition-colors mb-1">
                  AS AN ACTOR
                </h3>
                <p className="text-xs text-yellow-400/90 font-sans font-medium mb-4">
                  Lead Character Arc • Audition Reel Required
                </p>

                {/* Micro Financial Terms Banner */}
                <div className="p-3.5 bg-[#050811] border border-yellow-400/30 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider">
                      TOTAL PRODUCTION DEPOSIT
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                      100% REFUNDABLE
                    </span>
                  </div>
                  <div className="text-xl font-title font-bold text-[#F4F1EA] mt-0.5">
                    ₹16,000 <span className="text-xs font-mono text-yellow-400/90 font-normal">/ TOTAL</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-1">
                    ₹3,000 security booking payable only AFTER selection
                  </div>
                  <div className="text-[10px] text-amber-300 font-mono mt-0.5 font-semibold">
                    LAST DATE TO APPLY: 20TH NOV
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10">
                <CinemaButton
                  id="apply-actor-pathway-btn"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPathway('actor');
                  }}
                  className="w-full !py-3.5 text-xs tracking-wider"
                >
                  APPLY AS ACTOR (LAST DATE: 20 NOV)
                </CinemaButton>
              </div>
            </div>
          </div>

          {/* CARD 3: CREW */}
          <div
            className="group relative bg-[#070D1A] border border-white/10 hover:border-emerald-400 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer"
            onClick={() => setInspectedPathway('crew')}
          >
            {/* Top Visual Banner */}
            <div className="relative h-64 overflow-hidden bg-[#020817]">
              <img
                src={PATHWAY_DATA.crew.heroImage}
                alt="Crew Pathway - Chehra Films"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-105 brightness-95 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#061536]/25 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-blue-950/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Body: Clean & Punchy */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px] font-sans uppercase font-semibold tracking-[0.14em]">
                    <Wrench className="w-3 h-3" />
                    PATHWAY 03
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[9px] font-sans font-bold uppercase tracking-wider">
                    PORTFOLIO CALL
                  </span>
                </div>
                <h3 className="font-title text-2xl font-semibold text-[#F4F1EA] uppercase tracking-[0.02em] group-hover:text-emerald-400 transition-colors mb-1">
                  AS CREW MEMBER
                </h3>
                <p className="text-xs text-emerald-400/90 font-mono mb-4">
                  Cinematography • Sound • Production
                </p>

                {/* Micro Compensation Banner */}
                <div className="p-3.5 bg-[#050811] border border-emerald-500/30 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                      SUBSIDIZED LOGISTICS
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase">
                      DEPARTMENT HEAD
                    </span>
                  </div>
                  <div className="text-xl font-title font-bold text-[#F4F1EA] mt-0.5">
                    ₹13,000 <span className="text-xs font-mono text-emerald-400 font-normal">/ TOTAL</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-1">
                    ₹2,000 security booking payable upon official selection
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10">
                <CinemaButton
                  id="apply-crew-pathway-btn"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPathway('crew');
                  }}
                  className="w-full !py-3.5 text-xs tracking-wider"
                >
                  APPLY AS CREW
                </CinemaButton>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          INTERIOR DOSSIER MODAL (Deep Dive Information on Click)
         ========================================================================= */}
      {activeModalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setInspectedPathway(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#070D1A] border border-white/20 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest ${activeModalData.badgeColor}`}>
                  {activeModalData.badge}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  PATHWAY {activeModalData.number} / 03 DOSSIER
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectedPathway(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-center">
              <div className="md:col-span-5 h-56 sm:h-64 rounded-none overflow-hidden border border-white/15 relative bg-[#020817]">
                <img
                  src={activeModalData.heroImage}
                  alt={activeModalData.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105 brightness-95 opacity-90"
                />
                <div className="absolute inset-0 bg-[#061536]/25 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-blue-950/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="md:col-span-7 space-y-3">
                <h3 className="font-title text-3xl font-black text-white uppercase tracking-tight">
                  {activeModalData.title}
                </h3>
                <p className="text-xs font-mono text-yellow-400/90 uppercase tracking-wider">
                  {activeModalData.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activeModalData.overview}
                </p>

                {/* Assurance Tag */}
                <div className="p-3 bg-[#0A1324] border border-white/10 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-mono text-slate-200">
                    <strong className="text-emerald-400">FINANCIAL TERMS:</strong> {activeModalData.guaranteeText}
                  </p>
                </div>
              </div>
            </div>

            {/* Structured Breakdown: Inclusions & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Perks & Inclusions */}
              <div className="p-5 bg-[#09101F] border border-white/10">
                <div className="text-xs font-mono text-yellow-400/90 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>KEY DELIVERABLES & CREDITS</span>
                </div>
                <ul className="space-y-3">
                  {activeModalData.keyPerks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <Check className="w-4 h-4 text-yellow-400/90 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Roadmap Timeline */}
              <div className="p-5 bg-[#09101F] border border-white/10">
                <div className="text-xs font-mono text-yellow-400/90 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>PRODUCTION TIMELINE</span>
                </div>
                <div className="space-y-4">
                  {activeModalData.timeline.map((step, i) => (
                    <div key={i} className="border-l-2 border-yellow-400/40 pl-3">
                      <div className="text-[10px] font-mono text-yellow-400/90 font-bold uppercase tracking-wider">
                        {step.phase}
                      </div>
                      <div className="text-xs text-slate-300 font-light mt-0.5">
                        {step.details}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  PRICE / STRUCTURE
                </span>
                <span className="font-title text-xl font-black text-white">
                  {activeModalData.pricingTag}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setInspectedPathway(null)}
                  className="px-4 py-2.5 bg-transparent border border-white/20 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider"
                >
                  CLOSE
                </button>
                <CinemaButton
                  variant="primary"
                  onClick={() => {
                    const id = activeModalData.id;
                    setInspectedPathway(null);
                    onSelectPathway(id);
                  }}
                  className="flex-1 sm:flex-initial !py-3 text-xs tracking-wider"
                >
                  {activeModalData.ctaText}
                </CinemaButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
