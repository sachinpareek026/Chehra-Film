# Kashmir Trip Itinerary: Individual & Family/Group Packages (Delhi to Delhi 8-Day)

A comprehensive package switcher for the Kashmir Expedition section enabling travelers to choose between **Individual** and **Family / Group** packages, featuring an 8-day Delhi-to-Delhi round-trip itinerary (24 – 31 Dec 2026) with Vaishno Devi darshan, Gulmarg Gondola, Pahalgam valley, Dal Lake houseboat, and an interactive member pricing calculator with dual WhatsApp and web booking flows.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following choices have been confirmed through your clarifications:

- **Confirmed Decision 1 (Package Categorization)**: The switcher will be clearly labeled **"Individual Package"** and **"Family / Group Package"** to make navigation instantly intuitive for solo participants and family groups alike.
- **Confirmed Decision 2 (Delhi-to-Delhi 8-Day Family Journey)**: The Family / Group itinerary starts on **Day 1 in Delhi (24 Dec)** and concludes on **Day 8 back in Delhi (31 Dec)**.
- **Confirmed Decision 3 (Sacred Yatra & Kashmir Highlights Route)**: The route will cover Delhi → Katra (with Shri Mata Vaishno Devi Darshan) → Gulmarg (Gondola included, snow activities & optional skiing) → Pahalgam valley → Srinagar (1 night luxury Dal Lake Houseboat stay & Shikara) → Return journey concluding in Delhi.
- **Confirmed Decision 4 (Interactive Member Pricing Calculator)**: Dynamic group selector (4 to 10+ people) that computes per-person rates (₹12,000 down to ₹9,500), total package cost, and group savings, alongside the complete tabular price chart from the Parindaa & Chehra Films flyer.
- **Confirmed Decision 5 (Dual Booking Triggers)**: Integrated "Book Now on WhatsApp" button (pre-filled with package, dates, group size, and total price) and "Apply via Official Reservation Form".

---

### 1. Overview & Core Concept

- **What It Does**: Provides a dedicated package toggle in the Kashmir itinerary section:
  1. **Individual Package (8 Days / 7 Nights · 24–31 Dec)**: Tailored for solo adventurers, actors, and contributors joining the filmmaking expedition convoy. Priced at ₹13,000 (Early Bird) with travel filmmaking access and individual registration.
  2. **Family / Group Package (8 Days / 7 Nights · 24–31 Dec)**: Curated for family vacations and friend groups departing round-trip from Delhi. Includes Vaishno Devi darshan in Katra, Gulmarg Gondola tickets, snow activities, Pahalgam exploration, 1-night Dal Lake houseboat stay, comfortable stays, breakfast & dinner, and group discounts starting from 4 people.
- **Target Audience / Persona**: Families, holiday groups, and couples traveling together who want the complete Delhi-to-Delhi holiday experience with spiritual, snow, and valley highlights, plus group-based tiered savings.
- **Key Value**: Delivers complete clarity between individual expedition travel and family group packages, with instant total cost calculation and zero friction to book on WhatsApp.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Package Switcher Selection**:
     - At the top of the Kashmir itinerary section, visitors encounter a prominent segmented control:
       - `[ Individual Package · Solo / Expedition ]`
       - `[ Family & Group Package · 4+ Travellers ]`
  2. **8-Day Delhi-to-Delhi Family Itinerary Walkthrough**:
     - Switching to Family / Group loads the tailored 8-day timeline:
       - **Day 01 (24 Dec)**: Delhi reporting, group briefing & evening departure towards Katra.
       - **Day 02 (25 Dec)**: Arrival in Katra, check-in, rest & sacred Shri Mata Vaishno Devi Yatra (Banganga ➔ Ardhkuwari ➔ Bhawan) and return to Katra hotel.
       - **Day 03 (26 Dec)**: Katra scenic drive into Kashmir Valley ➔ snowbound Gulmarg hotel check-in & evening snow walk.
       - **Day 04 (27 Dec)**: Gulmarg snow day — Gulmarg Gondola cable car ride (included), snow activities, pine forest walk & optional skiing.
       - **Day 05 (28 Dec)**: Gulmarg ➔ Pahalgam scenic journey, Pahalgam valley exploration, river & nature time, evening stay in Pahalgam.
       - **Day 06 (29 Dec)**: Pahalgam ➔ Srinagar, local sightseeing, shopping, Mughal gardens & 1-night authentic Houseboat stay on Dal Lake with Shikara ride.
       - **Day 07 (30 Dec)**: Srinagar morning leisure ➔ scenic return drive towards Jammu / Katra highway transit towards Delhi.
       - **Day 08 (31 Dec)**: Morning arrival back in Delhi — Expedition & Family Escape concludes in time for New Year celebrations.
  3. **Interactive Group Pricing Engine**:
     - Member count slider/stepper (4, 5, 6, 7, 8, 9, 10+ people).
     - Live calculations:
       - **Price per Person**: ₹12,000 (4 pax), ₹11,500 (5 pax), ₹11,000 (6 pax), ₹10,500 (7 pax), ₹10,000 (8 pax), ₹9,500 (9 pax), ₹9,500 (10+ pax).
       - **Total Group Cost**: Instant total display (e.g. 6 pax = ₹66,000).
       - **Savings Highlight**: "Save up to ₹2,500 per person with larger groups!"
       - **Urgency Notice**: "Pricing will be revised after 25 October due to high demand."
     - Complete reference comparison table matching the flyer.
  4. **Dual Booking Actions**:
     - **"Book Now on WhatsApp"**: Direct WhatsApp click with pre-populated message:
       `"Hello Parindaa & Chehra Films, I want to book the Kashmir Family & Group Package (8 Days, Delhi to Delhi) for [X] people. Total: ₹[Y]. Please share booking details."`
     - **"Apply via Reservation Form"**: Directly opens the participant form for structured verification.

- **Visual Identity & Theme**:
  - *Color Palette*: Midnight alpine canvas (`#05070B`), ice-blue structural accents (`border-cyan-500/20`), golden-amber highlights (`#EAB308` / `#FBBF24`), and high-legibility white prose.
  - *Typography*: Serif display titles, balanced body text (`text-wrap: balance`), and monospace tabular figures (`font-mono tabular-nums`).
  - *Zero-Pill Discipline*: Clean unboxed metadata separated by middots (`·`). Single-line controls with truncation resilience.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Aligned 8-Day Delhi Round-Trip Timeline**
  - *Chosen Approach*: Unify both Individual and Family packages on the same 8-day dates (24–31 Dec 2026, Delhi to Delhi).
  - *Why*: Allows families and individual expedition participants to depart together on the Delhi convoy or coordinate shared travel logistics, while enjoying activities tailored to their preferences (family leisure vs film production tasks).
  - *Alternatives Considered*: A 6-day flight-only package was considered, but starting from Delhi on Day 1 and returning to Delhi on Day 8 matches your explicit requirement and coordinates the entire holiday week for New Year.

- **Decision 2: Clear Package State Separation**
  - *Chosen Approach*: State variable `activePackage: 'individual' | 'family'` toggles between the two distinct plans with dedicated tabs, pricing calculators, and itineraries.
  - *Why*: Completely removes ambiguity for users, giving each audience their own tailored view without cluttering the screen.

---

### 4. Technical Architecture & Data Strategy

- **Component & Data Flow Diagram**:

```
┌─────────────────────────────────────────────────────────────┐
│                 KashmirExpeditionSection                    │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               Primary Package Switcher                │  │
│  │  [ Individual Package ]   │   [ Family / Group ]      │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│                   activePackage state                       │
│                             │                               │
│         ┌───────────────────┴───────────────────┐           │
│         ▼                                       ▼           │
│  ┌─────────────────────────┐     ┌───────────────────────┐  │
│  │   INDIVIDUAL PACKAGE    │     │ FAMILY & GROUP PACKAGE│  │
│  │ - 8-Day Film Expedition │     │ - 8-Day Delhi-to-Delhi│  │
│  │ - Katra & Vaishno Devi  │     │ - Vaishno Devi Darshan│  │
│  │ - Gulmarg 2-Day Skiing  │     │ - Gulmarg Gondola Inc.│  │
│  │ - ₹13,000 Flat Rate     │     │ - Pahalgam Valley     │  │
│  │ - Online Booking Form   │     │ - Dal Lake Houseboat  │  │
│  └─────────────────────────┘     │ - Delhi Return 31 Dec │  │
│                                  └───────────┬───────────┘  │
│                                              │              │
│                                  ┌───────────▼───────────┐  │
│                                  │ Group Pricing Engine  │  │
│                                  │ - Stepper (4 to 10+)  │  │
│                                  │ - Dynamic Total Cost  │  │
│                                  │ - Tabular Tier Chart  │  │
│                                  └───────────┬───────────┘  │
│                                              │              │
│                                  ┌───────────▼───────────┐  │
│                                  │ Booking Callouts      │  │
│                                  │ - WhatsApp Deep Link  │  │
│                                  │ - Reservation Form    │  │
│                                  └───────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

- **Data Models**:
  - `FAMILY_ITINERARY_DAYS`: 8 structured day objects from Delhi departure (24 Dec) through Katra/Vaishno Devi, Gulmarg snow & Gondola, Pahalgam valley, Srinagar Houseboat stay, and return to Delhi (31 Dec).
  - `FAMILY_PRICING_TABLE`: Array with 4, 5, 6, 7, 8, 9, 10+ people tiers and price per person.
  - `FAMILY_HIGHLIGHTS`: Gondola included, 1-night houseboat stay, comfortable stays, breakfast & dinner, local transport, snow experience, travel filmmaking opportunity.
