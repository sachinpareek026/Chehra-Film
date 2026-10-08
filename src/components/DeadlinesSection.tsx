import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  TrendingUp,
  Clapperboard,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Mountain,
  Utensils,
  Users,
  Video,
  CableCar
} from 'lucide-react';
interface DeadlinesSectionProps {
  onOpenBooking?: (pathway?: 'actor' | 'participant' | 'crew') => void;
}

interface Milestone {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  targetDate: string; // YYYY-MM-DD
  badgeText: string;
  badgeStyle: 'green' | 'red' | 'blue' | 'emerald';
  icon: React.ReactNode;
  pricingHighlight: string;
  description: string;
  actionNote?: string;
}

export const DeadlinesSection: React.FC<DeadlinesSectionProps> = ({ onOpenBooking: _onOpenBooking }) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  // Periodically keep clock accurate (e.g. every minute)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const currentYear = currentDate.getFullYear();
  const campaignYear = currentYear >= 2026 ? currentYear : 2026;

  const milestones: Milestone[] = [
    {
      id: 'before-20-oct',
      stepNumber: '1',
      title: 'BEFORE 20TH OCTOBER',
      subtitle: 'Early Bird Price Guarantee',
      targetDate: `${campaignYear}-10-20T23:59:59`,
      badgeText: 'EARLY BIRD RATE',
      badgeStyle: 'green',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      pricingHighlight: 'Normal Participants ₹13,000 • Actors ₹16,000',
      description: 'Book your seats before 20th October to secure the ₹13,000 early bird rate for normal participants and ₹16,000 for actors (100% refundable). Lock your seat with ₹2,000 security booking amount.',
      actionNote: 'Lock with ₹2,000 security booking amount'
    },
    {
      id: 'after-20-oct',
      stepNumber: '2',
      title: 'AFTER 20TH OCTOBER',
      subtitle: '+20% Peak Surcharge',
      targetDate: `${campaignYear}-10-21T00:00:00`,
      badgeText: '+20% PRICE HIKE',
      badgeStyle: 'red',
      icon: <TrendingUp className="w-5 h-5 text-rose-400" />,
      pricingHighlight: 'Normal Participants ₹15,000 • Actors ₹18,000',
      description: 'Normal participants pricing rises to ₹15,000 and actors to ₹18,000. All family & group package slabs also increase by 15%–20% due to peak winter season demand.',
      actionNote: 'Family & group packages also increase by 20%'
    },
    {
      id: '20-nov-actors',
      stepNumber: '3',
      title: '20TH NOVEMBER',
      subtitle: 'Actor Auditions Deadline',
      targetDate: `${campaignYear}-11-20T23:59:59`,
      badgeText: 'AUDITIONS CLOSE',
      badgeStyle: 'blue',
      icon: <Clapperboard className="w-5 h-5 text-cyan-400" />,
      pricingHighlight: 'Lead Cast Audition Cutoff (100% Refundable)',
      description: 'Last date to submit form and monologue for Acting Roles. Free audition submission • ₹3,000 booking amount payable only AFTER selection. No new applications accepted post this.',
      actionNote: 'Free audition submission • Zero upfront fee'
    },
    {
      id: '30-nov-settlement',
      stepNumber: '4',
      title: '30TH NOVEMBER',
      subtitle: 'Balance Lockdown',
      targetDate: `${campaignYear}-11-30T23:59:59`,
      badgeText: 'FINAL FULL PAYMENT',
      badgeStyle: 'emerald',
      icon: <CreditCard className="w-5 h-5 text-emerald-400" />,
      pricingHighlight: 'Convoy Manifest Finalized',
      description: 'Last date to pay pending amount (full amount) to confirm your bookings and vehicle allocations (20 days prior to departure from Delhi).',
      actionNote: '20 days prior to departure from Delhi'
    }
  ];

  // Helper to calculate days remaining or lapsed
  const getMilestoneStatus = (targetDateStr: string, isStartDate = false) => {
    const target = new Date(targetDateStr).getTime();
    const now = currentDate.getTime();
    const diffMs = target - now;

    if (isStartDate) {
      // For "After 20th Oct", if now >= target, it's active now; otherwise it starts in X days
      if (diffMs <= 0) {
        return {
          isLapsed: false,
          isActiveNow: true,
          label: 'HIKE ACTIVE NOW',
          detail: 'Regular rate applies'
        };
      }
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return {
        isLapsed: false,
        isActiveNow: false,
        label: `STARTS IN ${days} DAY${days === 1 ? '' : 'S'}`,
        detail: `${days} days left before hike`
      };
    }

    // For deadline dates:
    if (diffMs < 0) {
      return {
        isLapsed: true,
        isActiveNow: false,
        label: 'LAPSED',
        detail: 'Deadline has passed'
      };
    }

    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return {
      isLapsed: false,
      isActiveNow: false,
      label: `${days} DAY${days === 1 ? '' : 'S'} REMAINING`,
      detail: `${days} days left to apply`
    };
  };

  return (
    <section id="deadlines" className="relative py-20 sm:py-24 bg-[#03060E] border-t border-b border-white/10 overflow-hidden">
      {/* Subtle Atmospheric Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,179,8,0.08),rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Calendar Icon from Poster */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] font-mono font-bold tracking-[0.25em] uppercase rounded-xs mb-4">
            <Calendar className="w-3.5 h-3.5 text-yellow-400" />
            <span>KASHMIR WINTER ESCAPE • SCHEDULE MANDATE</span>
          </div>

          <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-[#F4F1EA] tracking-[0.03em] uppercase leading-tight mb-4">
            IMPORTANT DATES &amp; DEADLINES
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#B8B4AC] tracking-[0.14em] uppercase font-semibold">
            PLEASE READ CAREFULLY AND PLAN YOUR BOOKINGS
          </p>
        </div>

        {/* 4 Editorial Milestone Cards matching the Poster Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {milestones.map((m) => {
            const isStartDate = m.id === 'after-20-oct';
            const status = getMilestoneStatus(m.targetDate, isStartDate);

            return (
              <div
                key={m.id}
                className={`relative flex flex-col justify-between p-6 rounded-sm border transition-all duration-300 ${
                  status.isLapsed
                    ? 'bg-[#080B12]/80 border-rose-900/40 opacity-80'
                    : m.id === 'before-20-oct'
                    ? 'bg-gradient-to-b from-[#0D1C16] via-[#08120E] to-[#040807] border-emerald-500/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                    : m.id === 'after-20-oct'
                    ? 'bg-gradient-to-b from-[#1C0D0F] via-[#120809] to-[#080405] border-rose-500/40'
                    : 'bg-[#060B16] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Step Number Circle + Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-title font-black text-sm shadow-md ${
                        m.badgeStyle === 'green'
                          ? 'bg-emerald-400 text-black'
                          : m.badgeStyle === 'red'
                          ? 'bg-rose-500 text-white'
                          : m.badgeStyle === 'blue'
                          ? 'bg-blue-500 text-white'
                          : 'bg-emerald-500 text-black'
                      }`}
                    >
                      {m.stepNumber}
                    </div>

                    <span
                      className={`px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider rounded-xs border ${
                        status.isLapsed
                          ? 'bg-rose-500/30 border-rose-400 text-rose-200'
                          : m.badgeStyle === 'green'
                          ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                          : m.badgeStyle === 'red'
                          ? 'bg-rose-500/20 border-rose-400/40 text-rose-300'
                          : m.badgeStyle === 'blue'
                          ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                          : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                      }`}
                    >
                      {status.isLapsed ? 'LAPSED' : m.badgeText}
                    </span>
                  </div>

                  {/* Header Title */}
                  <div className="mb-3">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                      {m.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-title font-bold text-white tracking-wide mt-0.5">
                      {m.title}
                    </h3>
                  </div>

                  {/* Pricing Rate Tag */}
                  <div className="p-3 bg-black/50 border border-yellow-400/25 rounded-xs mb-3.5">
                    <div className="text-xs sm:text-[13px] font-mono text-yellow-400 uppercase tracking-wide font-bold leading-relaxed">
                      {m.pricingHighlight}
                    </div>
                  </div>

                  {/* Core Description from Poster */}
                  <p className="text-xs text-[#B8B4AC] font-sans leading-relaxed mb-4">
                    {m.description}
                  </p>
                </div>

                {/* Bottom Countdown / Lapsed Status Pill */}
                <div className="pt-4 border-t border-white/10 mt-auto">
                  <div
                    className={`p-2 text-center rounded-xs font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      status.isLapsed
                        ? 'bg-rose-950/40 border border-rose-600/40 text-rose-300'
                        : status.isActiveNow
                        ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
                        : 'bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 shadow-sm'
                    }`}
                  >
                    {status.isLapsed ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>LAPSED</span>
                      </>
                    ) : status.isActiveNow ? (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>ACTIVE NOW</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{status.label}</span>
                      </>
                    )}
                  </div>

                  {m.actionNote && (
                    <span className="text-[10px] text-white/50 font-sans block text-center mt-1.5">
                      {m.actionNote}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>



        {/* 6 Icons Pill Ribbon directly from bottom of poster */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div className="p-3 bg-[#060B14] border border-white/10 rounded-xs flex flex-col items-center justify-center gap-1.5">
            <Compass className="w-4 h-4 text-yellow-400/80" />
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">
              Scenic Sightseeing
            </span>
          </div>

          <div className="p-3 bg-[#060B14] border border-white/10 rounded-xs flex flex-col items-center justify-center gap-1.5">
            <CableCar className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">
              Gondola Ride (Optional)
            </span>
          </div>

          <div className="p-3 bg-[#060B14] border border-white/10 rounded-xs flex flex-col items-center justify-center gap-1.5">
            <Mountain className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">
              2 Day Skiing Course
            </span>
          </div>

          <div className="p-3 bg-[#060B14] border border-white/10 rounded-xs flex flex-col items-center justify-center gap-1.5">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">
              Local Food &amp; Culture
            </span>
          </div>

          <div className="p-3 bg-[#060B14] border border-white/10 rounded-xs flex flex-col items-center justify-center gap-1.5">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">
              Meet Like-Minded People
            </span>
          </div>

          <div className="p-3 bg-[#060B14] border border-white/10 rounded-xs flex flex-col items-center justify-center gap-1.5">
            <Video className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">
              Travel Filmmaking
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
