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
  Phone,
  Sparkles,
  Ship,
  Utensils,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  FileText,
  Download,
  Eye,
  X
} from 'lucide-react';
import { CinemaButton } from './CinemaButton';
import { PathwayType } from '../types';
import { FamilyPricingCalculator } from './FamilyPricingCalculator';
import {
  FAMILY_ITINERARY_DAYS,
  FAMILY_INCLUSIONS,
  FAMILY_KEY_PERKS
} from '../data/familyTripData';

interface KashmirExpeditionSectionProps {
  onOpenBooking: (pathway?: PathwayType) => void;
}

export const KashmirExpeditionSection: React.FC<KashmirExpeditionSectionProps> = ({
  onOpenBooking,
}) => {
  const [packageType, setPackageType] = useState<'individual' | 'family'>('individual');
  const [activeTab, setActiveTab] = useState<'itinerary' | 'pricing' | 'inclusions' | 'optional' | 'packing'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [familyExpandedDay, setFamilyExpandedDay] = useState<number | null>(0);
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
      title: 'GULMARG — SKI 2-DAY CERTIFICATE COURSE (DAY 1) 🎿',
      subtitle: 'Experts Training Program in the Himalayas',
      badge: '2-DAY CERTIFICATE COURSE',
      icon: <Snowflake className="w-4 h-4 text-yellow-400/90" />,
      overnight: 'Gulmarg Mountain Stay',
      timing: 'Full Day Snow Activity',
      cinemaChapter: 'Balance & Fall',
      description:
        'Begin your included Gulmarg Ski 2-Day Certificate Course under Experts Training Program on the powder snow slopes of Gulmarg with dedicated master instructors, certified curriculum, and complete gear.',
      highlights: [
        'Full gear allocation: certified ski boots, skis & poles',
        'Dedicated ski instructor safety briefing & posture mechanics',
        'Practical snow training: balance, stance, movement, gliding & controlled stopping',
        'Supervised practice sessions around Gulmarg beginner slopes under experts training program',
        'Optional Gondola excursion towards Phase 1 (Kongdoori) / Phase 2 (Apharwat)',
        'Evening group bonding & storytelling in the mountain warmth'
      ]
    },
    {
      day: 5,
      dateLabel: '28 DEC',
      title: 'GULMARG — SKI 2-DAY CERTIFICATE COURSE (DAY 2) 🎿 → SRINAGAR',
      subtitle: 'Technique Mastery & Course Certification',
      badge: 'CERTIFICATE AWARDED',
      icon: <Waves className="w-4 h-4 text-cyan-400" />,
      overnight: 'Srinagar Valley Stay',
      timing: 'Morning Skiing → Evening Srinagar',
      cinemaChapter: 'Reflection',
      description:
        'Complete Day 2 of the Gulmarg Ski 2-Day Certificate Course under Experts Training Program with guided technique improvement, turning mastery, supervised runs, and certificate of completion award.',
      highlights: [
        'Second day of ski instruction: turning techniques, speed control & snow confidence',
        'Official certificate of course completion under experts training program',
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

  // Pricing Tiers with updated requested rates: ₹13,000 Early Bird / ₹14,500 Regular / ₹16,000 Actors
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
        'Full 8 Days / 7 Nights comprehensive expedition (24 - 31 Dec)',
        '₹2,000 security booking amount to confirm & lock seat',
        'Balance ₹11,000 cleared 20 days prior to departure',
        '5 Nights hotel stay (1N Katra + 2N Gulmarg + 2N Srinagar - 2 sharing preserved)',
        '2 Nights comfortable group transit (Delhi ↔ Kashmir loop)',
        'Gulmarg Ski 2-Day Certificate Course under Experts Training Program with gear + mentor included',
        'Vaishno Devi Yatra experience + Gulmarg snow exploration'
      ],
      pathway: 'participant' as PathwayType,
      btnLabel: 'LOCK SEAT (₹2,000 SECURITY)'
    },
    {
      id: 'regular',
      name: 'REGULAR EXPEDITION',
      price: '₹15,000',
      period: 'per person (after 20 Oct)',
      tag: 'STANDARD EXPEDITION RATE',
      highlightColor: 'amber',
      status: 'APPLICABLE AFTER 20 OCT 2026',
      description: 'Standard booking tier applied after 20 October 2026 (₹15,000 per person) due to surging peak Christmas hotel tariffs and winter transport rates.',
      features: [
        'Full 8 Days / 7 Nights complete itinerary',
        '5 Nights hotel stays across Katra, Gulmarg & Srinagar (2 sharing)',
        'All interstate & local internal transport vehicles included',
        'Gulmarg Ski 2-Day Certificate Course under Experts Training Program with gear + mentor included',
        'Trip coordinator, safety oversight & medical assistance',
        'High-resolution participant photo & video package'
      ],
      pathway: 'participant' as PathwayType,
      btnLabel: 'RESERVE EXPEDITION SEAT'
    },
    {
      id: 'actor',
      name: 'ACTORS / LEAD CAST',
      price: '₹16,000 / ₹18,000',
      period: '100% refundable deposit',
      tag: '₹3,000 SECURITY AFTER SELECTION',
      highlightColor: 'yellow',
      status: 'LAST DATE TO APPLY: 20TH NOV',
      description: 'Total amount is ₹16,000 before 20th Oct, rising to ₹18,000 after 20th Oct (100% refundable production security deposit). Zero fee to apply; ₹3,000 security booking amount payable only AFTER role selection. Last date: 20th Nov.',
      features: [
        'Official on-screen character casting in "The Life of Nandi" / "Chehra"',
        'Total ₹16,000 before 20 Oct / ₹18,000 after 20 Oct (100% refundable deposit upon cost recovery)',
        '₹3,000 security booking amount payable only AFTER role selection',
        'Pending balance cleared 20 days prior to departure',
        'IMDb verified film credits & theatrical festival eligibility',
        'All lodging (2 sharing), Gulmarg Ski 2-Day Certificate Course & internal transit included'
      ],
      pathway: 'actor' as PathwayType,
      btnLabel: 'AUDITION FOR CAST (LAST DATE: 20 NOV)'
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
      category: 'Gulmarg Ski 2-Day Certificate Course under Experts Training Program',
      items: [
        'Gulmarg Ski 2-Day Certificate Course under certified experts training program',
        'Official certificate of course completion awarded upon training wrap',
        'Dedicated master ski instructors & hands-on technique coaching',
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

        {/* Primary Package Mode Switcher: Individual vs Family/Group */}
        <div className="mb-10 flex justify-center">
          <div className="p-1.5 bg-[#090C14] border border-white/15 inline-flex w-full max-w-2xl shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setPackageType('individual');
              }}
              className={`flex-1 py-3 px-3 sm:px-5 text-center transition-all cursor-pointer ${
                packageType === 'individual'
                  ? 'bg-yellow-400 text-black shadow-lg font-bold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-mono text-xs sm:text-sm uppercase tracking-wider">
                <Users className="w-4 h-4 shrink-0" />
                <span>INDIVIDUAL PACKAGE</span>
              </div>
              <span className={`block text-[10px] sm:text-[11px] mt-0.5 ${packageType === 'individual' ? 'text-black/80 font-medium' : 'text-white/40'}`}>
                Solo &amp; Filmmaking Expedition · Flat ₹13,000
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPackageType('family');
              }}
              className={`flex-1 py-3 px-3 sm:px-5 text-center transition-all cursor-pointer ${
                packageType === 'family'
                  ? 'bg-yellow-400 text-black shadow-lg font-bold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-mono text-xs sm:text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-950" />
                <span>FAMILY / GROUP PACKAGE</span>
              </div>
              <span className={`block text-[10px] sm:text-[11px] mt-0.5 ${packageType === 'family' ? 'text-black/80 font-medium' : 'text-white/40'}`}>
                4+ Travellers · Delhi to Delhi · From ₹9,500/Person
              </span>
            </button>
          </div>
        </div>

        {/* Section Title & Positioning */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-yellow-400/90" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-yellow-400/90 uppercase">
                {packageType === 'family' ? 'PARINDAA.IN × CHEHRA FILMS • KASHMIR FAMILY ESCAPE' : 'EXPEDITION CF01 • CHEHRA × PARINDAA'}
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F4F1EA] tracking-[0.02em] leading-[1.15]">
              {packageType === 'family' ? 'Kashmir Family & Group Escape' : 'Experience Kashmir Differently'}
            </h2>
            <p className="mt-3 text-sm text-[#B8B4AC] font-normal font-sans max-w-3xl leading-[1.65]">
              {packageType === 'family'
                ? "Let's make this New Year and Holidays your lifetime experience. 8 Days / 7 Nights round-trip journey from New Delhi (24 – 31 Dec) featuring Mata Vaishno Devi darshan, Gulmarg Gondola cable car ride (included), snow activities, Pahalgam valley exploration, and an authentic 1-night Deluxe Houseboat stay on Dal Lake."
                : "This December, leave the ordinary sightseeing trip behind. Journey from the sacred mountains of Vaishno Devi into the snow-covered landscapes of Gulmarg, complete the Gulmarg Ski 2-Day Certificate Course under Experts Training Program, and discover the lakes, gardens and streets of Srinagar."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-yellow-400/90" />
              <span>24 – 31 DEC 2026</span>
            </span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-yellow-400/90" />
              <span>{packageType === 'family' ? '8 DAYS / 7 NIGHTS' : '7 NIGHTS / 8 DAYS'}</span>
            </span>
            <span className="px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400/90 font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-yellow-400/90" />
              <span>{packageType === 'family' ? 'FROM ₹9,500 / PERSON' : 'EARLY BIRD: ₹13,000'}</span>
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
                  8 DAYS / 7 NIGHTS (24 – 31 DEC)
                </span>
                <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-white/90 font-mono text-[9px] uppercase tracking-wider">
                  {packageType === 'family' ? 'DELHI TO DELHI ROUND-TRIP' : 'CHRISTMAS HOLIDAY WEEK'}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white/90 font-mono text-[9px] uppercase tracking-wider hidden sm:inline-flex items-center gap-1.5">
                <Snowflake className="w-3 h-3 text-yellow-400/90" />
                {packageType === 'family' ? 'GONDOLA + 1N HOUSEBOAT INCLUDED' : 'PEAK WINTER SNOW IN GULMARG'}
              </span>
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-yellow-400/90 font-mono text-[10px] tracking-widest uppercase mb-1">
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>
                    {packageType === 'family'
                      ? 'DELHI • KATRA (VAISHNO DEVI) • GULMARG GONDOLA • PAHALGAM • DAL LAKE HOUSEBOAT • DELHI'
                      : 'VAISHNO DEVI • GULMARG POWDER SLOPES • SRINAGAR DAL LAKE'}
                  </span>
                </div>
                <h3 className="font-title text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F4F1EA] tracking-[0.02em] leading-tight">
                  {packageType === 'family' ? 'Kashmir Family Escape 2026' : 'Kashmir Winter Escape 2026'}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <CinemaButton
                  variant="primary"
                  onClick={() => onOpenBooking('participant')}
                  className="!py-3 !px-6 text-xs tracking-wider font-medium"
                >
                  {packageType === 'family' ? 'RESERVE FAMILY SEATS' : 'BOOK YOUR SEAT'}
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
                <span className="text-sm sm:text-base font-sans font-semibold text-[#F4F1EA]">
                  8 Days / 7 Nights (Delhi ↔ Delhi)
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-white/5 text-yellow-400/90 border border-white/10">
                {packageType === 'family' ? <Sparkles className="w-4 h-4 text-amber-400" /> : <Snowflake className="w-4 h-4" />}
              </div>
              <div>
                <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  {packageType === 'family' ? 'KEY INCLUSIONS' : 'HERO ACTIVITY'}
                </span>
                <span className="text-sm sm:text-base font-sans font-semibold text-[#F4F1EA]">
                  {packageType === 'family' ? 'Gondola & Houseboat' : 'Ski 2D Certificate Course'}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-white/5 text-yellow-400/90 border border-white/10">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  {packageType === 'family' ? 'GROUP RATE' : 'EARLY BIRD'}
                </span>
                <span className="text-sm sm:text-base font-sans font-semibold text-yellow-400/90">
                  {packageType === 'family' ? '₹9,500 – ₹12,000 / Person' : '₹13,000 / Person'}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="p-2.5 bg-white/5 text-yellow-400/90 border border-white/10">
                {packageType === 'family' ? <Ship className="w-4 h-4 text-cyan-400" /> : <Film className="w-4 h-4" />}
              </div>
              <div>
                <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  {packageType === 'family' ? 'DAL LAKE STAY' : 'CINEMA PROJECT'}
                </span>
                <span className="text-sm sm:text-base font-sans font-semibold text-[#F4F1EA]">
                  {packageType === 'family' ? '1N Deluxe Houseboat' : 'The Life of Nandi'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Route Flow Diagram */}
        <div className="mb-14 p-5 bg-[#090C14] border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 text-xs font-mono text-white/60">
            <span className="font-semibold text-yellow-400/90 uppercase tracking-wider">
              {packageType === 'family' ? 'FAMILY & GROUP ROUND-TRIP ROUTE CORRIDOR' : 'EXPEDITION ROUTE CORRIDOR'}
            </span>
            <span>ROUND-TRIP FROM NEW DELHI (24 – 31 DEC 2026)</span>
          </div>
          {packageType === 'family' ? (
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center font-mono text-xs">
              <div className="p-3 bg-white/[0.02] border border-white/10">
                <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">ORIGIN</span>
                <strong className="text-white">DELHI</strong>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/10">
                <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">STAGE 1</span>
                <strong className="text-white/90">KATRA</strong>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/10">
                <span className="block text-[9px] text-amber-400 uppercase tracking-wider mb-0.5">DARSHAN</span>
                <strong className="text-amber-300">VAISHNO DEVI</strong>
              </div>
              <div className="p-3 bg-yellow-400/5 border border-yellow-400/30">
                <span className="block text-[9px] text-yellow-400/90 uppercase tracking-wider mb-0.5">GONDOLA INCL.</span>
                <strong className="text-yellow-400/90">GULMARG</strong>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/10">
                <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">VALLEY</span>
                <strong className="text-white/90">PAHALGAM</strong>
              </div>
              <div className="p-3 bg-cyan-400/5 border border-cyan-400/30">
                <span className="block text-[9px] text-cyan-400 uppercase tracking-wider mb-0.5">HOUSEBOAT</span>
                <strong className="text-cyan-300">SRINAGAR</strong>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/10 col-span-2 sm:col-span-1">
                <span className="block text-[9px] text-white/40 uppercase tracking-wider mb-0.5">NEW YEAR'S EVE</span>
                <strong className="text-white">DELHI</strong>
              </div>
            </div>
          ) : (
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
          )}
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
            01. {packageType === 'family' ? 'FAMILY ITINERARY (8 DAYS)' : 'ITINERARY'}
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 px-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'border-yellow-400/90 text-yellow-400/90 font-medium'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            02. {packageType === 'family' ? 'GROUP PRICING & CALCULATOR' : 'PRICING & TIERS'}
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 px-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'inclusions'
                ? 'border-yellow-400/90 text-yellow-400/90 font-medium'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            03. {packageType === 'family' ? 'FAMILY INCLUSIONS' : 'INCLUSIONS & LOGISTICS'}
          </button>
          <button
            onClick={() => setActiveTab('optional')}
            className={`pb-3 px-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'optional'
                ? 'border-yellow-400/90 text-yellow-400/90 font-medium'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            04. GONDOLA &amp; EXPERIENCES
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

        {/* TAB 1: ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            {packageType === 'family' ? (
              <>
                {/* Family Route Corridor Notice */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 text-xs font-mono text-white/50 border-b border-white/5">
                  <span className="text-amber-400 font-semibold uppercase">
                    FAMILY CORRIDOR: DELHI ➔ KATRA (VAISHNO DEVI) ➔ GULMARG (GONDOLA) ➔ PAHALGAM ➔ SRINAGAR (HOUSEBOAT) ➔ DELHI
                  </span>
                  <span className="text-white/40">CLICK ANY DAY TO EXPAND ACTIVITIES</span>
                </div>

                {/* Family Key Perks Strip from Flyer */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {FAMILY_KEY_PERKS.map((perk, pIdx) => (
                    <div key={pIdx} className="p-3 bg-[#080B12] border border-white/10 text-center space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase leading-tight">
                        {perk.title}
                      </span>
                      <p className="text-[10px] text-white/60 font-sans leading-tight">
                        {perk.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quick Calculator / Booking Action Callout */}
                <div className="p-5 bg-gradient-to-r from-amber-400/10 via-yellow-400/5 to-transparent border border-amber-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-400 text-black font-mono text-[9px] font-bold uppercase">
                        FAMILY &amp; GROUP TIER
                      </span>
                      <span className="text-xs font-mono text-amber-300">
                        ₹9,500 – ₹12,000 / person · Min 4 People
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-serif text-white">
                      Traveling with 4 or more family members or friends?
                    </h4>
                    <p className="text-xs text-white/70 font-sans">
                      Enjoy progressive group discounts, included Gondola &amp; Houseboat stays, and direct Delhi pickup.
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActiveTab('pricing')}
                      className="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      CALCULATE GROUP PRICE ↗
                    </button>
                    <a
                      href={`https://wa.me/919326632288?text=${encodeURIComponent('Hello Chehra Films & Parindaa! I am inquiring about the 8-Day Delhi to Delhi Kashmir Family & Group Escape (24-31 Dec). Please share availability.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black" />
                      <span>WHATSAPP</span>
                    </a>
                  </div>
                </div>

                {/* 8-Day Family Timeline Days */}
                <div className="grid grid-cols-1 gap-3">
                  {FAMILY_ITINERARY_DAYS.map((item, index) => {
                    const isExpanded = familyExpandedDay === index;
                    return (
                      <div
                        key={index}
                        className={`border transition-all duration-300 ${
                          isExpanded
                            ? 'border-amber-400/40 bg-[#0B0F17]'
                            : 'border-white/10 bg-[#080B12] hover:border-white/20'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setFamilyExpandedDay(isExpanded ? null : index)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                              <span className="text-base sm:text-lg md:text-xl font-mono tracking-wider text-amber-400 font-bold uppercase">
                                DAY {item.day}
                              </span>
                              <span className="text-xs sm:text-sm font-mono tracking-wide text-white/70">
                                • {item.dateLabel}
                              </span>
                              <span className="px-2 py-0.5 bg-amber-400/10 text-[9px] sm:text-[10px] font-mono text-amber-300 uppercase border border-amber-400/20">
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
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-4">
                            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                              {item.description}
                            </p>

                            <div className="space-y-2 pt-2">
                              <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase block">
                                DAILY FAMILY HIGHLIGHTS &amp; ACTIVITIES
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.highlights.map((h, hIdx) => (
                                  <div key={hIdx} className="flex items-start gap-2 text-xs text-white/80 bg-white/[0.02] p-2.5 border border-white/5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                    <span>{h}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {item.note && (
                              <div className="p-3 bg-white/[0.02] border-l-2 border-amber-400 text-white/80 text-xs flex items-start gap-2 font-mono">
                                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <span>{item.note}</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-white/50">
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-amber-400" />
                                TIMING: {item.timing}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3 text-amber-400" />
                                NIGHT STAY: {item.overnight}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
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
                                SCHEDULED LOGS &amp; MILESTONES
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
              </>
            )}

            {/* Minimalist Itinerary PDF Bar */}
            <div className="mt-8 p-4 sm:p-5 bg-[#080B12] border border-yellow-400/40 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-serif text-white tracking-wide">
                    Trip Itinerary (PDF)
                  </h4>
                  <p className="text-xs text-white/60 font-sans">
                    Complete 8-day expedition route, stays &amp; ski schedule.
                  </p>
                </div>
              </div>

              <a
                href="https://drive.google.com/file/d/1qF1B84X1J8MQLiRsQROm_DkqvB-Szgvr/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>VIEW &amp; DOWNLOAD ITINERARY (PDF)</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: TRIP PRICING */}
        {activeTab === 'pricing' && (
          <div>
            {packageType === 'family' ? (
              <FamilyPricingCalculator onOpenBooking={onOpenBooking} />
            ) : (
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
                          <th className="py-2.5 px-4 text-yellow-400/90">Early Bird (Before 20 Oct)</th>
                          <th className="py-2.5 px-4 text-white/70">Regular (After 20 Oct • Surge)</th>
                          <th className="py-2.5 pl-4">Key Inclusions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/80">
                        <tr>
                          <td className="py-3 pr-4 font-medium text-white">Kashmir Winter Escape (Participants)</td>
                          <td className="py-3 px-4">7N / 8D</td>
                          <td className="py-3 px-4 text-yellow-400/90 font-semibold">₹13,000 / Person</td>
                          <td className="py-3 px-4 text-rose-300 font-semibold">₹15,000 / Person</td>
                          <td className="py-3 pl-4 text-white/50 font-sans">Vaishno Devi + Gulmarg Ski 2D Certificate Course + Srinagar</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-white">Actors / Lead Cast Role</td>
                          <td className="py-3 px-4">7N / 8D</td>
                          <td className="py-3 px-4 text-yellow-400/90 font-semibold">₹16,000 (100% Refund Deposit)</td>
                          <td className="py-3 px-4 text-rose-300 font-semibold">₹18,000 (100% Refund Deposit)</td>
                          <td className="py-3 pl-4 text-white/50 font-sans">Lead Screen Role + IMDb Credit + All Inclusions (Auditions Close 20 Nov)</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-white">Group Slabs (4+ Travellers)</td>
                          <td className="py-3 px-4">8D / 7N</td>
                          <td className="py-3 px-4 text-yellow-400/90 font-semibold">₹11,000 / Person</td>
                          <td className="py-3 px-4 text-rose-300 font-semibold">₹13,000 / Person (+18% hike)</td>
                          <td className="py-3 pl-4 text-white/50 font-sans">Delhi to Delhi + Vaishno Devi + Gulmarg Gondola + 1N Dal Lake Houseboat</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-white">Group Slabs (9+ Travellers)</td>
                          <td className="py-3 px-4">8D / 7N</td>
                          <td className="py-3 px-4 text-yellow-400/90 font-semibold">₹9,500 / Person</td>
                          <td className="py-3 px-4 text-rose-300 font-semibold">₹11,500 / Person (+21% hike)</td>
                          <td className="py-3 pl-4 text-white/50 font-sans">Best Price Tier • Complete Inclusions &amp; Round-Trip Delhi Transit</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-white">Optional Gulmarg Gondola (Phase 1/2)</td>
                          <td className="py-3 px-4">—</td>
                          <td className="py-3 px-4 text-white/50">Separate Ticket</td>
                          <td className="py-3 px-4 text-white/50">Separate Ticket</td>
                          <td className="py-3 pl-4 text-white/50 font-sans">Apharwat / Kongdoori Cable Car Access (Included in Group Packages)</td>
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
                      <strong className="text-white">Early Bird Guarantee:</strong> Lock your seat today with a <span className="text-yellow-400/90 font-mono font-medium">₹2,000 security booking amount</span>. Final rate is ₹13,000/person for early-bird slots locked before 20th October (Actors ₹16,000; Groups from ₹9,500 to ₹11,000); <span className="text-amber-300 font-bold">prices rise 15%–20% after 20th October 2026 (Participants ₹15,000, Actors ₹18,000, Groups ₹11,500–₹13,000)</span> due to peak season demand.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenBooking('participant')}
                    className="shrink-0 px-5 py-2.5 bg-yellow-400/90 text-[#070A0F] font-mono font-medium text-xs uppercase tracking-wider hover:bg-yellow-300/90 transition-colors cursor-pointer"
                  >
                    LOCK WITH ₹2,000 SECURITY
                  </button>
                </div>

                {/* Official Booking Process Box */}
                <div className="p-5 sm:p-6 bg-gradient-to-br from-[#06182B] via-[#04101F] to-[#030914] border-2 border-blue-400 text-left space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-400/30 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                      <h4 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                        PARTICIPANT BOOKING PROCESS (2000 BOOKING AMOUNT)
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 bg-yellow-400 text-black font-mono text-[10px] font-black uppercase tracking-wider self-start sm:self-auto">
                      LOCK YOUR SEAT
                    </span>
                  </div>

                  <p className="text-xs text-white/80 font-sans leading-relaxed">
                    Reserve your expedition seat and lock the <strong className="text-yellow-400">₹13,000 Early Bird rate</strong> by transferring the <strong className="text-emerald-400">₹2,000 security booking amount</strong> via UPI or direct Bank Transfer. The remaining balance (₹11,000) is cleared 20 days prior to departure.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3.5 bg-black/60 border border-blue-400/40 space-y-2">
                      <span className="text-[11px] text-blue-300 font-bold uppercase block">01. UPI ID TRANSFER</span>
                      <div className="p-2 bg-slate-900 border border-slate-700 flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm text-yellow-300 font-bold tracking-wider font-mono">9828497392@slc</span>
                      </div>
                      <div className="text-[11px] text-white/70 space-y-0.5 font-sans pt-1">
                        <p><span className="text-white/40 font-mono">Bank:</span> Slice Small Finance Bank</p>
                        <p><span className="text-white/40 font-mono">Beneficiary:</span> Sachin Pareek</p>
                        <p><span className="text-white/40 font-mono">Amount:</span> ₹2,000 booking amount</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-black/60 border border-blue-400/40 space-y-2">
                      <span className="text-[11px] text-blue-300 font-bold uppercase block">02. BANK ACCOUNT TRANSFER</span>
                      <div className="space-y-1 text-[11px]">
                        <p><span className="text-white/50">Bank:</span> <strong className="text-white">Slice Small Finance Bank</strong></p>
                        <p><span className="text-white/50">Name:</span> <strong className="text-white">Sachin Pareek</strong></p>
                        <p><span className="text-white/50">Account no:</span> <strong className="text-yellow-300 text-xs font-mono">033325226237317</strong></p>
                        <p><span className="text-white/50">IFSC:</span> <strong className="text-yellow-300 text-xs font-mono">NESF0000333</strong></p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-gradient-to-r from-[#062412] to-[#04170B] border border-[#25D366]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5 font-mono">
                      <div className="text-[#25D366] font-bold text-[11px] uppercase">
                        Contact/WhatsApp for more details:
                      </div>
                      <div className="text-white font-bold text-sm">
                        +91 98284 97392
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://wa.me/919828497392?text=${encodeURIComponent('Hello Sachin Pareek, I want to book my participant seat for the Kashmir Winter Expedition (2000 booking amount). Please assist me with the process.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-black" />
                        <span>WHATSAPP: 9828497392</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => onOpenBooking('participant')}
                        className="px-4 py-2.5 bg-blue-500 hover:bg-blue-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        REGISTER AS PARTICIPANT ↗
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INCLUSIONS & EXCLUSIONS */}
        {activeTab === 'inclusions' && (
          <div>
            {packageType === 'family' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inclusions (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <h3 className="font-serif text-lg text-white tracking-wide">
                      Included in Your Family &amp; Group Package
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FAMILY_INCLUSIONS.map((cat, idx) => (
                      <div key={idx} className="p-4 bg-[#080B12] border border-white/10 space-y-2.5">
                        <span className="text-[11px] font-mono font-medium text-amber-400 uppercase tracking-wider block">
                          {cat.category}
                        </span>
                        <ul className="space-y-1.5 text-xs text-white/70">
                          {cat.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-1.5">
                              <span className="text-amber-400 font-bold shrink-0">•</span>
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
                      Not Included / Optional Add-ons
                    </h3>
                  </div>

                  <div className="p-5 bg-[#080B12] border border-white/10 space-y-3">
                    <p className="text-xs text-white/50">
                      The following personal expenses and optional add-ons are not covered under the base package:
                    </p>
                    <ul className="space-y-2 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
                        <span>Optional 2-Day Skiing Certificate Course (available on request)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
                        <span>Personal shopping (pashminas, saffron, dry fruits, wood carving)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
                        <span>Lunches on highway transit and pony rides in Pahalgam</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
                        <span>Personal winter warm gear rental (heavy snow jackets/boots if not brought)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#080B12] border-l-2 border-amber-400 text-xs text-white/70 space-y-1.5">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block">
                      FAMILY SAFETY &amp; COMFORT GUARANTEE
                    </span>
                    <p className="leading-relaxed">
                      All hotel and houseboat rooms are equipped with heating facilities, heated blankets or bukharis. Dedicated Parindaa journey coordinators travel with the convoy to ensure round-the-clock comfort and child/elder-friendly support.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
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
                      WEATHER &amp; MOUNTAIN SAFETY PROTOCOL
                    </span>
                    <p className="leading-relaxed">
                      December in Kashmir brings true Himalayan winter conditions. Snowfall, road accessibility, Gondola operations and skiing terrain depend on real-time mountain safety. Parindaa trip coordinators reserve the authority to adjust routes for group welfare.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
                <span className={`px-2 py-0.5 text-[9px] font-mono uppercase ${packageType === 'family' ? 'bg-amber-400 text-black font-bold' : 'bg-white/5 text-white/70'}`}>
                  {packageType === 'family' ? 'PHASE 1 INCLUDED' : 'DIRECT OFFICIAL TICKET'}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-white tracking-tight">
                Gulmarg Gondola (Phase I &amp; II)
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Experience Asia’s highest operating cable car. Phase 1 ascends towards Kongdoori station (~10,000 ft), and Phase 2 reaches Apharwat Peak (~13,000 ft) right beneath the snowbound ridges.
              </p>
              <div className="space-y-2 text-xs text-white/80 pt-2 border-t border-white/10 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">PHASE 1 (KONGDOORI):</span>
                  <span className={packageType === 'family' ? 'text-amber-400 font-bold' : 'text-white'}>
                    {packageType === 'family' ? 'Included in Family Package' : 'Separate Official Ticket'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">PHASE 2 (APHARWAT ~13,000 FT):</span>
                  <span className="text-white">Subject to weather &amp; operation</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">{packageType === 'family' ? 'FAMILY PERK:' : 'SKI COURSE REQUIREMENT:'}</span>
                  <span className="text-yellow-400/90">
                    {packageType === 'family' ? 'Pre-booked access avoiding ticket queues' : 'Not required for included ski course'}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-white/50 italic font-sans">
                {packageType === 'family'
                  ? '*Phase 1 Kongdoori Gondola ride is fully covered in the Family & Group package rate. Phase 2 Apharwat Peak is optional on site depending on snow and wind conditions.'
                  : '*The Gondola is completely optional and is not required for the included Gulmarg Ski 2-day certificate course conducted under experts training program on snow meadows.'}
              </p>
            </div>

            {/* The Life of Nandi / Travel Filmmaking Project Experience */}
            <div className="p-6 bg-[#080B12] border border-yellow-400/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-yellow-400/90 uppercase">
                  {packageType === 'family' ? 'INDIA’S 1ST TRAVEL FILMMAKING PROJECT' : 'INDEPENDENT CINEMA PROJECT'}
                </span>
                <span className="px-2 py-0.5 bg-yellow-400/10 text-yellow-400/90 text-[9px] font-mono uppercase">
                  CHEHRA FILMS × PARINDAA
                </span>
              </div>
              <h3 className="font-serif text-2xl text-white tracking-tight">
                {packageType === 'family' ? 'Travel Filmmaking & Family Photo Archive' : 'The Life of Nandi'}
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {packageType === 'family'
                  ? 'Be part of India’s 1st Travel Filmmaking Project! Your family journey across Kashmir will be documented by professional cinematographers, providing an episodic 4K video reel and high-resolution photo archive for lifetime memories.'
                  : 'Travel through Kashmir while becoming part of an experimental travel cinema experience. A cinematic exploration of travel, nature, faith, questions, people, and silence across the Himalayan snowfields.'}
              </p>
              <div className="space-y-2 text-xs text-white/80 pt-2 border-t border-white/10 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">DOCUMENTARY ACCESS:</span>
                  <span className="text-white text-[11px]">Delhi • Vaishno Devi • Gulmarg • Dal Lake</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">DELIVERABLES:</span>
                  <span className="text-amber-400">High-Res Family Photo Archive + Video Reel</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">DOCUMENTATION:</span>
                  <span className="text-yellow-400/90">Official Contributor Acknowledgement</span>
                </div>
              </div>
              <CinemaButton
                variant={packageType === 'family' ? 'primary' : 'outline'}
                onClick={() => onOpenBooking('participant')}
                className="w-full !py-2.5 text-xs tracking-wider"
              >
                {packageType === 'family' ? 'RESERVE FAMILY ESCAPE' : 'EXPLORE ACTOR NOMINATION'}
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
              This expedition unites the spiritual pilgrimage of Mata Vaishno Devi at Katra with 2 full days of snow immersion in Gulmarg (featuring the Gulmarg Ski 2-Day Certificate Course under Experts Training Program), cultural exploration in Srinagar & Dal Lake, and film documentation in "The Life of Nandi".
            </p>
            <div className="p-4 bg-white/[0.02] border border-white/10 text-xs font-mono text-white/80 space-y-2">
              <div>• <strong>Dates:</strong> 24 – 31 December 2026 (7N / 8D)</div>
              <div>• <strong>Route:</strong> Delhi → Katra → Vaishno Devi → Gulmarg → Srinagar → Delhi</div>
              <div>• <strong>Skiing:</strong> Gulmarg Ski 2-Day Certificate Course under Experts Training Program (Boots/Skis/Poles & Certification included)</div>
              <div>• <strong>Pricing:</strong> Individual: ₹13,000 Early Bird / ₹15,000 after 20 Oct | Actors: ₹16,000 / ₹18,000 (100% Refundable) | Groups: 4+ ₹11,000 → ₹13,000 &amp; 9+ ₹9,500 → ₹11,500</div>
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
