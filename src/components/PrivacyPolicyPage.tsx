import React, { useEffect } from 'react';
import { Lock, ArrowLeft, Shield, EyeOff, FileText, Database, UserCheck, Phone, MessageCircle, Mail } from 'lucide-react';

interface PolicyPageProps {
  onBackToHome: () => void;
  onOpenNomination: () => void;
}

export const PrivacyPolicyPage: React.FC<PolicyPageProps> = ({ onBackToHome, onOpenNomination }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy | Chehra Films';
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
          <Lock className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>DATA INTEGRITY & APPLICANT CONFIDENTIALITY</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-black tracking-wide text-white uppercase mb-3">
          PRIVACY POLICY
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
          How Chehra Films & Parindaa Travels safely handle audition videos, headshots, contact credentials, and applicant personal data.
        </p>
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
          <span>Effective Date: January 1, 2026</span>
          <span>•</span>
          <span>Last Updated: March 2026</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">Zero Commercial Data Reselling</span>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-10 text-sm leading-relaxed text-slate-300 font-sans">
        
        {/* Section 1 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">01.</span>
            <span>Scope & Overview</span>
          </h2>
          <p>
            Chehra Films (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), operated in association with Parindaa Travels, is committed to safeguarding the privacy and personal media of actors, participants, technical crew, and website visitors.
          </p>
          <p>
            This Privacy Policy details what information we gather through the official application portal, how it is used strictly for casting evaluation and travel logistics, and your comprehensive rights regarding your personal records.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-4">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">02.</span>
            <span>Information We Collect</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-[#141E34] border border-white/10 rounded-sm space-y-1.5">
              <div className="flex items-center gap-2 text-white font-mono font-bold text-xs uppercase">
                <UserCheck className="w-3.5 h-3.5 text-yellow-400" />
                <span>Contact & Identity</span>
              </div>
              <p className="text-xs text-slate-300">
                Full legal name, phone number, WhatsApp contact, email address, age range, gender identity, and city/state of residence.
              </p>
            </div>
            <div className="p-3.5 bg-[#141E34] border border-white/10 rounded-sm space-y-1.5">
              <div className="flex items-center gap-2 text-white font-mono font-bold text-xs uppercase">
                <FileText className="w-3.5 h-3.5 text-yellow-400" />
                <span>Audition Media & Portfolios</span>
              </div>
              <p className="text-xs text-slate-300">
                Headshot photographs, monologue video submissions, cloud video URLs (Google Drive / YouTube / Vimeo), and background skills profiling.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">03.</span>
            <span>Strict Confidentiality of Audition Media</span>
          </h2>
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-sm space-y-2 text-emerald-200 text-xs sm:text-sm">
            <div className="font-bold flex items-center gap-2 text-emerald-400">
              <EyeOff className="w-4 h-4 shrink-0" />
              <span>Casting Room Privacy Pledge</span>
            </div>
            <p className="leading-relaxed">
              Your audition monologue videos, raw profile photographs, and personal notes are viewed exclusively by the director, writer, and casting committee. We will <strong>NEVER</strong> post, leak, stream, license, or monetize your unselected audition tapes without your prior written contractual consent.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">04.</span>
            <span>How We Use Your Data</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
            <li>To evaluate candidate suitability for principal, secondary, and supporting character roles in the film.</li>
            <li>To coordinate logistics, transit passenger insurance, and room allocations with Parindaa Travels.</li>
            <li>To dispatch direct casting notifications, audition callbacks, and status updates via WhatsApp and telephone.</li>
            <li>To issue official contractual casting agreements and legal releases.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">05.</span>
            <span>Data Retention & Right to Deletion</span>
          </h2>
          <p>
            Applicants have the legal right at any time to request complete erasure of their submitted headshots, video links, or contact records from our casting database. Upon receiving an erasure request, records are wiped within 72 hours.
          </p>
          <div className="pt-2">
            <p className="text-xs text-slate-400">
              To request data removal, simply email <span className="text-white font-mono">chehrafilms@gmail.com</span> with your registered email/phone number.
            </p>
          </div>
        </section>

        {/* Contact Desk */}
        <section className="p-6 bg-[#0B1324] border border-white/10 rounded-sm space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-yellow-400 font-bold">
            PRIVACY INQUIRIES & COMPLIANCE DESK
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <a
              href="tel:+919828497392"
              className="p-3 bg-[#141E34] hover:bg-[#1A2642] border border-white/10 flex items-center gap-3 transition-colors text-xs font-mono"
            >
              <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">DIRECT CALL</span>
                <span className="text-white font-bold">+91 98284 97392</span>
              </div>
            </a>
            <a
              href="https://wa.me/919326632288?text=Hello%2C%20I%20have%20a%20privacy%20question%20regarding%20my%20data."
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
                <span className="text-slate-400 text-[10px] block">EMAIL DESK</span>
                <span className="text-white font-bold truncate">chehrafilms@gmail.com</span>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
