import React from 'react';
import { Instagram, Youtube, Mail, Phone, ArrowUp } from 'lucide-react';
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
    <footer id="footer" className="relative bg-[#05070B] border-t border-white/10 pt-16 pb-12 text-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789634481/Add_a_subheading_7.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/chehra-logo.png';
                }}
                alt="Chehra Films Logo"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain opacity-90 shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-title text-lg tracking-[0.15em] font-bold text-[#F4F1EA]">
                  CHEHRA FILMS
                </span>
                <p className="text-[10px] uppercase font-sans font-semibold tracking-[0.14em] text-yellow-400/90">
                  An initiative of Parindaa Travels
                </p>
              </div>
            </div>
            <p className="font-sans text-xs font-normal tracking-wide text-[#B8B4AC]">
              India&apos;s Independent Experimental Cinema Project
            </p>
            <p className="text-xs text-[#B8B4AC]/80 leading-relaxed font-normal font-sans max-w-sm">
              Reinventing travel as narrative cinema. Filmed entirely on location across raw Indian landscapes with real individuals.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-3 space-y-2">
            <div className="text-[10px] font-sans font-semibold tracking-[0.18em] text-[#F4F1EA] uppercase mb-3">
              INDEX
            </div>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider text-white/60">
              <li>
                <a href="#film" className="hover:text-yellow-400/90 transition-colors">
                  FILM
                </a>
              </li>
              <li>
                <a href="#kashmir" className="hover:text-yellow-400/90 transition-colors">
                  KASHMIR EXPEDITION
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-yellow-400/90 transition-colors">
                  THE ROUTE
                </a>
              </li>
              <li>
                <a href="#characters" className="hover:text-yellow-400/90 transition-colors">
                  CHARACTERS
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenNomination}
                  className="hover:text-yellow-400/90 transition-colors uppercase cursor-pointer"
                >
                  NOMINATION
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-yellow-400/90 transition-colors">
                  FAQ & TRANSPARENCY
                </a>
              </li>
              {onOpenExcelPortal && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenExcelPortal}
                    className="hover:text-white font-mono transition-colors uppercase cursor-pointer flex items-center gap-1.5 text-white/40"
                  >
                    <span>DATA PORTAL</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Connect & Socials Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[10px] font-mono tracking-[0.25em] text-white uppercase mb-3">
              COMMUNICATIONS & INQUIRIES
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-white/60">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400/90 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-yellow-400/90" />
                  <span>Instagram • @chehrafilms</span>
                </a>
              </li>
              <li>
                <a
                  href={FILM_METADATA.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400/90 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-yellow-400/90" />
                  <span>YouTube • Official Trailer</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sachinpareek026@gmail.com"
                  className="flex items-center gap-2 hover:text-yellow-400/90 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-yellow-400/90" />
                  <span>Email • sachinpareek026@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="w-3.5 h-3.5 text-yellow-400/90" />
                  <span>Direct • +91 95096 85223</span>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 bg-white/[0.02] hover:border-yellow-400/90 hover:text-yellow-400/90 text-[10px] font-mono uppercase tracking-widest text-white/60 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3 h-3" />
                <span>BACK TO TOP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] font-mono text-white/40">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© 2026 Chehra Films</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-yellow-400/90">An initiative of Parindaa Travels</span>
          </div>

          <div className="text-center md:text-right text-white/40 max-w-xl font-light">
            Filmed under independent production guidelines. Participation subject to expedition agreement and safety terms.
          </div>
        </div>
      </div>
    </footer>
  );
};

