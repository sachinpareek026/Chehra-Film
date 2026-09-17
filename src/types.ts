export interface CharacterRole {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Any';
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

export interface NominationFormData {
  fullName: string;
  age: string;
  city: string;
  phoneNumber: string;
  email: string;
  instagramProfile: string;
  selectedRole: string;
  roleType: 'actor' | 'participant';
  whyJoin: string;
  actingExperience: string;
  photoFile: File | null;
  photoPreviewUrl?: string;
  videoUrl: string;
  confirmed: boolean;
}
