import React, { useState, useEffect } from 'react';
import { Menu, X, Compass } from 'lucide-react';
import { CinemaButton } from './CinemaButton';
import { cinemaAudio } from '../utils/audioSynthesizer';
import { PathwayType } from '../types';

interface NavbarProps {
  onOpenNomination: (roleId?: string, type?: PathwayType) => void;
  onWatchFilm: () => void;
  onOpenExcelPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNomination, onWatchFilm: _onWatchFilm, onOpenExcelPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition starts right when scrolling begins from the top
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = cinemaAudio.toggle();
    setAudioActive(active);
  };

  const navLinks = [
    { name: 'FILM', href: '#film' },
    { name: 'KASHMIR TRIP', href: '#kashmir-expedition' },
    { name: 'JOURNEY', href: '#journey' },
    { name: 'ROLES', href: '#characters' },
    { name: 'WHY JOIN', href: '#why-join' },
    { name: 'PATHWAYS', href: '#nomination' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#070A0F]/85 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-lg shadow-black/50'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center group cursor-pointer my-0 py-0"
            aria-label="Chehra Films Home"
          >
            <img
              src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789634481/Add_a_subheading_7.png"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/chehra-logo.png';
              }}
              alt="Chehra Films Emblem"
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-[72px] sm:h-[72px] object-contain mb-0 transition-opacity duration-300 group-hover:opacity-90 shrink-0 block"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="font-sans text-[11px] font-semibold tracking-[0.10em] leading-[1.3] text-[#B8B4AC] hover:text-[#F4F1EA] transition-colors py-1 relative uppercase cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Controls: CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <CinemaButton
              id="nav-join-film-btn"
              variant="primary"
              onClick={() => onOpenNomination()}
              className="!py-2 !px-4 !text-[10px]"
            >
              APPLY →
            </CinemaButton>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F4F1EA] hover:text-yellow-400/90 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-yellow-400/90" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[58px] bg-[#080808] border-b border-white/10 px-6 py-8 shadow-2xl transition-all">
          <div className="flex flex-col gap-5">
            <div className="text-[10px] font-sans font-semibold tracking-[0.14em] text-yellow-400/90 uppercase">
              PROJECT CF01 • THE LIFE OF NANDI
            </div>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-sm font-semibold tracking-[0.10em] leading-[1.3] text-[#F4F1EA] hover:text-yellow-400/90 py-2 border-b border-white/5 uppercase cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <CinemaButton
                variant="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNomination();
                }}
              >
                APPLY FOR ROLE →
              </CinemaButton>
              {onOpenExcelPortal && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenExcelPortal();
                  }}
                  className="w-full py-2 text-center text-xs font-mono text-[#A5A196] border border-white/15 uppercase tracking-wider"
                >
                  DATA PORTAL & EXPORTS
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
