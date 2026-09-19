import React, { useState, useEffect } from 'react';
import { Menu, X, Compass } from 'lucide-react';
import { CinemaButton } from './CinemaButton';
import { cinemaAudio } from '../utils/audioSynthesizer';
import { PathwayType } from '../types';

interface NavbarProps {
  onOpenNomination: (roleId?: string, type?: PathwayType) => void;
  onWatchFilm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNomination, onWatchFilm: _onWatchFilm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'translate-y-0 opacity-100 bg-[#060B14]/95 backdrop-blur-md border-b border-blue-900/50 shadow-2xl shadow-blue-950/40 py-3.5'
          : '-translate-y-full opacity-0 pointer-events-none py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Name removed as requested, keeping clean standalone emblem */}
          <a
            href="#hero"
            className="flex items-center group cursor-pointer"
            aria-label="Chehra Films Home"
          >
            <img
              src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789634481/Add_a_subheading_7.png"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/chehra-logo.png';
              }}
              alt="Chehra Films Emblem"
              referrerPolicy="no-referrer"
              className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain drop-shadow-[0_0_14px_rgba(245,208,97,0.55)] group-hover:scale-105 transition-transform duration-300 shrink-0"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-xs font-semibold tracking-[0.2em] text-slate-300 hover:text-yellow-400 transition-colors py-1 relative group uppercase cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Controls: CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <CinemaButton
              id="nav-join-film-btn"
              variant="primary"
              onClick={() => onOpenNomination()}
              className="!py-2.5 !px-5 !text-[11px]"
            >
              JOIN THE FILM
            </CinemaButton>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-yellow-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[62px] bg-[#060B14]/98 border-b border-blue-900/50 backdrop-blur-xl px-6 py-8 shadow-2xl transition-all">
          <div className="flex flex-col gap-5">
            <div className="text-[11px] font-mono tracking-widest text-yellow-400 uppercase">
              INDIA&apos;S 1ST EXPERIMENTAL CINEMA PROJECT
            </div>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-sm font-semibold tracking-[0.2em] text-slate-200 hover:text-yellow-400 py-2 border-b border-white/5 uppercase"
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
                JOIN THE FILM
              </CinemaButton>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <Compass className="w-3.5 h-3.5 text-yellow-400" />
                <span>Chehra Films • Experimental Cinema</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
