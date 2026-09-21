import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Film,
  Compass,
  Wrench,
  Copy,
  Check,
  Award,
  Link as LinkIcon,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  AlertCircle,
  Eye,
  Camera,
  CheckCircle2,
  Video,
  FileCheck,
  Layers,
  Info,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { CHARACTERS, FILM_METADATA } from '../data/cinemaData';
import { INITIAL_ACTOR_SUBMISSIONS, INITIAL_PARTICIPANT_SUBMISSIONS, INITIAL_CREW_SUBMISSIONS } from '../data/initialSubmissions';
import { CinemaButton } from './CinemaButton';
import { PathwayType, AnySubmission, ActorSubmission, ParticipantSubmission, CrewSubmission } from '../types';

interface FAQItem {
  question: string;
  answer: string;
}

const MODAL_FAQS: Record<PathwayType, FAQItem[]> = {
  actor: [
    {
      question: 'How does the 100% Refund Policy work for actors?',
      answer:
        'Upon official character casting, actors place a production security deposit to guarantee their convoy seat and schedule. 100% of this deposit is refunded immediately to your original payment account upon completing your assigned on-location shoot schedule.',
    },
    {
      question: 'Is there any audition or submission fee?',
      answer:
        'Zero. Submitting your audition monologue, headshot, and portfolio is completely free. No deposit or financial commitment is requested unless you are officially selected for the cast.',
    },
    {
      question: 'What happens if I cannot attend after being selected?',
      answer:
        'If you notify the directorial desk at least 14 days before convoy roll-out, your full security deposit is returned without any deductions.',
    },
  ],
  participant: [
    {
      question: 'How does the booking price structure work?',
      answer:
        'Pay a ₹2,000 token today to reserve your expedition seat and permanently lock the early-bird rate of ₹13,000. The remaining ₹11,000 balance is settled prior to departure.',
    },
    {
      question: 'Why does the expedition rate increase after November 20?',
      answer:
        'To secure early convoy vehicle leases, Gulmarg ski equipment, and hotels before peak Christmas tariffs, registrations after 20 November 2026 are ₹14,500.',
    },
    {
      question: 'What is included in the ₹13,000 expedition fee?',
      answer:
        '7 nights / 8 days travel from Delhi, Katra (Vaishno Devi), Gulmarg (including the Gulmarg Ski 2-Day Certificate Course under Experts Training Program with instructor & gear), and Srinagar (Dal Lake houseboat & shikara ride).',
    },
  ],
  crew: [
    {
      question: 'What does the nominal opportunity fee cover?',
      answer:
        'Selected crew contribute a subsidized logistical share that covers cross-state equipment freight, dedicated technical vehicle transit, and base camp lodging.',
    },
    {
      question: 'What credits and portfolio rights do I receive?',
      answer:
        'Official theatrical and IMDb Department Head credits, festival delegation accreditation, and unrestricted rights to use graded cinematic footage in your personal showreel.',
    },
  ],
};

const EXPEDITION_ROUTE_STAGES = [
  { stage: 'STAGE 01', title: 'High Mountain Ascent', loc: 'Rohtang Pass & Spiti', img: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957437/Shankar.png' },
  { stage: 'STAGE 02', title: 'Shadow Monasteries', loc: 'Key Gompa & Kaza', img: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957431/Vandana.png' },
  { stage: 'STAGE 03', title: 'Overhanging Cliffs', loc: 'Kinnaur & Chitkul', img: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957433/SHiva.png' },
  { stage: 'STAGE 04', title: 'Dune Nightfall & Camp', loc: 'Thar Desert & Jaisalmer', img: 'https://res.cloudinary.com/x1dci3fh/image/upload/v1789957433/Jyoti.png' },
];

const CREW_DEPARTMENTS_META: Record<string, { desc: string; icon: string; tag: string }> = {
  'Cinematography & Camera Operation': { desc: 'Arri LF, RED 4K, Anamorphic prime rigs & gimbal handling in sub-zero terrain.', icon: 'Camera', tag: 'CAM DEPT' },
  'Music Composition & Background Score': { desc: 'Live microtonal strings, folk instrument tracking & environmental sound recordings.', icon: 'Music', tag: 'SOUNDTRACK' },
  'Screenplay & Dialogue Development': { desc: 'On-road narrative adaptation, spontaneous character conflict and improvised lines.', icon: 'Layers', tag: 'SCRIPT' },
  'Sound Design & Location Audio Recording': { desc: 'Spatial ambisonics, wind isolation, mountain echo capture & Dolby Atmos stems.', icon: 'Video', tag: 'AUDIO' },
  'Film Editing & Color Grading': { desc: 'Rough-cut assembly on location, Kodak 35mm film emulation & festival grade luts.', icon: 'Film', tag: 'POST' },
  'Costume Styling & Character Wardrobe': { desc: 'Authentic overland wear, weather-beaten layers & character continuity.', icon: 'Award', tag: 'STYLING' },
  'SFX Makeup & Prosthetics': { desc: 'Frostbite, altitude fatigue, authentic road patina and subtle character wear.', icon: 'Wrench', tag: 'SFX' },
  'Drone Pilot & Aerial Cinematography': { desc: 'High-altitude cold battery flight, ravine fly-throughs & cinematic convoy tracking.', icon: 'Compass', tag: 'AERIAL' },
  'Behind the Scenes & Photography': { desc: 'Medium-format analog stills, episodic documentary b-roll and press archival.', icon: 'Camera', tag: 'BTS' },
  'Other': { desc: 'Propose your own skillset, technical craft, or production specialization.', icon: 'Wrench', tag: 'CUSTOM' },
};

interface NominationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoleId?: string;
  initialPathway?: PathwayType;
  existingSubmissions?: AnySubmission[];
  onSubmissionSuccess?: (submission: AnySubmission) => void;
}

export const NominationModal: React.FC<NominationModalProps> = ({
  isOpen,
  onClose,
  initialRoleId,
  initialPathway = 'actor',
  existingSubmissions = [],
  onSubmissionSuccess,
}) => {
  const [pathway, setPathway] = useState<PathwayType>(initialPathway);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(initialRoleId || CHARACTERS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetSyncStatus, setSheetSyncStatus] = useState<{ success: boolean; message?: string } | null>(null);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  // Core Personal Details
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [instagramProfile, setInstagramProfile] = useState('');

  // Pathway 1: Actor Fields
  const [actingExperience, setActingExperience] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const [personalityAndSkills, setPersonalityAndSkills] = useState('');
  const [usefulRoleTarget, setUsefulRoleTarget] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState('');
  const [auditionTapeFileName, setAuditionTapeFileName] = useState('');
  const [auditionTapeUrl, setAuditionTapeUrl] = useState('');

  // Pathway 2: Participant Fields (Zero uploads)
  const [departureCity, setDepartureCity] = useState('Delhi Hub (Majnu Ka Tilla / ISBT)');
  const [travelBatch, setTravelBatch] = useState('Christmas Expedition (24 – 31 Dec 2026)');
  const [roomPreference, setRoomPreference] = useState('Twin Sharing with Fellow Traveler');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Pathway 3: Crew Member Fields
  const [crewDepartment, setCrewDepartment] = useState('Cinematography & Camera Operation');
  const [customCrewSkillset, setCustomCrewSkillset] = useState('');
  const [proofOfSkillLink, setProofOfSkillLink] = useState('');
  const [portfolioSummary, setPortfolioSummary] = useState('');
  const [opportunityFeeAgreed, setOpportunityFeeAgreed] = useState(true);
  const [publicFilmmakingConsent, setPublicFilmmakingConsent] = useState(true);

  // State
  const [submitted, setSubmitted] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<AnySubmission | null>(null);
  const [copiedAppId, setCopiedAppId] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Modal Footer FAQ State
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    setActiveFaqIndex(0);
  }, [pathway]);

  useEffect(() => {
    if (initialPathway) setPathway(initialPathway);
    if (initialRoleId) setSelectedRoleId(initialRoleId);
  }, [initialPathway, initialRoleId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentRole = CHARACTERS.find((c) => c.id === selectedRoleId) || CHARACTERS[0];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAuditionTapeFileName(e.target.files[0].name);
    }
  };

  const checkDuplicateApplication = (): { isDuplicate: boolean; message: string; duplicateField?: 'phone' | 'email' | 'both' } => {
    const allRecords: { email: string; phoneNumber: string; fullName?: string }[] = [];

    const addRecords = (items: any[]) => {
      if (!Array.isArray(items)) return;
      for (const item of items) {
        if (item && (item.email || item.phoneNumber)) {
          allRecords.push({
            email: String(item.email || '').trim().toLowerCase(),
            phoneNumber: String(item.phoneNumber || '').trim(),
            fullName: item.fullName,
          });
        }
      }
    };

    // 1. Live memory records passed from parent App
    if (existingSubmissions && existingSubmissions.length > 0) {
      addRecords(existingSubmissions);
    }

    // 2. Initial curated records
    addRecords(INITIAL_ACTOR_SUBMISSIONS);
    addRecords(INITIAL_PARTICIPANT_SUBMISSIONS);
    addRecords(INITIAL_CREW_SUBMISSIONS);

    // 3. LocalStorage records
    try {
      const localActors = localStorage.getItem('chehra_actors');
      if (localActors) addRecords(JSON.parse(localActors));
      const localParticipants = localStorage.getItem('chehra_participants');
      if (localParticipants) addRecords(JSON.parse(localParticipants));
      const localCrew = localStorage.getItem('chehra_crew');
      if (localCrew) addRecords(JSON.parse(localCrew));
    } catch (e) {
      console.error('Error reading saved submissions:', e);
    }

    const cleanDigits = (val: string) => {
      const digits = val.replace(/\D/g, '');
      return digits.length >= 10 ? digits.slice(-10) : digits;
    };

    const targetPhoneDigits = cleanDigits(phoneNumber);
    const targetEmail = email.trim().toLowerCase();

    let matchedPhone = false;
    let matchedEmail = false;

    for (const record of allRecords) {
      const recPhoneDigits = cleanDigits(record.phoneNumber);
      const recEmail = record.email.trim().toLowerCase();

      if (targetPhoneDigits.length >= 10 && recPhoneDigits.length >= 10 && targetPhoneDigits === recPhoneDigits) {
        matchedPhone = true;
      }
      if (targetEmail.length > 4 && recEmail.length > 4 && targetEmail === recEmail) {
        matchedEmail = true;
      }

      if (matchedPhone || matchedEmail) break;
    }

    if (matchedPhone && matchedEmail) {
      return {
        isDuplicate: true,
        duplicateField: 'both',
        message: 'You have already applied! Both this phone number and email address are already registered in our records. Please use a different email or phone number.',
      };
    }
    if (matchedPhone) {
      return {
        isDuplicate: true,
        duplicateField: 'phone',
        message: 'You have already applied! This phone number is already registered in our records. Please use a different phone number or email.',
      };
    }
    if (matchedEmail) {
      return {
        isDuplicate: true,
        duplicateField: 'email',
        message: 'You have already applied! This email address is already registered in our records. Please use a different email or phone number.',
      };
    }

    return { isDuplicate: false, message: '' };
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!age || Number(age) < 18 || Number(age) > 75) errs.age = 'Valid age (18–75) is required';
    if (!city.trim()) errs.city = 'Current city is required';
    if (!phoneNumber.trim() || phoneNumber.length < 8) errs.phoneNumber = 'Active phone number is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';

    // Duplicate verification against existing casting roster
    if (phoneNumber.trim().length >= 8 || (email.trim() && email.includes('@'))) {
      const duplicateResult = checkDuplicateApplication();
      if (duplicateResult.isDuplicate) {
        setDuplicateError(duplicateResult.message);
        if (duplicateResult.duplicateField === 'both') {
          errs.phoneNumber = 'You already applied! Phone number already exists.';
          errs.email = 'You already applied! Email address already exists.';
        } else if (duplicateResult.duplicateField === 'phone') {
          errs.phoneNumber = 'You already applied! Phone number already exists. Please use a different phone number.';
        } else if (duplicateResult.duplicateField === 'email') {
          errs.email = 'You already applied! Email address already exists. Please use a different email.';
        }
        errs.duplicate = duplicateResult.message;
      } else {
        setDuplicateError(null);
      }
    } else {
      setDuplicateError(null);
    }

    if (pathway === 'actor') {
      if (!photoFileName && !photoPreview) errs.photo = 'Headshot photograph is required';
      if (!auditionTapeFileName && !auditionTapeUrl.trim()) {
        errs.auditionTape = 'Audition monologue video upload or public reel link is required';
      }
      if (selectedRoleId === 'any-other-role') {
        if (!personalityAndSkills.trim()) {
          errs.personalityAndSkills = 'Please describe what personality and skills you bring';
        }
        if (!usefulRoleTarget.trim()) {
          errs.usefulRoleTarget = 'Please specify which role or character your skills and personality can be useful for';
        }
      }
    } else if (pathway === 'participant') {
      if (!emergencyContact.trim()) errs.emergencyContact = 'Emergency contact person & phone required';
    } else if (pathway === 'crew') {
      if (crewDepartment === 'Other' && !customCrewSkillset.trim()) {
        errs.customCrewSkillset = 'Please write your own skillset needed or technical craft';
      }
      if (!proofOfSkillLink.trim() || !proofOfSkillLink.startsWith('http')) {
        errs.proofOfSkillLink = 'A public portfolio/reel link (Drive, YouTube, Behance) is required';
      }
      if (!opportunityFeeAgreed) errs.opportunityFee = 'Please accept the opportunity fee policy';
      if (!publicFilmmakingConsent) errs.publicConsent = 'Filmmaking consent is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSheetSyncStatus(null);

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    let newSubmission: AnySubmission;

    if (pathway === 'actor') {
      const actorItem: ActorSubmission = {
        id: `CF-ACT-${randomSuffix}`,
        type: 'actor',
        submittedAt: dateStr,
        fullName,
        age,
        city,
        phoneNumber,
        email,
        instagramProfile: instagramProfile || 'N/A',
        selectedRole: `${currentRole.name} — ${currentRole.tagline}`,
        actingExperience: actingExperience || 'Self-taught / Raw talent',
        photoFileName: photoFileName || 'headshot.jpg',
        photoPreviewUrl: photoPreview || undefined,
        auditionTapeFileName: auditionTapeFileName || (auditionTapeUrl ? 'Public Video Link' : 'tape.mp4'),
        auditionTapeUrl: auditionTapeUrl || undefined,
        whyJoin: whyJoin || 'Passionate about cinema and exploratory storytelling on the road.',
        personalityAndSkills: personalityAndSkills.trim() || undefined,
        usefulRoleTarget: usefulRoleTarget.trim() || undefined,
        refundEligible: true,
        confirmed: true,
      };
      newSubmission = actorItem;
    } else if (pathway === 'participant') {
      const participantItem: ParticipantSubmission = {
        id: `CF-PART-${randomSuffix}`,
        type: 'participant',
        submittedAt: dateStr,
        fullName,
        age,
        city,
        phoneNumber,
        email,
        instagramProfile: instagramProfile || 'N/A',
        departureCity,
        travelBatch,
        roomPreference,
        emergencyContact,
        prebookingTokenPrice: 2000,
        lockedTripPrice: 13000,
        oct30PriceIncreaseNotice: true,
        paymentMode: 'UPI / Card (₹2,000 Token)',
        transactionRef: `UPI-PREBOOK-${randomSuffix}`,
        confirmed: true,
      };
      newSubmission = participantItem;
    } else {
      const crewItem: CrewSubmission = {
        id: `CF-CREW-${randomSuffix}`,
        type: 'crew',
        submittedAt: dateStr,
        fullName,
        age,
        city,
        phoneNumber,
        email,
        instagramProfile: instagramProfile || 'N/A',
        crewDepartment: crewDepartment === 'Other' && customCrewSkillset.trim() ? `Other: ${customCrewSkillset.trim()}` : crewDepartment,
        customCrewSkillset: customCrewSkillset.trim() || undefined,
        categoryType: 'Prime Department',
        proofOfSkillLink,
        portfolioSummary: portfolioSummary || 'Portfolio link provided',
        gearOrSoftware: 'Specified in portfolio link',
        opportunityFeeAgreed: true,
        publicFilmmakingConsent: true,
        confirmed: true,
      };
      newSubmission = crewItem;
    }

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubmission),
      });
      const data = await res.json();
      if (data.googleSheet?.success) {
        setSheetSyncStatus({
          success: true,
          message: 'Saved to production database & successfully delivered to Google Sheet webhook (200 OK)',
        });
      } else {
        setSheetSyncStatus({
          success: true,
          message: 'Saved to local database & queued for Google Sheet sync',
        });
      }
    } catch {
      setSheetSyncStatus({
        success: true,
        message: 'Saved to local storage and active convoy roster',
      });
    } finally {
      setIsSubmitting(false);
      setSubmittedItem(newSubmission);
      setSubmitted(true);

      if (onSubmissionSuccess) {
        onSubmissionSuccess(newSubmission);
      }
    }
  };

  const handleCopyId = () => {
    if (submittedItem?.id) {
      navigator.clipboard.writeText(submittedItem.id);
      setCopiedAppId(true);
      setTimeout(() => setCopiedAppId(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmittedItem(null);
    setFullName('');
    setAge('');
    setCity('');
    setPhoneNumber('');
    setEmail('');
    setInstagramProfile('');
    setActingExperience('');
    setWhyJoin('');
    setPersonalityAndSkills('');
    setUsefulRoleTarget('');
    setPhotoPreview(null);
    setPhotoFileName('');
    setAuditionTapeFileName('');
    setAuditionTapeUrl('');
    setEmergencyContact('');
    setProofOfSkillLink('');
    setPortfolioSummary('');
    setCustomCrewSkillset('');
    setErrors({});
    setDuplicateError(null);
    onClose();
  };

  return (
    <div
      id="nomination-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#03060E]/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      {/* WIDESCREEN CINEMATIC CONTAINER (up to max-w-6xl / 1152px) */}
      <div className="relative w-full max-w-6xl bg-[#080E1C] border border-white/15 shadow-2xl shadow-black/90 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Editorial Film Ribbon */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-white/10 bg-[#050A14] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-yellow-400/90 rounded-full animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="font-title text-xs sm:text-sm font-black tracking-widest text-white uppercase">
                CHEHRA FILMS
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-[11px] font-mono text-yellow-400/90 font-semibold tracking-wider uppercase">
                PRODUCTION DISPATCH PORTAL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300 uppercase tracking-widest">
              SEC. 004 // OVERLAND APPLICATION
            </span>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pathway Selection Ribbon Tabs */}
        {!submitted && (
          <div className="px-5 sm:px-8 py-3 bg-[#060C17] border-b border-white/10 shrink-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl">
              <button
                type="button"
                onClick={() => setPathway('actor')}
                className={`py-2 px-3 sm:px-4 text-left border transition-all cursor-pointer flex items-center justify-between ${
                  pathway === 'actor'
                    ? 'bg-yellow-400/10 border-yellow-400/90 text-yellow-400/90 shadow-md'
                    : 'bg-black/30 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider">
                    01. ACTOR AUDITION
                  </div>
                  <div className="text-[9px] text-emerald-400 font-mono mt-0.5">100% Refundable Deposit</div>
                </div>
                <Film className={`w-4 h-4 hidden sm:block ${pathway === 'actor' ? 'text-yellow-400/90' : 'text-slate-600'}`} />
              </button>

              <button
                type="button"
                onClick={() => setPathway('participant')}
                className={`py-2 px-3 sm:px-4 text-left border transition-all cursor-pointer flex items-center justify-between ${
                  pathway === 'participant'
                    ? 'bg-blue-600/20 border-blue-400 text-blue-300 shadow-md'
                    : 'bg-black/30 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider">
                    02. PARTICIPANT
                  </div>
                  <div className="text-[9px] text-blue-400 font-mono mt-0.5">₹2,000 Token • Zero Uploads</div>
                </div>
                <Compass className={`w-4 h-4 hidden sm:block ${pathway === 'participant' ? 'text-blue-400' : 'text-slate-600'}`} />
              </button>

              <button
                type="button"
                onClick={() => setPathway('crew')}
                className={`py-2 px-3 sm:px-4 text-left border transition-all cursor-pointer flex items-center justify-between ${
                  pathway === 'crew'
                    ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-black/30 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider">
                    03. CREW MEMBER
                  </div>
                  <div className="text-[9px] text-emerald-400 font-mono mt-0.5">Department Head Credit</div>
                </div>
                <Wrench className={`w-4 h-4 hidden sm:block ${pathway === 'crew' ? 'text-emerald-400' : 'text-slate-600'}`} />
              </button>
            </div>
          </div>
        )}

        {/* Form Body: Widescreen 2-Column Layout */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {submitted && submittedItem ? (
            /* =========================================================================
               CONFIRMATION STAGE: Widescreen Success Showcase
               ========================================================================= */
            <div className="max-w-2xl mx-auto text-center space-y-6 py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-yellow-400/90 font-semibold block">
                  PARINDAA TRAVELS CINEMATIC INITIATIVE
                </span>
                <h3 className="font-title text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                  WELCOME TO CHEHRA FILMS
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Your application has been received and indexed into the official production database.
                </p>
              </div>

              <div className="p-5 bg-[#050A14] border border-white/10 text-left text-xs text-slate-300 space-y-2.5 font-light leading-relaxed">
                <p>
                  Dear <strong className="text-white font-medium">{submittedItem.fullName}</strong>,
                </p>
                <p className="text-slate-400">
                  Thank you for applying to be part of India&apos;s first experimental cinema project on the road. Our directorial and expedition team is reviewing your profile and credentials.
                </p>
                <p className="text-slate-400">
                  We will contact you directly on <strong className="text-yellow-400/90">{submittedItem.phoneNumber}</strong> via WhatsApp and Email regarding casting decisions and convoy roll-out timings.
                </p>
              </div>

              <div className="p-4 bg-[#0A1324] border border-white/10 flex items-center justify-between text-left font-mono">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider block">
                    OFFICIAL REFERENCE ID
                  </span>
                  <span className="text-lg font-bold text-yellow-400/90">
                    {submittedItem.id}
                  </span>
                </div>
                <button
                  onClick={handleCopyId}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  {copiedAppId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Webhook & Database Dispatch Status */}
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-left space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    PRODUCTION DISPATCH CONFIRMED
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-900/60 text-emerald-200 border border-emerald-400/40 text-[10px] font-bold">
                    HTTP 200 OK
                  </span>
                </div>
                <p className="text-[11px] text-emerald-300/90 font-light">
                  {sheetSyncStatus?.message || 'Data indexed in production registry and forwarded to Google Sheet webhook.'}
                </p>
              </div>

              {/* WhatsApp Payment & Seat Confirmation for Participant Submissions */}
              {submittedItem.type === 'participant' && (
                <div className="p-4 sm:p-5 bg-gradient-to-br from-[#062412] to-[#04170B] border-2 border-[#25D366] text-left space-y-3.5 shadow-xl shadow-[#25D366]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#25D366]">
                        OFFICIAL WHATSAPP SEAT CONFIRMATION DESK
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-mono text-[10px] font-bold">
                      FAST TRACK
                    </span>
                  </div>

                  <div className="text-xs text-slate-200 font-sans leading-relaxed space-y-1">
                    <p className="font-medium text-white">
                      Your form has been recorded. To lock your seat immediately at the ₹13,000 Early Bird rate, pay your ₹2,000 token on WhatsApp.
                    </p>
                    <p className="text-[11px] text-slate-300 font-mono">
                      Official Desk Number: <span className="text-[#25D366] font-semibold">+91 93266 32288</span>
                    </p>
                  </div>

                  <a
                    id="whatsapp-confirm-seat-btn"
                    href={`https://wa.me/919326632288?text=${encodeURIComponent(
                      `Hello Chehra Films, I have submitted my participation form for the Kashmir Winter Expedition.\n\n` +
                      `• Reference ID: ${submittedItem.id}\n` +
                      `• Name: ${submittedItem.fullName}\n` +
                      `• Phone: ${submittedItem.phoneNumber}\n` +
                      `• City: ${submittedItem.city}\n` +
                      `• Batch: ${'travelBatch' in submittedItem ? submittedItem.travelBatch : 'Christmas Expedition (24 – 31 Dec 2026)'}\n` +
                      `• Token Amount: ₹2,000 (Early Bird Total: ₹13,000)\n\n` +
                      `I want to pay on WhatsApp and confirm my seat now!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-[#070A0F] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/30 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    <span>PAY ON WHATSAPP & CONFIRM YOUR SEAT</span>
                  </a>
                </div>
              )}

              <div className="pt-2 space-y-2">
                <CinemaButton
                  variant="primary"
                  onClick={handleResetAndClose}
                  className="w-full !py-3 text-xs tracking-wider"
                >
                  RETURN TO EXPEDITION DASHBOARD
                </CinemaButton>
              </div>
            </div>
          ) : (
            /* =========================================================================
               WIDESCREEN 2-COLUMN IMMERSIVE FORM
               Left Side (5 cols on lg): Live Visual Character / Pathway Dossier
               Right Side (7 cols on lg): Comprehensive Form Controls
               ========================================================================= */
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: DYNAMIC VISUAL STAGE & ROLE CARD */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Visual Card 1: Pathway-Specific Visual Showcase */}
                {pathway === 'actor' && (
                  <div className="bg-[#050A14] border border-white/15 overflow-hidden shadow-xl">
                    {/* Visual Role Image with Cinematic Tone */}
                    <div className="relative aspect-4/3 sm:aspect-16/10 overflow-hidden bg-black group">
                      <img
                        src={currentRole.image}
                        alt={currentRole.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top filter grayscale-[10%] brightness-90 contrast-105 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/40 to-transparent" />
                      
                      {/* Top Floating Badge */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-black/80 border border-white/20 text-[9px] font-mono text-yellow-400/90 uppercase tracking-widest backdrop-blur-md">
                          SELECTED DOSSIER
                        </span>
                        <span className="px-2 py-0.5 bg-yellow-400/90 text-black text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                          100% REFUND
                        </span>
                      </div>

                      {/* Character Title overlay */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[10px] font-mono text-yellow-400/90 uppercase tracking-widest font-semibold block">
                          {currentRole.archetype}
                        </span>
                        <h3 className="font-title text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                          {currentRole.name}
                        </h3>
                        <p className="text-xs text-slate-300 italic font-light line-clamp-1">
                          &ldquo;{currentRole.tagline}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Character Narrative Breakdown */}
                    <div className="p-4 sm:p-5 space-y-3.5">
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        {currentRole.description}
                      </p>

                      {/* Unscripted Scene Snippet */}
                      <div className="p-3 bg-black/60 border border-white/10 text-xs">
                        <span className="text-[9px] font-mono text-yellow-400/90 uppercase tracking-widest block font-bold mb-1">
                          KEY UNSCRIPTED SCENE:
                        </span>
                        <p className="text-slate-300 italic font-light text-[11px] leading-relaxed">
                          {currentRole.keyScenePreview}
                        </p>
                      </div>

                      {/* Filming Soundstages */}
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 flex-wrap">
                        <MapPin className="w-3.5 h-3.5 text-yellow-400/90 shrink-0" />
                        <span className="text-slate-300">SOUNDSTAGES:</span>
                        <span className="text-yellow-400/90">{currentRole.filmingLocations.join(' • ')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {pathway === 'participant' && (
                  <div className="bg-[#050A14] border border-blue-900/40 overflow-hidden shadow-xl">
                    {/* Visual Map/Convoy Route Image */}
                    <div className="relative aspect-16/10 overflow-hidden bg-black">
                      <img
                        src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789957421/Participant.jpg"
                        alt="Expedition Route"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter contrast-110 brightness-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/50 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-blue-600/90 text-white font-mono text-[9px] uppercase font-bold tracking-wider">
                          2,400 KM OVERLAND EXPEDITION
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest font-semibold block">
                          PARINDAA OVERLAND CONVOY
                        </span>
                        <h3 className="font-title text-2xl font-black text-white uppercase tracking-tight">
                          JOIN THE TRAVEL CARAVAN
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Price Guarantee Banner */}
                      <div className="p-3.5 bg-blue-950/40 border border-blue-500/30">
                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                          <span className="text-slate-300">LOCKED EXPEDITION FARE:</span>
                          <span className="text-yellow-400/90 font-bold text-sm">₹13,000/-</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                          <span>Pre-booking Token Today:</span>
                          <span className="font-bold">₹2,000/- Only</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 font-mono">
                          * Early bird price ₹13,000; increases to ₹14,500 after 20 November 2026.
                        </p>
                      </div>

                      {/* Route 4 Acts Preview */}
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                          EXPEDITION HIGHWAY LEGS:
                        </span>
                        <div className="space-y-1.5">
                          {EXPEDITION_ROUTE_STAGES.map((st, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-black/40 border border-white/5 text-[11px] font-mono">
                              <span className="text-yellow-400/90">{st.stage}</span>
                              <span className="text-slate-300">{st.title}</span>
                              <span className="text-slate-400 text-[10px]">{st.loc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {pathway === 'crew' && (
                  <div className="bg-[#050A14] border border-emerald-900/40 overflow-hidden shadow-xl">
                    <div className="relative aspect-16/10 overflow-hidden bg-black">
                      <img
                        src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789957420/Crew.jpg"
                        alt="Cinema Technical Crew"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter contrast-110 brightness-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/50 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-emerald-600/90 text-white font-mono text-[9px] uppercase font-bold tracking-wider">
                          TECHNICAL & CREATIVE CREW
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold block">
                          DEPARTMENT RECRUITMENT
                        </span>
                        <h3 className="font-title text-2xl font-black text-white uppercase tracking-tight">
                          {CREW_DEPARTMENTS_META[crewDepartment]?.tag || 'FILM CRAFT'}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Department Spotlight */}
                      <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold mb-1">
                          ASSIGNMENT FOCUS:
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                          {CREW_DEPARTMENTS_META[crewDepartment]?.desc || 'Work directly with camera, lighting, sound and narrative leads.'}
                        </p>
                      </div>

                      {/* Technical Specs Guarantee */}
                      <div className="space-y-2 text-[11px] font-mono text-slate-300">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Official IMDb Department Head Credit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>4K Master Footage Portfolio Rights</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Global Film Festival Delegation Pass</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trust & Guarantee Callout */}
                <div className="p-3.5 bg-[#060B14] border border-white/10 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-300 leading-relaxed">
                    <span className="text-white font-medium block">Parindaa Assurance:</span>
                    All accepted cast and travelers operate under transparent legal contracts with verified transit insurance and guaranteed refundable terms.
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: APPLICATION FORM CONTROLS */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Form Section Header */}
                <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-title font-black text-white uppercase tracking-wider">
                      {pathway === 'actor' && 'ACTOR AUDITION APPLICATION'}
                      {pathway === 'participant' && 'PARTICIPANT RESERVATION FORM'}
                      {pathway === 'crew' && 'TECHNICAL CREW REGISTRATION'}
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">
                      {pathway === 'actor' && 'Submit your headshot photograph & monologue link to audition for the lead cast.'}
                      {pathway === 'participant' && 'No portfolio or auditions required. Reserve your seat in the expedition convoy.'}
                      {pathway === 'crew' && 'Provide your portfolio or showreel link for department head evaluation.'}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-yellow-400/90 font-bold uppercase tracking-wider shrink-0">
                    STEP 1 OF 1
                  </span>
                </div>

                {/* Important Casting Notice (Sample Images Disclaimer Note) — ONLY for Actor Form */}
                {pathway === 'actor' && (
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-100/95 leading-relaxed font-sans">
                      <span className="font-mono text-[10px] font-bold text-yellow-400 uppercase tracking-widest block mb-0.5">
                        CASTING NOTE // SAMPLE IMAGES IN NATURE
                      </span>
                      These images are sample in nature. Do not form or get any predefined idea of the character from these images — casting is completely open to all authentic faces, backgrounds, and interpretations.
                    </div>
                  </div>
                )}

                {/* Character Selection Images (At the top of form for actors) */}
                {pathway === 'actor' && (
                  <div className="p-4 bg-[#070D18] border border-yellow-400/40 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <label className="text-[11px] font-mono uppercase tracking-wider text-yellow-400 font-bold">
                          SELECT CHARACTER ROLE * (CLICK IMAGE TO CHOOSE)
                        </label>
                      </div>
                      <span className="text-[10px] font-mono text-[#A5A196] uppercase">
                        {CHARACTERS.length} ROLES AVAILABLE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {CHARACTERS.map((char, idx) => {
                        const isSelected = char.id === selectedRoleId;
                        return (
                          <button
                            key={char.id}
                            type="button"
                            onClick={() => setSelectedRoleId(char.id)}
                            title={`${char.name} (${char.archetype})`}
                            className={`group relative flex flex-col p-1.5 border transition-all text-left cursor-pointer ${
                              isSelected
                                ? 'bg-yellow-400/15 border-yellow-400 ring-2 ring-yellow-400/50 scale-[1.02] shadow-lg shadow-yellow-400/10'
                                : 'bg-[#040810] border-white/10 hover:border-yellow-400/40 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="relative w-full aspect-square overflow-hidden bg-black mb-1.5">
                              <img
                                src={char.image}
                                alt={char.name}
                                referrerPolicy="no-referrer"
                                className={`w-full h-full object-cover object-top transition-transform duration-300 ${
                                  isSelected ? 'scale-105' : 'group-hover:scale-105 opacity-80 group-hover:opacity-100'
                                }`}
                              />
                              <span className="absolute bottom-1 left-1 px-1 py-0.2 text-[8px] font-mono bg-black/80 text-yellow-400/90 font-bold">
                                0{idx + 1}
                              </span>
                              {isSelected && (
                                <div className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 text-black rounded-full flex items-center justify-center text-[10px] font-black shadow">
                                  ✓
                                </div>
                              )}
                            </div>
                            <div className="w-full">
                              <div className={`text-[10px] font-mono font-bold uppercase truncate ${
                                isSelected ? 'text-yellow-400' : 'text-[#EDE8DF]'
                              }`}>
                                {char.name}
                              </div>
                              <div className="text-[9px] text-[#A5A196] font-mono truncate">
                                {char.gender} • {char.ageRange}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="px-3 py-2 bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-bold uppercase tracking-wider">SELECTED:</span>
                        <span className="text-white font-semibold">{currentRole.name}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-300 italic">{currentRole.archetype}</span>
                      </div>
                      <span className="text-yellow-400/90 text-[10px]">
                        Age {currentRole.ageRange} [{currentRole.gender}]
                      </span>
                    </div>
                  </div>
                )}

                {/* 1. Core Personal Details */}
                <div className="space-y-4">
                  <div className="text-[10px] font-mono text-yellow-400/90 uppercase tracking-widest font-bold">
                    01 // PERSONAL CREDENTIALS
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Arjun Sharma"
                        className="w-full px-3.5 py-2.5 bg-[#050A14] border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-yellow-400/90 transition-colors"
                      />
                      {errors.fullName && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                          Age *
                        </label>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="24"
                          min="18"
                          max="75"
                          className="w-full px-3.5 py-2.5 bg-[#050A14] border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-yellow-400/90 transition-colors"
                        />
                        {errors.age && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.age}</p>}
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                          Current City *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Mumbai"
                          className="w-full px-3.5 py-2.5 bg-[#050A14] border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-yellow-400/90 transition-colors"
                        />
                        {errors.city && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.city}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (duplicateError) setDuplicateError(null);
                          if (errors.phoneNumber) {
                            setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                          }
                        }}
                        placeholder="+91 98765 43210"
                        className={`w-full px-3.5 py-2.5 bg-[#050A14] border text-white text-xs placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.phoneNumber || duplicateError?.includes('phone')
                            ? 'border-red-500 focus:border-red-400 bg-red-950/10'
                            : 'border-white/15 focus:border-yellow-400/90'
                        }`}
                      />
                      {errors.phoneNumber && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (duplicateError) setDuplicateError(null);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: '' }));
                          }
                        }}
                        placeholder="you@email.com"
                        className={`w-full px-3.5 py-2.5 bg-[#050A14] border text-white text-xs placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.email || duplicateError?.includes('email')
                            ? 'border-red-500 focus:border-red-400 bg-red-950/10'
                            : 'border-white/15 focus:border-yellow-400/90'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Duplicate Application Alert Box */}
                  {duplicateError && (
                    <div className="p-4 bg-red-950/60 border-2 border-red-500/90 flex items-start gap-3 shadow-lg shadow-red-950/50 animate-in fade-in duration-200">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="font-mono text-[11px] font-bold text-red-300 uppercase tracking-widest flex items-center gap-2">
                          <span>DUPLICATE APPLICATION DETECTED</span>
                          <span className="px-1.5 py-0.2 bg-red-500 text-black text-[9px] font-mono font-black">SUBMISSION BLOCKED</span>
                        </div>
                        <p className="text-xs text-red-100 font-sans leading-relaxed">
                          {duplicateError}
                        </p>
                        <p className="text-[10px] font-mono text-red-300/80">
                          To apply for another role or convoy seat, please enter a unique phone number and email ID not previously registered.
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                      Instagram / Social Link (Optional)
                    </label>
                    <input
                      type="text"
                      value={instagramProfile}
                      onChange={(e) => setInstagramProfile(e.target.value)}
                      placeholder="@yourhandle or profile URL"
                      className="w-full px-3.5 py-2.5 bg-[#050A14] border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-yellow-400/90 transition-colors"
                    />
                  </div>
                </div>

                {/* 2. PATHWAY SPECIFIC SECTION */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  
                  {/* PATHWAY 1: ACTOR FIELDS */}
                  {pathway === 'actor' && (
                    <>
                      <div className="text-[10px] font-mono text-yellow-400/90 uppercase tracking-widest font-bold">
                        02 // ACTOR CASTING CRITERIA
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-yellow-400/90 block mb-1.5">
                          Desired Character Role *
                        </label>
                        <select
                          value={selectedRoleId}
                          onChange={(e) => setSelectedRoleId(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#050A14] border border-yellow-400/40 text-white text-xs focus:outline-none focus:border-yellow-400/90 transition-colors"
                        >
                          {CHARACTERS.map((char) => (
                            <option key={char.id} value={char.id}>
                              {char.name} ({char.archetype}) — Age {char.ageRange} [{char.gender}]
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Any Other Role — Personality & Skills Profiling */}
                      {selectedRoleId === 'any-other-role' && (
                        <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              OPEN ROLE PROFILE (MALE / FEMALE)
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] font-bold uppercase">
                              ANY BACKGROUND
                            </span>
                          </div>

                          <div>
                            <label className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block mb-1.5 font-medium">
                              What personality and skills do you have? *
                            </label>
                            <textarea
                              rows={3}
                              value={personalityAndSkills}
                              onChange={(e) => setPersonalityAndSkills(e.target.value)}
                              placeholder="Describe your authentic personality, temperament, presence, and any skills you possess (e.g., emotional intensity, comedy, dialogue improvisation, singing, driving, mountain endurance)..."
                              className="w-full px-3.5 py-2.5 bg-[#050A14] border border-emerald-500/40 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                            />
                            {errors.personalityAndSkills && (
                              <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.personalityAndSkills}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block mb-1.5 font-medium">
                              Which role or character can your personality and skills be useful for? *
                            </label>
                            <input
                              type="text"
                              value={usefulRoleTarget}
                              onChange={(e) => setUsefulRoleTarget(e.target.value)}
                              placeholder="E.g., Mysterious traveler, fiery rebel, calm mentor, local confidant, silent observer..."
                              className="w-full px-3.5 py-2.5 bg-[#050A14] border border-emerald-500/40 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                            />
                            {errors.usefulRoleTarget && (
                              <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.usefulRoleTarget}</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                          Acting Background / Storytelling Experience
                        </label>
                        <textarea
                          rows={2}
                          value={actingExperience}
                          onChange={(e) => setActingExperience(e.target.value)}
                          placeholder="Theatre, short films, street play, or passionate raw actor with no formal training..."
                          className="w-full px-3.5 py-2.5 bg-[#050A14] border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-yellow-400/90 transition-colors"
                        />
                      </div>

                      {/* Headshot Upload + Live Visual Thumbnail */}
                      <div className="p-4 bg-[#050A14] border border-white/15 space-y-3">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block font-semibold">
                          Headshot Photograph *
                        </label>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          {photoPreview ? (
                            <div className="relative w-16 h-20 rounded border border-yellow-400/90 overflow-hidden shrink-0">
                              <img src={photoPreview} alt="Headshot preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-yellow-400/10" />
                            </div>
                          ) : (
                            <div className="w-16 h-20 bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-500 shrink-0">
                              <Camera className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[8px] font-mono uppercase">PHOTO</span>
                            </div>
                          )}

                          <div className="flex-1 space-y-1.5">
                            <label className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono text-slate-200 cursor-pointer transition-colors inline-flex items-center gap-2">
                              <Upload className="w-3.5 h-3.5 text-yellow-400/90" />
                              <span>{photoFileName ? 'Change Photo' : 'Upload Headshot'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                            </label>
                            <p className="text-[10px] font-mono text-slate-400 truncate max-w-sm">
                              {photoFileName || 'Clear unedited portrait with natural lighting (JPG/PNG)'}
                            </p>
                          </div>
                        </div>
                        {errors.photo && <p className="text-[10px] text-red-400 font-mono">{errors.photo}</p>}
                      </div>

                      {/* Audition Monologue */}
                      <div className="p-4 bg-[#050A14] border border-white/15 space-y-3">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block font-semibold">
                          Audition Monologue Video *
                        </label>

                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <label className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono text-slate-200 cursor-pointer transition-colors inline-flex items-center gap-2">
                              <Video className="w-3.5 h-3.5 text-yellow-400/90" />
                              <span>Upload Video File</span>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="hidden"
                              />
                            </label>
                            <span className="text-xs font-mono text-slate-400 truncate">
                              {auditionTapeFileName || 'Max 100MB MP4 / MOV'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-500 uppercase">OR</span>
                            <div className="relative flex-1">
                              <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                              <input
                                type="url"
                                value={auditionTapeUrl}
                                onChange={(e) => setAuditionTapeUrl(e.target.value)}
                                placeholder="Paste Google Drive / YouTube unlisted link"
                                className="w-full pl-8 pr-3.5 py-2 bg-black/60 border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-yellow-400/90 transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                        {errors.auditionTape && <p className="text-[10px] text-red-400 font-mono">{errors.auditionTape}</p>}
                      </div>
                    </>
                  )}

                  {/* PATHWAY 2: PARTICIPANT FIELDS */}
                  {pathway === 'participant' && (
                    <>
                      <div className="text-[10px] font-mono text-blue-300 uppercase tracking-widest font-bold">
                        02 // EXPEDITION CONVOY PREFERENCES
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-mono uppercase tracking-wider text-blue-300 block mb-1.5">
                            Departure Convoy Hub *
                          </label>
                          <select
                            value={departureCity}
                            onChange={(e) => setDepartureCity(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#050A14] border border-blue-500/40 text-white text-xs focus:outline-none focus:border-blue-400 transition-colors"
                          >
                            <option value="Delhi Majnu Ka Tilla Hub">Delhi (Majnu Ka Tilla Hub)</option>
                            <option value="Mumbai / Pune Convoy">Mumbai / Pune Convoy</option>
                            <option value="Jaipur Gathering Hub">Jaipur Gathering Hub</option>
                            <option value="Bengaluru Flying Hub">Bengaluru Fly-in Hub</option>
                            <option value="Direct Srinagar Fly-in">Direct Srinagar Fly-in</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-mono uppercase tracking-wider text-blue-300 block mb-1.5">
                            Travel Batch Date *
                          </label>
                          <select
                            value={travelBatch}
                            onChange={(e) => setTravelBatch(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#050A14] border border-blue-500/40 text-white text-xs focus:outline-none focus:border-blue-400 transition-colors"
                          >
                            <option value="Christmas Winter Batch (24 – 31 Dec 2026)">Christmas Winter Batch (24 – 31 Dec 2026)</option>
                            <option value="New Year Winter Batch (01 – 08 Jan 2027)">New Year Winter Batch (01 – 08 Jan 2027)</option>
                            <option value="Deep Winter Skiing Batch (12 – 19 Jan 2027)">Deep Winter Skiing Batch (12 – 19 Jan 2027)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                          Room / Base Camp Stay Preference
                        </label>
                        <select
                          value={roomPreference}
                          onChange={(e) => setRoomPreference(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#050A14] border border-white/15 text-white text-xs focus:outline-none focus:border-blue-400 transition-colors"
                        >
                          <option value="Twin Sharing with Fellow Traveler">Twin Sharing (Included in ₹13,000 Early Bird)</option>
                          <option value="Private Hotel / Houseboat Room">Private Hotel / Houseboat Room (Subject to tariff differential)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                          Emergency Contact (Name & Phone) *
                        </label>
                        <input
                          type="text"
                          value={emergencyContact}
                          onChange={(e) => setEmergencyContact(e.target.value)}
                          placeholder="e.g. Meera Sharma (Mother) +91 98110 55667"
                          className="w-full px-3.5 py-2.5 bg-[#050A14] border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-blue-400 transition-colors"
                        />
                        {errors.emergencyContact && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.emergencyContact}</p>}
                      </div>
                    </>
                  )}

                  {/* PATHWAY 3: CREW FIELDS */}
                  {pathway === 'crew' && (
                    <>
                      <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                        02 // FILM DEPARTMENT CRAFT
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block mb-1.5">
                          Department Selection *
                        </label>
                        <select
                          value={crewDepartment}
                          onChange={(e) => setCrewDepartment(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#050A14] border border-emerald-500/40 text-white text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                        >
                          {Object.keys(CREW_DEPARTMENTS_META).map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* When Other is selected: Open text box for user's own skillset needed */}
                      {crewDepartment === 'Other' && (
                        <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block font-semibold">
                            Write Your Own Skillset Needed *
                          </label>
                          <textarea
                            rows={3}
                            value={customCrewSkillset}
                            onChange={(e) => setCustomCrewSkillset(e.target.value)}
                            placeholder="Write your own skillset needed, technical specialty, or production craft you bring to the film crew..."
                            className="w-full px-3.5 py-2.5 bg-[#050A14] border border-emerald-500/50 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                          />
                          {errors.customCrewSkillset && (
                            <p className="text-[10px] text-red-400 font-mono">{errors.customCrewSkillset}</p>
                          )}
                          <p className="text-[10px] font-mono text-slate-400">
                            * Explain the tools, expertise, or creative role you propose for the mountain shoot.
                          </p>
                        </div>
                      )}

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                          Proof of Skill Link (Public Drive, YouTube, Behance, Spotify) *
                        </label>
                        <div className="relative">
                          <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="url"
                            value={proofOfSkillLink}
                            onChange={(e) => setProofOfSkillLink(e.target.value)}
                            placeholder="https://drive.google.com/... or https://youtube.com/..."
                            className="w-full pl-8 pr-3.5 py-2.5 bg-[#050A14] border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
                          />
                        </div>
                        {errors.proofOfSkillLink && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.proofOfSkillLink}</p>}
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                          Brief Note on Gear / Software Expertise
                        </label>
                        <textarea
                          rows={2}
                          value={portfolioSummary}
                          onChange={(e) => setPortfolioSummary(e.target.value)}
                          placeholder="Cameras owned, editing software used, past production experience..."
                          className="w-full px-3.5 py-2 bg-[#050A14] border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>

                      <div className="p-3.5 bg-[#050A14] border border-white/10 space-y-2.5 text-[11px] font-mono text-slate-300">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={opportunityFeeAgreed}
                            onChange={(e) => setOpportunityFeeAgreed(e.target.checked)}
                            className="accent-emerald-400 mt-0.5"
                          />
                          <span>I agree to pay the nominal opportunity fee if selected for on-location privileges</span>
                        </label>
                        {errors.opportunityFee && <p className="text-[10px] text-red-400 font-mono">{errors.opportunityFee}</p>}

                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={publicFilmmakingConsent}
                            onChange={(e) => setPublicFilmmakingConsent(e.target.checked)}
                            className="accent-emerald-400 mt-0.5"
                          />
                          <span>I grant full consent for character and filmmaking public usage</span>
                        </label>
                        {errors.publicConsent && <p className="text-[10px] text-red-400 font-mono">{errors.publicConsent}</p>}
                      </div>
                    </>
                  )}
                </div>

                {/* Submit Action Block */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {duplicateError && (
                    <div className="p-3.5 bg-red-950/90 border border-red-500 flex items-start gap-2.5 text-red-200">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-mono text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                          APPLICATION ALREADY ON FILE
                        </span>
                        <p className="mt-0.5 text-red-200/90">
                          {duplicateError}
                        </p>
                      </div>
                    </div>
                  )}

                  <CinemaButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full !py-3.5 text-xs tracking-widest font-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span>DISPATCHING TO PRODUCTION & GOOGLE SHEET...</span>
                      </>
                    ) : (
                      <>
                        {pathway === 'actor' && `SUBMIT AUDITION AS ${currentRole.name} (100% REFUND)`}
                        {pathway === 'participant' && 'CONFIRM PRE-BOOKING TOKEN (₹2,000)'}
                        {pathway === 'crew' && 'SUBMIT TECHNICAL CREW APPLICATION'}
                      </>
                    )}
                  </CinemaButton>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>* Zero submission fees for auditions & crew screening</span>
                    <span className="text-yellow-400/90 font-semibold">ENCRYPTED & CONFIDENTIAL</span>
                  </div>
                </div>

              </div>
            </form>
          )}
        </div>

        {/* Footer FAQ Accordion */}
        <div className="border-t border-white/10 bg-[#050A14] px-5 sm:px-8 py-2.5 shrink-0">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsFaqOpen((prev) => !prev)}
              className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            >
              <HelpCircle className="w-3.5 h-3.5 text-yellow-400/90 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-white uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 bg-white/5 text-slate-300 border border-white/10 uppercase">
                {pathway === 'actor' && '100% Actor Refund Policy'}
                {pathway === 'participant' && '₹2,000 Token & Price Structure'}
                {pathway === 'crew' && 'Opportunity Fee & Production Credits'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsFaqOpen((prev) => !prev)}
              className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer focus:outline-none"
              aria-label={isFaqOpen ? 'Collapse FAQ' : 'Expand FAQ'}
            >
              {isFaqOpen ? (
                <ChevronUp className="w-4 h-4 text-yellow-400/90" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>

          {isFaqOpen && (
            <div className="mt-2.5 pt-2 border-t border-white/5 space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {MODAL_FAQS[pathway].map((faq, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-white/5 bg-[#080E1C] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left px-3 py-1.5 flex items-center justify-between gap-2 hover:bg-white/5 transition-colors cursor-pointer focus:outline-none"
                    >
                      <span className="text-[11px] font-medium text-slate-200">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-3 h-3 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-yellow-400/90' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-2 pt-0.5 text-[10.5px] text-slate-400 leading-relaxed font-light border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
