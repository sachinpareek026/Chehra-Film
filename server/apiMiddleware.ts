import type { Connect } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

// Initial seeds
const defaultData = {
  actors: [],
  participants: [],
  crew: [],
};

const storagePath = path.resolve(process.cwd(), 'data', 'submissions.json');
const sheetConfigPath = path.resolve(process.cwd(), 'data', 'google-sheet-config.json');

function getGoogleSheetWebhookUrl(): string {
  if (process.env.GOOGLE_SHEET_WEBHOOK_URL && process.env.GOOGLE_SHEET_WEBHOOK_URL.trim()) {
    return process.env.GOOGLE_SHEET_WEBHOOK_URL.trim();
  }
  try {
    if (fs.existsSync(sheetConfigPath)) {
      const parsed = JSON.parse(fs.readFileSync(sheetConfigPath, 'utf8'));
      if (parsed?.webhookUrl) return parsed.webhookUrl.trim();
    }
  } catch (e) {
    // ignore
  }
  return '';
}

function saveGoogleSheetWebhookUrl(url: string) {
  try {
    const dir = path.dirname(sheetConfigPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(sheetConfigPath, JSON.stringify({ webhookUrl: url.trim(), updatedAt: new Date().toISOString() }, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving google sheet webhook url:', e);
  }
}

import { GOOGLE_APPS_SCRIPT_SOURCE } from './googleAppsScriptCode';

const uploadsDir = path.resolve(process.cwd(), 'data', 'uploads');

function saveBase64File(subId: string, filename: string, dataUrl: string): string {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return dataUrl || '';
  }
  try {
    const parts = dataUrl.split(',');
    if (parts.length < 2) return dataUrl;
    const base64Data = parts[1];
    const subDir = path.join(uploadsDir, subId);
    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = path.join(subDir, safeName);
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    return `/api/uploads/${subId}/${safeName}`;
  } catch (err) {
    console.error('Error saving uploaded file to disk:', err);
    return dataUrl;
  }
}

async function forwardToGoogleSheet(submission: any): Promise<{ success: boolean; status?: number; responseText?: string; driveUrls?: Record<string, string>; error?: string }> {
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (!webhookUrl) {
    return { success: false, error: 'No Google Sheet webhook URL configured' };
  }

  try {
    const timestamp = submission.submittedAt || new Date().toISOString().replace('T', ' ').substring(0, 16);
    
    const safePhone = (p: any) => {
      if (!p) return '';
      const s = String(p).trim();
      return (s.startsWith('+') || s.startsWith('=')) ? `'${s}` : s;
    };

    // Prepare files array for Google Apps Script to upload directly to Google Drive
    const filesToUpload: any[] = [];

    if (submission.aadharFrontUrl && typeof submission.aadharFrontUrl === 'string' && submission.aadharFrontUrl.startsWith('data:')) {
      filesToUpload.push({
        field: 'aadharFront',
        name: submission.aadharFrontFileName || 'aadhar_front.jpg',
        base64: submission.aadharFrontUrl,
      });
    }

    if (submission.aadharBackUrl && typeof submission.aadharBackUrl === 'string' && submission.aadharBackUrl.startsWith('data:')) {
      filesToUpload.push({
        field: 'aadharBack',
        name: submission.aadharBackFileName || 'aadhar_back.jpg',
        base64: submission.aadharBackUrl,
      });
    }

    if (submission.photoPreviewUrl && typeof submission.photoPreviewUrl === 'string' && submission.photoPreviewUrl.startsWith('data:')) {
      filesToUpload.push({
        field: 'photo',
        name: submission.photoFileName || 'headshot.jpg',
        base64: submission.photoPreviewUrl,
      });
    }

    // Comprehensive flattened dictionary covering standard fields, aliases, and human column headers
    const flatRecord: Record<string, any> = {
      // Basic info
      id: submission.id,
      type: submission.type,
      pathway: submission.type,
      track: submission.type,
      date: timestamp,
      timestamp: timestamp,
      submittedAt: timestamp,
      fullName: submission.fullName,
      name: submission.fullName,
      age: submission.age,
      city: submission.city,
      phoneNumber: safePhone(submission.phoneNumber),
      phone: safePhone(submission.phoneNumber),
      email: submission.email,
      instagramProfile: submission.instagramProfile || 'N/A',
      instagram: submission.instagramProfile || 'N/A',

      // Participant specific
      departureCity: submission.departureCity || '',
      departure: submission.departureCity || '',
      travelBatch: submission.travelBatch || '',
      batch: submission.travelBatch || '',
      roomPreference: submission.roomPreference || '',
      room: submission.roomPreference || '',
      emergencyContact: safePhone(submission.emergencyContact),
      prebookingTokenPrice: submission.prebookingTokenPrice || 2000,
      tokenPrice: submission.prebookingTokenPrice ? `₹${submission.prebookingTokenPrice}` : '₹2000',
      lockedTripPrice: submission.lockedTripPrice || 13000,
      tripPrice: submission.lockedTripPrice ? `₹${submission.lockedTripPrice}` : '₹13000',
      oct30PriceIncreaseNotice: submission.oct30PriceIncreaseNotice ? 'Acknowledged' : 'Standard',
      paymentMode: submission.paymentMode || 'UPI / Card (₹2,000 Token)',
      transactionRef: submission.transactionRef || `TOKEN-${submission.id}`,

      // Aadhaar Card Details & Google Drive Links
      aadharNumber: submission.aadharNumber || 'N/A',
      aadharFrontFileName: submission.aadharFrontFileName || 'Uploaded',
      aadharBackFileName: submission.aadharBackFileName || 'Uploaded',
      aadharFrontDriveUrl: submission.aadharFrontDriveUrl || '',
      aadharBackDriveUrl: submission.aadharBackDriveUrl || '',
      'Aadhaar Number': submission.aadharNumber || 'N/A',
      'Aadhaar Front (Google Drive Link)': submission.aadharFrontDriveUrl || submission.aadharFrontUrl || submission.aadharFrontFileName || 'Uploaded',
      'Aadhaar Back (Google Drive Link)': submission.aadharBackDriveUrl || submission.aadharBackUrl || submission.aadharBackFileName || 'Uploaded',
      'Aadhaar Front File': submission.aadharFrontFileName || 'Uploaded',
      'Aadhaar Back File': submission.aadharBackFileName || 'Uploaded',

      // Actor specific
      selectedRole: submission.selectedRole || '',
      role: submission.selectedRole || '',
      actingExperience: submission.actingExperience || '',
      photoFileName: submission.photoFileName || '',
      photoDriveUrl: submission.photoDriveUrl || '',
      'Photo / Headshot (Google Drive Link)': submission.photoDriveUrl || submission.photoPreviewUrl || submission.photoFileName || 'Uploaded',
      auditionTapeFileName: submission.auditionTapeFileName || '',
      auditionTapeUrl: submission.auditionTapeUrl || '',
      'Audition Reel / Skill Link': submission.auditionTapeUrl || submission.proofOfSkillLink || 'N/A',
      whyJoin: submission.whyJoin || '',
      refundEligible: submission.refundEligible !== false,

      // Crew specific
      crewDepartment: submission.crewDepartment || '',
      department: submission.crewDepartment || '',
      categoryType: submission.categoryType || '',
      proofOfSkillLink: submission.proofOfSkillLink || '',
      portfolioLink: submission.proofOfSkillLink || '',
      portfolioSummary: submission.portfolioSummary || '',
      gearOrSoftware: submission.gearOrSoftware || '',
      opportunityFeeAgreed: submission.opportunityFeeAgreed ? 'Yes' : 'Pending',
      publicFilmmakingConsent: submission.publicFilmmakingConsent ? 'Granted' : 'Pending',

      // Human-readable Excel column headers
      'Full Name': submission.fullName,
      'Name': submission.fullName,
      'Phone': submission.phoneNumber,
      'Phone Number': submission.phoneNumber,
      'Email': submission.email,
      'Email Address': submission.email,
      'City': submission.city,
      'Age': submission.age,
      'Type': submission.type,
      'Pathway': submission.type,
      'Track': submission.type === 'participant' ? 'Participant (Kashmir Expedition)' : (submission.type === 'actor' ? 'Lead Actor Audition' : 'Crew Department Head'),
      'Departure City': submission.departureCity || 'N/A',
      'Travel Batch': submission.travelBatch || 'N/A',
      'Emergency Contact': submission.emergencyContact || 'N/A',
      'Pre-booking Token': submission.prebookingTokenPrice ? `₹${submission.prebookingTokenPrice}` : '₹2,000',
      'Locked Trip Price': submission.lockedTripPrice ? `₹${submission.lockedTripPrice}` : '₹13,000',
      'Role': submission.selectedRole || 'N/A',
      'Audition / Reel Link': submission.auditionTapeUrl || submission.proofOfSkillLink || 'N/A',
      'Department': submission.crewDepartment || 'N/A',
      'Application ID': submission.id,
      'Submission Date': timestamp,
    };

    // Multi-envelope payload: passes files to be saved in Google Drive
    const payload = {
      ...flatRecord,
      action: 'append_submission',
      files: filesToUpload,
      submission: {
        ...flatRecord,
        files: filesToUpload,
      },
      data: flatRecord,
      payload: flatRecord,
      timestamp: new Date().toISOString(),
    };

    const separator = webhookUrl.includes('?') ? '&' : '?';
    const targetUrl = `${webhookUrl}${separator}action=append_submission&id=${encodeURIComponent(submission.id || '')}`;

    const res = await fetch(targetUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    console.log(`[GoogleSheetSync] Status: ${res.status}, Response: ${responseText.substring(0, 300)}`);

    let driveUrls: Record<string, string> | undefined;
    try {
      const parsedResp = JSON.parse(responseText);
      if (parsedResp && parsedResp.driveUrls) {
        driveUrls = parsedResp.driveUrls;
        if (driveUrls) {
          if (driveUrls.aadharFront) submission.aadharFrontDriveUrl = driveUrls.aadharFront;
          if (driveUrls.aadharBack) submission.aadharBackDriveUrl = driveUrls.aadharBack;
          if (driveUrls.photo) submission.photoDriveUrl = driveUrls.photo;
          saveSubmissions(cache);
        }
      }
    } catch (e) {
      // response might be HTML or plain text redirect
    }

    return {
      success: res.status >= 200 && res.status < 400,
      status: res.status,
      responseText,
      driveUrls,
    };
  } catch (err: any) {
    console.error('[GoogleSheetSync] Error:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

function loadSubmissions() {
  try {
    if (fs.existsSync(storagePath)) {
      const raw = fs.readFileSync(storagePath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading submissions:', e);
  }
  return defaultData;
}

function saveSubmissions(data: any) {
  try {
    const dir = path.dirname(storagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving submissions:', e);
  }
}

let cache = loadSubmissions();

function toActorExcelRows(actors: any[]) {
  return actors.map((a, i) => ({
    'SL NO': i + 1,
    'APPLICATION ID': a.id,
    'DATE': a.submittedAt,
    'FULL NAME': a.fullName,
    'AGE': a.age,
    'CITY': a.city,
    'PHONE': a.phoneNumber,
    'EMAIL': a.email,
    'AADHAAR NUMBER': a.aadharNumber || 'N/A',
    'AADHAAR FRONT (DRIVE LINK)': a.aadharFrontDriveUrl || a.aadharFrontLocalUrl || a.aadharFrontFileName || 'Uploaded',
    'AADHAAR BACK (DRIVE LINK)': a.aadharBackDriveUrl || a.aadharBackLocalUrl || a.aadharBackFileName || 'Uploaded',
    'PHOTO (DRIVE LINK)': a.photoDriveUrl || a.photoLocalUrl || a.photoFileName || 'Uploaded',
    'INSTAGRAM': a.instagramProfile || 'N/A',
    'ROLE APPLIED': a.selectedRole,
    'ACTING EXP': a.actingExperience,
    'AUDITION TAPE / LINK': a.auditionTapeUrl || a.auditionTapeFileName || 'Uploaded',
    'WHY JOIN': a.whyJoin,
    '100% REFUND ELIGIBLE': a.refundEligible ? 'YES (100% Refund Eligible)' : 'Standard',
  }));
}

function toParticipantExcelRows(participants: any[]) {
  return participants.map((p, i) => ({
    'SL NO': i + 1,
    'BOOKING ID': p.id,
    'DATE': p.submittedAt,
    'FULL NAME': p.fullName,
    'AGE': p.age,
    'CITY': p.city,
    'PHONE': p.phoneNumber,
    'EMAIL': p.email,
    'AADHAAR NUMBER': p.aadharNumber || 'N/A',
    'AADHAAR FRONT (DRIVE LINK)': p.aadharFrontDriveUrl || p.aadharFrontLocalUrl || p.aadharFrontFileName || 'Uploaded',
    'AADHAAR BACK (DRIVE LINK)': p.aadharBackDriveUrl || p.aadharBackLocalUrl || p.aadharBackFileName || 'Uploaded',
    'INSTAGRAM': p.instagramProfile || 'N/A',
    'BOARDING CITY': p.departureCity,
    'TRAVEL BATCH': p.travelBatch,
    'ROOM PREFERENCE': p.roomPreference,
    'EMERGENCY CONTACT': p.emergencyContact,
    'PRE-BOOKING TOKEN (PAID)': `₹${p.prebookingTokenPrice || 2000}/-`,
    'LOCKED TRIP PRICE': `₹${p.lockedTripPrice || 13000}/-`,
    'OCT 30 NOTICE': p.oct30PriceIncreaseNotice ? 'ACKNOWLEDGED (+₹1500 after 30 Oct)' : 'Standard',
    'TRANSACTION REF': p.transactionRef || 'PAID-TOKEN-2000',
    'KYC STATUS': (p.aadharFrontDriveUrl || p.aadharFrontFileName) ? 'AADHAAR ATTACHED' : 'PENDING',
  }));
}

function toCrewExcelRows(crew: any[]) {
  return crew.map((c, i) => ({
    'SL NO': i + 1,
    'CREW ID': c.id,
    'DATE': c.submittedAt,
    'FULL NAME': c.fullName,
    'AGE': c.age,
    'CITY': c.city,
    'PHONE': c.phoneNumber,
    'EMAIL': c.email,
    'AADHAAR NUMBER': c.aadharNumber || 'N/A',
    'AADHAAR FRONT (DRIVE LINK)': c.aadharFrontDriveUrl || c.aadharFrontLocalUrl || c.aadharFrontFileName || 'Uploaded',
    'AADHAAR BACK (DRIVE LINK)': c.aadharBackDriveUrl || c.aadharBackLocalUrl || c.aadharBackFileName || 'Uploaded',
    'INSTAGRAM': c.instagramProfile || 'N/A',
    'DEPARTMENT': c.crewDepartment,
    'CLASSIFICATION': c.categoryType,
    'PROOF OF SKILL LINK': c.proofOfSkillLink,
    'PORTFOLIO SUMMARY': c.portfolioSummary,
    'GEAR & SOFTWARE': c.gearOrSoftware,
    'OPPORTUNITY FEE AGREED': c.opportunityFeeAgreed ? 'YES' : 'Pending',
    'PUBLIC FILMMAKING CONSENT': c.publicFilmmakingConsent ? 'GRANTED' : 'Pending',
  }));
}

function jsonToCsv(json: any[]): string {
  if (!json || json.length === 0) return '';
  const headers = Object.keys(json[0]);
  const lines = [
    headers.map((h) => `"${h}"`).join(','),
    ...json.map((row) =>
      headers
        .map((h) => {
          const val = row[h] == null ? '' : String(row[h]);
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ];
  return lines.join('\r\n');
}

export function apiMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const url = req.url?.split('?')[0] || '';

    // Allow CORS so Google Sheets / external tools can read
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    // 1. GET /api/submissions
    // DELETE or POST /api/submissions/clear
    if ((url === '/api/submissions/clear' && (req.method === 'POST' || req.method === 'DELETE')) || (url === '/api/submissions' && req.method === 'DELETE')) {
      cache = { actors: [], participants: [], crew: [] };
      saveSubmissions(cache);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, message: 'All entry data cleared successfully.' }));
      return;
    }

    // DELETE or POST /api/submissions/clear: purges all submissions
    if ((url === '/api/submissions/clear' && (req.method === 'POST' || req.method === 'DELETE')) || (url === '/api/submissions' && req.method === 'DELETE')) {
      cache = { actors: [], participants: [], crew: [] };
      saveSubmissions(cache);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, message: 'All entry data cleared successfully.' }));
      return;
    }

    // 1. GET /api/submissions
    if (url === '/api/submissions' && req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(cache));
      return;
    }

    // 1a. Static file serving for uploaded application files
    if (url.startsWith('/api/uploads/')) {
      const rel = url.replace('/api/uploads/', '');
      const parts = rel.split('/');
      const subId = parts[0];
      const fileName = decodeURIComponent(parts.slice(1).join('/'));
      const filePath = path.join(uploadsDir, subId, fileName);
      if (fs.existsSync(filePath)) {
        const ext = path.extname(fileName).toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.pdf') contentType = 'application/pdf';
        else if (ext === '.webp') contentType = 'image/webp';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        fs.createReadStream(filePath).pipe(res);
        return;
      } else {
        res.statusCode = 404;
        res.end('File not found');
        return;
      }
    }

    // 1b. Direct download of Google Apps Script Source
    if (url === '/api/google-apps-script.js') {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="ChehraFilms_Drive_Sheet_Sync.gs"');
      res.end(GOOGLE_APPS_SCRIPT_SOURCE);
      return;
    }

    // 1c. POST /api/submissions/attach-document (Directly attach or replace Aadhaar on any existing record)
    if (url === '/api/submissions/attach-document' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', async () => {
        try {
          const { id, aadharFrontFileName, aadharFrontUrl, aadharBackFileName, aadharBackUrl, aadharNumber } = JSON.parse(body || '{}');
          if (!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Applicant ID required' }));
            return;
          }

          let found: any = null;
          for (const list of [cache.participants, cache.actors, cache.crew]) {
            const item = list.find((x: any) => x.id === id);
            if (item) {
              if (aadharFrontFileName !== undefined) item.aadharFrontFileName = aadharFrontFileName;
              if (aadharFrontUrl !== undefined) {
                item.aadharFrontUrl = aadharFrontUrl;
                if (typeof aadharFrontUrl === 'string' && aadharFrontUrl.startsWith('data:')) {
                  item.aadharFrontLocalUrl = saveBase64File(id, aadharFrontFileName || 'aadhar_front.jpg', aadharFrontUrl);
                }
              }
              if (aadharBackFileName !== undefined) item.aadharBackFileName = aadharBackFileName;
              if (aadharBackUrl !== undefined) {
                item.aadharBackUrl = aadharBackUrl;
                if (typeof aadharBackUrl === 'string' && aadharBackUrl.startsWith('data:')) {
                  item.aadharBackLocalUrl = saveBase64File(id, aadharBackFileName || 'aadhar_back.jpg', aadharBackUrl);
                }
              }
              if (aadharNumber !== undefined) item.aadharNumber = aadharNumber;
              found = item;
              break;
            }
          }

          if (!found) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `Submission with ID ${id} not found.` }));
            return;
          }

          saveSubmissions(cache);
          // Sync with Google Sheet & Drive in background
          forwardToGoogleSheet(found).then((sheetRes) => {
            if (sheetRes.driveUrls) {
              if (sheetRes.driveUrls.aadharFront) found.aadharFrontDriveUrl = sheetRes.driveUrls.aadharFront;
              if (sheetRes.driveUrls.aadharBack) found.aadharBackDriveUrl = sheetRes.driveUrls.aadharBack;
              saveSubmissions(cache);
            }
          }).catch(console.error);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, updated: found }));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // 2. POST /api/submissions
    if (url === '/api/submissions' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          const item = JSON.parse(body);
          if (!item.type) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Pathway type required' }));
            return;
          }

          // Save any uploaded files to disk for durable preview & serving
          if (item.aadharFrontUrl && typeof item.aadharFrontUrl === 'string' && item.aadharFrontUrl.startsWith('data:')) {
            item.aadharFrontLocalUrl = saveBase64File(item.id, item.aadharFrontFileName || 'aadhar_front.jpg', item.aadharFrontUrl);
          }
          if (item.aadharBackUrl && typeof item.aadharBackUrl === 'string' && item.aadharBackUrl.startsWith('data:')) {
            item.aadharBackLocalUrl = saveBase64File(item.id, item.aadharBackFileName || 'aadhar_back.jpg', item.aadharBackUrl);
          }
          if (item.photoPreviewUrl && typeof item.photoPreviewUrl === 'string' && item.photoPreviewUrl.startsWith('data:')) {
            item.photoLocalUrl = saveBase64File(item.id, item.photoFileName || 'headshot.jpg', item.photoPreviewUrl);
          }

          // Strictly match on unique Application ID only so users can submit multiple applications or test freely without blocking
          const isMatch = (existing: any) => existing.id === item.id;

          if (item.type === 'actor') {
            const idx = cache.actors.findIndex(isMatch);
            if (idx >= 0) {
              cache.actors[idx] = { ...cache.actors[idx], ...item, id: cache.actors[idx].id };
            } else {
              cache.actors.unshift(item);
            }
          } else if (item.type === 'participant') {
            const idx = cache.participants.findIndex(isMatch);
            if (idx >= 0) {
              cache.participants[idx] = { ...cache.participants[idx], ...item, id: cache.participants[idx].id };
            } else {
              cache.participants.unshift(item);
            }
          } else if (item.type === 'crew') {
            const idx = cache.crew.findIndex(isMatch);
            if (idx >= 0) {
              cache.crew[idx] = { ...cache.crew[idx], ...item, id: cache.crew[idx].id };
            } else {
              cache.crew.unshift(item);
            }
          }

          saveSubmissions(cache);

          // Forward to connected Google Sheet & Drive (non-blocking)
          forwardToGoogleSheet(item)
            .then((res) => {
              if (res.driveUrls) {
                if (res.driveUrls.aadharFront) item.aadharFrontDriveUrl = res.driveUrls.aadharFront;
                if (res.driveUrls.aadharBack) item.aadharBackDriveUrl = res.driveUrls.aadharBack;
                if (res.driveUrls.photo) item.photoDriveUrl = res.driveUrls.photo;
                saveSubmissions(cache);
              }
            })
            .catch((err) => console.error('[GoogleSheetSync] Forward failed:', err));

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            success: true,
            submission: item,
            googleSheet: { success: true },
          }));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // Direct test endpoint to send a sample participant (or specified pathway) to Google Sheet
    if (url === '/api/google-sheet/test' && req.method === 'POST') {
      let body = '';
      req.on('data', (c) => { body += c; });
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const testType = parsed.type || 'participant';
          const randomId = Math.floor(100000 + Math.random() * 900000);
          const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

          let sampleItem: any;
          if (testType === 'participant') {
            sampleItem = {
              id: `CF-PART-${randomId}`,
              type: 'participant',
              submittedAt: dateStr,
              fullName: parsed.fullName || 'Sachin Pareek (Test Traveler)',
              age: parsed.age || '24',
              city: parsed.city || 'Lachhmangarh, Sikar',
              phoneNumber: parsed.phoneNumber || '+919828497392',
              email: parsed.email || 'sachinpareek026@gmail.com',
              instagramProfile: '@sachin_travels',
              departureCity: parsed.departureCity || 'Delhi Majnu Ka Tilla Hub',
              travelBatch: parsed.travelBatch || 'Batch Alpha (Oct 18 – Oct 28)',
              roomPreference: 'Twin Sharing with Fellow Traveler',
              emergencyContact: 'Family (+91 98284 97392)',
              prebookingTokenPrice: 1000,
              lockedTripPrice: 11000,
              oct30PriceIncreaseNotice: true,
              paymentMode: 'UPI / Card (₹1,000 Token)',
              transactionRef: `UPI-TEST-${randomId}`,
              confirmed: true,
            };
            cache.participants.unshift(sampleItem);
          } else if (testType === 'actor') {
            sampleItem = {
              id: `CF-ACT-${randomId}`,
              type: 'actor',
              submittedAt: dateStr,
              fullName: parsed.fullName || 'Sachin Pareek (Test Actor)',
              age: parsed.age || '24',
              city: parsed.city || 'Lachhmangarh, Sikar',
              phoneNumber: parsed.phoneNumber || '+919828497392',
              email: parsed.email || 'sachinpareek026@gmail.com',
              instagramProfile: '@sachin_actor',
              selectedRole: 'KABIR — The Restless Wanderer',
              actingExperience: 'Stage and cinematic monologue',
              photoFileName: 'headshot.jpg',
              auditionTapeFileName: 'monologue.mp4',
              auditionTapeUrl: 'https://youtube.com/watch?v=sample-actor-tape',
              whyJoin: 'Testing cinema submission pipeline',
              refundEligible: true,
              confirmed: true,
            };
            cache.actors.unshift(sampleItem);
          } else {
            sampleItem = {
              id: `CF-CREW-${randomId}`,
              type: 'crew',
              submittedAt: dateStr,
              fullName: parsed.fullName || 'Sachin Pareek (Test Crew)',
              age: parsed.age || '24',
              city: parsed.city || 'Lachhmangarh, Sikar',
              phoneNumber: parsed.phoneNumber || '+919828497392',
              email: parsed.email || 'sachinpareek026@gmail.com',
              instagramProfile: 'N/A',
              crewDepartment: 'Cinematography & Camera Operation',
              categoryType: 'Prime Department',
              proofOfSkillLink: 'https://drive.google.com/drive/my-drive',
              portfolioSummary: 'Cinematography showreel verification test',
              gearOrSoftware: 'Sony FX3, DJI Ronin',
              opportunityFeeAgreed: true,
              publicFilmmakingConsent: true,
              confirmed: true,
            };
            cache.crew.unshift(sampleItem);
          }

          saveSubmissions(cache);

          const sheetResult = await forwardToGoogleSheet(sampleItem);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            success: sheetResult.success,
            status: sheetResult.status,
            submission: sampleItem,
            webhookResponse: sheetResult.responseText || sheetResult.error,
            rawResult: sheetResult,
          }));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // Google Sheets Webhook Configuration Endpoints
    if (url === '/api/google-sheet/config' && req.method === 'GET') {
      const currentUrl = getGoogleSheetWebhookUrl();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        connected: Boolean(currentUrl),
        webhookUrl: currentUrl ? currentUrl.replace(/(macros\/s\/[a-zA-Z0-9_-]{8})[a-zA-Z0-9_-]+/, '$1...') : '',
        rawConfigured: Boolean(currentUrl),
        appsScriptCode: GOOGLE_APPS_SCRIPT_SOURCE,
      }));
      return;
    }

    if (url === '/api/google-sheet/config' && req.method === 'POST') {
      let body = '';
      req.on('data', (c) => { body += c; });
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          if (typeof parsed.webhookUrl === 'string') {
            saveGoogleSheetWebhookUrl(parsed.webhookUrl);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, connected: Boolean(parsed.webhookUrl.trim()) }));
            return;
          }
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'webhookUrl string required' }));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // Sync all existing applications to Google Sheet in batch
    if (url === '/api/google-sheet/sync-all' && req.method === 'POST') {
      const webhookUrl = getGoogleSheetWebhookUrl();
      if (!webhookUrl) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'No Google Sheet Webhook URL configured.' }));
        return;
      }
      try {
        const allItems = [
          ...cache.actors,
          ...cache.participants,
          ...cache.crew,
        ];
        let syncedCount = 0;
        for (const it of allItems) {
          await forwardToGoogleSheet(it);
          syncedCount++;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, count: syncedCount }));
      } catch (err: any) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // 3. GET /api/export/actors.csv
    if (url === '/api/export/actors.csv') {
      const rows = toActorExcelRows(cache.actors);
      const csv = jsonToCsv(rows);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="CHEHRA_FILMS_ACTORS.csv"');
      res.end(csv);
      return;
    }

    // 4. GET /api/export/participants.csv
    if (url === '/api/export/participants.csv') {
      const rows = toParticipantExcelRows(cache.participants);
      const csv = jsonToCsv(rows);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="CHEHRA_FILMS_PARTICIPANTS.csv"');
      res.end(csv);
      return;
    }

    // 5. GET /api/export/crew.csv
    if (url === '/api/export/crew.csv') {
      const rows = toCrewExcelRows(cache.crew);
      const csv = jsonToCsv(rows);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="CHEHRA_FILMS_CREW.csv"');
      res.end(csv);
      return;
    }

    // 6. GET /api/export/all.csv
    if (url === '/api/export/all.csv') {
      const allRows = [
        ...cache.actors.map((a: any) => ({ 'TRACK': 'ACTOR (100% REFUND)', 'ID': a.id, 'NAME': a.fullName, 'PHONE': a.phoneNumber, 'EMAIL': a.email, 'CITY': a.city, 'DETAILS': a.selectedRole, 'DATE': a.submittedAt })),
        ...cache.participants.map((p: any) => ({ 'TRACK': 'PARTICIPANT (₹1000 TOKEN)', 'ID': p.id, 'NAME': p.fullName, 'PHONE': p.phoneNumber, 'EMAIL': p.email, 'CITY': p.city, 'DETAILS': `${p.departureCity} - ${p.travelBatch}`, 'DATE': p.submittedAt })),
        ...cache.crew.map((c: any) => ({ 'TRACK': 'CREW MEMBER', 'ID': c.id, 'NAME': c.fullName, 'PHONE': c.phoneNumber, 'EMAIL': c.email, 'CITY': c.city, 'DETAILS': `${c.crewDepartment} - ${c.proofOfSkillLink}`, 'DATE': c.submittedAt })),
      ];
      const csv = jsonToCsv(allRows);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="CHEHRA_FILMS_ALL_REGISTRATIONS.csv"');
      res.end(csv);
      return;
    }

    // 7. GET /api/export/actors.xlsx
    if (url === '/api/export/actors.xlsx') {
      const rows = toActorExcelRows(cache.actors);
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Actors (100% Refund)');
      const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="CHEHRA_FILMS_ACTORS.xlsx"');
      res.end(buf);
      return;
    }

    // 8. GET /api/export/participants.xlsx
    if (url === '/api/export/participants.xlsx') {
      const rows = toParticipantExcelRows(cache.participants);
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Participants (Pre-Bookings)');
      const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="CHEHRA_FILMS_PARTICIPANTS.xlsx"');
      res.end(buf);
      return;
    }

    // 9. GET /api/export/crew.xlsx
    if (url === '/api/export/crew.xlsx') {
      const rows = toCrewExcelRows(cache.crew);
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Crew (Skill Links)');
      const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="CHEHRA_FILMS_CREW.xlsx"');
      res.end(buf);
      return;
    }

    // 10. GET /api/export/all.xlsx
    if (url === '/api/export/all.xlsx') {
      const wb = XLSX.utils.book_new();
      const wsActors = XLSX.utils.json_to_sheet(toActorExcelRows(cache.actors));
      const wsPart = XLSX.utils.json_to_sheet(toParticipantExcelRows(cache.participants));
      const wsCrew = XLSX.utils.json_to_sheet(toCrewExcelRows(cache.crew));

      XLSX.utils.book_append_sheet(wb, wsActors, 'Actors (100% Refund)');
      XLSX.utils.book_append_sheet(wb, wsPart, 'Participants');
      XLSX.utils.book_append_sheet(wb, wsCrew, 'Crew');

      const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="CHEHRA_FILMS_MASTER_ROSTER.xlsx"');
      res.end(buf);
      return;
    }

    next();
  };
}
