import React from 'react';
import { Instagram, Youtube, Mail, Phone, MessageCircle, ArrowUp, Globe } from 'lucide-react';
import { FILM_METADATA } from '../data/cinemaData';

interface FooterProps {
  onOpenNomination: () => void;
  onNavigateHome?: (sectionId?: string) => void;
  onNavigatePage?: (page: 'refund' | 'privacy' | 'terms') => void;
  onOpenExcelPortal?: () => void;
  isApplyPage?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenNomination,
  onNavigateHome,
  onNavigatePage,
  onOpenExcelPortal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome(sectionId);
    }
  };

  const handlePageClick = (e: React.MouseEvent, page: 'refund' | 'privacy' | 'terms') => {
    e.preventDefault();
    if (onNavigatePage) {
      onNavigatePage(page);
    } else if (onNavigateHome) {
      onNavigateHome(page);
    }
  };

  return (
    <footer id="footer" className="relative bg-[#05070B] border-t border-white/10 pt-16 pb-12 text-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-3.5">
              <a
                href="https://www.instagram.com/chehrafilms/"
                target="_blank"
                rel="noopener noreferrer"
                title="Chehra Films Instagram (@chehrafilms)"
                className="inline-block transition-transform hover:scale-105 shrink-0 cursor-pointer"
              >
                <img
                  src="https://res.cloudinary.com/x1dci3fh/image/upload/v1789634481/Add_a_subheading_7.png"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/chehra-logo.png';
                  }}
                  alt="Chehra Films Logo"
                  referrerPolicy="no-referrer"
                  className="h-[72px] sm:h-[78px] w-auto border-0 object-contain opacity-95 shrink-0"
                />
              </a>

              <div className="flex flex-col justify-center py-0.5">
                <a
                  href="https://www.instagram.com/chehrafilms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-title text-[22px] sm:text-[24px] tracking-[0.15em] font-bold text-[#F4F1EA] leading-tight hover:text-yellow-400 transition-colors"
                >
                  CHEHRA FILMS
                </a>
                <p className="text-[10px] sm:text-[11px] uppercase font-sans font-semibold tracking-[0.14em] text-yellow-400/90 leading-normal mt-0.5">
                  An initiative of Parindaa Travels
                </p>
              </div>
            </div>
            <p className="font-sans text-[13px] font-normal tracking-wide text-[#B8B4AC]">
              India&apos;s Independent Experimental Cinema Project
            </p>
            <p className="text-[12px] text-[#B8B4AC]/80 leading-relaxed font-normal font-sans">
              Reinventing travel as narrative cinema. Filmed entirely on location across raw Indian landscapes with real individuals.
            </p>
          </div>

          {/* Navigation Links Column - INDEX */}
          <div className="lg:col-span-3 space-y-2">
            <div className="text-[13px] font-sans font-semibold tracking-[0.18em] text-[#F4F1EA] uppercase mb-3">
              INDEX
            </div>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider text-white/60">
              <li>
                <a
                  href="/refund"
                  onClick={(e) => handlePageClick(e, 'refund')}
                  className="hover:text-yellow-400/90 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-yellow-400/70">›</span>
                  <span>REFUND POLICY</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handlePageClick(e, 'privacy')}
                  className="hover:text-yellow-400/90 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-yellow-400/70">›</span>
                  <span>PRIVACY POLICY</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  onClick={(e) => handlePageClick(e, 'terms')}
                  className="hover:text-yellow-400/90 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-yellow-400/70">›</span>
                  <span>TERMS &amp; CONDITIONS</span>
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com/channel/0029Vb3Mqq81CYoKTm02mB2s/122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 text-emerald-400/90 font-medium"
                >
                  <span className="text-emerald-400">›</span>
                  <span>WHATSAPP DISCUSSION GROUP ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/1qF1B84X1J8MQLiRsQROm_DkqvB-Szgvr/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition-colors inline-flex items-center gap-1.5 text-yellow-400/90 font-medium"
                >
                  <span className="text-yellow-400">›</span>
                  <span>TRIP ITINERARY (PDF) ↗</span>
                </a>
              </li>
              <li className="pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono text-yellow-400/90 font-bold block mb-1.5">
                  OFFICIAL GOOGLE FORMS:
                </span>
                <div className="space-y-1 pl-1 font-mono">
                  <a
                    href="https://forms.gle/RUA9uA2wMnXsZza26"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-yellow-400 transition-colors flex items-center gap-1 text-[11px] text-white/70"
                  >
                    <span className="text-yellow-400">›</span>
                    <span>Form 1: Actor Audition ↗</span>
                  </a>
                  <a
                    href="https://forms.gle/BS6VF7hV2i6KyUet9"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-300 transition-colors flex items-center gap-1 text-[11px] text-white/70"
                  >
                    <span className="text-blue-400">›</span>
                    <span>Form 2: Participant ↗</span>
                  </a>
                  <a
                    href="https://forms.gle/Um4kvMuNsoYQkFoz6"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-[11px] text-white/70"
                  >
                    <span className="text-emerald-400">›</span>
                    <span>Form 3: Technical Crew ↗</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Connect & Socials Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[13px] font-mono tracking-[0.25em] text-white uppercase mb-3">
              COMMUNICATIONS &amp; INQUIRIES
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-white/60">
              <li>
                <a
                  href="https://www.instagram.com/chehrafilms/"
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
                  href="https://www.youtube.com/@chehrafilm"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400/90 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-yellow-400/90" />
                  <span>YouTube • @chehrafilm</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:chehrafilms@gmail.com"
                  className="flex items-center gap-2 hover:text-yellow-400/90 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-yellow-400/90" />
                  <span>Email • chehrafilms@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919828497392"
                  className="flex items-center gap-2 text-white/80 hover:text-yellow-400/90 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-yellow-400/90" />
                  <span>Direct Phone • +91 98284 97392</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919326632288?text=Hello%20Chehra%20Films%2C%20I%20would%20like%20to%20inquire%20about%20the%20film%20expedition."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#7ea5d9] hover:text-[#a8c7f4] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#7ea5d9]" />
                  <span className="text-[#7ea5d9]">Chat on WhatsApp</span>
                </a>
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

          {/* About Parindaa Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[13px] font-mono tracking-[0.25em] text-white uppercase mb-3">
              ABOUT PARINDAA
            </div>

            <div className="flex items-center gap-3.5">
              <a
                href="https://www.instagram.com/parindaa.india/"
                target="_blank"
                rel="noopener noreferrer"
                title="Parindaa Travels Instagram (@parindaa.india)"
                className="inline-block transition-transform hover:scale-105 shrink-0 cursor-pointer"
              >
                <img
                  src="https://res.cloudinary.com/x1dci3fh/image/upload/v1791138286/photo_2026-10-04_23-54-18.jpg"
                  alt="Parindaa Logo"
                  referrerPolicy="no-referrer"
                  className="h-[72px] sm:h-[78px] w-[72px] sm:w-[78px] rounded-full border-2 border-yellow-400/50 object-cover shadow-lg opacity-95 shrink-0"
                />
              </a>

              <div className="flex flex-col justify-center space-y-1">
                <a
                  href="https://www.instagram.com/parindaa.india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base sm:text-lg font-bold text-white tracking-wide hover:text-yellow-400 transition-colors"
                >
                  Parindaa Travels
                </a>
                <a
                  href="https://parindaa.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-yellow-400 hover:text-yellow-300 hover:underline transition-colors font-medium tracking-wide"
                >
                  <Globe className="w-3.5 h-3.5 shrink-0" />
                  <span>parindaa.in ↗</span>
                </a>
                <span className="text-[11px] font-mono text-yellow-400/90 font-medium">
                  Founded in 2024
                </span>
                <span className="text-[11px] font-mono text-white/70">
                  Completed 20+ trips till now
                </span>
              </div>
            </div>

            <p className="text-[12px] text-[#B8B4AC]/80 leading-relaxed font-normal font-sans">
              Experiential travel community curating expeditions across India. Partnering with Chehra Films to pioneer cinematic journeys.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href="https://parindaa.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-yellow-400/60 text-white text-xs font-mono transition-all rounded-xs cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-yellow-400/90" />
                <span>PARINDAA.IN ↗</span>
              </a>

              <a
                href="https://www.instagram.com/parindaa.india/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-400/10 hover:bg-yellow-400 hover:text-black border border-yellow-400/40 text-yellow-400 text-xs font-mono font-semibold tracking-wider transition-all rounded-xs cursor-pointer group"
              >
                <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>@PARINDAA.INDIA ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] font-mono text-white/40">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button
              type="button"
              onClick={onOpenExcelPortal}
              title="Admin Portal"
              className="hover:text-yellow-400 transition-colors cursor-pointer text-left"
            >
              © 2026 Chehra Films
            </button>
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

