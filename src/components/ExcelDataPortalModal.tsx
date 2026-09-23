import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, Search, RefreshCw, Table, ShieldCheck, Film, Compass, Wrench, FileSpreadsheet, Upload } from 'lucide-react';
import { ActorSubmission, ParticipantSubmission, CrewSubmission } from '../types';
import { processDocumentFile } from '../utils/fileHelper';
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
  actors?: ActorSubmission[];
  participants?: ParticipantSubmission[];
  crew?: CrewSubmission[];
  onRefresh?: () => void;
  onClearAll?: () => void;
}

export const ExcelDataPortalModal: React.FC<ExcelDataPortalModalProps> = ({
  isOpen,
  onClose,
  actors = [],
  participants = [],
  crew = [],
  onRefresh,
  onClearAll,
}) => {
  const safeActors = actors || [];
  const safeParticipants = participants || [];
  const safeCrew = crew || [];

  const [activeTab, setActiveTab] = useState<'actors' | 'participants' | 'crew' | 'all'>('participants');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTestingSheet, setIsTestingSheet] = useState(false);
  const [sheetTestResult, setSheetTestResult] = useState<{
    success: boolean;
    status?: number;
    submissionId?: string;
    message?: string;
    details?: string;
  } | null>(null);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncAllResult, setSyncAllResult] = useState<string | null>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [attachingDocId, setAttachingDocId] = useState<string | null>(null);

  const handleAttachDocument = async (id: string, side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachingDocId(id);
      try {
        const processed = await processDocumentFile(file);
        const payload: any = { id };
        if (side === 'front') {
          payload.aadharFrontFileName = processed.fileName;
          payload.aadharFrontUrl = processed.dataUrl;
        } else {
          payload.aadharBackFileName = processed.fileName;
          payload.aadharBackUrl = processed.dataUrl;
        }

        const res = await fetch('/api/submissions/attach-document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          if (onRefresh) {
            await onRefresh();
          }
        }
      } catch (err) {
        console.error('Error attaching document:', err);
      } finally {
        setAttachingDocId(null);
        e.target.value = '';
      }
    }
  };

  const handleRefreshClick = async () => {
    if (!onRefresh) return;
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const handleConfirmClear = () => {
    if (onClearAll) {
      onClearAll();
      setConfirmClearOpen(false);
    }
  };

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://chehra-films.com';

  const handleCopyFormula = (pathway: 'actors' | 'participants' | 'crew') => {
    const formula = getGoogleSheetsFormula(currentOrigin, pathway);
    navigator.clipboard.writeText(formula);
    setCopiedFormula(pathway);
    setTimeout(() => setCopiedFormula(null), 2500);
  };

  const handleTestParticipantSync = async () => {
    setIsTestingSheet(true);
    setSheetTestResult(null);
    try {
      const res = await fetch('/api/google-sheet/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'participant',
          fullName: 'Sachin Pareek (Live eSheet Test)',
          phoneNumber: '+919828497392',
          email: 'sachinpareek026@gmail.com',
          city: 'Lachhmangarh, Sikar',
          departureCity: 'Delhi Majnu Ka Tilla Hub',
          travelBatch: 'Batch Alpha (Oct 18 – Oct 28)',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSheetTestResult({
          success: true,
          status: data.status || 200,
          submissionId: data.submission?.id,
          message: `Participant row was successfully received by Google Apps Script!`,
          details: typeof data.webhookResponse === 'string' ? data.webhookResponse : JSON.stringify(data.webhookResponse),
        });
        if (onRefresh) onRefresh();
      } else {
        setSheetTestResult({
          success: false,
          status: data.status,
          message: 'Webhook returned an issue',
          details: data.webhookResponse || data.error || 'Check Apps Script deployment',
        });
      }
    } catch (err: any) {
      setSheetTestResult({
        success: false,
        message: 'Could not connect to server test endpoint',
        details: err.message,
      });
    } finally {
      setIsTestingSheet(false);
    }
  };

  const handleSyncAllToSheet = async () => {
    setIsSyncingAll(true);
    setSyncAllResult(null);
    try {
      const res = await fetch('/api/google-sheet/sync-all', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setSyncAllResult(`Successfully dispatched all ${data.count} submissions to Google Sheet!`);
      } else {
        setSyncAllResult(`Sync error: ${data.error || 'Failed to sync'}`);
      }
    } catch (err: any) {
      setSyncAllResult(`Error: ${err.message}`);
    } finally {
      setIsSyncingAll(false);
    }
  };

  const filteredActors = safeActors.filter((a) =>
    `${a.fullName} ${a.city} ${a.selectedRole} ${a.phoneNumber} ${a.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredParticipants = safeParticipants.filter((p) =>
    `${p.fullName} ${p.city} ${p.departureCity} ${p.travelBatch} ${p.phoneNumber}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredCrew = safeCrew.filter((c) =>
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
                  CHEHRA FILMS • DATA & SPREADSHEET EXPORT PORTAL
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Direct export to Microsoft Excel (.xlsx), CSV, and Google Sheets format
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onClearAll && (
              confirmClearOpen ? (
                <div className="flex items-center gap-1.5 bg-red-950/80 border border-red-500/80 px-2 py-1">
                  <span className="text-[10px] text-red-200 font-mono font-bold">WIPE ALL ENTRIES?</span>
                  <button
                    onClick={handleConfirmClear}
                    className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold tracking-wider cursor-pointer"
                  >
                    YES, WIPE
                  </button>
                  <button
                    onClick={() => setConfirmClearOpen(false)}
                    className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] hover:text-white cursor-pointer"
                  >
                    CANCEL
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClearOpen(true)}
                  className="px-2.5 py-1 text-[11px] font-mono font-semibold text-red-400 hover:text-red-300 border border-red-500/40 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Remove all entry data and reset to 0 entries"
                >
                  CLEAR ALL DATA
                </button>
              )
            )}

            {onRefresh && (
              <button
                onClick={handleRefreshClick}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-yellow-400 hover:text-white border border-yellow-400/50 hover:bg-yellow-400/10 transition-colors cursor-pointer disabled:opacity-50"
                title="Sync and refresh latest submissions"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'SYNCING...' : 'SYNC & REFRESH'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-yellow-400/90 transition-colors cursor-pointer"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Google Sheets Sync & Webhook Diagnostic Center */}
        <div className="px-6 py-3 bg-[#080E1B] border-b border-blue-900/30 space-y-2.5 text-xs font-mono">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-yellow-400/90 font-bold flex items-center gap-1.5">
                GOOGLE APPS SCRIPT WEBHOOK:
              </span>
              <span className="text-emerald-400 font-semibold">CONNECTED</span>
              <span className="text-slate-400 hidden sm:inline text-[11px]">
                (AKfycbxx-I76c...11m2)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleTestParticipantSync}
                disabled={isTestingSheet}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400 text-emerald-300 hover:text-white transition-all cursor-pointer font-bold tracking-wider text-[11px] disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTestingSheet ? 'animate-spin' : ''}`} />
                <span>{isTestingSheet ? 'SENDING TO SHEET...' : 'TEST PARTICIPANT TO ESHEET'}</span>
              </button>

              <button
                onClick={handleSyncAllToSheet}
                disabled={isSyncingAll}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400 text-blue-300 hover:text-white transition-all cursor-pointer text-[11px] disabled:opacity-50"
              >
                <span>{isSyncingAll ? 'SYNCING ALL...' : 'PUSH ALL ROWS TO SHEET'}</span>
              </button>
            </div>
          </div>

          {/* Test Result Message Box */}
          {sheetTestResult && (
            <div className={`p-2.5 rounded border text-[11px] flex items-start justify-between gap-2 ${
              sheetTestResult.success
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/40 border-red-500/40 text-red-300'
            }`}>
              <div>
                <span className="font-bold block">
                  {sheetTestResult.success ? '✓ TEST SUCCESSFUL:' : '⚠ TEST ISSUE:'}
                </span>
                <span>{sheetTestResult.message}</span>
                {sheetTestResult.submissionId && (
                  <span className="ml-2 font-mono text-yellow-400/90 font-bold">
                    [ID: {sheetTestResult.submissionId}]
                  </span>
                )}
                {sheetTestResult.details && (
                  <p className="text-[10px] text-slate-300 font-mono mt-0.5 opacity-90">
                    Webhook Response: {sheetTestResult.details}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSheetTestResult(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            </div>
          )}

          {syncAllResult && (
            <div className="p-2 bg-blue-950/40 border border-blue-500/40 text-blue-300 text-[11px] flex items-center justify-between">
              <span>{syncAllResult}</span>
              <button onClick={() => setSyncAllResult(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
          )}

          {/* One-click Google Sheets Formula Bar */}
          <div className="pt-1.5 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[11px]">
            <span className="text-slate-400">
              Or import into Google Sheets via <code className="text-yellow-300/90">=IMPORTDATA(...)</code>:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => handleCopyFormula('participants')}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/40 text-blue-300 transition-colors cursor-pointer text-[10px]"
              >
                {copiedFormula === 'participants' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFormula === 'participants' ? 'COPIED PARTICIPANTS FORMULA!' : 'COPY PARTICIPANTS FORMULA'}</span>
              </button>
              <button
                onClick={() => handleCopyFormula('actors')}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/40 text-yellow-300/90 transition-colors cursor-pointer text-[10px]"
              >
                {copiedFormula === 'actors' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFormula === 'actors' ? 'COPIED ACTORS!' : 'COPY ACTORS FORMULA'}</span>
              </button>
              <button
                onClick={() => handleCopyFormula('crew')}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 transition-colors cursor-pointer text-[10px]"
              >
                {copiedFormula === 'crew' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFormula === 'crew' ? 'COPIED CREW!' : 'COPY CREW FORMULA'}</span>
              </button>
            </div>
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
                  ? 'bg-yellow-400/90 text-black border-yellow-300/90 font-bold shadow-md'
                  : 'bg-[#0A1324] text-slate-400 border-blue-900/40 hover:text-white'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>1. ACTORS ({safeActors.length})</span>
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
              <span>2. PARTICIPANTS ({safeParticipants.length})</span>
              <span className="text-[10px] opacity-75 font-normal">₹2,000 Token</span>
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
              <span>3. CREW ({safeCrew.length})</span>
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
              <span>MASTER ({safeActors.length + safeParticipants.length + safeCrew.length})</span>
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
                className="w-full pl-8 pr-3 py-1.5 bg-[#0A1324] border border-blue-900/50 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400/90"
              />
            </div>

            {/* Quick Export Button for currently active tab */}
            {activeTab === 'actors' && (
              <>
                <button
                  onClick={() => downloadActorsExcel(safeActors)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-400/90 text-black hover:bg-yellow-300/90 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                  title="Download Actors Excel (.xlsx)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT .XLSX</span>
                </button>
                <button
                  onClick={() => downloadCSV('actors', safeActors)}
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
                  onClick={() => downloadParticipantsExcel(safeParticipants)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white hover:bg-blue-400 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                  title="Download Participants Excel (.xlsx)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT .XLSX</span>
                </button>
                <button
                  onClick={() => downloadCSV('participants', safeParticipants)}
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
                  onClick={() => downloadCrewExcel(safeCrew)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                  title="Download Crew Excel (.xlsx)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT .XLSX</span>
                </button>
                <button
                  onClick={() => downloadCSV('crew', safeCrew)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#0A1324] hover:bg-slate-800 border border-blue-900/50 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer shrink-0"
                  title="Download Crew CSV"
                >
                  <span>CSV</span>
                </button>
              </>
            )}

            {activeTab === 'all' && (
              <button
                onClick={() => downloadMasterExcel(safeActors, safeParticipants, safeCrew)}
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
                      <span className="text-yellow-400/90 font-bold">{a.id}</span>
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
                      <span className="px-2 py-0.5 bg-yellow-400/10 text-yellow-300/90 border border-yellow-400/30 font-semibold text-[11px]">
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
                            className="text-yellow-400/90 hover:underline flex items-center gap-1"
                          >
                            <span>Audition Tape</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-slate-400">Tape: {a.auditionTapeFileName || 'Uploaded'}</span>
                        )}
                        {a.aadharFrontFileName ? (
                          <div className="flex flex-col gap-0.5 mt-1">
                            <span className="text-amber-300 flex items-center gap-1 text-[10px]">
                              <ShieldCheck className="w-3 h-3 text-amber-400" />
                              <span>Aadhaar: {a.aadharFrontFileName}</span>
                            </span>
                            {a.aadharFrontUrl && (
                              <a
                                href={a.aadharFrontUrl}
                                target="_blank"
                                rel="noreferrer"
                                download={a.aadharFrontFileName || 'aadhar_front'}
                                className="inline-flex items-center gap-1 text-[10px] text-yellow-400 hover:underline w-fit"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                                <span>View / Download Aadhaar</span>
                              </a>
                            )}
                          </div>
                        ) : (
                          <div className="mt-1 pt-1 border-t border-slate-700/40">
                            <label className="inline-flex items-center gap-1 text-[9px] font-bold text-yellow-400 hover:text-yellow-300 cursor-pointer">
                              <Upload className="w-2.5 h-2.5" />
                              <span>+ Attach Aadhaar</span>
                              <input
                                type="file"
                                accept="image/*,application/pdf"
                                className="hidden"
                                onChange={(e) => handleAttachDocument(a.id, 'front', e)}
                              />
                            </label>
                          </div>
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
                  <th className="p-3">e-KYC / Aadhaar</th>
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
                      <span className="px-2 py-0.5 bg-yellow-400/20 text-yellow-300/90 border border-yellow-400/40 font-bold text-xs">
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
                      {p.aadharFrontFileName ? (
                        <div className="flex flex-col gap-1">
                          <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 w-fit">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>AADHAAR ATTACHED</span>
                          </span>
                          <span className="text-[10px] text-slate-300 font-mono truncate max-w-[160px]" title={p.aadharFrontFileName}>
                            Front: {p.aadharFrontFileName}
                          </span>
                          <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            {p.aadharFrontUrl && (
                              <a
                                href={p.aadharFrontUrl}
                                target="_blank"
                                rel="noreferrer"
                                download={p.aadharFrontFileName || 'aadhar_front'}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-600/40 hover:bg-blue-600/70 text-blue-200 border border-blue-500/50 text-[10px] font-bold rounded transition-colors"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                                <span>VIEW / DOWNLOAD FRONT</span>
                              </a>
                            )}
                            <label className="text-[9px] text-yellow-400/90 hover:underline cursor-pointer flex items-center gap-0.5">
                              <span>Replace</span>
                              <input
                                type="file"
                                accept="image/*,application/pdf"
                                className="hidden"
                                onChange={(e) => handleAttachDocument(p.id, 'front', e)}
                              />
                            </label>
                          </div>

                          {p.aadharBackFileName ? (
                            <div className="mt-1.5 pt-1.5 border-t border-slate-700/50">
                              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[160px] block" title={p.aadharBackFileName}>
                                Back: {p.aadharBackFileName}
                              </span>
                              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                {p.aadharBackUrl && (
                                  <a
                                    href={p.aadharBackUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    download={p.aadharBackFileName || 'aadhar_back'}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-600/40 hover:bg-blue-600/70 text-blue-200 border border-blue-500/50 text-[10px] font-bold rounded transition-colors"
                                  >
                                    <ExternalLink className="w-2.5 h-2.5" />
                                    <span>VIEW / DOWNLOAD BACK</span>
                                  </a>
                                )}
                                <label className="text-[9px] text-yellow-400/90 hover:underline cursor-pointer flex items-center gap-0.5">
                                  <span>Replace</span>
                                  <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    className="hidden"
                                    onChange={(e) => handleAttachDocument(p.id, 'back', e)}
                                  />
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-1 pt-1 border-t border-slate-700/40">
                              <label className="inline-flex items-center gap-1 text-[9px] font-bold text-yellow-400 hover:text-yellow-300 cursor-pointer">
                                <Upload className="w-2.5 h-2.5" />
                                <span>+ Attach Back Side</span>
                                <input
                                  type="file"
                                  accept="image/*,application/pdf"
                                  className="hidden"
                                  onChange={(e) => handleAttachDocument(p.id, 'back', e)}
                                />
                              </label>
                            </div>
                          )}

                          {p.aadharNumber && (
                            <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">UID: {p.aadharNumber}</span>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          <span className="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-500/30 text-[10px] font-bold w-fit">
                            NOT UPLOADED YET
                          </span>
                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black text-[10px] font-bold rounded cursor-pointer transition-all shadow-sm w-fit active:scale-95">
                            {attachingDocId === p.id ? (
                              <>
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                <span>ATTACHING...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3 h-3 text-black" />
                                <span>+ ATTACH AADHAAR NOW</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              disabled={attachingDocId === p.id}
                              className="hidden"
                              onChange={(e) => handleAttachDocument(p.id, 'front', e)}
                            />
                          </label>
                          <span className="text-[9px] text-slate-400">JPG, PNG or PDF</span>
                        </div>
                      )}
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
                      <div className="text-yellow-300/90 font-bold">{c.crewDepartment}</div>
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
                <div className="p-4 bg-[#060B14] border border-yellow-400/30">
                  <span className="text-[10px] text-slate-400 uppercase">Track 01 • Actors</span>
                  <div className="text-2xl font-bold text-yellow-400/90">{safeActors.length} Registered</div>
                  <p className="text-[11px] text-slate-400 mt-1">₹16k Total / ₹3k Security After Selection (Last Date 20 Nov)</p>
                </div>
                <div className="p-4 bg-[#060B14] border border-blue-500/30">
                  <span className="text-[10px] text-slate-400 uppercase">Track 02 • Participants</span>
                  <div className="text-2xl font-bold text-blue-400">{safeParticipants.length} Pre-Booked</div>
                  <p className="text-[11px] text-slate-400 mt-1">₹2,000 Security / ₹13,000 Final Locked (Hike after 20 Nov)</p>
                </div>
                <div className="p-4 bg-[#060B14] border border-emerald-500/30">
                  <span className="text-[10px] text-slate-400 uppercase">Track 03 • Crew</span>
                  <div className="text-2xl font-bold text-emerald-400">{safeCrew.length} Applied</div>
                  <p className="text-[11px] text-slate-400 mt-1">Prime & Creative Heads of Department (Link Only)</p>
                </div>
              </div>

              <div className="p-4 bg-[#060B14] border border-blue-900/40 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>DIRECT SPREADSHEET ACCESS ENDPOINTS:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2">
                  <a
                    href={`${currentOrigin}/api/export/actors.xlsx`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#0A1324] hover:bg-slate-800 border border-yellow-400/30 text-yellow-300/90 flex items-center justify-between"
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
