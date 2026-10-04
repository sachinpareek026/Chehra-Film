import React, { useState } from 'react';
import {
  Users,
  MessageCircle,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  Info,
  Sliders,
  Plus,
  Minus
} from 'lucide-react';
import { PathwayType } from '../types';
import { FAMILY_PRICING_TIERS, getFamilyPricePerPerson } from '../data/familyTripData';

interface FamilyPricingCalculatorProps {
  onOpenBooking: (pathway?: PathwayType) => void;
}

export const FamilyPricingCalculator: React.FC<FamilyPricingCalculatorProps> = ({
  onOpenBooking,
}) => {
  const [travellerCount, setTravellerCount] = useState<number>(4);

  const pricePerPerson = getFamilyPricePerPerson(travellerCount);
  const totalAmount = pricePerPerson * travellerCount;
  const baseRatePerPerson = 12000;
  const savingsPerPerson = baseRatePerPerson - pricePerPerson;
  const totalSavings = savingsPerPerson * travellerCount;

  const GOOGLE_FORM_URL = 'https://forms.gle/BS6VF7hV2i6KyUet9';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-[#0C1220] via-[#09101C] to-[#070B14] border border-amber-400/30 rounded-none shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                MORE PEOPLE, BIGGER SAVINGS
              </span>
              <span className="text-white/30 text-xs">·</span>
              <span className="text-white/60 font-mono text-[10px] uppercase">
                MINIMUM 4 TRAVELLERS
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white tracking-wide">
              Family &amp; Group Member Pricing Calculator
            </h3>
            <p className="text-xs text-white/70 mt-1 max-w-xl font-sans">
              Select your group size to calculate instant per-person rates and total investment. All rates include stays, breakfast &amp; dinner, Gulmarg Gondola tickets, Dal Lake Houseboat stay, and round-trip Delhi transit.
            </p>
          </div>

          <div className="p-3 bg-amber-400/10 border border-amber-400/30 text-right shrink-0">
            <span className="block text-[10px] font-mono text-amber-300 uppercase tracking-widest">
              BEST TIER RATE
            </span>
            <span className="text-lg sm:text-xl font-mono font-bold text-amber-400">
              ₹9,500 / Person
            </span>
            <span className="block text-[10px] text-white/50 font-mono mt-0.5">
              For 9 or more travellers
            </span>
          </div>
        </div>

        {/* Interactive Member Count Selector */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Stepper & Quick Picker (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-white/80 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Select Number of Travellers:</span>
              </label>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {travellerCount} {travellerCount === 1 ? 'Person' : 'People'}
              </span>
            </div>

            {/* Stepper + Slider */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTravellerCount((prev) => Math.max(4, prev - 1))}
                disabled={travellerCount <= 4}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/15 flex items-center justify-center text-white transition-colors"
                title="Decrease members"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="flex-1 px-3 py-2 bg-black/40 border border-white/15 text-center">
                <span className="text-2xl font-mono font-black text-amber-400 tabular-nums">
                  {travellerCount}
                </span>
                <span className="text-xs font-mono text-white/50 ml-2 uppercase">
                  TRAVELLERS
                </span>
              </div>

              <button
                type="button"
                onClick={() => setTravellerCount((prev) => Math.min(20, prev + 1))}
                disabled={travellerCount >= 20}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/15 flex items-center justify-center text-white transition-colors"
                title="Increase members"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-white/40 uppercase mr-1">
                Quick Select:
              </span>
              {[4, 5, 6, 7, 8, 9, 10, 12, 15].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setTravellerCount(count)}
                  className={`px-2.5 py-1 text-xs font-mono transition-all cursor-pointer ${
                    travellerCount === count
                      ? 'bg-amber-400 text-black font-bold shadow-sm'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {count} {count === 10 ? '10+' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Price Calculation Box (5 cols) */}
          <div className="lg:col-span-5 p-4 bg-black/60 border border-amber-400/40 rounded-none space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2">
              <span className="text-white/60 uppercase">Price Per Person:</span>
              <span className="text-base font-bold text-amber-400 tabular-nums">
                ₹{pricePerPerson.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2">
              <span className="text-white/60 uppercase">Example Total Cost:</span>
              <span className="text-lg font-black text-white tabular-nums">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {savingsPerPerson > 0 ? (
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Group Savings: ₹{savingsPerPerson.toLocaleString('en-IN')} / person (Total Saved: ₹{totalSavings.toLocaleString('en-IN')})
                </span>
              </div>
            ) : (
              <div className="p-2 bg-white/5 border border-white/10 text-white/60 text-[11px] font-mono">
                Base group rate for 4 people. Add more members to unlock up to ₹2,500 discount per person!
              </div>
            )}

            {travellerCount >= 9 && (
              <div className="text-[10px] font-mono text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>★ Best Price Tier (₹9,500/person) Unlocked!</span>
              </div>
            )}
          </div>
        </div>

        {/* Dual Booking CTAs */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>SUBMIT VIA GOOGLE FORM ({travellerCount} PEOPLE)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking('participant')}
              className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-mono font-medium text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40"
            >
              <span>OPEN APPLICATION PORTAL</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>

          <div className="text-right text-[10px] font-mono text-white/50 shrink-0">
            <span>8 Days · Delhi to Delhi (24 – 31 Dec)</span>
          </div>
        </div>
      </div>

      {/* Urgency & Customisation Notices matching the flyer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 bg-[#0A0D16] border border-amber-400/25 flex items-start gap-3">
          <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-400 uppercase tracking-wide block mb-0.5">
              Limited Peak Season Slots
            </strong>
            <p className="text-white/70 text-[11px] font-sans leading-relaxed">
              Pricing will be revised after <span className="text-white font-semibold">25 October</span> due to heavy high-season demand during Christmas &amp; New Year in Gulmarg and Dal Lake houseboats.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#0A0D16] border border-white/10 flex items-start gap-3">
          <Sliders className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white uppercase tracking-wide block mb-0.5">
              Customisation Also Available
            </strong>
            <p className="text-white/70 text-[11px] font-sans leading-relaxed">
              Customize your itinerary, add extra days, upgrade to premium vehicle or include specialized private experiences tailored specifically to your family’s needs.
            </p>
          </div>
        </div>
      </div>

      {/* Full Comparison Table matching the Flyer */}
      <div className="p-6 bg-[#080B12] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-serif text-lg text-white tracking-wide">
              Official Family &amp; Group Pricing Chart
            </h4>
            <p className="text-[11px] text-white/50 font-mono">
              Transparent per-person pricing breakdown from the official Parindaa &amp; Chehra Films flyer
            </p>
          </div>
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
            8 DAYS / 7 NIGHTS ROUND-TRIP
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 uppercase bg-white/[0.02]">
                <th className="py-3 px-4">Travellers</th>
                <th className="py-3 px-4 text-amber-400">Price / Person</th>
                <th className="py-3 px-4">Example Total</th>
                <th className="py-3 px-4">Savings Benefit</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {FAMILY_PRICING_TIERS.map((tier) => {
                const isCurrent = travellerCount === tier.travellers;
                return (
                  <tr
                    key={tier.travellers}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-amber-400/10 text-white font-medium'
                        : tier.isBestPrice
                        ? 'bg-amber-400/[0.03] text-white/90 hover:bg-white/5'
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{tier.label}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-400 tabular-nums">
                      ₹{tier.pricePerPerson.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-white tabular-nums">
                      ₹{tier.exampleTotal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-[11px] text-white/60 font-sans">
                      {tier.travellers === 4
                        ? 'Standard baseline rate'
                        : tier.isBestPrice
                        ? '★ Maximum savings: ₹2,500 off/person'
                        : `₹${(12000 - tier.pricePerPerson).toLocaleString('en-IN')} off per person`}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setTravellerCount(tier.travellers)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-all ${
                          isCurrent
                            ? 'bg-amber-400 text-black font-bold'
                            : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                        }`}
                      >
                        {isCurrent ? 'Selected' : 'Select'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
