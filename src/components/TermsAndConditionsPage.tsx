import React, { useEffect } from 'react';
import { Scale, ArrowLeft, CheckCircle2, ShieldAlert, Award, Compass, Phone, MessageCircle, Mail } from 'lucide-react';

interface PolicyPageProps {
  onBackToHome: () => void;
  onOpenNomination: () => void;
}

export const TermsAndConditionsPage: React.FC<PolicyPageProps> = ({ onBackToHome, onOpenNomination }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = 'Terms & Conditions | Chehra Films';
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-[#EDE8DF]">
      {/* Back Button */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Overview</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-[#0B1324] border border-yellow-400/30 rounded-sm mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-yellow-400 uppercase font-semibold mb-2">
          <Scale className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>LEGAL PRODUCTION & EXPEDITION AGREEMENT</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-black tracking-wide text-white uppercase mb-3">
          TERMS & CONDITIONS
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
          Rules, eligibility guidelines, intellectual property framework, and expedition safety terms governing Chehra Films & Parindaa Travels.
        </p>
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
          <span>Effective Date: January 1, 2026</span>
          <span>•</span>
          <span>Last Updated: March 2026</span>
          <span>•</span>
          <span className="text-yellow-400 font-bold">Jurisdiction: New Delhi, India</span>
        </div>
      </div>

      {/* Main Sections */}
      <div className="space-y-10 text-sm leading-relaxed text-slate-300 font-sans">
        
        {/* Section 1 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">01.</span>
            <span>Agreement to Terms</span>
          </h2>
          <p>
            By submitting an audition application, registering as an expedition participant, or joining as a technical crew nominee on this platform, you agree to comply with and be bound by these Terms & Conditions. If you do not accept these terms, please do not access or submit credentials to the portal.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">02.</span>
            <span>Applicant Eligibility & Health Safety</span>
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <strong className="text-white">Minimum Age:</strong> Candidates must be at least 18 years of age at the time of expedition flag-off, or submit notarized written parental/guardian consent if between 16 and 18.
            </li>
            <li>
              <strong className="text-white">Physical Fitness for High Altitude:</strong> The expedition involves high-altitude travel across the Kashmir Valley, Katra Trikuta hills, and sub-zero temperatures in Gulmarg. Applicants must be medically fit for mountain terrain.
            </li>
            <li>
              <strong className="text-white">Authentic Self-Representation:</strong> All submitted details (name, age, photographs, and monologue recordings) must be genuine and represent the applicant truthfully.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">03.</span>
            <span>Artistic Discretion & Fair Audition Selection</span>
          </h2>
          <p>
            Chehra Films is an auteur, experimental cinema project. Role allocations, script adaptations, and casting decisions are made at the sole artistic discretion of the director and creative producing team. Casting decisions are based on screen presence, raw authenticity, and natural alignment with the film narrative.
          </p>
          <div className="p-3.5 bg-yellow-400/10 border border-yellow-400/30 rounded-sm text-xs text-yellow-200">
            <strong>Sample Character Visuals Disclaimer:</strong> Character reference artwork and sample photography showcased on the website are evocative mood guides. Casting is completely open to all real individuals regardless of conventional industry conventions.
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">04.</span>
            <span>Intellectual Property & Screen Credits</span>
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <strong className="text-white">Film Master Rights:</strong> All footage filmed, audio captured, and scenes recorded during the production in Katra, Srinagar, and Gulmarg remain the intellectual property of Chehra Films / Parindaa Travels.
            </li>
            <li>
              <strong className="text-white">Cast Credits:</strong> Selected actors and crew members will receive formal on-screen credits in the film master titles and on international film festival submissions.
            </li>
            <li>
              <strong className="text-white">Talent Contracts:</strong> Formal talent release contracts stipulating profit shares, stipend, and festival passes will be executed in writing with all final cast members prior to travel.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">05.</span>
            <span>Expedition Conduct & Safety Code</span>
          </h2>
          <p>
            Parindaa Travels enforces a zero-tolerance policy regarding harassment, illicit narcotics, or any hazardous conduct that jeopardizes team safety in mountain territories. All travelers must heed expedition marshal safety guidelines and environmental preservation mandates in the Kashmir Valley.
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">06.</span>
            <span>Governing Law & Legal Jurisdiction</span>
          </h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with this agreement shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
          </p>
        </section>

        {/* Legal Inquiries Bar */}
        <section className="p-6 bg-[#0B1324] border border-white/10 rounded-sm space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-yellow-400 font-bold">
            LEGAL & CONTRACTUAL ASSISTANCE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <a
              href="tel:+919828497392"
              className="p-3 bg-[#141E34] hover:bg-[#1A2642] border border-white/10 flex items-center gap-3 transition-colors text-xs font-mono"
            >
              <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">DIRECT PHONE</span>
                <span className="text-white font-bold">+91 98284 97392</span>
              </div>
            </a>
            <a
              href="https://wa.me/919326632288?text=Hello%2C%20I%20have%20a%20question%20regarding%20the%20production%20terms."
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-[#141E34] hover:bg-[#1A2642] border border-white/10 flex items-center gap-3 transition-colors text-xs font-mono"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">WHATSAPP</span>
                <span className="text-emerald-300 font-bold">+91 93266 32288</span>
              </div>
            </a>
            <a
              href="mailto:chehrafilms@gmail.com"
              className="p-3 bg-[#141E34] hover:bg-[#1A2642] border border-white/10 flex items-center gap-3 transition-colors text-xs font-mono"
            >
              <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">OFFICIAL EMAIL</span>
                <span className="text-white font-bold truncate">chehrafilms@gmail.com</span>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
