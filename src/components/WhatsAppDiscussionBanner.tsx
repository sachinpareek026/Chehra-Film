import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppDiscussionBanner: React.FC = () => {
  return (
    <section className="relative py-10 sm:py-12 bg-[#040813] border-t border-white/10 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(16,185,129,0.06),rgba(0,0,0,0))]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#061A12] via-[#0A2E20] to-[#061A12] border-2 border-emerald-500/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-500/10 rounded-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/20">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-500 text-black font-mono font-black text-[10px] uppercase tracking-wider rounded-xs shadow">
                  OFFICIAL COMMUNITY CHANNEL
                </span>
                <span className="text-[11px] font-mono text-emerald-300/80">
                  • KASHMIR EXPEDITION
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-title font-bold text-white tracking-wide">
                Join WhatsApp Discussion Group
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/70 font-sans max-w-xl">
                Have questions before choosing your pathway or booking? Connect with filmmakers, co-travelers &amp; crew. Get real-time audition announcements, route updates &amp; preparation discussions.
              </p>
            </div>
          </div>

          <a
            href="https://whatsapp.com/channel/0029Vb3Mqq81CYoKTm02mB2s/122"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-black text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>JOIN WHATSAPP GROUP ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
