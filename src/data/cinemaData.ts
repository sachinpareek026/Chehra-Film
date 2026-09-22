import { CharacterRole, BenefitItem, TimelineStep, FilmLocation, ExpeditionEpisode } from '../types';

export const FILM_METADATA = {
  projectCode: 'PROJECT CF01',
  projectTitle: 'THE LIFE OF NANDI',
  projectSubtitle: 'THE SUPREME GUARD OF SHIVA',
  title: 'CHEHRA FILMS',
  tagline: 'An initiative of Parindaa Travels',
  positioning: "INDIA'S 1ST EXPERIMENTAL CINEMA PROJECT",
  motto: 'A journey where travel becomes cinema.',
  directorNotes: 'A radical cinematic venture eliminating studio sets. India is our soundstage, travelers are our cast.',
  synopsis: 'An unscripted overland cinema odyssey across 2,400 kilometers of real Indian terrain. As a fragile caravan navigates sub-zero Himalayan passes, sacred ancient rivers, and silent dunes, Nandi stands as the silent guardian — protecting the unvarnished truths of six wanderers who refuse to look back.',
  trailerUrl: 'https://youtu.be/Rz5jQK4KQ2o?si=POsuNzsMIyrYhcAx',
  trailerYoutubeId: 'Rz5jQK4KQ2o',
  trailerThumbnail: 'https://img.youtube.com/vi/Rz5jQK4KQ2o/maxresdefault.jpg',
  technicalSpecs: {
    format: '35mm Kodak Vision3 & Arri Alexa LF 4K',
    aspectRatio: '2.39:1 Anamorphic Scope',
    audio: 'Dolby Atmos Field Acoustic Capture',
    soundtrack: 'Raw Folk Microtonal Instruments & Ambient Environmental Resonance',
    runtime: 'Feature Film + 6-Part Immersive Anthology',
    releaseYear: '2026',
    status: 'Casting & Location Scout Phase'
  }
};

export const CHARACTERS: CharacterRole[] = [
  {
    id: 'shankar',
    name: 'SHANKAR',
    gender: 'Male',
    ageRange: '20–30',
    tagline: 'The Restless Observer',
    description:
      'Quiet, watchful, carrying an unspoken weight from his past. He travels not to escape his memory, but to find a landscape quiet enough to bear it.',
    archetype: 'The Wandering Philosopher',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957437/Shankar.png',
    accentColor: '#d97706', // warm amber
    filmingLocations: ['Spiti Valley (12,500 ft)', 'Varanasi Old Alleyways', 'Rohtang Pass'],
    keyScenePreview:
      'Scene 14: Sitting on the stone edge of a crumbling mountain road at dawn, Shankar burns a letter without looking down at the canyon below.'
  },
  {
    id: 'meera',
    name: 'MEERA',
    gender: 'Female',
    ageRange: '20–30',
    tagline: 'The Chronicler of Silences',
    description:
      'Fiercely introspective with an arresting gaze. She documents unseen micro-moments with an antique medium format camera, seeking the roots of an inherited mystery.',
    archetype: 'The Intuitive Seeker',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957431/Vandana.png',
    accentColor: '#c25e38', // terracotta
    filmingLocations: ['Assi Ghat, Varanasi', 'Shekhawati Havelis', 'Chitkul Border'],
    keyScenePreview:
      'Scene 28: Meera walks into the evening Ganga Aarti mist, pointing her camera lens directly into the reflection of oil lamps floating away.'
  },
  {
    id: 'shiva',
    name: 'SHIVA',
    gender: 'Male',
    ageRange: '25–35',
    physicalTrait: 'Curly / long hair preferred',
    tagline: 'The Folk Rebel & Rhythmist',
    description:
      'A magnetic nomad with wild curls and an ear tuned to microtonal vibrations. He collects soundscapes from forgotten temple bells, nomadic campfires, and train whistles.',
    archetype: 'The Free Spirit',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957433/SHiva.png',
    accentColor: '#eab308', // saffron
    filmingLocations: ['Pushkar Dunes', 'Kinner Kailash Base', 'Rishikesh Riverbed'],
    keyScenePreview:
      'Scene 42: Midnight in the Thar desert. Shiva plays an old raw string sarangi against the howling wind until the entire camp goes dead silent.'
  },
  {
    id: 'nandi',
    name: 'NANDI',
    gender: 'Male',
    ageRange: '25–35',
    physicalTrait: 'Strong muscular / athletic physique',
    tagline: 'The Mountain Sentinel',
    description:
      'Built like granite, with hands accustomed to rock faces and mountain ropes. A man of few words whose physical presence anchors the fragile psychological journeys of the group.',
    archetype: 'The Unshakable Protector',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957433/Nandi.png',
    accentColor: '#78716c', // raw stone/charcoal
    filmingLocations: ['Hampi Boulder Fields', 'Zanskar River Gorge', 'Dhanushkodi Coast'],
    keyScenePreview:
      'Scene 19: When a sudden mudslide blocks the high Himalayan route at dusk, Nandi clears the rock face bare-handed while the caravan waits in the blizzard.'
  },
  {
    id: 'jyoti',
    name: 'JYOTI',
    gender: 'Female',
    ageRange: '20–30',
    tagline: "Meera's Companion & Catalyst",
    description:
      'Spontaneous, razor-sharp, and refusing conventional boundaries. She challenges every unspoken secret and brings raw humor and vulnerability when the road turns hostile.',
    archetype: 'The Provocateur',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957433/Jyoti.png',
    accentColor: '#ea580c', // ember orange
    filmingLocations: ['Jaisalmer Fort Ramparts', 'Gokarna Cliffs', 'Kolkata Tramlines'],
    keyScenePreview:
      'Scene 33: Standing on top of the moving open passenger coach through the Chambal ravines, screaming laughing into the sunset storm.'
  },
  {
    id: 'arjun',
    name: 'ARJUN',
    gender: 'Male',
    ageRange: '20–30',
    tagline: "Shankar's Anchor & Foil",
    description:
      'Grounded, deeply loyal, and grappling with the contrast between corporate urban expectations and the wild allure of this spontaneous cinema pilgrimage.',
    archetype: 'The Realist Companion',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957432/Rahul.png',
    accentColor: '#0284c7', // cool deep blue
    filmingLocations: ['Jaipur Night Bazaars', 'Kaza Monastic Roads', 'Majuli Island'],
    keyScenePreview:
      'Scene 50: Arjun confronts Shankar beside an abandoned stone bridge, asking if he ever plans to return to reality or if this journey is his final act.'
  },
  {
    id: 'any-other-role',
    name: 'ANY OTHER ROLE',
    gender: 'Male / Female / Any',
    ageRange: 'Open (Any Age)',
    tagline: 'The Open Character Canvas',
    description:
      'Can be played by anyone, male or female. Bring your authentic personality, specialized skills, and raw presence to define an unscripted character in the film.',
    archetype: 'Custom Unscripted Role',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957432/ChatGPT_Image_Sep_21_2026_07_35_54_AM.png',
    accentColor: '#10b981', // emerald
    filmingLocations: ['Pangong Tso Lake Edge', 'Kuldhara Ghost Village', 'Chambal Badlands'],
    keyScenePreview:
      'Scene 61: At dusk on the salt flats, an unscripted traveler lights a solitary lantern on the roof of the expedition vehicle, watching the horizon fade into obsidian silence.'
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: 'b1',
    number: '01',
    title: 'REAL FILMMAKING',
    description: 'A trip where you actually experience real filmmaking.',
    iconName: 'Clapperboard',
    highlight: 'Real Sets, No Studios'
  },
  {
    id: 'b2',
    number: '02',
    title: '100% REVENUE REFUND',
    description:
      "The project's current proposed model intends to refund 100% of eligible contribution once the film generates the defined project revenue, subject to final project terms.",
    iconName: 'ShieldCheck',
    highlight: 'Unique Return Structure'
  },
  {
    id: 'b3',
    number: '03',
    title: 'REVENUE PARTICIPATION',
    description:
      'Lead-role actors may receive a defined share of additional film revenue according to the final participation agreement.',
    iconName: 'TrendingUp',
    highlight: 'Actor Revenue Share'
  },
  {
    id: 'b4',
    number: '04',
    title: 'TRAVEL THROUGH INDIA',
    description: 'Experience destinations as part of the filmmaking journey.',
    iconName: 'Compass',
    highlight: 'Uncharted Routes'
  },
  {
    id: 'b5',
    number: '05',
    title: 'BECOME PART OF THE FILM',
    description: 'Your journey becomes part of a real cinematic project.',
    iconName: 'Film',
    highlight: 'IMDb / Festival Screenings'
  },
  {
    id: 'b6',
    number: '06',
    title: 'A MEMORY FOR LIFE',
    description: 'Take home a lifetime memory of the journey and film.',
    iconName: 'Award',
    highlight: 'Permanent Legacy'
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Vision & Concept',
    duration: 'Month 1',
    description:
      'Explore the narrative universe, character profiles, and the radical documentary-fiction philosophy of Chehra Films.',
    deliverable: 'Concept deck & Character dossier'
  },
  {
    step: '02',
    title: 'NOMINATE',
    subtitle: 'Open Submissions',
    duration: 'Ongoing',
    description:
      'Submit your profile, audition tapes, or travel motivation for one of 7 lead character roles or participant spots.',
    deliverable: 'Verified casting portfolio'
  },
  {
    step: '03',
    title: 'SHORTLIST',
    subtitle: 'Screen Chemistry',
    duration: '3-Week Window',
    description:
      'Selected nominees participate in virtual character workshops and live screen-presence interviews with the director.',
    deliverable: 'Cast contract & Route itinerary'
  },
  {
    step: '04',
    title: 'TRAVEL',
    subtitle: 'The Expedition',
    duration: '28-Day Odyssey',
    description:
      'Caravan departs across 4 states, transitioning through harsh altitudes, forgotten villages, and sacred waters.',
    deliverable: 'Location immersion & character bonding'
  },
  {
    step: '05',
    title: 'FILM',
    subtitle: 'Real Cinematography',
    duration: 'Active Production',
    description:
      'Camera crews capture scripted arcs, spontaneous road events, local encounters, and authentic emotional climaxes.',
    deliverable: 'Daily 4K anamorphic rushes'
  },
  {
    step: '06',
    title: 'RELEASE',
    subtitle: 'Global Premiere',
    duration: 'Festival Circuit & OTT',
    description:
      'Final theatrical grading, sound engineering, film festival circuit screenings, followed by digital premiere.',
    deliverable: 'Theatrical distribution & cast royalties'
  }
];

export const INDIA_LOCATIONS: FilmLocation[] = [
  {
    id: 'loc-1',
    title: 'Living Root Bridges & Khasi Canopy',
    state: 'Meghalaya',
    tagline: 'Ancient Sub-Tropical Cloud Forest',
    terrain: 'Cascading valleys, bio-engineered root bridges, perennial mist',
    coordinates: '25.2986° N, 91.5822° E',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789639316/images_74_-_Copy.jpg',
    moodColor: 'rgba(250, 204, 21, 0.9)',
    sceneRole: 'Acts II & III: The Descent into the Unconscious'
  },
  {
    id: 'loc-2',
    title: 'Havelock Island & Trench Atolls',
    state: 'Andaman & Nicobar Islands',
    tagline: 'Deep Ocean Trench & Volcanic Reefs',
    terrain: 'Secluded coves, turquoise depths, dense mangrove borders',
    coordinates: '11.9761° N, 92.9876° E',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789639320/180125112457-glass-bottom-boat-ride-activity-180125111234_-_Copy_-_Copy.jpg',
    moodColor: '#38BDF8',
    sceneRole: 'Prologue: The Horizon Before the Overland Crossing'
  },
  {
    id: 'loc-3',
    title: 'Krem Chympe Limestone Caverns',
    state: 'Meghalaya',
    tagline: 'Subterranean River Cave System',
    terrain: 'Limestone galleries, underground cascades, natural acoustic echo',
    coordinates: '25.3211° N, 92.4109° E',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789639319/this-is-krem-chympe-cave_-_Copy.jpg',
    moodColor: '#10B981',
    sceneRole: 'Act IV: The Trial of Silence'
  },
  {
    id: 'loc-4',
    title: 'Mawsynram Torrential Gorges',
    state: 'Meghalaya',
    tagline: 'The Wettest Place on Earth',
    terrain: 'Precipitous cloudburst cliffs, emerald moss, relentless rain',
    coordinates: '25.2975° N, 91.5826° E',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789639214/Mawsynram-Falls_-_Copy.jpg',
    moodColor: '#60A5FA',
    sceneRole: 'Act V: Climax of the Monsoon'
  },
  {
    id: 'loc-5',
    title: 'Gulmarg & Pir Panjal High Slopes',
    state: 'Jammu & Kashmir',
    tagline: 'Sub-Zero Snowbound Alpine Ridges',
    terrain: 'Powder snow slopes, silent pine valleys, Apharwat peak ridges',
    coordinates: '34.0484° N, 74.3805° E',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789639214/images_80_-_Copy.jpg',
    moodColor: '#EDE8DF',
    sceneRole: 'The Life of Nandi: Winter Expedition Chapter'
  }
];

export const PRODUCTION_FAQS = [
  {
    q: 'Do I need prior professional acting experience to nominate for a role?',
    a: 'No. Chehra Films prioritizes authenticity, screen presence, and raw personal truth over conventional rehearsed drama. We look for individuals whose real spirit resonates with the character archetypes.'
  },
  {
    q: 'What is the difference between an Actor and a Participant?',
    a: 'Actors take on scripted and improvised character roles (with dialogue, dramatic arcs, and revenue participation). Participants join the filmmaking caravan to experience the production firsthand, appear in authentic background sequences, and document the journey.'
  },
  {
    q: 'How does the 100% Revenue Refund model work?',
    a: "The project's current proposed model intends to refund 100% of eligible contribution once the film generates the defined project revenue, subject to final project terms and distribution agreements."
  },
  {
    q: 'What is the timeline of the shoot?',
    a: 'The road journey spans approximately 28 contiguous days across multiple states, scheduled in high visual seasons with complete logistics, stays, and production support managed by Parindaa Travels.'
  }
];

export const EXPEDITION_EPISODES: ExpeditionEpisode[] = [
  {
    id: 'ep-01',
    number: '01',
    act: 'ACT I // PROLOGUE TO FROST',
    title: 'THE COLD ASCENT',
    route: 'Old Manali → Rohtang Pass → Chandra Taal',
    altitude: '2,050m – 4,250m',
    coordinates: '32.24° N, 77.18° E',
    synopsis:
      'Six strangers leave urban safety and gather at dawn in Manali. As tarmac yields to black ice on Rohtang Pass, rehearsed personalities fracture. The camera rolls non-stop through engine failures and frozen hands.',
    charactersInvolved: ['Shankar', 'Meera', 'Nandi'],
    soundscape: 'Binaural sub-zero gale, idling diesel turbo, crunching ice gravel',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789639214/images_19_-_Copy.jpg',
    dramaticTension: 'The first unscripted breakdown: Shankar refuses to sleep inside the heated vehicle.',
    unscriptedEvent: 'Sudden blizzard at 14,000 ft forces the convoy to shelter in stone shepherd huts.'
  },
  {
    id: 'ep-02',
    number: '02',
    act: 'ACT II // THE SILENT VALLEY',
    title: 'THE SHADOW MONASTERIES',
    route: 'Kaza → Key Gompa → Langza High Plateau',
    altitude: '3,800m – 4,400m',
    coordinates: '32.29° N, 78.01° E',
    synopsis:
      'Cut off from all mobile cellular networks in the barren Spiti desert. Around a midnight kerosene heater, unspoken personal histories and unresolved grief emerge without an authored script.',
    charactersInvolved: ['Meera', 'Jyoti', 'Shiva'],
    soundscape: 'Microtonal Tibetan horns echoing across fossil canyons, fluttering prayer flags',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789634480/images_-_2026-09-14T173720.993.jpg',
    dramaticTension: 'Meera exposes an emotional secret captured accidentally on 35mm film.',
    unscriptedEvent: 'A local monastery elder invites the cast to share salt tea at dusk during evening chanting.'
  },
  {
    id: 'ep-03',
    number: '03',
    act: 'ACT III // THE OVERHANGING CLIFFS',
    title: 'THE EDGE OF REASON',
    route: 'Tabo → Nako Lake → Taranda Dhank (Kinnaur)',
    altitude: '2,200m – 3,600m',
    coordinates: '31.52° N, 78.27° E',
    synopsis:
      'India’s most dangerous cliff-carved mountain highway. When falling boulders block the narrow shelf road, the cast and crew must clear debris together under imminent avalanche threats.',
    charactersInvolved: ['Nandi', 'Arjun', 'Shankar'],
    soundscape: 'Roaring Sutlej river 1,200 ft below, shattering slate rocks, howling valley drafts',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789639214/images_36_-_Copy.jpg',
    dramaticTension: 'Arjun threatens to abandon the expedition; Nandi anchors the psychological breaking point.',
    unscriptedEvent: 'Filming a spontaneous emotional breakdown suspended over the canyon abyss.'
  },
  {
    id: 'ep-04',
    number: '04',
    act: 'ACT IV // THE MIRAGE & ASHES',
    title: 'THE DUNE SILENCE & THE PYRE',
    route: 'Shekhawati → Ghost Village of Kuldhara → Sam Dunes',
    altitude: '225m (Desert Sea)',
    coordinates: '26.91° N, 70.90° E',
    synopsis:
      'From glacial frost to searing Thar desert sands. The convoy reaches the abandoned ghost village of Kuldhara. A final midnight bonfire ceremony where masks are stripped and letters burned.',
    charactersInvolved: ['Shankar', 'Shiva', 'Jyoti', 'All Cast'],
    soundscape: 'Desert sand whistling through ruined sandstone courtyards, acoustic raw sarangi strings',
    image: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789639213/images_-_Copy.jpg',
    dramaticTension: 'The final unwritten climax: Who goes back to their old city life, and who keeps driving?',
    unscriptedEvent: 'Midnight acoustic folk circle under a moonlit sky with zero electric lights.'
  }
];
