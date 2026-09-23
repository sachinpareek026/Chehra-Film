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
  aadharNumber?: string;
  aadharFrontFileName?: string;
  aadharFrontUrl?: string;
  aadharBackFileName?: string;
  aadharBackUrl?: string;
  refundEligible: boolean; // 100% refund eligible
  totalAmount?: number; // 16000
  securityBookingAmount?: number; // 3000 payable upon selection
  bookingConsentAgreed?: boolean; // Agrees to ₹16,000 total & ₹3,000 booking amount upon acceptance & balance before 20 days
  bookingAmountTerms?: string;
  filmmakingConsent?: boolean;
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
  aadharNumber?: string;
  aadharFrontFileName?: string;
  aadharFrontUrl?: string;
  aadharBackFileName?: string;
  aadharBackUrl?: string;
  bookingConsentAgreed?: boolean; // Agrees to ₹13,000 final amount & ₹2,000 security booking amount & balance before 20 days
  prebookingTokenPrice: number; // 2000
  lockedTripPrice: number; // 13000
  oct30PriceIncreaseNotice: boolean; // increases by 1500 after 20 Nov
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
  aadharNumber?: string;
  aadharFrontFileName?: string;
  aadharFrontUrl?: string;
  aadharBackFileName?: string;
  aadharBackUrl?: string;
  prebookingTokenPrice?: number; // 2000
  lockedTripPrice?: number; // 13000
  bookingConsentAgreed?: boolean;
  bookingAmountTerms?: string;
  opportunityFeeAgreed: boolean; // Ready to pay subsidized opportunity fee if selected
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

