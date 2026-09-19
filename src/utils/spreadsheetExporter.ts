import * as XLSX from 'xlsx';
import { ActorSubmission, ParticipantSubmission, CrewSubmission } from '../types';

/**
 * Cleanly format Actor submissions for spreadsheet row output
 */
export function formatActorRows(actors: ActorSubmission[]) {
  return actors.map((a, idx) => ({
    'SL NO': idx + 1,
    'APPLICATION ID': a.id,
    'SUBMISSION DATE': a.submittedAt,
    'FULL NAME': a.fullName,
    'AGE': a.age,
    'CITY': a.city,
    'PHONE / WHATSAPP': a.phoneNumber,
    'EMAIL ADDRESS': a.email,
    'INSTAGRAM PROFILE': a.instagramProfile || 'N/A',
    'CHARACTER ROLE APPLIED': a.selectedRole,
    'ACTING EXPERIENCE & THEATRE': a.actingExperience || 'First-time actor',
    'PHOTO DOSSIER FILE': a.photoFileName || 'Uploaded',
    'AUDITION TAPE / LINK': a.auditionTapeUrl || a.auditionTapeFileName || 'Uploaded',
    'STATEMENT OF PURPOSE': a.whyJoin,
    '100% REFUND ELIGIBILITY': a.refundEligible ? 'YES — 100% REFUND ELIGIBLE' : 'Standard',
    'APPLICATION STATUS': 'Active Review',
  }));
}

/**
 * Cleanly format Participant submissions for spreadsheet row output
 */
export function formatParticipantRows(participants: ParticipantSubmission[]) {
  return participants.map((p, idx) => ({
    'SL NO': idx + 1,
    'BOOKING ID': p.id,
    'BOOKING DATE': p.submittedAt,
    'FULL NAME': p.fullName,
    'AGE': p.age,
    'CITY': p.city,
    'PHONE / WHATSAPP': p.phoneNumber,
    'EMAIL ADDRESS': p.email,
    'INSTAGRAM PROFILE': p.instagramProfile || 'N/A',
    'BOARDING CITY / HUB': p.departureCity,
    'PREFERRED TRAVEL BATCH': p.travelBatch,
    'ROOM / STAY PREFERENCE': p.roomPreference,
    'EMERGENCY CONTACT': p.emergencyContact,
    'PRE-BOOKING TOKEN (PAID)': `₹${p.prebookingTokenPrice.toLocaleString('en-IN')}/-`,
    'LOCKED EXPEDITION PRICE': `₹${p.lockedTripPrice.toLocaleString('en-IN')}/-`,
    'PRICE INCREASE NOTICE': p.oct30PriceIncreaseNotice ? 'ACKNOWLEDGED (+₹1,500 after 30 Oct)' : 'Standard',
    'PAYMENT STATUS': 'TOKEN CONFIRMED (₹1,000)',
    'TRANSACTION REF': p.transactionRef || 'DIRECT-TOKEN',
    'FILE UPLOADS': 'ZERO UPLOADS (Traveler Track)',
  }));
}

/**
 * Cleanly format Crew submissions for spreadsheet row output
 */
export function formatCrewRows(crew: CrewSubmission[]) {
  return crew.map((c, idx) => ({
    'SL NO': idx + 1,
    'CREW DOSSIER ID': c.id,
    'APPLICATION DATE': c.submittedAt,
    'FULL NAME': c.fullName,
    'AGE': c.age,
    'CITY': c.city,
    'PHONE / WHATSAPP': c.phoneNumber,
    'EMAIL ADDRESS': c.email,
    'INSTAGRAM PROFILE': c.instagramProfile || 'N/A',
    'CREW DEPARTMENT / CRAFT': c.crewDepartment,
    'DEPARTMENT CLASSIFICATION': c.categoryType,
    'PROOF OF SKILL LINK (PUBLIC)': c.proofOfSkillLink,
    'PORTFOLIO SUMMARY / CREDITS': c.portfolioSummary,
    'GEAR / TOOLS / SOFTWARE': c.gearOrSoftware || 'N/A',
    'OPPORTUNITY FEE AGREED': c.opportunityFeeAgreed ? 'YES — AGREED IF SELECTED' : 'Pending',
    'PUBLIC FILMMAKING CONSENT': c.publicFilmmakingConsent ? 'GRANTED (Full Public Rights)' : 'Pending',
    'APPLICATION STATUS': 'Portfolio Under Review',
  }));
}

/**
 * Converts array of flat objects to CSV string with proper quoting
 */
export function convertToCSV(data: Record<string, any>[]): string {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const val = row[header] ?? '';
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(',')
  );
  return [headers.map((h) => `"${h}"`).join(','), ...rows].join('\r\n');
}

/**
 * Triggers client-side download of a generated blob
 */
export function downloadFile(content: BlobPart, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate and download genuine .xlsx file for Actors
 */
export function downloadActorsExcel(actors: ActorSubmission[]) {
  const rows = formatActorRows(actors);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Actors (100% Refundable)');
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  downloadFile(
    wbout,
    `CHEHRA_FILMS_ACTORS_ROSTER_${new Date().toISOString().slice(0, 10)}.xlsx`,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

/**
 * Generate and download genuine .xlsx file for Participants
 */
export function downloadParticipantsExcel(participants: ParticipantSubmission[]) {
  const rows = formatParticipantRows(participants);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants (Token Bookings)');
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  downloadFile(
    wbout,
    `CHEHRA_FILMS_PARTICIPANTS_PREBOOKINGS_${new Date().toISOString().slice(0, 10)}.xlsx`,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

/**
 * Generate and download genuine .xlsx file for Crew
 */
export function downloadCrewExcel(crew: CrewSubmission[]) {
  const rows = formatCrewRows(crew);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Crew (Portfolios & Links)');
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  downloadFile(
    wbout,
    `CHEHRA_FILMS_CREW_APPLICATIONS_${new Date().toISOString().slice(0, 10)}.xlsx`,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

/**
 * Generate and download multi-sheet master workbook containing all 3 pathways
 */
export function downloadMasterExcel(
  actors: ActorSubmission[],
  participants: ParticipantSubmission[],
  crew: CrewSubmission[]
) {
  const workbook = XLSX.utils.book_new();

  // Summary sheet
  const summaryData = [
    { 'METRIC / CATEGORY': 'TOTAL ACTOR NOMINATIONS', 'VALUE': actors.length, 'DETAILS': '100% Refund Eligible Track' },
    { 'METRIC / CATEGORY': 'TOTAL PARTICIPANT PRE-BOOKINGS', 'VALUE': participants.length, 'DETAILS': '₹1,000 Token / ₹11,000 Locked (Hike by ₹1,500 after 30 Oct)' },
    { 'METRIC / CATEGORY': 'TOTAL CREW APPLICATIONS', 'VALUE': crew.length, 'DETAILS': 'Prime & Creative Heads of Department (Link Proof Only)' },
    { 'METRIC / CATEGORY': 'GRAND TOTAL REGISTRATIONS', 'VALUE': actors.length + participants.length + crew.length, 'DETAILS': 'Chehra Films Live Production Roster' },
    { 'METRIC / CATEGORY': 'EXPORT GENERATED AT', 'VALUE': new Date().toLocaleString(), 'DETAILS': 'Official Chehra Films Database Sync' },
  ];
  const wsSummary = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, wsSummary, 'Executive Summary');

  // Sheet 1: Actors
  const wsActors = XLSX.utils.json_to_sheet(formatActorRows(actors));
  XLSX.utils.book_append_sheet(workbook, wsActors, '1. Actors (100% Refund)');

  // Sheet 2: Participants
  const wsParticipants = XLSX.utils.json_to_sheet(formatParticipantRows(participants));
  XLSX.utils.book_append_sheet(workbook, wsParticipants, '2. Participants (Pre-Bookings)');

  // Sheet 3: Crew
  const wsCrew = XLSX.utils.json_to_sheet(formatCrewRows(crew));
  XLSX.utils.book_append_sheet(workbook, wsCrew, '3. Crew (Skill Links)');

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  downloadFile(
    wbout,
    `CHEHRA_FILMS_MASTER_PRODUCTION_ROSTER_${new Date().toISOString().slice(0, 10)}.xlsx`,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

/**
 * Downloads CSV format for any pathway
 */
export function downloadCSV(type: 'actors' | 'participants' | 'crew', data: any[]) {
  let rows: Record<string, any>[] = [];
  if (type === 'actors') rows = formatActorRows(data);
  else if (type === 'participants') rows = formatParticipantRows(data);
  else if (type === 'crew') rows = formatCrewRows(data);

  const csvString = convertToCSV(rows);
  downloadFile(csvString, `CHEHRA_FILMS_${type.toUpperCase()}.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Generates Google Sheets IMPORTDATA formula for a given base origin
 */
export function getGoogleSheetsFormula(baseOrigin: string, pathway: 'actors' | 'participants' | 'crew') {
  const origin = baseOrigin.replace(/\/$/, '');
  return `=IMPORTDATA("${origin}/api/export/${pathway}.csv")`;
}
