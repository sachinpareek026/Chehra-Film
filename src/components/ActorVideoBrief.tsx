import React, { useState } from 'react';
import {
  Video,
  CheckCircle2,
  ExternalLink,
  Play,
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Film
} from 'lucide-react';

interface ActorVideoBriefProps {
  currentRoleName?: string;
  defaultExpanded?: boolean;
}

export const ActorVideoBrief: React.FC<ActorVideoBriefProps> = ({ currentRoleName, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeReferenceVideo, setActiveReferenceVideo] = useState<{
    title: string;
    embedId: string;
    url: string;
  } | null>(null);

  const referenceVideos = {
    female: {
      title: 'Female Applicant Audition Reference',
      embedId: 'qtLzqyTVcy4',
      url: 'https://youtube.com/shorts/qtLzqyTVcy4'
    },
    male: {
      title: 'Male Applicant Audition Reference',
      embedId: 'l-e2229jrrM',
      url: 'https://youtube.com/shorts/l-e2229jrrM'
    }
  };

  return (
    <div className="bg-[#070C16] border-t-2 border-yellow-400/40 overflow-hidden">
      {/* Header Banner - Clickable toggle for minimize / expand */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0C1527] via-[#091122] to-[#070C16] hover:bg-[#101b33] cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-yellow-400 uppercase font-semibold">
            <Film className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <span>VIDEO GUIDE // 4-SCENE AUDITION BRIEF</span>
          </div>
          <h4 className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <span>AUDITION VIDEO GUIDE & REFERENCE REELS</span>
          </h4>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="self-start sm:self-auto px-3.5 py-2 bg-yellow-400/15 hover:bg-yellow-400/25 border border-yellow-400/40 text-yellow-300 hover:text-yellow-200 text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer font-bold shadow-sm shrink-0"
        >
          <span>{isExpanded ? 'Minimise Guide' : 'Expand Video Guide'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Universal Guideline Callout Bar */}
      {isExpanded && (
        <div className="px-4 sm:px-5 py-2.5 bg-yellow-400/10 border-b border-yellow-400/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-yellow-300 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <span>
              <strong>Universal Format:</strong> This exact 4-scene video brief applies to <strong>ALL 7 characters</strong> {currentRoleName ? `(including ${currentRoleName})` : ''} or any custom role.
            </span>
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* SECTION 1: The 4 Scenes */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-yellow-400/90 font-bold">
                BEFORE YOU BEGIN // FOUR SIMPLE SCENES, ONE HONEST TAKE
              </span>
              <span className="text-[10px] font-mono text-slate-400">Total: 1.5 – 2.0 Mins</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Scene 01 */}
              <div className="p-4 bg-[#050A14] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-yellow-400 tracking-wider">
                    01 // INTRODUCTION
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300">
                    15–20 SEC
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Look directly into the camera and introduce yourself clearly:
                </p>
                <div className="p-2.5 bg-black/60 border border-white/10 text-xs font-mono text-white/90 italic leading-relaxed">
                  &ldquo;Hi, my name is _______. I am ______ years old and I&apos;m from _______. I&apos;m applying for an acting opportunity in The Life of Nandi, a Chehra Films project.&rdquo;
                </div>
              </div>

              {/* Scene 02 */}
              <div className="p-4 bg-[#050A14] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-yellow-400 tracking-wider">
                    02 // FACE & PROFILE
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300">
                    15–20 SEC
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Show your face naturally, holding each angle for 3–5 seconds:
                </p>
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono pt-1">
                  <div className="p-1.5 bg-black/50 border border-white/10 text-slate-200">
                    Front-facing<br />(3–5 sec)
                  </div>
                  <div className="p-1.5 bg-black/50 border border-white/10 text-slate-200">
                    Right profile<br />(3–5 sec)
                  </div>
                  <div className="p-1.5 bg-black/50 border border-white/10 text-slate-200">
                    Left profile<br />(3–5 sec)
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-400 pt-1">
                  * Keep your face relaxed and natural. No posing or makeup required.
                </p>
              </div>

              {/* Scene 03 */}
              <div className="p-4 bg-[#050A14] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-yellow-400 tracking-wider">
                    03 // PERSONALITY
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300">
                    10–15 SEC
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Choose one emotion that you feel represents your personality:
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-300">
                  {['Happiness', 'Calmness', 'Curiosity', 'Confidence', 'Sadness', 'Anger', 'Love', 'Surprise', 'Seriousness'].map((emotion) => (
                    <span key={emotion} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm">
                      {emotion}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-slate-400 pt-1">
                  * Express it naturally through your face and eyes. Words are welcome, but not required.
                </p>
              </div>

              {/* Scene 04 */}
              <div className="p-4 bg-[#050A14] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-yellow-400 tracking-wider">
                    04 // THE DAY ARRIVES
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300">
                    30–45 SEC
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Think of something you&apos;ve always wanted — a place, a person, a goal, a dream. Now imagine someone tells you:
                </p>
                <div className="p-2.5 bg-black/60 border border-white/10 text-xs font-mono text-yellow-200/90 italic leading-relaxed">
                  &ldquo;The day has finally arrived. You&apos;re finally getting it. You&apos;re finally going there. You&apos;re finally going to meet them.&rdquo;
                </div>
                <p className="text-[10px] font-mono text-slate-400">
                  * Don&apos;t plan it, don&apos;t act it — just react. Speak, smile, laugh, go silent. We want your genuine reaction.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: Recording Guidelines Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-yellow-400/90 font-bold">
                BEFORE YOU HIT RECORD // RECORDING GUIDELINES
              </span>
              <span className="text-[10px] font-mono text-slate-400">Simple Setup</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono text-slate-300">
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>Mobile recording fine</span>
              </div>
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>Clear face & voice</span>
              </div>
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>Natural lighting preferred</span>
              </div>
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>Quiet location</span>
              </div>
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>No filters / effects</span>
              </div>
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>No background music</span>
              </div>
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>One continuous take</span>
              </div>
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>Landscape (16:9)</span>
              </div>
              <div className="p-2.5 bg-[#050A14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>MP4 / MOV (Max 100MB)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-mono mt-2 pl-1">
              * File larger than 100 MB? Upload to Google Drive (or any cloud storage), set sharing to &ldquo;Anyone with the link,&rdquo; and paste that link in the field below.
            </p>
          </div>

          {/* SECTION 3: Reference Videos (Watch Before You Shoot) */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-yellow-400/90 font-bold">
                WATCH BEFORE YOU SHOOT // OFFICIAL REFERENCE VIDEOS
              </span>
              <span className="text-[10px] font-mono text-yellow-400">YouTube Shorts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Female Applicants */}
              <div className="p-4 bg-[#050A14] border border-white/15 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      FOR FEMALE APPLICANTS
                    </span>
                    <span className="text-[9px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 border border-yellow-400/20">
                      REFERENCE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Watch sample nomination reel showing natural face framing, expressions, and honest reaction.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveReferenceVideo(referenceVideos.female)}
                    className="flex-1 py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Reference Reel</span>
                  </button>
                  <a
                    href={referenceVideos.female.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white/70 hover:text-white transition-colors"
                    title="Open in YouTube Shorts"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Male Applicants */}
              <div className="p-4 bg-[#050A14] border border-white/15 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      FOR MALE APPLICANTS
                    </span>
                    <span className="text-[9px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 border border-yellow-400/20">
                      REFERENCE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Watch sample nomination reel showing natural pacing, profile angles, and unscripted reaction.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveReferenceVideo(referenceVideos.male)}
                    className="flex-1 py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Reference Reel</span>
                  </button>
                  <a
                    href={referenceVideos.male.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white/70 hover:text-white transition-colors"
                    title="Open in YouTube Shorts"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Ethos Footer */}
          <div className="p-3.5 bg-black/40 border border-white/10 text-center space-y-1">
            <p className="font-serif italic text-xs sm:text-sm text-yellow-200/90 font-medium">
              &ldquo;You don&apos;t need to be an actor. Just be yourself. We want to see the person behind the application.&rdquo;
            </p>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
              CHEHRA FILMS • CHEHRAFILMS.COM
            </span>
          </div>

        </div>
      )}

      {/* Reference Video Modal */}
      {activeReferenceVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative bg-[#0A0E1A] border border-yellow-400/40 w-full max-w-sm sm:max-w-md overflow-hidden shadow-2xl">
            <div className="p-3 bg-[#050A14] border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-yellow-400 uppercase truncate pr-2">
                {activeReferenceVideo.title}
              </span>
              <button
                type="button"
                onClick={() => setActiveReferenceVideo(null)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full aspect-[9/16] max-h-[70vh] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeReferenceVideo.embedId}?autoplay=1`}
                title={activeReferenceVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-3 bg-[#050A14] border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <a
                href={activeReferenceVideo.url}
                target="_blank"
                rel="noreferrer"
                className="text-yellow-400 hover:underline flex items-center gap-1"
              >
                <span>Open in YouTube App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => setActiveReferenceVideo(null)}
                className="text-slate-400 hover:text-white cursor-pointer uppercase"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
