/**
 * CHEHRA FILMS
 * An initiative of Parindaa Travels
 * INDIA'S 1ST EXPERIMENTAL CINEMA PROJECT
 * 
 * Premium cinematic streaming + auteur film + travel editorial + casting website.
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroductionSection } from './components/IntroductionSection';
import { TheFilmSection } from './components/TheFilmSection';
import { CastSection } from './components/CastSection';
import { WhyJoinSection } from './components/WhyJoinSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { IndiaSetGallerySection } from './components/IndiaSetGallerySection';
import { PhilosophySection } from './components/PhilosophySection';
import { ActorVsParticipantSection } from './components/ActorVsParticipantSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { NominationModal } from './components/NominationModal';
import { VideoModal } from './components/VideoModal';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { CharacterRole } from './types';
import { CHARACTERS } from './data/cinemaData';

export default function App() {
  const [nominationModalOpen, setNominationModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(CHARACTERS[0].id);
  const [selectedRoleType, setSelectedRoleType] = useState<'actor' | 'participant'>('actor');
  
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [inspectedCharacter, setInspectedCharacter] = useState<CharacterRole | null>(null);

  const handleOpenNomination = (roleId?: string, type?: 'actor' | 'participant') => {
    if (roleId) {
      setSelectedRoleId(roleId);
    }
    if (type) {
      setSelectedRoleType(type);
    } else {
      setSelectedRoleType('actor');
    }
    setNominationModalOpen(true);
  };

  const handleSelectRoleFromCast = (roleId: string) => {
    setSelectedRoleId(roleId);
    setSelectedRoleType('actor');
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

  return (
    <div className="min-h-screen bg-[#060B14] text-[#e2e8f0] selection:bg-yellow-400/30 selection:text-white antialiased">
      {/* Fixed Header Navbar */}
      <Navbar
        onOpenNomination={() => handleOpenNomination()}
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

        {/* 4. Cast / Nomination (6 Character cards in 3x2 grid) */}
        <CastSection
          onSelectRole={handleSelectRoleFromCast}
          onInspectCharacter={handleInspectCharacter}
        />

        {/* 6. Why Join (Large interactive circular/orbital benefit interface) */}
        <WhyJoinSection />

        {/* 7. How It Works (Cinematic six-step horizontal timeline) */}
        <HowItWorksSection />

        {/* 8. India Becomes The Set (Immersive horizontal gallery) */}
        <IndiaSetGallerySection />

        {/* 9. Filmmaking Philosophy ("WE DON'T WANT TO JUST FILM INDIA. WE WANT TO EXPERIENCE IT.") */}
        <PhilosophySection />

        {/* 10. Actor vs Participant (Split-screen) */}
        <ActorVsParticipantSection
          onSelectActor={() => handleOpenNomination(undefined, 'actor')}
          onSelectParticipant={() => handleOpenNomination(undefined, 'participant')}
        />

        {/* 11. Final CTA */}
        <FinalCtaSection
          onJoinFilm={() => handleOpenNomination(undefined, 'participant')}
          onNominateRole={() => handleOpenNomination(undefined, 'actor')}
        />
      </main>

      {/* 12. Footer */}
      <Footer onOpenNomination={() => handleOpenNomination()} />

      {/* 5. Interactive Full-Screen Nomination Modal */}
      <NominationModal
        isOpen={nominationModalOpen}
        onClose={() => setNominationModalOpen(false)}
        initialRoleId={selectedRoleId}
        initialRoleType={selectedRoleType}
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
