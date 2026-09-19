/**
 * CHEHRA FILMS
 * An initiative of Parindaa Travels
 * INDIA'S 1ST EXPERIMENTAL CINEMA PROJECT
 * 
 * Premium cinematic streaming + auteur film + travel editorial + casting website.
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroductionSection } from './components/IntroductionSection';
import { TheFilmSection } from './components/TheFilmSection';
import { KashmirExpeditionSection } from './components/KashmirExpeditionSection';
import { CastSection } from './components/CastSection';
import { WhyJoinSection } from './components/WhyJoinSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { IndiaSetGallerySection } from './components/IndiaSetGallerySection';
import { PhilosophySection } from './components/PhilosophySection';
import { ThreePathwaysSection } from './components/ThreePathwaysSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { NominationModal } from './components/NominationModal';
import { VideoModal } from './components/VideoModal';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { CharacterRole, PathwayType, AnySubmission, ActorSubmission, ParticipantSubmission, CrewSubmission } from './types';
import { CHARACTERS } from './data/cinemaData';
import {
  INITIAL_ACTOR_SUBMISSIONS,
  INITIAL_PARTICIPANT_SUBMISSIONS,
  INITIAL_CREW_SUBMISSIONS,
} from './data/initialSubmissions';

export default function App() {
  const [nominationModalOpen, setNominationModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(CHARACTERS[0].id);
  const [selectedPathway, setSelectedPathway] = useState<PathwayType>('actor');
  
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [inspectedCharacter, setInspectedCharacter] = useState<CharacterRole | null>(null);

  // Live submissions lists
  const [actors, setActors] = useState<ActorSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('chehra_actors');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ACTOR_SUBMISSIONS;
  });

  const [participants, setParticipants] = useState<ParticipantSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('chehra_participants');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PARTICIPANT_SUBMISSIONS;
  });

  const [crew, setCrew] = useState<CrewSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('chehra_crew');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CREW_SUBMISSIONS;
  });

  // Fetch initial data from server if available
  useEffect(() => {
    fetch('/api/submissions')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (Array.isArray(data.actors) && data.actors.length > 0) setActors(data.actors);
          if (Array.isArray(data.participants) && data.participants.length > 0) setParticipants(data.participants);
          if (Array.isArray(data.crew) && data.crew.length > 0) setCrew(data.crew);
        }
      })
      .catch((err) => {
        console.log('Local API sync fallback:', err.message);
      });
  }, []);

  const handleOpenNomination = (roleId?: string, pathway?: PathwayType) => {
    if (roleId) {
      setSelectedRoleId(roleId);
    }
    if (pathway) {
      setSelectedPathway(pathway);
    } else {
      setSelectedPathway('actor');
    }
    setNominationModalOpen(true);
  };

  const handleSelectRoleFromCast = (roleId: string) => {
    setSelectedRoleId(roleId);
    setSelectedPathway('actor');
    setNominationModalOpen(true);
  };

  const handleInspectCharacter = (character: CharacterRole) => {
    setInspectedCharacter(character);
  };

  const handleExploreJourney = () => {
    const journeyElement = document.getElementById('journey');
    if (journeyElement) {
      journeyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewSubmission = (submission: AnySubmission) => {
    if (submission.type === 'actor') {
      const updated = [submission as ActorSubmission, ...actors];
      setActors(updated);
      try {
        localStorage.setItem('chehra_actors', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    } else if (submission.type === 'participant') {
      const updated = [submission as ParticipantSubmission, ...participants];
      setParticipants(updated);
      try {
        localStorage.setItem('chehra_participants', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    } else if (submission.type === 'crew') {
      const updated = [submission as CrewSubmission, ...crew];
      setCrew(updated);
      try {
        localStorage.setItem('chehra_crew', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }

    // Sync with server API
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    }).catch((err) => console.log('Server sync notice:', err));
  };

  return (
    <div className="min-h-screen bg-[#060B14] text-[#e2e8f0] selection:bg-yellow-400/30 selection:text-white antialiased">
      {/* Fixed Header Navbar */}
      <Navbar
        onOpenNomination={(roleId, pathway) => handleOpenNomination(roleId, pathway)}
        onWatchFilm={() => setVideoModalOpen(true)}
      />

      <main>
        {/* 1. Fullscreen Hero */}
        <HeroSection
          onWatchFilm={() => setVideoModalOpen(true)}
          onOpenNomination={(roleId, type) => handleOpenNomination(roleId, type)}
        />

        {/* 2. Introduction */}
        <IntroductionSection />

        {/* 3. The Film */}
        <TheFilmSection
          onWatchTeaser={() => setVideoModalOpen(true)}
          onExploreJourney={handleExploreJourney}
        />

        {/* Shooting Trip Location Details: Kashmir Winter Expedition */}
        <KashmirExpeditionSection
          onOpenBooking={(pathway) => handleOpenNomination(undefined, pathway || 'participant')}
        />

        {/* 4. Cast / Nomination (6 Character cards in 3x2 grid) */}
        <CastSection
          onSelectRole={handleSelectRoleFromCast}
          onInspectCharacter={handleInspectCharacter}
        />

        {/* 5. Why Join (Interactive circular/orbital benefit interface) */}
        <WhyJoinSection />

        {/* 6. How It Works (Cinematic six-step timeline) */}
        <HowItWorksSection />

        {/* 7. India Becomes The Set (Immersive horizontal gallery) */}
        <IndiaSetGallerySection />

        {/* 8. Filmmaking Philosophy */}
        <PhilosophySection />

        {/* 9. Three Immersive Pathways of Involvement (Actor, Participant, Crew) */}
        <ThreePathwaysSection
          onSelectPathway={(pathway) => handleOpenNomination(undefined, pathway)}
        />

        {/* 10. Frequently Asked Questions (Actor Refund & Participant Pricing Policy) */}
        <FaqSection
          onOpenNomination={(roleId, pathway) => handleOpenNomination(roleId, pathway)}
        />

        {/* 11. Final CTA with 70% transparency image background */}
        <FinalCtaSection
          onJoinFilm={() => handleOpenNomination(undefined, 'participant')}
          onNominateRole={() => handleOpenNomination(undefined, 'actor')}
          onJoinCrew={() => handleOpenNomination(undefined, 'crew')}
        />
      </main>

      {/* 11. Footer */}
      <Footer onOpenNomination={() => handleOpenNomination()} />

      {/* Multi-Pathway Nomination / Booking / Crew Modal */}
      <NominationModal
        isOpen={nominationModalOpen}
        onClose={() => setNominationModalOpen(false)}
        initialRoleId={selectedRoleId}
        initialPathway={selectedPathway}
        onSubmissionSuccess={handleNewSubmission}
      />

      {/* Interactive Cinematic Video Player / Teaser Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* Character Dossier Inspector Modal */}
      <CharacterDetailModal
        character={inspectedCharacter}
        onClose={() => setInspectedCharacter(null)}
        onNominate={(roleId) => handleOpenNomination(roleId, 'actor')}
      />
    </div>
  );
}
