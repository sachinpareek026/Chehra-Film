import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Snowflake,
  AlertTriangle,
  Info,
  Train,
  Car,
  Camera,
  Film,
  Users,
  ShieldCheck,
  Flame,
  Waves,
  Mountain,
  Phone
} from 'lucide-react';
import { CinemaButton } from './CinemaButton';
import { PathwayType } from '../types';

interface KashmirExpeditionSectionProps {
  onOpenBooking: (pathway?: PathwayType) => void;
}

export const KashmirExpeditionSection: React.FC<KashmirExpeditionSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'pricing' | 'inclusions' | 'optional' | 'packing'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [showExtensionModal, setShowExtensionModal] = useState(false);

  // 8-Day Itinerary (24 – 31 Dec 2026) matching user brief
  const itineraryDays = [
    {
      day: 1,
      dateLabel: '24 DEC',
      title: 'DELHI → KATRA',
      subtitle: 'The Journey Begins',
      badge: 'OVERNIGHT TRANSIT',
      icon: <Train className="w-4 h-4 text-yellow-400/90" />,
      overnight: 'Overnight Travel',
      timing: 'Evening Departure',
      cinemaChapter: 'The Gathering',
      description:
        'Meet the group at the designated reporting point in Delhi, complete participant registration, and begin our comfortable overnight journey towards Katra.',
      highlights: [
        'Participant reporting & group briefing in Delhi',
        'Official introduction to fellow travelers & Parindaa coordinators',
        'Departure from Delhi — overnight highway journey towards Katra'
      ]
    },
    {
      day: 2,
      dateLabel: '25 DEC',
      title: 'VAISHNO DEVI 🛕',
      subtitle: 'The Sacred Pilgrimage',
      badge: 'SACRED YATRA',
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      overnight: 'Katra Hotel Stay',
      timing: 'Morning to Night',
      cinemaChapter: 'Sacred Heights',
      description:
        'Arrive in Katra, check in, freshen up, and commence the sacred Shri Mata Vaishno Devi Yatra through the holy Trikuta mountain trail: Katra → Banganga → Ardhkuwari → Bhawan, concluding with return to Katra.',
      highlights: [
        'Arrival in Katra, check-in, rest & freshen up',
        'Begin Vaishno Devi Yatra: Banganga ➔ Ardhkuwari ➔ Bhawan',
        'Darshan at the sacred shrine and spiritual Himalayan immersion',
        'Descent back to Katra hotel for overnight rest'
      ],
      note: 'Yatra involves substantial walking and cold mountain air; participants can progress at their own comfortable pace.'
    },
    {
      day: 3,
      dateLabel: '26 DEC',
      title: 'KATRA → SRINAGAR → GULMARG ❄️',
      subtitle: 'Into the Kashmir Valley & Snow',
      badge: 'VALLEY TRANSIT',
      icon: <Car className="w-4 h-4 text-cyan-400" />,
      overnight: 'Gulmarg Mountain Stay',
      timing: 'Early Morning to Sunset',
      cinemaChapter: 'The Arrival',
      description:
        'Early departure from Katra through the picturesque mountain tunnels and scenic landscapes of the Kashmir Valley, climbing towards the winter wonderland of Gulmarg.',
      highlights: [
        'Early scenic road departure from Katra into Kashmir Valley',
        'Arrival in snowbound Gulmarg & lodge check-in',
        'Gulmarg Meadow & iconic Pine Forest snow walk',
        'Visit Maharani Temple & historic St. Mary’s Church amidst snow landscapes',
        'Cinematic framing for "The Life of Nandi" documentary chapter'
      ],
      note: 'During winter, the Tangmarg to Gulmarg ascent strictly requires snow-chain equipped vehicles.'
    },
    {
      day: 4,
      dateLabel: '27 DEC',
      title: 'GULMARG — SKIING DAY 1 🎿',
      subtitle: 'Learn to Ski in the Himalayas',
      badge: 'BEGINNER SKI COURSE',
      icon: <Snowflake className="w-4 h-4 text-yellow-400/90" />,
      overnight: 'Gulmarg Mountain Stay',
      timing: 'Full Day Snow Activity',
      cinemaChapter: 'Balance & Fall',
      description:
        'Begin your included 2-day beginner skiing course on the gentle powder snow slopes of Gulmarg with dedicated instructors and complete gear.',
      highlights: [
        'Full gear allocation: certified ski boots, skis & poles',
        'Dedicated ski instructor safety briefing & posture mechanics',
        'Practical snow training: balance, stance, movement, gliding & controlled stopping',
        'Supervised practice sessions around Gulmarg beginner slopes',
        'Optional Gondola excursion towards Phase 1 (Kongdoori) / Phase 2 (Apharwat)',
        'Evening group bonding & storytelling in the mountain warmth'
      ]
    },
    {
      day: 5,
      dateLabel: '28 DEC',
      title: 'GULMARG — SKIING DAY 2 🎿 → SRINAGAR',
      subtitle: 'Technique Mastery & Dal Lake Evening',
      badge: 'SKI COURSE GRADUATION',
      icon: <Waves className="w-4 h-4 text-cyan-400" />,
      overnight: 'Srinagar Valley Stay',
      timing: 'Morning Skiing → Evening Srinagar',
      cinemaChapter: 'Reflection',
      description:
        'Continue day 2 of the skiing course with guided technique improvement, turning, and supervised runs. In the afternoon, transfer to Srinagar for a magical sunset along Dal Lake.',
      highlights: [
        'Second day of ski instruction: turning techniques, speed control & snow confidence',
        'Group skiing photographs & certificate of completion moments',
        'Scenic afternoon drive descending from Gulmarg to Srinagar',
        'Hotel check-in & rest in Srinagar',
        'Evening at Dal Lake & Boulevard Road against glowing winter houseboats',
        'Optional traditional Shikara ride on Dal Lake waters'
      ]
    },
    {
      day: 6,
      dateLabel: '29 DEC',
      title: 'SRINAGAR EXPLORATION 🌊',
      subtitle: 'Lakes, Gardens, Heritage & Cinema',
      badge: 'HERITAGE & CINEMA',
      icon: <Camera className="w-4 h-4 text-amber-400" />,
      overnight: 'Srinagar Valley Stay',
      timing: 'Full Day Exploration',
      cinemaChapter: 'Faith & Questions',
      description:
        'Experience Srinagar’s cultural and spiritual soul: sunrise on Dal Lake, Mughal terraced gardens, Pari Mahal vistas, historic downtown lanes, and Lal Chowk markets.',
      highlights: [
        'Serene Dal Lake sunrise & morning mist photography',
        'Heritage exploration: Shankaracharya temple, Chashme Shahi & Pari Mahal',
        'Winter walks through royal Nishat Bagh & Shalimar Bagh',
        'Old Srinagar alleys, Jhelum riverfronts & vibrant Lal Chowk bazaars',
        'Authentic Kashmiri handicrafts, saffron, pashminas & dry fruit tasting',
        'Cinema filming scenes for "The Life of Nandi"'
      ]
    },
    {
      day: 7,
      dateLabel: '30 DEC',
      title: 'SRINAGAR → DELHI',
      subtitle: 'Final Cinematic Moments & Return',
      badge: 'OVERNIGHT RETURN',
      icon: <Compass className="w-4 h-4 text-yellow-400/90" />,
      overnight: 'Overnight Travel',
      timing: 'Morning Exploration → Afternoon Departure',
      cinemaChapter: 'The Journey Home',
      description:
        'Morning free time for Dal Lake strolls, local shopping, and final portraits before boarding group transportation for the return journey towards Delhi.',
      highlights: [
        'Morning free time along Boulevard & local markets for souvenir shopping',
        'Final group photographs and production wrap interviews',
        'Lunch and departure preparations',
        'Commence the return journey towards New Delhi'
      ]
    },
    {
      day: 8,
      dateLabel: '31 DEC',
      title: 'DELHI',
      subtitle: 'New Year’s Eve Arrival',
      badge: 'EXPEDITION WRAP',
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      overnight: 'Expedition Concludes',
      timing: 'Morning Arrival',
      cinemaChapter: 'The Story Stays',
      description:
        'Arrive back in Delhi on New Year’s Eve with unforgettable memories, new friendships, skiing skills, and your chapter captured in independent cinema.',
      highlights: [
        'Arrival in Delhi in time for New Year celebrations',
        'Farewell group hugs, contact exchanges & digital photo drop',
        'Official wrap: "The journey ends. The story stays."'
      ]
    }
  ];

  // Pricing Tiers with updated requested rates: ₹13,000 Early Bird / ₹14,500 Regular / ₹15,000 Actors
  const pricingTiers = [
    {
      id: 'early-bird',
      name: 'EARLY BIRD EXPEDITION',
      price: '₹13,000',
      period: 'per person',
      tag: 'LIMITED EARLY BIRD SEATS',
      highlightColor: 'emerald',
      status: 'AVAILABLE NOW',
      description: 'Special early-bird rate for selected advance bookings. Christmas peak week in Gulmarg demands early transport & room lock-in.',
      features: [
        'Full 8 Days / 7 Nights comprehensive expedition',
        '5 Nights hotel stay (1N Katra + 2N Gulmarg + 2N Srinagar)',
        '2 Nights comfortable group transit (Delhi ↔ Kashmir loop)',
        '2-Day beginner skiing course with instructor + gear included',
        'Vaishno Devi Yatra experience + Gulmarg snow exploration',
        'Srinagar heritage tour, Dal Lake & "The Life of Nandi" film participation'
      ],
      pathway: 'participant' as PathwayType,
      btnLabel: 'LOCK EARLY BIRD (₹2,000 TOKEN)'
    },
    {
      id: 'regular',
      name: 'REGULAR EXPEDITION',
      price: '₹14,500',
      period: 'per person',
      tag: 'STANDARD EXPEDITION RATE',
      highlightColor: 'amber',
      status: 'APPLICABLE AFTER 20 NOV 2026',
      description: 'Standard booking tier applied after 20 November 2026 due to surging peak Christmas hotel tariffs and winter transport rates.',
      features: [
        'Full 8 Days / 7 Nights complete itinerary',
        '5 Nights hotel stays across Katra, Gulmarg & Srinagar',
        'All interstate & local internal transport vehicles included',
        '2-Day beginner skiing course + instructor + gear included',
        'Trip coordinator, safety oversight & medical assistance',
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
      description: 'Fixed participant rate for auditioning lead cast candidates. Held as a 100% refundable security deposit returned in full upon project wrap.',
      features: [
        'Official on-screen character casting in "The Life of Nandi" / "Chehra"',
        '100% refundable security deposit clause in written contract',
        'IMDb verified film credits & theatrical festival eligibility',
        'All lodging, 2-day skiing course & internal transit included',
        'Dedicated camera crew & Arri anamorphic cinematic framing',
        'Full creative collaboration with director & technical team'
      ],
      pathway: 'actor' as PathwayType,
      btnLabel: 'AUDITION AS LEAD CAST'
    }
  ];

  const inclusions = [
    {
      category: 'Transportation',
      items: [
        'Delhi → Katra group transport',
        'Katra → Kashmir Valley scenic transfer',
        'Kashmir local transportation as per itinerary',
        'Srinagar → Delhi return transport'
      ]
    },
    {
      category: 'Accommodation (5 Nights Stays)',
      items: [
        '1 Night hotel accommodation in Katra',
        '2 Full Nights accommodation in snowy Gulmarg',
        '2 Nights hotel accommodation in Srinagar',
        'Shared room arrangements as specified during booking'
      ]
    },
    {
      category: '2-Day Skiing Course (Included)',
      items: [
        '2-day beginner skiing course in Gulmarg snowfields',
        'Dedicated beginner ski instructor guidance',
        'Complete ski equipment included: Skis, boots & poles',
        'Practical balance, movement, turning & stopping sessions'
      ]
    },
    {
      category: 'Experiences & Film Integration',
      items: [
        'Shri Mata Vaishno Devi Yatra experience',
        'Gulmarg winter meadow & pine forest snow walks',
        'Srinagar sightseeing: Dal Lake Boulevard, Mughal gardens & Lal Chowk',
        '"The Life of Nandi" experimental travel cinema participation',
        'Parindaa trip coordinator & group safety assistance'
      ]
    }
  ];

  const exclusions = [
    'Gulmarg Gondola tickets (optional add-on, subject to weather & official availability)',
    'Shikara ride on Dal Lake (available as optional paid experience)',
    'Pony rides / sledge / snowmobile rentals',
    'Helicopter / battery car services for Vaishno Devi Yatra',
    'Lunch and dinner (flexibility to savor authentic Kashmiri Wazwan & local food)',
    'Personal shopping, dry fruits, saffron, handicrafts or souvenirs',
    'Personal winter attire (heavy jacket, thermals, gloves, snow shoes)',
    'Travel insurance & personal emergency medical expenses',
    'Any additional expense caused by weather disruptions, road closures, or force majeure'
  ];

  const packingEssentials = [
    { name: 'Heavy Winter Jacket', desc: 'Down feather or windproof heavy insulated jacket for sub-zero temperatures.' },
    { name: 'Thermal Innerwear', desc: 'At least 2–3 pairs of top and bottom thermal base layers.' },
    { name: 'Waterproof Winter Boots', desc: 'Insulated shoes/boots with sturdy grip for snow walking.' },
    { name: 'Waterproof Gloves', desc: 'Crucial for skiing and snow handling; avoid thin wool gloves that soak.' },
    { name: 'Woollen Cap & Muffler', desc: 'To protect ears and head from mountain wind chill.' },
    { name: 'Warm Woollen Socks', desc: '4–5 pairs of thick woollen or thermal socks.' },
    { name: 'UV Sunglasses / Ski Goggles', desc: 'Protects eyes from intense snow glare and high-altitude UV.' },
    { name: 'Sunscreen & Lip Balm', desc: 'SPF 50+ to prevent mountain sunburn and windburn chapping.' },
    { name: 'Power Bank', desc: 'Sub-zero temperatures rapidly drain phone batteries; keep a 10,000+ mAh pack.' },
    { name: 'Personal Medicines', desc: 'Motion sickness pills, cold/flu relief, pain relief & prescription medicines.' },
    { name: 'Government ID', desc: 'Original Aadhaar / Voter ID / Passport required for check-in and checkpoints.' }
  ];

  return (
    <section
      id="kashmir-expedition"
      className="relative py-24 md:py-32 bg-[#06080D] border-t border-b border-white/10 overflow-hidden"
    >
      <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title & Positioning */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-yellow-400/90" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400/90 uppercase">
                EXPEDITION CF01 • CHEHRA × PARINDAA
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F4F1EA] tracking-[0.02em] leading-[1.15]">
              Experience Kashmir Differently
            </h2>
            <p className="mt-3 text-sm text-[#B8B4AC] font-normal font-sans max-w-3xl leading-[1.65]">
              This December, leave the ordinary sightseeing trip behind. Journey from the sacred mountains of Vaishno Devi into the snow-covered landscapes of Gulmarg, experience a 2-day beginner skiing course, and discover the lakes, gardens and streets of Srinagar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-yellow-400/90" />
              <span>24 – 31 DEC 2026</span>
            </span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-yellow-400/90" />
              <span>7 NIGHTS / 8 DAYS</span>
            </span>
            <span className="px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400/90 font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-yellow-400/90" />
              <span>EARLY BIRD: ₹13,000</span>
            </span>
          </div>
        </div>

        {/* Hero Visual Banner with Split Graphic */}
        <div className="relative mb-14 overflow-hidden border border-white/10 bg-black">
          <div className="relative h-[300px] sm:h-[400px] md:h-[480px] w-full overflow-hidden group">
            <img
              src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789814827/splitimage.im-2_7.png"
              alt="Kashmir Winter Escape - Gulmarg, Vaishno Devi and Srinagar"
              referrerPolicy="no-referrer"
              className="w-full h-[300px] sm:h-full object-cover object-[52%_42%] sm:object-center scale-[2.3] origin-[52%_42%] sm:scale-100 sm:origin-center filter contrast-105 brightness-90 group-hover:scale-[2.35] sm:group-hover:scale-102 transition-all duration-700 ease-out"
            />
            {/* Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080D] via-[#06080D]/40 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />

            {/* Top Bar Floating Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-yellow-400/90 text-[#070A0F] font-mono font-medium text-[9px] uppercase tracking-wider">
                  7 NIGHTS / 8 DAYS
                </span>
                <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-white/90 font-mono text-[9px] uppercase tracking-wider">
                  CHRISTMAS HOLIDAY WEEK
                </span>
              </div>
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white/90 font-mono text-[9px] uppercase tracking-wider hidden sm:inline-flex items-center gap-1.5">
                <Snowflake className="w-3 h-3 text-yellow-400/90" />
                PEAK WINTER SNOW IN GULMARG
              </span>
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-yellow-400/90 font-mono text-[10px] tracking-widest uppercase mb-1">
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>VAISHNO DEVI • GULMARG POWDER SLOPES • SRINAGAR DAL LAKE</span>
                </div>
                <h3 className="font-title text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F4F1EA] tracking-[0.02em] leading-tight">
                  Kashmir Winter Escape 2026
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <CinemaButton
                  variant="primary"
                  onClick={() => onOpenBooking('participant')}
                  className="!py-3 !px-6 text-xs tracking-wider font-medium"
                >
                  BOOK YOUR SEAT — ₹13,000
                </CinemaButton>
                <button
                  type="button"
                  onClick={() => setShowExtensionModal(true)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  EXPEDITION DETAILS
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar Under Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/10 bg-[#080B12]">
            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-white/5 text-yellow-400/90 border border-white/10">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">DURATION</span>
                <span className="text-sm sm:text-base font-sans font-semibold text-[#F4F1EA]">7N / 8D Winter Plan</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-white/5 text-yellow-400/90 border border-white/10">
                <Snowflake className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">HERO ACTIVITY</span>
                <span className="text-sm sm:text-base font-sans font-semibold text-[#F4F1EA]">2-Day Skiing Course</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-white/5 text-yellow-400/90 border border-white/10">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">EARLY BIRD</span>
                <span className="text-sm sm:text-base font-sans font-semibold text-yellow-400/90">₹13,000 / Person</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-white/5 text-yellow-400/90 border border-white/10">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">CINEMA PROJECT</span>
                <span className="text-sm sm:text-base font-sans font-semibold text-[#F4F1EA]">The Life of Nandi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Route Flow Diagram */}
        <div className="mb-14 p-5 bg-[#090C14] border border-white/10">
          <div className="flex items-center justify-between mb-4 text-xs font-mono text-white/60">
            <span className="font-semibold text-yellow-400/90 uppercase tracking-wider">EXPEDITION ROUTE CORRIDOR</span>
            <span>ROUND-TRIP FROM NEW DELHI</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center font-mono text-xs">
            <div className="p-3 bg-white/[0.02] border border-white/10">
              <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">ORIGIN</span>
              <strong className="text-white">DELHI</strong>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/10">
              <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">STAGE 1</span>
              <strong className="text-white/90">KATRA</strong>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/10">
              <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">PILGRIMAGE</span>
              <strong className="text-white/90">VAISHNO DEVI</strong>
            </div>
            <div className="p-3 bg-yellow-400/5 border border-yellow-400/30">
              <span className="block text-[9px] text-yellow-400/90 uppercase tracking-wider mb-0.5">2 DAYS SKI</span>
              <strong className="text-yellow-400/90">GULMARG</strong>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/10">
              <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">STAGE 3</span>
              <strong className="text-white/90">SRINAGAR</strong>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/10">
              <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">CONCLUSION</span>
              <strong className="text-white">DELHI</strong>
            </div>
          </div>
        </div>

        {/* Interactive Tab Switcher */}
        <div id="kashmir-itinerary-tabs" className="flex border-b border-white/10 mb-10 overflow-x-auto no-scrollbar gap-1 sm:gap-4">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 px-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'itinerary'
                ? 'border-yellow-400/90 text-yellow-400/90 font-medium'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            01. ITINERARY
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 px-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'border-yellow-400/90 text-yellow-400/90 font-medium'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            02. PRICING & TIERS
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 px-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'inclusions'
                ? 'border-yellow-400/90 text-yellow-400/90 font-medium'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            03. INCLUSIONS & LOGISTICS
          </button>
          <button
            onClick={() => setActiveTab('optional')}
            className={`pb-3 px-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'optional'
                ? 'border-yellow-400/90 text-yellow-400/90 font-medium'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            04. GONDOLA & EXPERIENCES
          </button>
          <button
            onClick={() => setActiveTab('packing')}
            className={`pb-3 px-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'packing'
                ? 'border-yellow-400/90 text-yellow-400/90 font-medium'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            05. PACKING LIST
          </button>
        </div>

        {/* TAB 1: 8-DAY ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 text-xs font-mono text-white/50 border-b border-white/5">
              <span>EXPEDITION CORRIDOR: DELHI ➔ KATRA ➔ VAISHNO DEVI ➔ GULMARG ➔ SRINAGAR ➔ DELHI</span>
              <span className="text-yellow-400/90">CLICK ANY DAY TO EXPAND DETAILED SCHEDULE</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {itineraryDays.map((item, index) => {
                const isExpanded = expandedDay === index;
                return (
                  <div
                    key={index}
                    className={`border transition-all duration-300 ${
                      isExpanded
                        ? 'border-yellow-400/40 bg-[#0B0F17]'
                        : 'border-white/10 bg-[#080B12] hover:border-white/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedDay(isExpanded ? null : index)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                          <span className="text-base sm:text-lg md:text-xl font-mono tracking-wider text-yellow-400/90 font-bold uppercase">
                            DAY {item.day}
                          </span>
                          <span className="text-xs sm:text-sm font-mono tracking-wide text-white/70">
                            • {item.dateLabel}
                          </span>
                          <span className="px-2 py-0.5 bg-white/5 text-[9px] sm:text-[10px] font-mono text-white/60 uppercase">
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="font-serif text-base sm:text-lg text-white tracking-wide">
                          {item.title} <span className="text-white/50 font-sans text-sm font-light">— {item.subtitle}</span>
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span className="hidden md:inline-block text-[10px] font-mono text-white/50">
                          {item.overnight}
                        </span>
                        <div className="p-1 text-white/40 hover:text-white">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-yellow-400/90" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                            {item.description}
                          </p>
                          {item.cinemaChapter && (
                            <span className="hidden sm:inline-block shrink-0 px-2.5 py-1 bg-white/5 border border-yellow-400/30 text-yellow-400/90 font-mono text-[10px] uppercase tracking-wider">
                              Cinema Chapter: {item.cinemaChapter}
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-mono text-yellow-400/90 tracking-widest uppercase block">
                            SCHEDULED LOGS & MILESTONES
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2 text-xs text-white/80 bg-white/[0.02] p-2.5 border border-white/5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400/90 shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {item.note && (
                          <div className="p-3 bg-white/[0.02] border-l-2 border-yellow-400/90 text-white/80 text-xs flex items-start gap-2 font-mono">
                            <AlertTriangle className="w-4 h-4 text-yellow-400/90 shrink-0 mt-0.5" />
                            <span>{item.note}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-white/50">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-yellow-400/90" />
                            TIMING: {item.timing}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-yellow-400/90" />
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
                  className={`p-6 sm:p-7 bg-[#080B12] border flex flex-col justify-between relative transition-all duration-300 ${
                    tier.id === 'early-bird'
                      ? 'border-yellow-400/50'
                      : tier.id === 'actor'
                      ? 'border-white/20'
                      : 'border-white/10'
                  }`}
                >
                  {/* Top Header Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-white/50">
                        {tier.status}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider ${
                          tier.id === 'early-bird'
                            ? 'bg-yellow-400/90 text-[#070A0F] font-semibold'
                            : tier.id === 'actor'
                            ? 'bg-white/10 text-white/90 border border-white/20'
                            : 'bg-white/5 text-white/70 border border-white/10'
                        }`}
                      >
                        {tier.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-white tracking-wide">
                      {tier.name}
                    </h3>

                    <div className="my-4 flex items-baseline gap-2">
                      <span className="font-serif text-3xl sm:text-4xl text-white">
                        {tier.price}
                      </span>
                      <span className="text-xs font-mono text-white/50 uppercase">
                        {tier.period}
                      </span>
                    </div>

                    <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                        TIER DELIVERABLES
                      </span>
                      {tier.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400/90 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <CinemaButton
                      variant={tier.id === 'early-bird' ? 'primary' : 'outline'}
                      onClick={() => onOpenBooking(tier.pathway)}
                      className="w-full !py-3 text-xs tracking-wider font-medium"
                    >
                      {tier.btnLabel}
                    </CinemaButton>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Price Table */}
            <div className="p-6 bg-[#080B12] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg text-white tracking-wide">
                  Expedition Rate Comparison
                </h4>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">7 NIGHTS / 8 DAYS EXPEDITION</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 uppercase">
                      <th className="py-2.5 pr-4">Package Tier</th>
                      <th className="py-2.5 px-4">Duration</th>
                      <th className="py-2.5 px-4 text-yellow-400/90">Early Bird (Before 20 Nov)</th>
                      <th className="py-2.5 px-4 text-white/70">Regular (After 20 Nov)</th>
                      <th className="py-2.5 pl-4">Key Inclusions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/80">
                    <tr>
                      <td className="py-3 pr-4 font-medium text-white">Kashmir Winter Escape (Full Transport)</td>
                      <td className="py-3 px-4">7N / 8D</td>
                      <td className="py-3 px-4 text-yellow-400/90 font-semibold">₹13,000 / Person</td>
                      <td className="py-3 px-4 text-white/70">₹14,500 / Person</td>
                      <td className="py-3 pl-4 text-white/50 font-sans">Vaishno Devi + 2D Gulmarg Ski Course + Srinagar</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-white">Actors / Lead Cast Role</td>
                      <td className="py-3 px-4">7N / 8D</td>
                      <td className="py-3 px-4 text-yellow-400/90 font-semibold">₹15,000 (100% Refund Deposit)</td>
                      <td className="py-3 px-4 text-white/70">₹15,000 Fixed</td>
                      <td className="py-3 pl-4 text-white/50 font-sans">Lead Screen Role + IMDb Credit + All Inclusions</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-white">Optional Gulmarg Gondola (Phase 1/2)</td>
                      <td className="py-3 px-4">—</td>
                      <td className="py-3 px-4 text-white/50">Separate Ticket</td>
                      <td className="py-3 px-4 text-white/50">Separate Ticket</td>
                      <td className="py-3 pl-4 text-white/50 font-sans">Apharwat / Kongdoori Cable Car Access</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Early bird deadline notice */}
            <div className="p-5 bg-[#0A0D14] border border-yellow-400/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-yellow-400/90 shrink-0 mt-0.5" />
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  <strong className="text-white">Early Bird Guarantee:</strong> Lock your seat today with a <span className="text-yellow-400/90 font-mono font-medium">₹2,000 token</span>. Rate is ₹13,000/person for early-bird slots; increases to ₹14,500 after 20 November 2026 due to Christmas peak rush.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenBooking('participant')}
                className="shrink-0 px-5 py-2.5 bg-yellow-400/90 text-[#070A0F] font-mono font-medium text-xs uppercase tracking-wider hover:bg-yellow-300/90 transition-colors cursor-pointer"
              >
                LOCK WITH ₹2,000 TOKEN
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: INCLUSIONS & EXCLUSIONS */}
        {activeTab === 'inclusions' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inclusions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <CheckCircle2 className="w-4 h-4 text-yellow-400/90" />
                <h3 className="font-serif text-lg text-white tracking-wide">
                  Included in Your Expedition
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inclusions.map((cat, idx) => (
                  <div key={idx} className="p-4 bg-[#080B12] border border-white/10 space-y-2.5">
                    <span className="text-[11px] font-mono font-medium text-yellow-400/90 uppercase tracking-wider block">
                      {cat.category}
                    </span>
                    <ul className="space-y-1.5 text-xs text-white/70">
                      {cat.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-1.5">
                          <span className="text-yellow-400/90 font-bold shrink-0">•</span>
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
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <XCircle className="w-4 h-4 text-white/50" />
                <h3 className="font-serif text-lg text-white tracking-wide">
                  Not Included / Personal Expenses
                </h3>
              </div>

              <div className="p-5 bg-[#080B12] border border-white/10 space-y-3">
                <p className="text-xs text-white/50">
                  The following optional excursions or personal requirements are not covered under the base package:
                </p>
                <ul className="space-y-2 text-xs text-white/70">
                  {exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#080B12] border-l-2 border-yellow-400/90 text-xs text-white/70 space-y-1.5">
                <span className="font-mono text-[10px] text-yellow-400/90 uppercase tracking-wider block">
                  WEATHER & MOUNTAIN SAFETY PROTOCOL
                </span>
                <p className="leading-relaxed">
                  December in Kashmir brings true Himalayan winter conditions. Snowfall, road accessibility, Gondola operations and skiing terrain depend on real-time mountain safety. Parindaa trip coordinators reserve the authority to adjust routes for group welfare.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GONDOLA & OPTIONAL EXPERIENCES */}
        {activeTab === 'optional' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gulmarg Gondola Card */}
            <div className="p-6 bg-[#080B12] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                  HIGH-ALTITUDE CABLE CAR
                </span>
                <span className="px-2 py-0.5 bg-white/5 text-white/70 text-[9px] font-mono uppercase">
                  DIRECT OFFICIAL TICKET
                </span>
              </div>
              <h3 className="font-serif text-2xl text-white tracking-tight">
                Gulmarg Gondola (Phase I & II)
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Experience Asia’s highest operating cable car. Phase 1 ascends towards Kongdoori station (~10,000 ft), and Phase 2 reaches Apharwat Peak (~13,000 ft) right beneath the snowbound ridges.
              </p>
              <div className="space-y-2 text-xs text-white/80 pt-2 border-t border-white/10 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">PHASE 1 (KONGDOORI):</span>
                  <span className="text-white">Separate Official Ticket</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">PHASE 2 (APHARWAT ~13,000 FT):</span>
                  <span className="text-white">Subject to weather & operation</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">SKI COURSE REQUIREMENT:</span>
                  <span className="text-yellow-400/90">Not required for included ski course</span>
                </div>
              </div>
              <p className="text-[11px] text-white/50 italic font-sans">
                *The Gondola is completely optional and is not required for the included 2-day beginner skiing course conducted on Gulmarg beginner snow meadows.
              </p>
            </div>

            {/* The Life of Nandi Cinema Experience */}
            <div className="p-6 bg-[#080B12] border border-yellow-400/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-yellow-400/90 uppercase">
                  INDEPENDENT CINEMA PROJECT
                </span>
                <span className="px-2 py-0.5 bg-yellow-400/10 text-yellow-400/90 text-[9px] font-mono uppercase">
                  CHEHRA FILMS
                </span>
              </div>
              <h3 className="font-serif text-2xl text-white tracking-tight">
                The Life of Nandi
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Travel through Kashmir while becoming part of an experimental travel cinema experience. A cinematic exploration of travel, nature, faith, questions, people, and silence across the Himalayan snowfields.
              </p>
              <div className="space-y-2 text-xs text-white/80 pt-2 border-t border-white/10 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">CINEMA CHAPTERS:</span>
                  <span className="text-white text-[11px]">Arrival • Balance • Reflection • Silence</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">CAMERA GEAR:</span>
                  <span className="text-white">Arri 4K & Anamorphic Lenses</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">PARTICIPANT ROLE:</span>
                  <span className="text-yellow-400/90">Naturalistic / Unscripted</span>
                </div>
              </div>
              <CinemaButton
                variant="outline"
                onClick={() => onOpenBooking('actor')}
                className="w-full !py-2.5 text-xs tracking-wider"
              >
                EXPLORE ACTOR / SCREEN ROLES
              </CinemaButton>
            </div>
          </div>
        )}

        {/* TAB 5: WHAT TO PACK */}
        {activeTab === 'packing' && (
          <div className="space-y-6">
            <div className="p-4 bg-[#080B12] border-l-2 border-yellow-400/90 text-xs text-white/70 font-mono">
              <strong className="text-white font-normal">Winter Advisory:</strong> Kashmir in December is sub-zero cold. Gulmarg temperatures regularly drop below -5°C to -10°C at night. Carrying appropriate thermal layers and waterproof footwear is mandatory.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {packingEssentials.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#080B12] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-yellow-400/90 text-xs font-mono font-medium uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400/90 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <p className="text-xs text-white/70 font-light leading-relaxed pl-5 font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#080B12] border border-white/10 text-xs text-white/70">
              <span className="text-yellow-400/90 font-mono uppercase tracking-wider block mb-1">SKIING ATTIRE RECOMMENDATION</span>
              <p>
                We recommend waterproof ski jackets or windproof winter trousers over warm thermal innerwear, thick woollen socks, and waterproof gloves to ensure snow doesn't seep through during ski lessons.
              </p>
            </div>
          </div>
        )}

        {/* Final Booking Call to Action */}
        <div className="mt-16 p-8 sm:p-12 bg-[#080B12] border border-yellow-400/30 text-center space-y-5">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-yellow-400/90 block">
            PARINDAA TRAVELS • LIMITED WINTER SEATS
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
            Don't Just Visit Kashmir. Experience Its Winter.
          </h3>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl mx-auto leading-relaxed">
            7 Nights / 8 Days • 2 Full Days in Gulmarg • 2-Day Beginner Skiing Course with Gear & Instructor Included • Vaishno Devi Yatra • Dal Lake • The Life of Nandi
          </p>
          <div className="flex items-center justify-center gap-4 py-2 font-mono">
            <span className="text-yellow-400/90 font-serif text-3xl sm:text-4xl">₹13,000</span>
            <span className="text-white/60 text-xs uppercase">Early Bird / Person</span>
            <span className="text-white/30 text-xs line-through">₹14,500 after 20 Nov</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <CinemaButton
              variant="primary"
              onClick={() => onOpenBooking('participant')}
              className="!py-3.5 !px-8 text-xs tracking-wider font-medium"
            >
              BOOK YOUR SEAT (₹2,000 TOKEN)
            </CinemaButton>
            <button
              type="button"
              onClick={() => setShowExtensionModal(true)}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              VIEW FULL DETAILS
            </button>
          </div>
        </div>

      </div>

      {/* Full Details Modal */}
      {showExtensionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0D14] border border-yellow-400/30 p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowExtensionModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white font-mono text-sm cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-yellow-400/90 font-mono text-xs uppercase">
              <span>EXPEDITION CF01 • KASHMIR 2026</span>
            </div>
            <h3 className="font-serif text-2xl text-white">
              Vaishno Devi × Gulmarg × Srinagar
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light font-sans">
              This expedition unites the spiritual pilgrimage of Mata Vaishno Devi at Katra with 2 full days of snow immersion in Gulmarg (featuring an included 2-day beginner skiing course), cultural exploration in Srinagar & Dal Lake, and film documentation in "The Life of Nandi".
            </p>
            <div className="p-4 bg-white/[0.02] border border-white/10 text-xs font-mono text-white/80 space-y-2">
              <div>• <strong>Dates:</strong> 24 – 31 December 2026 (7N / 8D)</div>
              <div>• <strong>Route:</strong> Delhi → Katra → Vaishno Devi → Gulmarg → Srinagar → Delhi</div>
              <div>• <strong>Skiing:</strong> 2-Day Beginner Course + Instructor + Boots/Skis/Poles included</div>
              <div>• <strong>Pricing:</strong> ₹13,000 Early Bird / ₹14,500 after 20 Nov 2026</div>
              <div>• <strong>Pre-booking Token:</strong> ₹2,000 only to lock early bird pricing</div>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <CinemaButton
                variant="primary"
                onClick={() => {
                  setShowExtensionModal(false);
                  onOpenBooking('participant');
                }}
                className="flex-1 !py-3 text-xs font-medium"
              >
                BOOK YOUR SEAT NOW
              </CinemaButton>
              <button
                type="button"
                onClick={() => setShowExtensionModal(false)}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-mono uppercase cursor-pointer"
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
