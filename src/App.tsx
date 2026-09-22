/**
 * CHEHRA FILMS
 * An initiative of Parindaa Travels
 * INDIA'S 1ST EXPERIMENTAL CINEMA PROJECT
 * 
 * Premium cinematic streaming + auteur film + travel editorial + casting website.
 */

import { useState, useEffect, useCallback } from 'react';
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
import { ExcelDataPortalModal } from './components/ExcelDataPortalModal';
import { RefundPolicyPage } from './components/RefundPolicyPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { CharacterRole, PathwayType, AnySubmission, ActorSubmission, ParticipantSubmission, CrewSubmission } from './types';
import { CHARACTERS } from './data/cinemaData';
import {
  INITIAL_ACTOR_SUBMISSIONS,
  INITIAL_PARTICIPANT_SUBMISSIONS,
  INITIAL_CREW_SUBMISSIONS,
} from './data/initialSubmissions';

export type AppPage = 'home' | 'apply' | 'refund' | 'privacy' | 'terms';

export const normalizeRoleId = (id?: string | null): string => {
  if (!id) return CHARACTERS[0].id;
  const lower = id.toLowerCase().trim();
  if (lower === 'nandi') return 'rudra';
  const found = CHARACTERS.find((c) => c.id.toLowerCase() === lower);
  return found ? found.id : CHARACTERS[0].id;
};

const parseRouteFromLocation = (): { page: AppPage; roleId?: string; pathway?: PathwayType } => {
  if (typeof window === 'undefined') return { page: 'home' };

  // 1. Recover from Hostinger 404.html redirect if preserved in sessionStorage
  let preservedRoute = '';
  try {
    preservedRoute = sessionStorage.getItem('chehra_spa_redirect') || '';
    if (preservedRoute) {
      sessionStorage.removeItem('chehra_spa_redirect');
      window.history.replaceState(null, '', preservedRoute);
    }
  } catch (e) {
    // ignore
  }

  // 2. Check query params for ?redirect= or ?page=
  let searchParams = new URLSearchParams(window.location.search);
  const redirectParam = searchParams.get('redirect');
  if (redirectParam) {
    try {
      const decoded = decodeURIComponent(redirectParam);
      window.history.replaceState(null, '', decoded);
      searchParams = new URLSearchParams(window.location.search);
    } catch (e) {
      // ignore
    }
  }

  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const pageParam = searchParams.get('page')?.toLowerCase();

  const isApply =
    path.startsWith('/apply') ||
    path.includes('/apply') ||
    hash.includes('apply') ||
    pageParam === 'apply';

  const isRefund =
    path.startsWith('/refund') ||
    path.includes('refund') ||
    hash.includes('refund') ||
    pageParam === 'refund';

  const isPrivacy =
    path.startsWith('/privacy') ||
    path.includes('privacy') ||
    hash.includes('privacy') ||
    pageParam === 'privacy';

  const isTerms =
    path.startsWith('/terms') ||
    path.includes('terms') ||
    hash.includes('terms') ||
    pageParam === 'terms';

  let page: AppPage = 'home';
  if (isApply) page = 'apply';
  else if (isRefund) page = 'refund';
  else if (isPrivacy) page = 'privacy';
  else if (isTerms) page = 'terms';

  let params: URLSearchParams;
  if (window.location.hash.includes('?')) {
    params = new URLSearchParams(window.location.hash.split('?')[1]);
  } else {
    params = searchParams;
  }

  const rawRoleParam = params.get('role');
  const roleParam = rawRoleParam ? normalizeRoleId(rawRoleParam) : undefined;
  const pathwayParam = params.get('pathway') as PathwayType | null;
  const pathway = (pathwayParam === 'actor' || pathwayParam === 'participant' || pathwayParam === 'crew')
    ? pathwayParam
    : undefined;

  return {
    page,
    roleId: roleParam,
    pathway: pathway,
  };
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() => parseRouteFromLocation().page);
  const [excelPortalOpen, setExcelPortalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(() => {
    const r = parseRouteFromLocation();
    return normalizeRoleId(r.roleId);
  });
  const [selectedPathway, setSelectedPathway] = useState<PathwayType>(() => {
    const r = parseRouteFromLocation();
    return r.pathway || 'actor';
  });
  
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
  const fetchSubmissions = useCallback(() => {
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

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Sync browser back/forward history for /apply and home
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseRouteFromLocation();
      setCurrentPage(route.page);
      if (route.roleId) {
        setSelectedRoleId(normalizeRoleId(route.roleId));
      }
      if (route.pathway) {
        setSelectedPathway(route.pathway);
      }
      if (route.page === 'apply') {
        document.title = 'Application Portal | Chehra Films';
      } else if (route.page === 'refund') {
        document.title = 'Cancellation & Refund Policy | Chehra Films';
      } else if (route.page === 'privacy') {
        document.title = 'Privacy Policy | Chehra Films';
      } else if (route.page === 'terms') {
        document.title = 'Terms & Conditions | Chehra Films';
      } else {
        document.title = "Chehra Films - India's 1st Experimental Cinema Project";
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigatePage = (targetPage: 'refund' | 'privacy' | 'terms') => {
    setCurrentPage(targetPage);
    let pageUrl = `/${targetPage}`;
    if (targetPage === 'privacy') pageUrl = '/privacy-policy';
    if (targetPage === 'terms') pageUrl = '/terms-and-conditions';
    if (targetPage === 'refund') pageUrl = '/refund';

    try {
      window.history.pushState({ page: targetPage }, '', pageUrl);
    } catch {
      window.location.hash = `#${targetPage}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetPage === 'refund') {
      document.title = 'Cancellation & Refund Policy | Chehra Films';
    } else if (targetPage === 'privacy') {
      document.title = 'Privacy Policy | Chehra Films';
    } else if (targetPage === 'terms') {
      document.title = 'Terms & Conditions | Chehra Films';
    }
  };

  const handleOpenNomination = (roleId?: string, pathway?: PathwayType) => {
    const targetRole = roleId || selectedRoleId;
    const targetPathway = pathway || 'actor';

    setSelectedRoleId(targetRole);
    setSelectedPathway(targetPathway);
    setCurrentPage('apply');
    document.title = 'Application Portal | Chehra Films';

    const params = new URLSearchParams();
    if (targetPathway) params.set('pathway', targetPathway);
    if (targetRole && targetPathway === 'actor') params.set('role', targetRole);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const newUrl = `/apply${queryString}`;

    try {
      window.history.pushState({ page: 'apply', role: targetRole, pathway: targetPathway }, '', newUrl);
    } catch {
      window.location.hash = `/apply${queryString}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      if (window.gtag) {
        window.gtag('config', 'G-BC12FK266D', {
          page_path: newUrl,
          page_title: 'Chehra Films - Official Production Application Portal',
        });
      }
    } catch {
      // ignore
    }
  };

  const handleBackToHome = (sectionId?: string) => {
    setCurrentPage('home');
    document.title = "Chehra Films - India's 1st Experimental Cinema Project";

    const targetHash = sectionId ? `#${sectionId}` : '';
    const targetUrl = `/${targetHash}`;

    try {
      window.history.pushState({ page: 'home' }, '', targetUrl);
    } catch {
      window.location.hash = targetHash;
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId) || document.querySelector(`[id="${sectionId}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    try {
      if (window.gtag) {
        window.gtag('config', 'G-BC12FK266D', {
          page_path: targetUrl,
          page_title: "Chehra Films - India's 1st Experimental Cinema Project",
        });
      }
    } catch {
      // ignore
    }
  };

  const handleSelectRoleFromCast = (roleId: string) => {
    handleOpenNomination(roleId, 'actor');
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

  if (currentPage === 'refund' || currentPage === 'privacy' || currentPage === 'terms') {
    return (
      <div className="min-h-screen bg-[#05070B] text-[#f1f5f9] selection:bg-yellow-400/30 selection:text-white antialiased font-sans flex flex-col justify-between">
        {/* Fixed Header Navbar */}
        <Navbar
          onOpenNomination={(roleId, pathway) => handleOpenNomination(roleId, pathway)}
          onWatchFilm={() => setVideoModalOpen(true)}
          onNavigateHome={(sectionId) => handleBackToHome(sectionId)}
          isApplyPage={true}
        />

        {/* Dedicated Policy Page Content */}
        <main className="flex-1 w-full pt-24 sm:pt-28 pb-16 px-3 sm:px-6 lg:px-8">
          {currentPage === 'refund' && (
            <RefundPolicyPage
              onBackToHome={() => handleBackToHome()}
              onOpenNomination={() => handleOpenNomination()}
            />
          )}
          {currentPage === 'privacy' && (
            <PrivacyPolicyPage
              onBackToHome={() => handleBackToHome()}
              onOpenNomination={() => handleOpenNomination()}
            />
          )}
          {currentPage === 'terms' && (
            <TermsAndConditionsPage
              onBackToHome={() => handleBackToHome()}
              onOpenNomination={() => handleOpenNomination()}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onOpenNomination={() => handleOpenNomination()}
          onNavigateHome={(sectionId) => handleBackToHome(sectionId)}
          onNavigatePage={(p) => handleNavigatePage(p)}
          isApplyPage={true}
        />
      </div>
    );
  }

  if (currentPage === 'apply') {
    return (
      <div className="min-h-screen bg-[#05070B] text-[#f1f5f9] selection:bg-yellow-400/30 selection:text-white antialiased font-sans flex flex-col justify-between">
        {/* Fixed Header Navbar */}
        <Navbar
          onOpenNomination={(roleId, pathway) => handleOpenNomination(roleId, pathway)}
          onWatchFilm={() => setVideoModalOpen(true)}
          onNavigateHome={(sectionId) => handleBackToHome(sectionId)}
          isApplyPage={true}
        />

        {/* Dedicated Standalone Application Page Content */}
        <main className="flex-1 w-full pt-24 sm:pt-28 pb-16 px-3 sm:px-6 lg:px-8">
          <NominationModal
            isOpen={true}
            isStandalonePage={true}
            onClose={() => handleBackToHome()}
            initialRoleId={selectedRoleId}
            initialPathway={selectedPathway}
            existingSubmissions={[...actors, ...participants, ...crew]}
            onSubmissionSuccess={handleNewSubmission}
          />
        </main>

        {/* Global Footer */}
        <Footer
          onOpenNomination={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onNavigateHome={(sectionId) => handleBackToHome(sectionId)}
          onNavigatePage={(p) => handleNavigatePage(p)}
          isApplyPage={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070B] text-[#f1f5f9] selection:bg-yellow-400/30 selection:text-white antialiased font-sans">
      {/* Fixed Header Navbar */}
      <Navbar
        onOpenNomination={(roleId, pathway) => handleOpenNomination(roleId, pathway)}
        onWatchFilm={() => setVideoModalOpen(true)}
        onNavigateHome={(sectionId) => handleBackToHome(sectionId)}
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

        {/* 11. Final CTA */}
        <FinalCtaSection
          onJoinFilm={() => handleOpenNomination(undefined, 'participant')}
          onNominateRole={() => handleOpenNomination(undefined, 'actor')}
          onJoinCrew={() => handleOpenNomination(undefined, 'crew')}
        />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenNomination={() => handleOpenNomination()}
        onNavigateHome={(sectionId) => handleBackToHome(sectionId)}
        onNavigatePage={(p) => handleNavigatePage(p)}
      />

      {/* Excel / Google Sheet Live Telemetry Portal Modal */}
      <ExcelDataPortalModal
        isOpen={excelPortalOpen}
        onClose={() => setExcelPortalOpen(false)}
        actors={actors}
        participants={participants}
        crew={crew}
        onRefresh={fetchSubmissions}
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
