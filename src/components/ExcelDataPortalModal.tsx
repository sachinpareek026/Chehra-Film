import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, Search, RefreshCw, Table, ShieldCheck, Film, Compass, Wrench, FileSpreadsheet } from 'lucide-react';
import { ActorSubmission, ParticipantSubmission, CrewSubmission } from '../types';
import {
  downloadActorsExcel,
  downloadParticipantsExcel,
  downloadCrewExcel,
  downloadMasterExcel,
  downloadCSV,
  getGoogleSheetsFormula,
} from '../utils/spreadsheetExporter';

interface ExcelDataPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  actors: ActorSubmission[];
  participants: ParticipantSubmission[];
  crew: CrewSubmission[];
  onRefresh?: () => void;
}

export const ExcelDataPortalModal: React.FC<ExcelDataPortalModalProps> = ({
  isOpen,
  onClose,
  actors,
  participants,
  crew,
  onRefresh,
}) => {
  const [activeTab, setActiveTab] = useState<'actors' | 'participants' | 'crew' | 'all'>('actors');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://chehra-films.com';

  const handleCopyFormula = (pathway: 'actors' | 'participants' | 'crew') => {
    const formula = getGoogleSheetsFormula(currentOrigin, pathway);
    navigator.clipboard.writeText(formula);
    setCopiedFormula(pathway);
    setTimeout(() => setCopiedFormula(null), 2500);
  };

  const filteredActors = actors.filter((a) =>
    `${a.fullName} ${a.city} ${a.selectedRole} ${a.phoneNumber} ${a.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredParticipants = participants.filter((p) =>
    `${p.fullName} ${p.city} ${p.departureCity} ${p.travelBatch} ${p.phoneNumber}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredCrew = crew.filter((c) =>
    `${c.fullName} ${c.city} ${c.crewDepartment} ${c.categoryType} ${c.proofOfSkillLink}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#060B14]/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="relative w-full max-w-6xl bg-[#0A1324] border border-blue-900/60 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/50 bg-[#060B14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-title text-sm sm:text-base font-black text-white tracking-wider uppercase">
                  CHEHRA FILMS • LIVE EXCEL SHEETS PORTAL
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase font-bold">
                  LIVE SYNC
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Direct export to Microsoft Excel (.xlsx), CSV, and Google Sheets Live Sync
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1.5 text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Refresh latest submissions"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Google Sheets Sync Helper Bar */}
        <div className="px-6 py-3 bg-[#080E1B] border-b border-blue-900/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-yellow-400 font-bold">📊 GOOGLE SHEETS LIVE SYNC:</span>
            <span className="text-slate-400">Paste formula in cell A1 of any blank Google Sheet to stream live data:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopyFormula('actors')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              {copiedFormula === 'actors' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedFormula === 'actors' ? 'COPIED ACTORS FORMULA!' : 'COPY ACTORS FORMULA'}</span>
            </button>
            <button
              onClick={() => handleCopyFormula('participants')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              {copiedFormula === 'participants' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedFormula === 'participants' ? 'COPIED PARTICIPANTS!' : 'COPY PARTICIPANTS FORMULA'}</span>
            </button>
            <button
              onClick={() => handleCopyFormula('crew')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              {copiedFormula === 'crew' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedFormula === 'crew' ? 'COPIED CREW FORMULA!' : 'COPY CREW FORMULA'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="px-6 py-3.5 bg-[#060B14] border-b border-blue-900/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('actors')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'actors'
                  ? 'bg-yellow-400 text-black border-yellow-300 font-bold shadow-md'
                  : 'bg-[#0A1324] text-slate-400 border-blue-900/40 hover:text-white'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>1. ACTORS ({actors.length})</span>
              <span className="text-[10px] opacity-75 font-normal">100% Refund</span>
            </button>

            <button
              onClick={() => setActiveTab('participants')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'participants'
                  ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-md'
                  : 'bg-[#0A1324] text-slate-400 border-blue-900/40 hover:text-white'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>2. PARTICIPANTS ({participants.length})</span>
              <span className="text-[10px] opacity-75 font-normal">₹1,000 Token</span>
            </button>

            <button
              onClick={() => setActiveTab('crew')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'crew'
                  ? 'bg-emerald-600 text-white border-emerald-400 font-bold shadow-md'
                  : 'bg-[#0A1324] text-slate-400 border-blue-900/40 hover:text-white'
              }`}
            >
              <Wrench className="w-3 h-3" />
              <span>3. CREW ({crew.length})</span>
              <span className="text-[10px] opacity-75 font-normal">Skill Links</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-md'
                  : 'bg-[#0A1324] text-slate-400 border-blue-900/40 hover:text-white'
              }`}
            >
              <Table className="w-3 h-3" />
              <span>MASTER ({actors.length + participants.length + crew.length})</span>
            </button>
          </div>

          {/* Search + Action Buttons */}
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spreadsheet..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#0A1324] border border-blue-900/50 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            {/* Quick Export Button for currently active tab */}
            {activeTab === 'actors' && (
              <>
                <button
                  onClick={() => downloadActorsExcel(actors)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-400 text-black hover:bg-yellow-300 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                  title="Download Actors Excel (.xlsx)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT .XLSX</span>
                </button>
                <button
                  onClick={() => downloadCSV('actors', actors)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#0A1324] hover:bg-slate-800 border border-blue-900/50 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer shrink-0"
                  title="Download Actors CSV"
                >
                  <span>CSV</span>
                </button>
              </>
            )}

            {activeTab === 'participants' && (
              <>
                <button
                  onClick={() => downloadParticipantsExcel(participants)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white hover:bg-blue-400 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                  title="Download Participants Excel (.xlsx)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT .XLSX</span>
                </button>
                <button
                  onClick={() => downloadCSV('participants', participants)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#0A1324] hover:bg-slate-800 border border-blue-900/50 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer shrink-0"
                  title="Download Participants CSV"
                >
                  <span>CSV</span>
                </button>
              </>
            )}

            {activeTab === 'crew' && (
              <>
                <button
                  onClick={() => downloadCrewExcel(crew)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                  title="Download Crew Excel (.xlsx)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT .XLSX</span>
                </button>
                <button
                  onClick={() => downloadCSV('crew', crew)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#0A1324] hover:bg-slate-800 border border-blue-900/50 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer shrink-0"
                  title="Download Crew CSV"
                >
                  <span>CSV</span>
                </button>
              </>
            )}

            {activeTab === 'all' && (
              <button
                onClick={() => downloadMasterExcel(actors, participants, crew)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white hover:bg-purple-400 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                title="Download Master All-Pathways Workbook (.xlsx)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>MASTER .XLSX</span>
              </button>
            )}
          </div>
        </div>

        {/* Spreadsheets Content Table View */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 max-h-[60vh]">
          {/* 1. ACTORS TABLE */}
          {activeTab === 'actors' && (
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-[#060B14] text-slate-400 border-b border-blue-900/60 uppercase tracking-wider text-[10px]">
                  <th className="p-3"># ID</th>
                  <th className="p-3">Candidate Name</th>
                  <th className="p-3">Age / City</th>
                  <th className="p-3">Character Role</th>
                  <th className="p-3">Contact & Phone</th>
                  <th className="p-3">Uploads Dossier</th>
                  <th className="p-3">Refund Status</th>
                  <th className="p-3">Acting Experience</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {filteredActors.map((a) => (
                  <tr key={a.id} className="hover:bg-blue-950/20 transition-colors">
                    <td className="p-3">
                      <span className="text-yellow-400 font-bold">{a.id}</span>
                      <div className="text-[10px] text-slate-500">{a.submittedAt}</div>
                    </td>
                    <td className="p-3 font-medium text-white">
                      {a.fullName}
                      {a.instagramProfile && (
                        <div className="text-[10px] text-slate-400">{a.instagramProfile}</div>
                      )}
                    </td>
                    <td className="p-3 text-slate-300">
                      {a.age} yrs • {a.city}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 font-semibold text-[11px]">
                        {a.selectedRole}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">
                      <div>{a.phoneNumber}</div>
                      <div className="text-[10px] text-slate-400">{a.email}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col gap-1 text-[11px]">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Photo: {a.photoFileName || 'Uploaded'}</span>
                        </span>
                        {a.auditionTapeUrl ? (
                          <a
                            href={a.auditionTapeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-yellow-400 hover:underline flex items-center gap-1"
                          >
                            <span>Audition Tape</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-slate-400">Tape: {a.auditionTapeFileName || 'Uploaded'}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        100% REFUND ELIGIBLE
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 max-w-xs truncate" title={a.actingExperience}>
                      {a.actingExperience || 'First-time audition'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 2. PARTICIPANTS TABLE */}
          {activeTab === 'participants' && (
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-[#060B14] text-slate-400 border-b border-blue-900/60 uppercase tracking-wider text-[10px]">
                  <th className="p-3"># Booking ID</th>
                  <th className="p-3">Participant Name</th>
                  <th className="p-3">Departure & Batch</th>
                  <th className="p-3">Pre-booking Token</th>
                  <th className="p-3">Locked Price</th>
                  <th className="p-3">Contact & Phone</th>
                  <th className="p-3">Room / Stay</th>
                  <th className="p-3">Upload Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {filteredParticipants.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-950/20 transition-colors">
                    <td className="p-3">
                      <span className="text-blue-400 font-bold">{p.id}</span>
                      <div className="text-[10px] text-slate-500">{p.submittedAt}</div>
                    </td>
                    <td className="p-3 font-medium text-white">
                      {p.fullName}
                      <div className="text-[10px] text-slate-400">{p.city} • Age {p.age}</div>
                    </td>
                    <td className="p-3 text-slate-300">
                      <div className="text-white font-medium">{p.departureCity}</div>
                      <div className="text-[10px] text-blue-300">{p.travelBatch}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 font-bold text-xs">
                        ₹{p.prebookingTokenPrice.toLocaleString('en-IN')}/-
                      </span>
                      <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">SEAT RESERVED</div>
                    </td>
                    <td className="p-3">
                      <div className="text-white font-bold">₹{p.lockedTripPrice.toLocaleString('en-IN')}/-</div>
                      <div className="text-[10px] text-amber-400">Locked before 30 Oct</div>
                    </td>
                    <td className="p-3 text-slate-300">
                      <div>{p.phoneNumber}</div>
                      <div className="text-[10px] text-slate-400">{p.email}</div>
                    </td>
                    <td className="p-3 text-slate-300">
                      <div>{p.roomPreference}</div>
                      <div className="text-[10px] text-slate-500">Emergency: {p.emergencyContact}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-500/40 text-[10px] font-bold">
                        ZERO UPLOADS (PASSED)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 3. CREW TABLE */}
          {activeTab === 'crew' && (
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-[#060B14] text-slate-400 border-b border-blue-900/60 uppercase tracking-wider text-[10px]">
                  <th className="p-3"># Crew ID</th>
                  <th className="p-3">Technician Name</th>
                  <th className="p-3">Department Craft</th>
                  <th className="p-3">Proof of Skill (LINK ONLY)</th>
                  <th className="p-3">Gear & Software</th>
                  <th className="p-3">Opportunity Fee</th>
                  <th className="p-3">Public Film Consent</th>
                  <th className="p-3">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {filteredCrew.map((c) => (
                  <tr key={c.id} className="hover:bg-blue-950/20 transition-colors">
                    <td className="p-3">
                      <span className="text-emerald-400 font-bold">{c.id}</span>
                      <div className="text-[10px] text-slate-500">{c.submittedAt}</div>
                    </td>
                    <td className="p-3 font-medium text-white">
                      {c.fullName}
                      <div className="text-[10px] text-slate-400">{c.city} • Age {c.age}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-yellow-300 font-bold">{c.crewDepartment}</div>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950 text-emerald-400 border border-emerald-500/30 uppercase">
                        {c.categoryType}
                      </span>
                    </td>
                    <td className="p-3">
                      {c.proofOfSkillLink ? (
                        <a
                          href={c.proofOfSkillLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors font-medium max-w-xs truncate"
                          title={c.proofOfSkillLink}
                        >
                          <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">Open Skill Portfolio Link</span>
                        </a>
                      ) : (
                        <span className="text-slate-500">No link</span>
                      )}
                      <div className="text-[10px] text-slate-400 mt-1 max-w-xs truncate" title={c.portfolioSummary}>
                        {c.portfolioSummary}
                      </div>
                    </td>
                    <td className="p-3 text-slate-300 max-w-xs truncate" title={c.gearOrSoftware}>
                      {c.gearOrSoftware || 'Standard'}
                    </td>
                    <td className="p-3">
                      {c.opportunityFeeAgreed ? (
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                          ✓ AGREED
                        </span>
                      ) : (
                        <span className="text-amber-400">Pending</span>
                      )}
                    </td>
                    <td className="p-3">
                      {c.publicFilmmakingConsent ? (
                        <span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-500/40 text-[10px] font-bold">
                          ✓ GRANTED
                        </span>
                      ) : (
                        <span className="text-amber-400">Pending</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-300">
                      <div>{c.phoneNumber}</div>
                      <div className="text-[10px] text-slate-400">{c.email}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 4. MASTER COMBINED OVERVIEW */}
          {activeTab === 'all' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-4 bg-[#060B14] border border-yellow-500/30">
                  <span className="text-[10px] text-slate-400 uppercase">Track 01 • Actors</span>
                  <div className="text-2xl font-bold text-yellow-400">{actors.length} Registered</div>
                  <p className="text-[11px] text-slate-400 mt-1">100% Refund Eligible upon completion</p>
                </div>
                <div className="p-4 bg-[#060B14] border border-blue-500/30">
                  <span className="text-[10px] text-slate-400 uppercase">Track 02 • Participants</span>
                  <div className="text-2xl font-bold text-blue-400">{participants.length} Pre-Booked</div>
                  <p className="text-[11px] text-slate-400 mt-1">₹1,000 Token / ₹11,000 Locked (Hike after 30 Oct)</p>
                </div>
                <div className="p-4 bg-[#060B14] border border-emerald-500/30">
                  <span className="text-[10px] text-slate-400 uppercase">Track 03 • Crew</span>
                  <div className="text-2xl font-bold text-emerald-400">{crew.length} Applied</div>
                  <p className="text-[11px] text-slate-400 mt-1">Prime & Creative Heads of Department (Link Only)</p>
                </div>
              </div>

              <div className="p-4 bg-[#060B14] border border-blue-900/40 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>DIRECT LIVE SPREADSHEET ACCESS ENDPOINTS:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2">
                  <a
                    href={`${currentOrigin}/api/export/actors.xlsx`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#0A1324] hover:bg-slate-800 border border-yellow-400/30 text-yellow-300 flex items-center justify-between"
                  >
                    <span>1. Actors Excel (.xlsx)</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`${currentOrigin}/api/export/participants.xlsx`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#0A1324] hover:bg-slate-800 border border-blue-400/30 text-blue-300 flex items-center justify-between"
                  >
                    <span>2. Participants Excel (.xlsx)</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`${currentOrigin}/api/export/crew.xlsx`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#0A1324] hover:bg-slate-800 border border-emerald-400/30 text-emerald-300 flex items-center justify-between"
                  >
                    <span>3. Crew Excel (.xlsx)</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-blue-900/40 bg-[#060B14] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>All forms submitted in the app are stored live and immediately stream to these spreadsheets.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono transition-colors cursor-pointer"
          >
            CLOSE PORTAL
          </button>
        </div>
      </div>
    </div>
  );
};
