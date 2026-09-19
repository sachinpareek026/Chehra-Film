import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Snowflake,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info,
  Layers,
  Plane,
  Train,
  Car,
  Camera,
  Music,
  Users
} from 'lucide-react';
import { CinemaButton } from './CinemaButton';
import { PathwayType } from '../types';

interface KashmirExpeditionSectionProps {
  onOpenBooking: (pathway?: PathwayType) => void;
}

export const KashmirExpeditionSection: React.FC<KashmirExpeditionSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'pricing' | 'inclusions' | 'optional'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [showExtensionModal, setShowExtensionModal] = useState(false);

  const itineraryDays = [
    {
      day: 0,
      title: 'DELHI → JAMMU',
      subtitle: 'The Journey Begins',
      badge: 'OVERNIGHT TRANSIT',
      icon: <Train className="w-4 h-4 text-yellow-400" />,
      overnight: 'Travel / Train',
      timing: 'Evening Departure',
      description: 'Reporting at designated point in Delhi, participant registration, safety & gear briefing, and group introduction before overnight journey towards Jammu.',
      highlights: [
        'Reporting at designated hub in Delhi',
        'Participant registration & production kit briefing',
        'Official introduction to the expedition group & crew',
        'Departure from Delhi — overnight journey towards Jammu'
      ]
    },
    {
      day: 1,
      title: 'JAMMU → GULMARG',
      subtitle: 'Into the Himalayas',
      badge: 'VALLEY ASCENT',
      icon: <Car className="w-4 h-4 text-yellow-400" />,
      overnight: 'Gulmarg Mountain Stay',
      timing: 'Morning to Sunset',
      description: 'Arrival at Jammu, breakfast, meet local winter transport convoy, and begin ascent into Kashmir Valley as landscape transforms from plains to snow-capped peaks.',
      highlights: [
        'Arrival in Jammu & traditional morning breakfast',
        'Meet dedicated local mountain transport convoy',
        'Scenic highway ascent into Kashmir Valley',
        'Winter transfer from Tangmarg up to snowbound Gulmarg',
        'Hotel check-in, heated room allocation & rest',
        'First twilight snow walk, photography & group interaction'
      ],
      note: 'During winter, the final Tangmarg–Gulmarg mountain section strictly requires vehicles equipped for snow conditions.'
    },
    {
      day: 2,
      title: 'GULMARG — THE SKI DAY',
      subtitle: 'The Hero Winter Experience',
      badge: 'HERO SKI SESSION',
      icon: <Snowflake className="w-4 h-4 text-yellow-400" />,
      overnight: 'Gulmarg Mountain Stay',
      timing: 'Full Day Snow Activity',
      description: 'The centerpiece snowfield experience. Professional ski gear allocation, safety briefing, beginner ski lesson, instructor-assisted practice, and the Parindaa Winter Circle in the evening.',
      highlights: [
        'Full ski equipment allocation (boots, skis & poles)',
        'Comprehensive mountain safety briefing & posture introduction',
        'Certified instructor-assisted ski practice on gentle powder slopes',
        'Wide-angle group photography & cinematic action captures',
        'Afternoon free exploration across Gulmarg snowfields',
        'Evening "Parindaa Winter Circle" — warm acoustic music, conversations, stories & bonding'
      ]
    },
    {
      day: 3,
      title: 'GULMARG → SRINAGAR',
      subtitle: 'From Snowfields to the Valley',
      badge: 'GONDOLA & DAL LAKE',
      icon: <Compass className="w-4 h-4 text-yellow-400" />,
      overnight: 'Srinagar Valley Stay',
      timing: 'Morning to Evening',
      description: 'Morning checkout with optional Gulmarg Gondola ascent reaching up to ~13,000 ft at Apharwat Peak, followed by scenic descent to Srinagar and evening at Dal Lake.',
      highlights: [
        'Breakfast & morning check-out from Gulmarg lodge',
        'Optional Gulmarg Gondola ascent (Phase I Kongdoori & Phase II Apharwat ~13,000 ft)',
        'Afternoon descent transfer towards Srinagar Valley',
        'Hotel check-in & rest in Srinagar',
        'Evening stroll along Dal Lake Boulevard Road & vibrant local bazaars'
      ],
      note: 'Gondola tickets are separate/optional and subject to real-time weather and mountain operating conditions.'
    },
    {
      day: 4,
      title: 'SRINAGAR — KASHMIR CULTURE & CINEMA',
      subtitle: 'Shikara Waters & Film Experience',
      badge: 'CINEMATIC SHOOT',
      icon: <Camera className="w-4 h-4 text-yellow-400" />,
      overnight: 'Srinagar Valley Stay',
      timing: 'Full Day Shoot & Heritage',
      description: 'A dual heritage and filmmaking day. Gentle Shikara cruises across Dal Lake, Mughal garden heritage spots, artisanal Kashmiri crafts, paired with documentary film shoots.',
      highlights: [
        'Sunrise/morning Dal Lake traditional Shikara experience',
        'Mughal Gardens heritage walk & Kashmiri handicraft exploration',
        'Film production shoot: group cinematic frames, participant portraits & travel footage',
        'Unscripted documentary-style moments & behind-the-scenes captures',
        'Final expedition farewell gathering and Kashmiri cuisine exploration'
      ]
    },
    {
      day: 5,
      title: 'SRINAGAR → DELHI',
      subtitle: 'The Journey Home',
      badge: 'FLIGHT RETURN',
      icon: <Plane className="w-4 h-4 text-yellow-400" />,
      overnight: 'Expedition Wrap',
      timing: 'Morning Departure',
      description: 'Expedition wrap-up, final breakfast, farewell group photographs, checkout and return flight departure from Srinagar back to Delhi.',
      highlights: [
        'Farewell breakfast & final group photo session',
        'Hotel checkout & transfer to Srinagar International Airport',
        'Scheduled flight departure back to New Delhi',
        'Official wrap of the 5-Day Kashmir Winter Expedition'
      ]
    }
  ];

  const pricingTiers = [
    {
      id: 'early-bird',
      name: 'EARLY BIRD EXPEDITION',
      price: '₹12,000',
      period: 'per person',
      tag: 'LIMITED EARLY BIRD SEATS',
      highlightColor: 'emerald',
      status: 'AVAILABLE NOW',
      description: 'Special early-access participant slot. Christmas and New Year are the busiest peak seasons in Gulmarg, making advance reservation vital.',
      features: [
        'Full 5 Days / 4 Nights core expedition',
        '4 Nights accommodation (heated rooms where available)',
        'Complete transport Delhi → Jammu → Gulmarg → Srinagar → Delhi',
        'Beginner ski equipment & instructor guidance session',
        'Parindaa Winter Circle & group activities',
        'Documentary travel-film captures & portraits'
      ],
      pathway: 'participant' as PathwayType,
      btnLabel: 'LOCK EARLY BIRD (₹1,000 TOKEN)'
    },
    {
      id: 'regular',
      name: 'REGULAR EXPEDITION',
      price: '₹14,000',
      period: 'per person',
      tag: 'STANDARD EXPEDITION RATE',
      highlightColor: 'amber',
      status: 'APPLICABLE AFTER 20 NOV 2026',
      description: 'Standard booking tier applied once early-bird allocations conclude or after 20 November 2026 due to peak Christmas resort tariffs.',
      features: [
        'Full 5 Days / 4 Nights core expedition',
        '4 Nights mountain & valley accommodation',
        'All interstate & local internal transport vehicles',
        'Skiing gear rental & beginner guidance',
        'Trip manager & emergency medical coordination',
        'High-resolution participant photo & video package'
      ],
      pathway: 'participant' as PathwayType,
      btnLabel: 'RESERVE EXPEDITION SEAT'
    },
    {
      id: 'actor',
      name: 'ACTORS / LEAD CAST',
      price: '₹15,000',
      period: 'per person',
      tag: '100% REFUND SECURITY DEPOSIT',
      highlightColor: 'yellow',
      status: 'UNSCRIPTED LEAD CASTING',
      description: 'Presented strictly for auditioning lead cast candidates. Held as a 100% refundable security deposit returned in full upon project wrap.',
      features: [
        'Official on-screen character casting & scripted/unscripted scenes',
        '100% refundable security deposit clause in written contract',
        'IMDb verified film credits & theatrical festival eligibility',
        'All lodging, heated rooms, ski gear & internal expedition transit included',
        'Dedicated camera crew & Arri anamorphic cinematic framing',
        'Direct collaborative participation in the feature film "Chehra"'
      ],
      pathway: 'actor' as PathwayType,
      btnLabel: 'AUDITION AS LEAD CAST'
    }
  ];

  const inclusions = [
    {
      category: 'Lodging & Stays',
      items: [
        '4 Nights premium accommodation across Gulmarg and Srinagar',
        'Double / triple / multi-sharing arrangements as applicable',
        'Heating arrangements subject to mountain property availability'
      ]
    },
    {
      category: 'Transportation',
      items: [
        'Interstate transit Delhi → Jammu',
        'Scenic highway transfer Jammu → Kashmir Valley',
        'Winter-equipped mountain transfers Gulmarg ↔ Srinagar',
        'Srinagar local transfers, Dal Lake & airport connections',
        'Flight transit Srinagar → Delhi concluding the loop'
      ]
    },
    {
      category: 'Ski & Snow Adventure',
      items: [
        'Beginner skiing experience on Gulmarg slopes',
        'Certified ski equipment (skis, boots, poles) for included session',
        'Trained mountain ski instructor & safety orientation',
        'First snow walk & guided snow photography exploration'
      ]
    },
    {
      category: 'Trip Logistics & Film',
      items: [
        'Dedicated Parindaa trip coordinator throughout 5 days',
        'Local Kashmir logistics, road coordination & group safety',
        'Basic first-aid kit & emergency assistance protocols',
        'Parindaa Winter Circle evening gatherings with music & stories',
        'Documentary-style cinematic travel portraits & group footage'
      ]
    }
  ];

  const exclusions = [
    'Lunch and dinner (flexibility to explore authentic Kashmiri cuisine)',
    'Gulmarg Gondola tickets (optional add-on, tariffs subject to weather/authorities)',
    'Advanced ski lessons or specialized downhill backcountry gear',
    'Optional snow adventures (snowmobiles, sledges, pony rides)',
    'Personal winter attire (heavy feather downs, thermal wear, snow boots, gloves)',
    'Personal shopping, souvenirs, handicrafts or personal snacks',
    'Personal travel insurance & specialized medical expenses',
    'Disruptions or delays caused by severe weather, road blocks or force majeure'
  ];

  return (
    <section
      id="kashmir-expedition"
      className="relative py-20 md:py-28 bg-[#030712] border-t border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-4 h-[1px] bg-cyan-400" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold">
                SHOOTING EXPEDITION LOCATION
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              KASHMIR — THE WINTER EXPEDITION
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light max-w-2xl">
              Gulmarg • Skiing • Snow • Kashmir — A 5-Day winter journey into the mountains, where Kashmir becomes our playground and Gulmarg becomes our cinema snowfield.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>CHRISTMAS WEEK • DEC 2026</span>
            </span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/15 text-slate-200 font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              <span>STARTING FROM DELHI</span>
            </span>
          </div>
        </div>

        {/* Hero Visual Banner with Split Graphic */}
        <div className="relative mb-14 overflow-hidden border border-white/15 bg-black shadow-2xl">
          <div className="relative h-[280px] sm:h-[380px] md:h-[460px] w-full overflow-hidden group">
            <img
              src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789814827/splitimage.im-2_7.png"
              alt="Kashmir Winter Expedition - Gulmarg and Srinagar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-105 brightness-90 group-hover:scale-102 transition-all duration-1000 ease-out"
            />
            {/* Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />

            {/* Top Bar Floating Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-yellow-400 text-black font-mono font-bold text-[9px] uppercase tracking-wider">
                  5 DAYS / 4 NIGHTS
                </span>
                <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-white font-mono text-[9px] uppercase tracking-wider backdrop-blur-md">
                  DECEMBER 2026
                </span>
              </div>
              <span className="px-2.5 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[9px] uppercase tracking-wider backdrop-blur-md hidden sm:inline-flex items-center gap-1">
                <Snowflake className="w-3 h-3 text-cyan-400" />
                PEAK WINTER SNOW
              </span>
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-1">
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>KASHMIR VALLEY & GULMARG POWDER SLOPES</span>
                </div>
                <h3 className="font-title text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                  WINTER FIELDWORK & CINEMA EXPEDITION
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-xl">
                  Ski across Asia’s finest powder snow, drift through mist on Dal Lake shikaras, and step before the Arri LF camera in unscripted Himalayan cinematography.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <CinemaButton
                  variant="primary"
                  onClick={() => onOpenBooking('participant')}
                  className="!py-3 !px-5 text-xs tracking-wider"
                >
                  LOCK EXPEDITION SEAT
                </CinemaButton>
                <button
                  type="button"
                  onClick={() => setShowExtensionModal(true)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  + VAISHNO DEVI
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar Under Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/15 bg-[#070e1d]">
            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase">DURATION</span>
                <span className="text-sm sm:text-base font-bold text-white font-title">5D / 4N Winter Route</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                <Snowflake className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase">HERO ACTIVITY</span>
                <span className="text-sm sm:text-base font-bold text-white font-title">Gulmarg Beginner Ski</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase">EARLY BIRD</span>
                <span className="text-sm sm:text-base font-bold text-emerald-400 font-title">₹12,000 / Person</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-amber-400/10 text-amber-400 border border-amber-400/20">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase">FILM CAPTURE</span>
                <span className="text-sm sm:text-base font-bold text-white font-title">Travel-Film & Portraits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 px-3 text-xs sm:text-sm font-mono uppercase tracking-wider cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'itinerary'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            🗓️ 5-DAY ITINERARY
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 px-3 text-xs sm:text-sm font-mono uppercase tracking-wider cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            💰 TRIP PRICING
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 px-3 text-xs sm:text-sm font-mono uppercase tracking-wider cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'inclusions'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            🎒 WHAT'S INCLUDED / NOT
          </button>
          <button
            onClick={() => setActiveTab('optional')}
            className={`pb-3 px-3 text-xs sm:text-sm font-mono uppercase tracking-wider cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'optional'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            🚠 GONDOLA & EXTENSIONS
          </button>
        </div>

        {/* TAB 1: 5-DAY ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 text-xs font-mono text-slate-400 border-b border-white/5">
              <span>EXPEDITION ROUTE: DELHI ➔ JAMMU ➔ GULMARG ➔ SRINAGAR ➔ DELHI</span>
              <span className="text-cyan-400">CLICK ANY DAY TO EXPAND DETAILED SCHEDULE</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {itineraryDays.map((item, index) => {
                const isExpanded = expandedDay === index;
                return (
                  <div
                    key={index}
                    className={`border transition-all duration-300 ${
                      isExpanded
                        ? 'border-cyan-400/50 bg-[#071120]'
                        : 'border-white/10 bg-[#060c18] hover:border-white/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedDay(isExpanded ? null : index)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                              DAY {item.day}
                            </span>
                            <span className="px-2 py-0.5 bg-white/5 text-[9px] font-mono text-slate-400 uppercase">
                              {item.badge}
                            </span>
                          </div>
                          <h3 className="font-title text-base sm:text-lg font-black text-white uppercase tracking-wide">
                            {item.title} — <span className="text-slate-300 font-normal">{item.subtitle}</span>
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span className="hidden md:inline-block text-[10px] font-mono text-slate-400">
                          {item.overnight}
                        </span>
                        <div className="p-1 text-slate-400 hover:text-white">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-4">
                        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                          {item.description}
                        </p>

                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold block">
                            SCHEDULED LOGS & MILESTONES:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300 bg-white/5 p-2.5 border border-white/5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {item.note && (
                          <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{item.note}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            TIMING: {item.timing}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-yellow-400" />
                            OVERNIGHT: {item.overnight}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TRIP PRICING */}
        {activeTab === 'pricing' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-6 sm:p-7 bg-[#070d1b] border flex flex-col justify-between relative transition-all duration-300 ${
                    tier.id === 'early-bird'
                      ? 'border-emerald-500/60 shadow-xl shadow-emerald-950/20'
                      : tier.id === 'actor'
                      ? 'border-yellow-400/60 shadow-xl shadow-amber-950/20'
                      : 'border-white/15'
                  }`}
                >
                  {/* Top Header Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">
                        {tier.status}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                          tier.id === 'early-bird'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : tier.id === 'actor'
                            ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40'
                            : 'bg-white/10 text-slate-300 border border-white/20'
                        }`}
                      >
                        {tier.tag}
                      </span>
                    </div>

                    <h3 className="font-title text-xl font-black text-white uppercase tracking-tight">
                      {tier.name}
                    </h3>

                    <div className="my-4 flex items-baseline gap-2">
                      <span className="font-title text-3xl sm:text-4xl font-black text-white">
                        {tier.price}
                      </span>
                      <span className="text-xs font-mono text-slate-400 uppercase">
                        {tier.period}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
                        TIER DELIVERABLES:
                      </span>
                      {tier.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <CinemaButton
                      variant={tier.id === 'early-bird' ? 'primary' : 'outline'}
                      onClick={() => onOpenBooking(tier.pathway)}
                      className="w-full !py-3 text-xs tracking-wider"
                    >
                      {tier.btnLabel}
                    </CinemaButton>
                  </div>
                </div>
              ))}
            </div>

            {/* Note banner regarding Gulmarg Christmas Season */}
            <div className="p-5 bg-gradient-to-r from-blue-950/40 to-cyan-950/30 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Peak Season Notice:</strong> Christmas and New Year represent the busiest periods for Gulmarg. Accommodations and winter road permits must be locked in advance to ensure slot availability.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenBooking('participant')}
                className="shrink-0 px-4 py-2 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors"
              >
                LOCK ₹1,000 TOKEN
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: INCLUSIONS & EXCLUSIONS */}
        {activeTab === 'inclusions' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inclusions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-title text-lg font-black text-white uppercase tracking-wider">
                  WHAT IS INCLUDED IN THE EXPEDITION
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inclusions.map((cat, idx) => (
                  <div key={idx} className="p-4 bg-[#070f1e] border border-white/10 space-y-2.5">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                      {cat.category}
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {cat.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusions (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-red-500/30">
                <XCircle className="w-4 h-4 text-red-400" />
                <h3 className="font-title text-lg font-black text-white uppercase tracking-wider">
                  NOT INCLUDED / PERSONAL EXPENSES
                </h3>
              </div>

              <div className="p-5 bg-[#070e1c] border border-white/10 space-y-3">
                <p className="text-xs text-slate-400">
                  The following personal requirements or optional excursions are not included in the standard base trip fee:
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  {exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 text-red-400/80 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 text-xs text-slate-400 space-y-2">
                <span className="font-mono text-[10px] text-yellow-400 uppercase tracking-wider font-bold block">
                  ❄️ WEATHER CONTINGENCY CLAUSE
                </span>
                <p className="leading-relaxed">
                  Snowfall is nature, not a manufactured product. Gulmarg has strong winter-snow potential, but actual skiing conditions, road clearances, and Gondola operations depend on real-time mountain weather. The team reserves the right to adapt itineraries for safety.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GONDOLA & OPTIONAL EXTENSIONS */}
        {activeTab === 'optional' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gulmarg Gondola Card */}
            <div className="p-6 bg-[#071020] border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                  OPTIONAL HIGH-ALTITUDE CABLE CAR
                </span>
                <span className="px-2 py-0.5 bg-cyan-400/10 text-cyan-300 text-[9px] font-mono uppercase">
                  ADDITIONAL DIRECT TARIFF
                </span>
              </div>
              <h3 className="font-title text-2xl font-black text-white uppercase tracking-tight">
                GULMARG GONDOLA (PHASE I & II)
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Experience Asia’s highest operating cable car. Phase I connects Gulmarg base to Kongdoori station (~10,000 ft), and Phase II ascends to Apharwat Peak (~13,000 ft) right beneath the snowbound ridges.
              </p>
              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400">PHASE I (KONGDOORI):</span>
                  <span className="text-white font-mono">Official Winter Tariff</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400">PHASE II (APHARWAT ~13,000 FT):</span>
                  <span className="text-white font-mono">Official Winter Tariff</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400">STATUS:</span>
                  <span className="text-amber-400 font-mono">Weather & slot dependent</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                *Note: Not included in the base package. Tariffs and ticket quotas are verified directly with official authorities prior to collection.
              </p>
            </div>

            {/* Vaishno Devi Extension Card */}
            <div className="p-6 bg-[#070e1c] border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                  OPTIONAL 6D / 5N EXTENSION
                </span>
                <span className="px-2 py-0.5 bg-amber-400/10 text-amber-300 text-[9px] font-mono uppercase">
                  PAID PILGRIMAGE ADD-ON
                </span>
              </div>
              <h3 className="font-title text-2xl font-black text-white uppercase tracking-tight">
                🛕 KASHMIR + VAISHNO DEVI
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                For travelers wishing to combine the winter snow expedition with Mata Vaishno Devi Darshan at Katra. Configured as a structured extension to preserve the integrity of the core 5-day mountain filmmaking itinerary.
              </p>
              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400">EXTENDED ROUTE:</span>
                  <span className="text-white font-mono text-[11px]">Delhi ➔ Katra ➔ Vaishno Devi ➔ Gulmarg ➔ Srinagar ➔ Delhi</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400">TOTAL DURATION:</span>
                  <span className="text-white font-mono">6 Days / 5 Nights</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400">SEAT RESERVATION:</span>
                  <span className="text-cyan-400 font-mono">Dedicated Route Add-on</span>
                </div>
              </div>
              <CinemaButton
                variant="outline"
                onClick={() => onOpenBooking('participant')}
                className="w-full !py-2.5 text-xs tracking-wider !border-amber-400/40 hover:!border-amber-400"
              >
                ENQUIRE VAISHNO DEVI EXTENSION
              </CinemaButton>
            </div>
          </div>
        )}

      </div>

      {/* Extension Modal */}
      {showExtensionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#070e1c] border border-cyan-400/40 p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowExtensionModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-sm"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
              <span>🛕 DEDICATED EXTENSION</span>
            </div>
            <h3 className="font-title text-2xl font-black text-white uppercase">
              KASHMIR + VAISHNO DEVI (6D / 5N)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              This extension provides a dedicated route for participants who wish to perform darshan at Mata Vaishno Devi Shrine at Katra before advancing into the Kashmir snowfields.
            </p>
            <div className="p-3 bg-white/5 border border-white/10 text-xs font-mono text-slate-300 space-y-1">
              <div>• Route: Delhi → Katra → Vaishno Devi → Gulmarg → Srinagar → Delhi</div>
              <div>• Separate ticketing & Katra hotel booking provided</div>
              <div>• Seamless integration with the main Chehra film convoy</div>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <CinemaButton
                variant="primary"
                onClick={() => {
                  setShowExtensionModal(false);
                  onOpenBooking('participant');
                }}
                className="flex-1 !py-3 text-xs"
              >
                RESERVE WITH EXTENSION
              </CinemaButton>
              <button
                type="button"
                onClick={() => setShowExtensionModal(false)}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono uppercase"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
