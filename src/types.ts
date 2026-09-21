export interface CharacterRole {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Any' | 'Any / Open' | 'Male / Female / Any' | string;
  ageRange: string;
  tagline: string;
  physicalTrait?: string;
  description: string;
  archetype: string;
  image: string;
  accentColor: string; // e.g. amber, terracotta, saffron, slate-blue
  filmingLocations: string[];
  keyScenePreview: string;
}

export interface BenefitItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  highlight?: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  deliverable: string;
}

export interface FilmLocation {
  id: string;
  title: string;
  state: string;
  tagline: string;
  terrain: string;
  coordinates: string;
  image: string;
  moodColor: string;
  sceneRole: string;
}

export interface ExpeditionEpisode {
  id: string;
  number: string;
  act: string;
  title: string;
  route: string;
  altitude: string;
  coordinates: string;
  synopsis: string;
  charactersInvolved: string[];
  soundscape: string;
  image: string;
  dramaticTension: string;
  unscriptedEvent: string;
}

export type PathwayType = 'actor' | 'participant' | 'crew';

export interface ActorSubmission {
  id: string;
  type: 'actor';
  submittedAt: string;
  fullName: string;
  age: string;
  city: string;
  phoneNumber: string;
  email: string;
  instagramProfile: string;
  selectedRole: string;
  actingExperience: string;
  photoFileName: string;
  photoPreviewUrl?: string;
  auditionTapeFileName: string;
  auditionTapeUrl?: string;
  whyJoin: string;
  personalityAndSkills?: string;
  usefulRoleTarget?: string;
  refundEligible: boolean; // 100% refund eligible
  confirmed: boolean;
}

export interface ParticipantSubmission {
  id: string;
  type: 'participant';
  submittedAt: string;
  fullName: string;
  age: string;
  city: string;
  phoneNumber: string;
  email: string;
  instagramProfile: string;
  departureCity: string;
  travelBatch: string;
  roomPreference: string;
  emergencyContact: string;
  prebookingTokenPrice: number; // 2000
  lockedTripPrice: number; // 11000
  oct30PriceIncreaseNotice: boolean; // increases by 1500 after 30 Oct
  paymentMode: string;
  transactionRef: string;
  confirmed: boolean;
}

export interface CrewSubmission {
  id: string;
  type: 'crew';
  submittedAt: string;
  fullName: string;
  age: string;
  city: string;
  phoneNumber: string;
  email: string;
  instagramProfile: string;
  crewDepartment: string;
  customCrewSkillset?: string;
  categoryType: 'Prime Department' | 'Creative & Production';
  proofOfSkillLink: string; // Open public link only (Drive/YouTube/Vimeo/Behance/Spotify)
  portfolioSummary: string;
  gearOrSoftware: string;
  opportunityFeeAgreed: boolean; // Ready to pay slightly opportunity fee if selected
  publicFilmmakingConsent: boolean; // Consent to use character & work for public filmmaking use
  confirmed: boolean;
}

export type AnySubmission = ActorSubmission | ParticipantSubmission | CrewSubmission;

export interface NominationFormData {
  fullName: string;
  age: string;
  city: string;
  phoneNumber: string;
  email: string;
  instagramProfile: string;
  selectedRole: string;
  roleType: PathwayType;
  whyJoin: string;
  actingExperience: string;
  photoFile: File | null;
  photoPreviewUrl?: string;
  videoUrl: string;
  confirmed: boolean;
}

