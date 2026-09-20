import React from 'react';
import { Compass, Instagram, Youtube, Mail, Phone, ArrowUp } from 'lucide-react';
import { FILM_METADATA } from '../data/cinemaData';

interface FooterProps {
  onOpenNomination: () => void;
  onOpenExcelPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenNomination, onOpenExcelPortal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative bg-[#030712] border-t border-blue-900/40 pt-10 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-blue-900/40">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789634481/Add_a_subheading_7.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/chehra-logo.png';
                }}
                alt="Chehra Films Logo"
                referrerPolicy="no-referrer"
                className="h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(245,208,97,0.45)] shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-title text-lg sm:text-xl font-black tracking-[0.2em] text-white">
                  CHEHRA FILMS
                </span>
                <p className="text-[10px] uppercase font-mono tracking-[0.22em] text-yellow-400 font-semibold">
                  An initiative of Parindaa Travels
                </p>
              </div>
            </div>
            <p className="font-title text-xs font-bold tracking-wider text-slate-300 uppercase">
              India&apos;s 1st Experimental Cinema Project
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm pt-1">
              Reinventing travel as narrative cinema. Filmed entirely on location across raw Indian landscapes with real individuals.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-3 space-y-2">
            <div className="text-[10px] font-mono tracking-widest text-white uppercase font-bold mb-2">
              INDEX
            </div>
            <ul className="space-y-1.5 text-xs font-mono uppercase tracking-wider">
              <li>
                <a href="#film" className="hover:text-yellow-400 transition-colors">
                  FILM
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-yellow-400 transition-colors">
                  JOURNEY
                </a>
              </li>
              <li>
                <a href="#characters" className="hover:text-yellow-400 transition-colors">
                  CHARACTERS
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenNomination}
                  className="hover:text-yellow-400 transition-colors uppercase cursor-pointer"
                >
                  NOMINATION
                </button>
              </li>
              <li>
                <a href="#nomination" className="hover:text-yellow-400 transition-colors">
                  PARTICIPATE
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-yellow-400 transition-colors">
                  FAQ & POLICIES
                </a>
              </li>
              {onOpenExcelPortal && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenExcelPortal}
                    className="text-slate-400 hover:text-white font-mono transition-colors uppercase cursor-pointer flex items-center gap-1.5"
                  >
                    <span>DATA PORTAL & EXPORTS</span>
                  </button>
                </li>
              )}
              <li>
                <a href="#about" className="hover:text-yellow-400 transition-colors">
                  ABOUT
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials Column */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-[10px] font-mono tracking-widest text-white uppercase font-bold mb-2">
              COMMUNICATIONS & INQUIRIES
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Instagram • @chehrafilms</span>
                </a>
              </li>
              <li>
                <a
                  href={FILM_METADATA.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-yellow-400" />
                  <span>YouTube • Watch Official Trailer</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sachinpareek026@gmail.com"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Email • sachinpareek026@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Contact • +91 (0) 11 4982 3000</span>
                </div>
              </li>
            </ul>

            <div className="pt-1">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-blue-900/60 bg-[#0A1324] hover:bg-yellow-400 hover:text-black hover:border-yellow-400 text-[11px] font-mono uppercase tracking-wider text-slate-300 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3 h-3" />
                <span>BACK TO TOP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright and Mandatory Disclaimer */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-400">
            <span>© 2026 Chehra Films</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-yellow-400 font-medium">An initiative of Parindaa Travels</span>
          </div>

          <div className="text-center md:text-right text-[10px] text-slate-400 max-w-xl">
            Project participation is subject to applicable terms, eligibility and final project agreements.
          </div>
        </div>
      </div>
    </footer>
  );
};
