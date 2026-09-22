import React, { useState } from 'react';
import { TIMELINE_STEPS } from '../data/cinemaData';
import {
  ArrowRight,
  X,
  Clock,
  Compass,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { TimelineStep } from '../types';

interface StepDetailedDossier {
  stepImage: string;
  locationFocus: string;
  telemetryLog: string;
  milestones: string[];
  equipmentOrCrew: string;
  unscriptedDynamic: string;
}

const STEP_EXTENDED_DATA: Record<string, StepDetailedDossier> = {
  '01': {
    stepImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    locationFocus: 'Pre-Production & Directorial Workshop',
    telemetryLog: 'Scriptless narrative structure locked. Character relationship charts and emotional turning points plotted across 2,400 KM.',
    milestones: [
      'Narrative arc concept deck finalized without rigid scripted lines',
      'Geographical scouting of Himalayan & desert transit coordinates',
      'Public casting announcement and actor nomination portal rollout'
    ],
    equipmentOrCrew: 'Directorial Desk, Storyboard Artists, Route Logistics Planners',
    unscriptedDynamic: 'Defining core character traumas and personal motives that will be tested by real journey friction.'
  },
  '02': {
    stepImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957431/Vandana.png',
    locationFocus: 'Nationwide Open Submissions (Delhi, Mumbai, Bengaluru & Independent Circles)',
    telemetryLog: 'Talent nominations intake portal open. Audition video reels, monologues, and travel motivations reviewed on a rolling basis.',
    milestones: [
      'Self-tape monologue & improv audition submissions screened daily',
      'No audition or processing charges applied to any artist',
      'Travel motivation reviews for non-actor convoy participants'
    ],
    equipmentOrCrew: 'Casting Directors, Ensemble Coordinators',
    unscriptedDynamic: 'Selecting individuals with raw authenticity and high psychological endurance rather than polished artificial acting.'
  },
  '03': {
    stepImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957437/Shankar.png',
    locationFocus: 'Directorial Chemistry Round & Screen Tests',
    telemetryLog: 'Virtual & on-camera chemistry workshops. Pairing contrasting personas to spark organic conversational tension during convoy transit.',
    milestones: [
      'Director one-on-one improvisational screen tests',
      'Ensemble chemistry pairing (Shankar & Meera, Shiva & Priya)',
      '100% post-release cost-recovery refund agreement execution'
    ],
    equipmentOrCrew: 'Director, Cinematography Leads, Legal Escrow Desk',
    unscriptedDynamic: 'Testing how actors react to unexpected physical fatigue, sudden changes in weather, and unstructured dialogues.'
  },
  '04': {
    stepImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957421/Participant.jpg',
    locationFocus: 'Delhi • Manali • Rohtang Pass • Spiti Valley (12,500 ft)',
    telemetryLog: 'Convoy rollout. Multi-vehicle expedition carrying actors, participants, technical crew, and mobile field gear freight.',
    milestones: [
      'High-altitude acclimatization and base camp establishment',
      'Daily dawn-to-dusk overland transit across extreme terrains',
      'Candid campfire bonds between actors and expedition participants'
    ],
    equipmentOrCrew: '4x4 Convoy Fleet, Field Medic, High-Altitude Expedition Guides',
    unscriptedDynamic: 'Living out of suitcases and braving sub-zero winds dissolves performative artifice, revealing true human character.'
  },
  '05': {
    stepImage: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957420/Crew.jpg',
    locationFocus: 'On-Location Mountain Soundstages & Night Deserts',
    telemetryLog: 'Live shooting in natural twilight and midnight campfires. Multi-angle 4K CinemaScope cameras capture spontaneous events as they happen.',
    milestones: [
      'Daily 4K anamorphic rushes backed up to rugged raid storage',
      'Dolby Atmos acoustic capture of howling winds and microtonal folk songs',
      'Participant spontaneous interactions integrated into documentary cut'
    ],
    equipmentOrCrew: 'Arri Alexa LF 4K, Anamorphic Lenses, Sound Devices Field Recorders',
    unscriptedDynamic: 'A sudden roadblock or mountain dust storm is not a delay—it becomes the pivotal scene of the film.'
  },
  '06': {
    stepImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    locationFocus: 'International Film Festivals & Worldwide OTT Circuit',
    telemetryLog: 'Post-production grading, sound design, theatrical distribution, and 100% actor security deposit reimbursement.',
    milestones: [
      'A-list film festival competition entries and red-carpet premieres',
      'Official IMDb verified cast and contributor credits published',
      'Theatrical release followed by international digital streaming'
    ],
    equipmentOrCrew: 'Colorists, Dolby Atmos Sound Mixers, Festival Distributors',
    unscriptedDynamic: 'Witnessing real people celebrate their authentic journey on the silver screen before a global audience.'
  }
};

interface ProcessStageMeta {
  stageNumber: string;
  stageName: string;
  stageGroup: string;
  stageGroupColor: string;
  input: string;
  nextStep: { number: string; name: string } | null;
}

const PROCESS_METADATA: Record<string, ProcessStageMeta> = {
  '01': {
    stageNumber: '01',
    stageName: 'DEVELOPMENT',
    stageGroup: 'PRE-PRODUCTION',
    stageGroupColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    input: 'Directorial concept arc & 2,400 KM terrain scouting',
    nextStep: { number: '02', name: 'NOMINATION' }
  },
  '02': {
    stageNumber: '02',
    stageName: 'TALENT INTAKE',
    stageGroup: 'PRE-PRODUCTION',
    stageGroupColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    input: 'Nationwide self-tape auditions & character motivations',
    nextStep: { number: '03', name: 'CHEMISTRY ROUND' }
  },
  '03': {
    stageNumber: '03',
    stageName: 'SELECTION',
    stageGroup: 'CHEMISTRY & CONTRACT',
    stageGroupColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    input: 'Director screen tests & 100% cost-recovery escrow agreement',
    nextStep: { number: '04', name: 'CONVOY ROLLOUT' }
  },
  '04': {
    stageNumber: '04',
    stageName: 'FIELD EXPEDITION',
    stageGroup: 'ON-LOCATION JOURNEY',
    stageGroupColor: 'text-yellow-400/90 bg-yellow-400/10 border-yellow-400/30',
    input: '4x4 Convoy fleet, altitude camps & cross-state travel',
    nextStep: { number: '05', name: 'PRINCIPAL SHOOT' }
  },
  '05': {
    stageNumber: '05',
    stageName: 'CINEMATOGRAPHY',
    stageGroup: 'PRINCIPAL PRODUCTION',
    stageGroupColor: 'text-yellow-400/90 bg-yellow-400/10 border-yellow-400/30',
    input: 'Arri Alexa LF multi-camera & Dolby Atmos field sound',
    nextStep: { number: '06', name: 'PREMIERE & WRAP' }
  },
  '06': {
    stageNumber: '06',
    stageName: 'THEATRICAL PREMIERE',
    stageGroup: 'POST & DISTRIBUTION',
    stageGroupColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    input: 'Color master, festival entries & 100% deposit reimbursement',
    nextStep: null
  }
};

export const HowItWorksSection: React.FC = () => {
  const [inspectedStep, setInspectedStep] = useState<TimelineStep | null>(null);

  const activeStepDossier = inspectedStep ? STEP_EXTENDED_DATA[inspectedStep.step] : null;

  return (
    <section
      id="journey"
      className="relative py-20 md:py-28 bg-[#050912] border-t border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Process Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-yellow-400/90" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400/90 uppercase font-bold">
                05 / PRODUCTION PROCESS & PIPELINE
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              HOW IT WORKS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              A 6-phase linear filmmaking pipeline: from open talent casting and directorial chemistry to 4x4 convoy expedition, live Arri LF production, and theatrical premiere.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-300/90 font-mono text-[10px] uppercase tracking-wider hidden sm:inline-flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-yellow-400/90" />
              <span>SEQUENTIAL 6-PHASE ROADMAP</span>
            </span>
          </div>
        </div>

        {/* Process Horizontal Stepper Track (Visual Linear Pipeline) */}
        <div className="mb-12 p-4 sm:p-6 bg-[#070D1A] border border-white/10 relative overflow-hidden">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-yellow-400/90 font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>LINEAR PRODUCTION WORKFLOW</span>
            </span>
            <span className="hidden sm:inline text-slate-500">
              CLICK ANY PHASE TO INSPECT TELEMETRY
            </span>
          </div>

          {/* Stepper Pipeline Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
            {TIMELINE_STEPS.map((step, idx) => {
              const meta = PROCESS_METADATA[step.step];
              const isSelected = inspectedStep?.step === step.step;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setInspectedStep(step)}
                  className={`p-3 text-left border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-yellow-400/10 border-yellow-400/90 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:border-yellow-400/60 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-black text-yellow-400/90">
                        {step.step}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase">
                        {step.duration}
                      </span>
                    </div>
                    <div className="font-title text-xs sm:text-sm font-black text-white uppercase tracking-wider group-hover:text-yellow-400/90 transition-colors">
                      {step.title}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase mt-0.5 truncate">
                      {meta?.stageName || step.subtitle}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400 group-hover:text-yellow-400/90">
                    <span>INSPECT</span>
                    {idx < TIMELINE_STEPS.length - 1 ? (
                      <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-yellow-400/90" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Process Guarantees Bar */}
        <div className="mt-12 p-5 bg-[#070D1A] border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-2">
            <span className="block text-yellow-400/90 font-title text-base sm:text-lg font-black uppercase">100% REFUND</span>
            <span className="block text-[10px] font-mono text-slate-400 uppercase">Post-Release Cost Recovery</span>
          </div>
          <div className="p-2">
            <span className="block text-white font-title text-base sm:text-lg font-black uppercase">ZERO AUDITION FEE</span>
            <span className="block text-[10px] font-mono text-slate-400 uppercase">Merit-Based Casting</span>
          </div>
          <div className="p-2">
            <span className="block text-cyan-400 font-title text-base sm:text-lg font-black uppercase">ARRI LF 4K</span>
            <span className="block text-[10px] font-mono text-slate-400 uppercase">Anamorphic Daily Rushes</span>
          </div>
          <div className="p-2">
            <span className="block text-emerald-400 font-title text-base sm:text-lg font-black uppercase">IMDb & FESTIVALS</span>
            <span className="block text-[10px] font-mono text-slate-400 uppercase">Verified Contributor Credits</span>
          </div>
        </div>

        {/* Bottom Fast Track Link */}
        <div className="mt-8 text-center">
          <a
            href="#nomination"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-yellow-400/90 hover:text-yellow-300/90 uppercase transition-colors"
          >
            <span>SELECT YOUR INVOLVEMENT PATHWAY</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* =========================================================================
          INTERIOR PRODUCTION PHASE MODAL
         ========================================================================= */}
      {inspectedStep && activeStepDossier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setInspectedStep(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#070D1A] border border-white/20 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-yellow-400/90 text-black text-[10px] font-mono font-black uppercase tracking-wider">
                  PHASE {inspectedStep.step} / 06
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  PRODUCTION ROADMAP DOSSIER
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectedStep(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Hero Image inside Modal */}
            <div className="relative h-48 sm:h-60 mb-6 overflow-hidden border border-white/15">
              <img
                src={activeStepDossier.stepImage}
                alt={inspectedStep.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono text-yellow-400/90 font-bold uppercase tracking-widest block mb-1">
                    {inspectedStep.subtitle} • {inspectedStep.duration}
                  </span>
                  <h3 className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    {inspectedStep.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Location & Context */}
            <div className="p-3.5 bg-[#050811] border border-white/10 mb-6 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-yellow-400/90 shrink-0" />
              <div className="text-xs font-mono text-slate-200">
                <strong className="text-yellow-400/90">GEOGRAPHIC FOCUS:</strong> {activeStepDossier.locationFocus}
              </div>
            </div>

            {/* Telemetry Log */}
            <div className="mb-6 space-y-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                OPERATIONAL LOG & TELEMETRY
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                {activeStepDossier.telemetryLog}
              </p>
            </div>

            {/* Milestones Checklist */}
            <div className="p-5 bg-[#09101F] border border-white/10 mb-6">
              <div className="text-xs font-mono text-yellow-400/90 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>PHASE MILESTONES & PROTOCOLS</span>
              </div>
              <ul className="space-y-3">
                {activeStepDossier.milestones.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/90 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unscripted Factor & Equipment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#050A14] border border-white/10">
                <div className="text-[10px] font-mono text-yellow-400/90 font-bold uppercase tracking-widest mb-1.5">
                  THE UNSCRIPTED DYNAMIC
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {activeStepDossier.unscriptedDynamic}
                </p>
              </div>

              <div className="p-4 bg-[#050A14] border border-white/10">
                <div className="text-[10px] font-mono text-yellow-400/90 font-bold uppercase tracking-widest mb-1.5">
                  DEPLOYED CREW & GEAR
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {activeStepDossier.equipmentOrCrew}
                </p>
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="text-xs font-mono text-slate-400">
                DELIVERABLE: <strong className="text-yellow-400/90">{inspectedStep.deliverable}</strong>
              </div>

              <button
                type="button"
                onClick={() => setInspectedStep(null)}
                className="px-5 py-2.5 bg-yellow-400/90 hover:bg-yellow-300/90 text-black font-title font-bold text-xs uppercase tracking-wider"
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
