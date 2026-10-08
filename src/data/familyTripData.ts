export interface FamilyPricingTier {
  travellers: number;
  label: string;
  pricePerPerson: number;
  priceAfter20Oct: number;
  exampleTotal: number;
  isBestPrice?: boolean;
}

export const FAMILY_PRICING_TIERS: FamilyPricingTier[] = [
  { travellers: 4, label: '4 People', pricePerPerson: 11000, priceAfter20Oct: 13000, exampleTotal: 44000 },
  { travellers: 5, label: '5 People', pricePerPerson: 10700, priceAfter20Oct: 12700, exampleTotal: 53500 },
  { travellers: 6, label: '6 People', pricePerPerson: 10400, priceAfter20Oct: 12400, exampleTotal: 62400 },
  { travellers: 7, label: '7 People', pricePerPerson: 10100, priceAfter20Oct: 12100, exampleTotal: 70700 },
  { travellers: 8, label: '8 People', pricePerPerson: 9800, priceAfter20Oct: 11800, exampleTotal: 78400 },
  { travellers: 9, label: '9 People', pricePerPerson: 9500, priceAfter20Oct: 11500, exampleTotal: 85500, isBestPrice: true },
  { travellers: 10, label: '10+ People', pricePerPerson: 9500, priceAfter20Oct: 11500, exampleTotal: 95000, isBestPrice: true },
];

export function getFamilyPricePerPerson(peopleCount: number): number {
  if (peopleCount <= 4) return 11000;
  if (peopleCount === 5) return 10700;
  if (peopleCount === 6) return 10400;
  if (peopleCount === 7) return 10100;
  if (peopleCount === 8) return 9800;
  return 9500; // 9 or more people
}

export function getFamilyPriceAfter20Oct(peopleCount: number): number {
  if (peopleCount <= 4) return 13000;
  if (peopleCount === 5) return 12700;
  if (peopleCount === 6) return 12400;
  if (peopleCount === 7) return 12100;
  if (peopleCount === 8) return 11800;
  return 11500; // 9 or more people
}

export interface FamilyItineraryDay {
  day: number;
  dateLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  overnight: string;
  timing: string;
  description: string;
  highlights: string[];
  note?: string;
}

export const FAMILY_ITINERARY_DAYS: FamilyItineraryDay[] = [
  {
    day: 1,
    dateLabel: '24 DEC',
    title: 'DELHI → KATRA',
    subtitle: 'The Family Holiday Begins',
    badge: 'OVERNIGHT TRAVEL',
    overnight: 'Comfortable Group Transit',
    timing: 'Evening Departure from Delhi',
    description:
      'Assemble at the designated Delhi reporting point, complete group registration, meet fellow families and journey coordinators from Parindaa & Chehra Films, and begin our comfortable highway transit towards Katra.',
    highlights: [
      'Traveler reporting & family briefing at designated Delhi location',
      'Introduction to coordinators & distribution of journey kits',
      'Comfortable overnight highway journey towards Katra in private transport'
    ]
  },
  {
    day: 2,
    dateLabel: '25 DEC',
    title: 'KATRA — SHRI MATA VAISHNO DEVI YATRA 🛕',
    subtitle: 'Sacred Trikuta Mountain Pilgrimage',
    badge: 'SACRED YATRA',
    overnight: 'Katra Hotel Stay',
    timing: 'Morning to Night',
    description:
      'Arrive in Katra in the morning, check in to hotel, freshen up, and begin the holy Shri Mata Vaishno Devi Yatra with family: Banganga → Ardhkuwari → Bhawan, concluding with return to Katra hotel for dinner and rest.',
    highlights: [
      'Morning arrival in Katra hotel, check-in, rest & hot breakfast',
      'Begin sacred Vaishno Devi Yatra: Banganga ➔ Ardhkuwari ➔ Bhawan',
      'Himalayan spiritual blessings & holy darshan at the shrine',
      'Descent back to Katra hotel for hot dinner & comfortable overnight rest'
    ],
    note: 'Families can proceed at their own comfortable walking pace or opt for battery carts and pony rides available on the trail.'
  },
  {
    day: 3,
    dateLabel: '26 DEC',
    title: 'KATRA → GULMARG ❄️',
    subtitle: 'Ascent to Snow Paradise & Pine Woods',
    badge: 'VALLEY TRANSIT',
    overnight: 'Gulmarg Mountain Resort',
    timing: 'Early Morning to Sunset',
    description:
      'Early departure from Katra through the picturesque mountain tunnels into Kashmir Valley. At Tangmarg, switch to snow-chain equipped vehicles climbing into the snow wonderland of Gulmarg.',
    highlights: [
      'Scenic highway drive through Pir Panjal mountains into Kashmir Valley',
      'Tangmarg to Gulmarg snow-chain vehicle ascent through snowbound forests',
      'Check-in to cozy heated hotel in Gulmarg amidst white meadows',
      'Evening snow walk, Maharani Temple visit & hot Kashmiri Kahwa'
    ],
    note: 'Tangmarg to Gulmarg ascent requires authorized 4x4 snow-chain transport to ensure maximum family safety.'
  },
  {
    day: 4,
    dateLabel: '27 DEC',
    title: 'GULMARG — GONDOLA RIDE (INCLUDED) & SNOW ACTIVITIES 🚠',
    subtitle: 'World-Famous Cable Car & Winter Snow Fun',
    badge: 'GONDOLA INCLUDED',
    overnight: 'Gulmarg Mountain Resort',
    timing: 'Full Day Snow Experience',
    description:
      'Board the world-renowned Gulmarg Gondola cable car ride (Phase 1 Kongdoori included). Enjoy family snow activities, sledging, snow photography with Mt. Apharwat views, and optional skiing instruction.',
    highlights: [
      'Gulmarg Gondola cable car ride to Kongdoori Phase 1 (Included in package)',
      'Family snow activities: snow sledging, tubing & snowball play',
      'Breathtaking Himalayan mountain photography across Apharwat range',
      'Visit historic St. Mary’s Church & scenic meadow walks',
      'Optional 2-day skiing certificate training under licensed instructors'
    ]
  },
  {
    day: 5,
    dateLabel: '28 DEC',
    title: 'GULMARG → PAHALGAM VALLEY 🌲',
    subtitle: 'The Valley of Shepherds & Lidder Riverbank',
    badge: 'VALLEY OF SHEPHERDS',
    overnight: 'Pahalgam Valley Hotel',
    timing: 'Morning to Evening',
    description:
      'Scenic valley journey from Gulmarg towards Pahalgam, passing through the historic saffron fields of Pampore. Spend the afternoon by the crystalline Lidder River and serene pine forests.',
    highlights: [
      'Scenic road transit via Pampore saffron fields & Awantipora ruins',
      'Arrival in Pahalgam — "The Valley of Shepherds"',
      'Lidder riverbank strolls, pine forest trails & Betaab Valley vistas',
      'Family café time & check-in to comfortable Pahalgam hotel for dinner'
    ]
  },
  {
    day: 6,
    dateLabel: '29 DEC',
    title: 'PAHALGAM → SRINAGAR (DELUXE HOUSEBOAT STAY) ⛵',
    subtitle: '1-Night Traditional Dal Lake Houseboat & Shikara',
    badge: '1 NIGHT BOAT STAY',
    overnight: 'Srinagar Deluxe Houseboat (Dal Lake)',
    timing: 'Morning to Night',
    description:
      'Drive from Pahalgam to Srinagar and check in for an authentic 1-Night Deluxe Traditional Wooden Houseboat stay on Dal Lake (included). Enjoy an included Shikara boat ride and local sightseeing.',
    highlights: [
      'Check-in to handcrafted traditional wooden Houseboat on Dal Lake (Included)',
      'Sunset Shikara boat ride through Dal Lake floating gardens (Included)',
      'Visit Nishat Bagh & Shalimar Bagh royal Mughal terraced gardens',
      'Evening shopping in Lal Chowk for authentic pashminas, saffron & walnut wood crafts'
    ]
  },
  {
    day: 7,
    dateLabel: '30 DEC',
    title: 'SRINAGAR → DELHI',
    subtitle: 'Final Dal Lake Mist & Highway Return Transit',
    badge: 'OVERNIGHT RETURN',
    overnight: 'Comfortable Group Transit',
    timing: 'Afternoon Departure',
    description:
      'Wake up to sunrise mist over Dal Lake with hot Kashmiri Kahwa. Enjoy morning leisure for souvenir shopping before boarding comfortable transportation for the return transit towards New Delhi.',
    highlights: [
      'Scenic Dal Lake sunrise & traditional Kashmiri breakfast on the houseboat',
      'Souvenir shopping for pure saffron, dry fruits & Kashmiri embroidery',
      'Group photography and journey wrap interviews',
      'Board comfortable private transport for return journey towards Delhi'
    ]
  },
  {
    day: 8,
    dateLabel: '31 DEC',
    title: 'DELHI (NEW YEAR’S EVE ARRIVAL) 🎉',
    subtitle: 'Lifetime Holiday Memories Concludes',
    badge: 'HOLIDAY WRAP',
    overnight: 'Journey Concludes in Delhi',
    timing: 'Morning Arrival',
    description:
      'Arrive back in New Delhi on 31 December morning with cherished family memories, ready for New Year celebrations. Receive high-resolution expedition photo archives and filmmaking project credits.',
    highlights: [
      'Morning arrival in Delhi on 31 December in time for New Year celebrations',
      'High-resolution expedition photo archive delivered to all family members',
      'Official family contributor credit in India’s 1st travel filmmaking documentary',
      'Trip conclusion: "Come Together. Explore Kashmir. Make Memories."'
    ]
  }
];

export const FAMILY_INCLUSIONS = [
  {
    category: 'Travel & Accommodation',
    items: [
      'Full 8 Days / 7 Nights complete round-trip itinerary from Delhi (24 – 31 Dec)',
      '1 Night Deluxe Traditional Wooden Houseboat stay on Dal Lake in Srinagar (Included)',
      '1 Night comfortable hotel stay in Katra (for Vaishno Devi Darshan)',
      '2 Nights cozy mountain resort stay in Gulmarg',
      '1 Night scenic valley hotel stay in Pahalgam',
      '2 Nights comfortable group highway transit between Delhi and Kashmir'
    ]
  },
  {
    category: 'Excursions & Experiences',
    items: [
      'Gulmarg Gondola Cable Car Ride (Phase 1 Kongdoori included)',
      'Sunset Shikara boat ride on Dal Lake in Srinagar (included)',
      'Sacred Shri Mata Vaishno Devi Yatra with Katra basecamp logistics',
      'Pahalgam valley & Lidder river nature excursion',
      'Family snow activities & snow play in Gulmarg',
      'Opportunity to feature in India’s 1st Travel Filmmaking Project by Parindaa & Chehra Films'
    ]
  },
  {
    category: 'Food & Logistics',
    items: [
      'Daily freshly prepared Breakfast & Dinner at all hotel & houseboat stays',
      'Kashmir local transportation and airport/highway transfers as per itinerary',
      'Snow-chain authorized vehicles for Tangmarg to Gulmarg ascent',
      'Dedicated journey coordinators and local Kashmiri guides on ground',
      'High-resolution digital photo & video archive for every family'
    ]
  }
];

export const FAMILY_KEY_PERKS = [
  {
    title: 'GULMARG GONDOLA INCLUDED',
    desc: 'Pre-booked Phase 1 cable car tickets without long ticket lines.',
    icon: 'CableCar'
  },
  {
    title: '1 NIGHT BOAT STAY IN SRINAGAR',
    desc: 'Authentic carved wooden houseboat experience on Dal Lake.',
    icon: 'Ship'
  },
  {
    title: 'DELHI ↔ KASHMIR ROUND-TRIP',
    desc: 'Starts Day 1 from Delhi (24 Dec) and returns to Delhi on Day 8 (31 Dec).',
    icon: 'Car'
  },
  {
    title: 'VAISHNO DEVI DARSHAN',
    desc: 'Sacred Trikuta mountain yatra stop in Katra before entering the valley.',
    icon: 'Flame'
  },
  {
    title: 'BREAKFAST & DINNER',
    desc: 'Freshly prepared warm meals included at every stay.',
    icon: 'Utensils'
  },
  {
    title: 'BIGGER GROUPS, BIGGER SAVINGS',
    desc: 'Tiered group discounts from ₹11,000 down to ₹9,500 per person (rising to ₹13,000–₹11,500 after 20 Oct).',
    icon: 'Users'
  }
];
