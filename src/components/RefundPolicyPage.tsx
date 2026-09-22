import React, { useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Clock, CreditCard, CheckCircle2, HelpCircle, Phone, MessageCircle, Mail } from 'lucide-react';

interface PolicyPageProps {
  onBackToHome: () => void;
  onOpenNomination: () => void;
}

export const RefundPolicyPage: React.FC<PolicyPageProps> = ({ onBackToHome, onOpenNomination }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Cancellation & Refund Policy | Chehra Films';
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
          <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>OFFICIAL PARINDAA TRAVELS & CHEHRA FILMS DIRECTIVE</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-black tracking-wide text-white uppercase mb-3">
          CANCELLATION & REFUND POLICY
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
          Transparent, 100% guaranteed refund commitments for audition nominations, expedition seat reservations, and candidate trust.
        </p>
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
          <span>Effective Date: January 1, 2026</span>
          <span>•</span>
          <span>Last Updated: March 2026</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">100% Refundable Guarantee</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-10 text-sm leading-relaxed text-slate-300 font-sans">
        
        {/* Section 1 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">01.</span>
            <span>The 100% Refund Guarantee</span>
          </h2>
          <p>
            Chehra Films is an independent experimental cinema initiative operated by Parindaa Travels. We hold candidate integrity, applicant respect, and financial transparency as foundational tenets of independent filmmaking.
          </p>
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm space-y-2 rounded-sm">
            <div className="font-bold flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Full Refund If Not Selected in Auditions</span>
            </div>
            <p className="leading-relaxed">
              For all actor and talent candidates applying for cast roles: if an applicant is not selected for the final cast or wishes to withdraw before casting finalization, their nomination deposit/token is <strong>100% refundable without deductions</strong>.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-4">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">02.</span>
            <span>Expedition Seat Reservation Cancellation Schedule</span>
          </h2>
          <p>
            For traveling cast and participant convoy members traveling on the Delhi → Katra → Kashmir expedition:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 bg-[#141E34] border border-white/10 rounded-sm space-y-1">
              <span className="text-[10px] font-mono text-yellow-400 uppercase font-bold block">15+ Days Before Flag-Off</span>
              <span className="text-lg font-title font-black text-white block">100% REFUND</span>
              <p className="text-[11px] text-slate-400">Full refund credited directly to the original payment source.</p>
            </div>
            <div className="p-3.5 bg-[#141E34] border border-white/10 rounded-sm space-y-1">
              <span className="text-[10px] font-mono text-yellow-400 uppercase font-bold block">7 – 14 Days Before Flag-Off</span>
              <span className="text-lg font-title font-black text-white block">80% REFUND</span>
              <p className="text-[11px] text-slate-400">Or 100% transferable to any subsequent film shoot schedule.</p>
            </div>
            <div className="p-3.5 bg-[#141E34] border border-white/10 rounded-sm space-y-1">
              <span className="text-[10px] font-mono text-yellow-400 uppercase font-bold block">Under 7 Days</span>
              <span className="text-lg font-title font-black text-white block">TRANSFERABLE</span>
              <p className="text-[11px] text-slate-400">Full seat transferred to next production schedule or substitute nominee.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic">
            * In the event of unforeseen natural weather blocks, road closures, or government security advisories in Jammu & Kashmir, participants are granted 100% full refund or immediate re-scheduling at zero penalty.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">03.</span>
            <span>Refund Processing Timeline & Method</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-1" />
              <div>
                <strong className="text-white block font-mono text-xs uppercase tracking-wider">Processing Window: 5 to 7 Business Days</strong>
                <p className="text-xs text-slate-300">
                  Upon receipt and approval of your refund request, our accounts desk triggers an immediate reversal. Depending on banking network settlement (UPI, NEFT, IMPS, or Card gateway), funds reflect in your account within 5–7 business days.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-4 h-4 text-yellow-400 shrink-0 mt-1" />
              <div>
                <strong className="text-white block font-mono text-xs uppercase tracking-wider">Original Source Reversal</strong>
                <p className="text-xs text-slate-300">
                  Refunds are returned strictly to the original bank account or UPI ID used during the transaction to ensure anti-fraud compliance and audit safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-6 bg-[#0E1626]/80 border border-slate-700/80 rounded-sm space-y-3">
          <h2 className="font-mono text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">04.</span>
            <span>How to Initiate a Refund Request</span>
          </h2>
          <p>
            You do not need to navigate automated bots or complicated claim forms. You can reach our direct executive desk through any of the verified channels below:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
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
              href="https://wa.me/919326632288?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20my%20refund%20status."
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-[#141E34] hover:bg-[#1A2642] border border-white/10 flex items-center gap-3 transition-colors text-xs font-mono"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">WHATSAPP DESK</span>
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

        {/* Call to Action Bar */}
        <div className="p-6 bg-gradient-to-r from-[#0C1527] to-[#141E34] border border-yellow-400/40 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-yellow-400 uppercase font-bold tracking-wider block">READY TO JOIN THE FILM?</span>
            <p className="text-xs text-slate-300">Submit your audition or reserve your expedition seat under guaranteed refundable protection.</p>
          </div>
          <button
            type="button"
            onClick={onOpenNomination}
            className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-black text-xs uppercase tracking-wider transition-colors shrink-0 shadow-lg cursor-pointer"
          >
            OPEN APPLICATION PORTAL
          </button>
        </div>

      </div>
    </div>
  );
};
