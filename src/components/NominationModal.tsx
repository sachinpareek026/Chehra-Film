import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, Film, User, Compass, AlertCircle, Copy, Check } from 'lucide-react';
import { CHARACTERS } from '../data/cinemaData';
import { CinemaButton } from './CinemaButton';

interface NominationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoleId?: string;
  initialRoleType?: 'actor' | 'participant';
}

export const NominationModal: React.FC<NominationModalProps> = ({
  isOpen,
  onClose,
  initialRoleId,
  initialRoleType = 'actor',
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(initialRoleId || CHARACTERS[0].id);
  const [roleType, setRoleType] = useState<'actor' | 'participant'>(initialRoleType);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    city: '',
    phoneNumber: '',
    email: '',
    instagramProfile: '',
    whyJoin: '',
    videoUrl: '',
    confirmed: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [videoFileName, setVideoFileName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [applicationId, setApplicationId] = useState<string>('');
  const [copiedAppId, setCopiedAppId] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialRoleId) {
      setSelectedRoleId(initialRoleId);
    }
    if (initialRoleType) {
      setRoleType(initialRoleType);
    }
  }, [initialRoleId, initialRoleType]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentRole = CHARACTERS.find((c) => c.id === selectedRoleId) || CHARACTERS[0];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhotoPreview(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFileName(e.target.files[0].name);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 75)
      errs.age = 'Valid age between 18–75 is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 8)
      errs.phoneNumber = 'Valid phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email is required';
    if (!formData.whyJoin.trim())
      errs.whyJoin = 'Please explain why you want to join this cinema expedition';
    if (!formData.confirmed)
      errs.confirmed = 'You must confirm the authenticity of your information';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const randomId = 'CF-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(randomId);
    setSubmitted(true);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(applicationId);
    setCopiedAppId(true);
    setTimeout(() => setCopiedAppId(false), 2000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      age: '',
      city: '',
      phoneNumber: '',
      email: '',
      instagramProfile: '',
      whyJoin: '',
      videoUrl: '',
      confirmed: false,
    });
    setPhotoPreview(null);
    setPhotoName('');
    setVideoFileName('');
    setErrors({});
    onClose();
  };

  return (
    <div
      id="nomination-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#060B14]/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-5xl bg-[#0A1324] border border-blue-900/60 shadow-2xl overflow-hidden my-4">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/40 bg-[#060B14]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
            <span className="font-title text-sm md:text-base font-black tracking-wider text-white uppercase">
              CHEHRA FILMS • CASTING APPLICATION
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* SUCCESS STATE */
          <div className="p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 mb-2">
              <CheckCircle2 className="w-10 h-10 text-yellow-400" />
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono tracking-[0.25em] text-yellow-400 uppercase font-semibold">
                APPLICATION SUBMITTED SUCCESSFULLY
              </div>
              <h3 className="font-title text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                YOUR JOURNEY HAS BEGUN.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Thank you for your nomination. Our team will review your application and contact shortlisted candidates for the upcoming phase.
            </p>

            {/* Application Dossier Badge */}
            <div className="p-4 bg-[#060B14] border border-blue-900/50 max-w-md mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  APPLICATION ID
                </span>
                <span className="font-mono text-base font-bold text-yellow-400">
                  {applicationId}
                </span>
              </div>
              <button
                onClick={handleCopyId}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                {copiedAppId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY ID</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <CinemaButton variant="primary" onClick={resetForm}>
                RETURN TO EXPERIENCE
              </CinemaButton>
            </div>
          </div>
        ) : (
          /* NOMINATION FORM */
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Sidebar: Selected Role Spotlight */}
            <div className="lg:col-span-4 bg-[#060B14] border-b lg:border-b-0 lg:border-r border-blue-900/40 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Film className="w-4 h-4 text-yellow-400" />
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-yellow-400 font-semibold">
                    SELECTED DISPATCH
                  </span>
                </div>

                {/* Role Switcher Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {CHARACTERS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedRoleId(c.id);
                        setRoleType('actor');
                      }}
                      className={`text-[10px] font-mono px-2.5 py-1 tracking-wider uppercase transition-colors border ${
                        selectedRoleId === c.id && roleType === 'actor'
                          ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                          : 'bg-[#0A1324] text-slate-400 border-blue-900/40 hover:border-yellow-400/50 hover:text-white'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRoleType('participant')}
                    className={`text-[10px] font-mono px-2.5 py-1 tracking-wider uppercase transition-colors border ${
                      roleType === 'participant'
                        ? 'bg-blue-600 text-white border-blue-400 font-bold'
                        : 'bg-[#0A1324] text-slate-400 border-blue-900/40 hover:border-blue-400/50 hover:text-white'
                    }`}
                  >
                    PARTICIPANT SPOT
                  </button>
                </div>

                {/* Prominent Role Card Display */}
                {roleType === 'actor' ? (
                  <div className="relative border border-blue-900/50 overflow-hidden bg-[#0A1324] shadow-lg">
                    <img
                      src={currentRole.image}
                      alt={currentRole.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-48 sm:h-56 object-cover object-center filter grayscale-[20%]"
                    />
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-yellow-400 font-semibold">
                        <span>{currentRole.archetype}</span>
                        <span>{currentRole.ageRange} YRS</span>
                      </div>
                      <h4 className="font-title text-2xl font-black text-white tracking-wide">
                        {currentRole.name}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {currentRole.description}
                      </p>
                      {currentRole.physicalTrait && (
                        <div className="text-[10px] font-mono text-yellow-300 bg-yellow-400/10 p-2 border border-yellow-400/30">
                          {currentRole.physicalTrait}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 border border-blue-500/40 bg-blue-950/30 text-slate-300 space-y-3">
                    <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase font-bold">
                      <Compass className="w-4 h-4" />
                      <span>FILMMAKING PARTICIPANT</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-300">
                      Travel with the production caravan across India. Experience the shoot, participate in natural street & crowd sequences, and document the making of an experimental auteur feature.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-blue-900/40 text-[10px] font-mono text-slate-400">
                <span className="text-white font-bold block mb-1">PROPOSED MODEL:</span>
                100% eligible contribution refund once project revenues are achieved, subject to terms.
              </div>
            </div>

            {/* Right: Form Input Fields */}
            <div className="lg:col-span-8 p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-title text-xl sm:text-2xl font-black text-white tracking-wide uppercase mb-1">
                    APPLY FOR {roleType === 'actor' ? currentRole.name : 'PARTICIPANT SPOT'}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Please provide accurate contact and portfolio information for our casting panel.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-1.5">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full px-4 py-3 bg-[#060B14] border border-blue-900/50 text-white placeholder-slate-600 text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-yellow-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* AGE */}
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-1.5">
                      AGE *
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 26"
                      min="18"
                      max="75"
                      className="w-full px-4 py-3 bg-[#060B14] border border-blue-900/50 text-white placeholder-slate-600 text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                    {errors.age && (
                      <span className="text-[11px] text-yellow-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.age}
                      </span>
                    )}
                  </div>

                  {/* CITY */}
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-1.5">
                      CITY *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Mumbai / Delhi / Bengaluru"
                      className="w-full px-4 py-3 bg-[#060B14] border border-blue-900/50 text-white placeholder-slate-600 text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                    {errors.city && (
                      <span className="text-[11px] text-yellow-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.city}
                      </span>
                    )}
                  </div>

                  {/* PHONE NUMBER */}
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-1.5">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#060B14] border border-blue-900/50 text-white placeholder-slate-600 text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                    {errors.phoneNumber && (
                      <span className="text-[11px] text-yellow-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
                      </span>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-1.5">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 bg-[#060B14] border border-blue-900/50 text-white placeholder-slate-600 text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-yellow-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* INSTAGRAM / SOCIAL PROFILE */}
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-1.5">
                      INSTAGRAM / SOCIAL PROFILE
                    </label>
                    <input
                      type="text"
                      value={formData.instagramProfile}
                      onChange={(e) => setFormData({ ...formData, instagramProfile: e.target.value })}
                      placeholder="@handle or profile URL"
                      className="w-full px-4 py-3 bg-[#060B14] border border-blue-900/50 text-white placeholder-slate-600 text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* WHY DO YOU WANT TO JOIN? */}
                <div>
                  <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-1.5">
                    WHY DO YOU WANT TO JOIN? *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.whyJoin}
                    onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                    placeholder="Tell us about your connection to travel, why this character or expedition resonates with you, and what truth you seek on the road..."
                    className="w-full px-4 py-3 bg-[#060B14] border border-blue-900/50 text-white placeholder-slate-600 text-sm focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                  />
                  {errors.whyJoin && (
                    <span className="text-[11px] text-yellow-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.whyJoin}
                    </span>
                  )}
                </div>

                {/* FILE UPLOAD SECTION: PHOTO UPLOAD & AUDITION VIDEO UPLOAD */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {/* PHOTO UPLOAD */}
                  <div className="p-4 border border-dashed border-blue-900/60 bg-[#060B14] hover:border-yellow-400/50 transition-colors">
                    <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-2">
                      PHOTO UPLOAD (HEADSHOT / TRAVEL PHOTO)
                    </label>
                    <div className="flex items-center gap-4">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Upload preview"
                          className="w-14 h-14 object-cover border border-yellow-400"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-blue-950/60 hover:bg-blue-900/60 text-xs text-white uppercase font-mono tracking-wider transition-colors border border-blue-800/40">
                          <Upload className="w-3.5 h-3.5 text-yellow-400" />
                          <span>CHOOSE PHOTO</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                          {photoName || 'JPG, PNG up to 10MB'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AUDITION / INTRO VIDEO UPLOAD */}
                  <div className="p-4 border border-dashed border-blue-900/60 bg-[#060B14] hover:border-yellow-400/50 transition-colors">
                    <label className="block text-xs font-mono tracking-widest text-slate-300 uppercase mb-2">
                      INTRODUCTION / AUDITION VIDEO
                    </label>
                    <div className="space-y-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-blue-950/60 hover:bg-blue-900/60 text-xs text-white uppercase font-mono tracking-wider transition-colors border border-blue-800/40">
                        <Upload className="w-3.5 h-3.5 text-yellow-400" />
                        <span>UPLOAD VIDEO CLIP</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono block truncate">
                        {videoFileName ? `Selected: ${videoFileName}` : 'MP4, MOV (1-2 min self tape)'}
                      </span>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="Or paste YouTube / Drive / Vimeo link"
                        className="w-full px-3 py-1.5 bg-[#0A1324] border border-blue-900/40 text-xs text-slate-200 placeholder-slate-600 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* CONFIRMATION CHECKBOX */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.confirmed}
                      onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded-none accent-yellow-400 bg-black border-white/20"
                    />
                    <span className="text-xs text-slate-300 font-body leading-relaxed">
                      I confirm that the information provided is correct.
                    </span>
                  </label>
                  {errors.confirmed && (
                    <span className="text-[11px] text-yellow-400 font-mono mt-1 block">
                      {errors.confirmed}
                    </span>
                  )}
                </div>

                {/* SUBMISSION BUTTON */}
                <div className="pt-4 flex items-center justify-between border-t border-blue-900/40">
                  <span className="text-[11px] text-slate-400 font-mono">
                    PARINDAA TRAVELS CASTING DESK
                  </span>
                  <CinemaButton id="submit-nomination-btn" type="submit" variant="primary">
                    SUBMIT NOMINATION
                  </CinemaButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
