import type { Connect } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

// Initial seeds
const defaultData = {
  actors: [
    {
      id: 'CF-ACT-829104',
      type: 'actor',
      submittedAt: '2026-09-15 14:32',
      fullName: 'Arjun Vardhan',
      age: '26',
      city: 'Mumbai',
      phoneNumber: '+91 98201 44521',
      email: 'arjun.vardhan@outlook.com',
      instagramProfile: '@arjun.vardhan_actor',
      selectedRole: 'KABIR — The Solitary Climber',
      actingExperience: '3 years NSD weekend repertory, 2 short films on Mubi/YouTube',
      photoFileName: 'arjun_headshot_dossier.jpg',
      auditionTapeFileName: 'monologue_spiti_climb.mp4',
      auditionTapeUrl: 'https://www.youtube.com/watch?v=sample-audition-tape',
      whyJoin: 'The raw, non-rehearsed style of cinema in remote Himalayan passes is exactly the boundary I want to push as an actor.',
      refundEligible: true,
      confirmed: true,
    },
    {
      id: 'CF-ACT-710492',
      type: 'actor',
      submittedAt: '2026-09-16 11:18',
      fullName: 'Tara Mukherjee',
      age: '24',
      city: 'Kolkata',
      phoneNumber: '+91 98310 98231',
      email: 'taramukherjee.arts@gmail.com',
      instagramProfile: '@tara.wanderess',
      selectedRole: 'JYOTI — The Nomad Astronomer',
      actingExperience: 'Theatre actor with Nandikar collective, classical Kathak and spoken monologue',
      photoFileName: 'tara_portrait_35mm.jpg',
      auditionTapeFileName: 'tara_audition_monologue.mp4',
      auditionTapeUrl: 'https://vimeo.com/sample-tara-monologue',
      whyJoin: 'Exploring night skies of Hanle while living the script in real time is a lifelong dream.',
      refundEligible: true,
      confirmed: true,
    },
    {
      id: 'CF-ACT-604812',
      type: 'actor',
      submittedAt: '2026-09-17 09:45',
      fullName: 'Vikramaditya Rathore',
      age: '31',
      city: 'Jaipur',
      phoneNumber: '+91 94140 33819',
      email: 'vikram.rathore.cinema@gmail.com',
      instagramProfile: '@vikram_desert_tales',
      selectedRole: 'DEV — The Silent Chronicler',
      actingExperience: 'FTII alumni workshop attendee, 4 indie short films in Rajasthan',
      photoFileName: 'vikram_profile.jpg',
      auditionTapeFileName: 'silent_observation_reel.mp4',
      auditionTapeUrl: 'https://drive.google.com/file/d/sample-tape-vikram',
      whyJoin: 'True Indian cinema happens outside Mumbai studios in the dust and wind of the Thar.',
      refundEligible: true,
      confirmed: true,
    },
  ],
  participants: [
    {
      id: 'CF-PART-319842',
      type: 'participant',
      submittedAt: '2026-09-16 16:20',
      fullName: 'Rohan Deshmukh',
      age: '28',
      city: 'Pune',
      phoneNumber: '+91 97654 11209',
      email: 'rohan.deshmukh@gmail.com',
      instagramProfile: '@rohan_travel_lens',
      departureCity: 'Mumbai / Pune Convoy',
      travelBatch: 'Batch Alpha (Oct 18 – Oct 28)',
      roomPreference: 'Twin Sharing with Fellow Traveler',
      emergencyContact: '+91 98220 99881 (Sunil Deshmukh - Father)',
      prebookingTokenPrice: 1000,
      lockedTripPrice: 11000,
      oct30PriceIncreaseNotice: true,
      paymentMode: 'UPI / Google Pay (Ref #UPI88291)',
      transactionRef: 'UPI-CHEHRA-9988231',
      confirmed: true,
    },
    {
      id: 'CF-PART-492108',
      type: 'participant',
      submittedAt: '2026-09-17 18:05',
      fullName: 'Ananya Singhania',
      age: '25',
      city: 'Delhi NCR',
      phoneNumber: '+91 99100 44820',
      email: 'ananya.singhania@yahoo.com',
      instagramProfile: '@ananya_on_the_road',
      departureCity: 'Delhi Majnu Ka Tilla Hub',
      travelBatch: 'Batch Beta (Oct 29 – Nov 08)',
      roomPreference: 'Private Camping Tent / Room',
      emergencyContact: '+91 98110 55667 (Meera Singhania - Mother)',
      prebookingTokenPrice: 1000,
      lockedTripPrice: 11000,
      oct30PriceIncreaseNotice: true,
      paymentMode: 'UPI / PhonePe',
      transactionRef: 'UPI-CHEHRA-4412903',
      confirmed: true,
    },
    {
      id: 'CF-PART-551029',
      type: 'participant',
      submittedAt: '2026-09-18 13:40',
      fullName: 'Karthik Ramanathan',
      age: '29',
      city: 'Bengaluru',
      phoneNumber: '+91 98450 67123',
      email: 'karthik.raman@techpulse.io',
      instagramProfile: '@karthik.nomad',
      departureCity: 'Direct Fly-in to Srinagar Hub',
      travelBatch: 'Batch Alpha (Oct 18 – Oct 28)',
      roomPreference: 'Twin Sharing with Fellow Traveler',
      emergencyContact: '+91 94440 12399 (V. Ramanathan - Father)',
      prebookingTokenPrice: 1000,
      lockedTripPrice: 11000,
      oct30PriceIncreaseNotice: true,
      paymentMode: 'Net Banking IMPS',
      transactionRef: 'IMPS-20260918-99410',
      confirmed: true,
    },
  ],
  crew: [
    {
      id: 'CF-CREW-901452',
      type: 'crew',
      submittedAt: '2026-09-16 19:12',
      fullName: 'Sameer Sen',
      age: '27',
      city: 'Bengaluru',
      phoneNumber: '+91 99801 55210',
      email: 'sameer.sen.audio@soundscape.org',
      instagramProfile: '@sameer_soundscapes',
      crewDepartment: 'Music Composition & Background Score',
      categoryType: 'Prime Department',
      proofOfSkillLink: 'https://open.spotify.com/artist/sample-sameer-ambient-folks',
      portfolioSummary: 'Composed Indian acoustic ambient scores for 3 regional documentaries; multi-instrumentalist (Esraj, Guitar, Synth).',
      gearOrSoftware: 'Ableton Live 12, Logic Pro X, RME Babyface Pro, Neumann KM184 pairs',
      opportunityFeeAgreed: true,
      publicFilmmakingConsent: true,
      confirmed: true,
    },
    {
      id: 'CF-CREW-819203',
      type: 'crew',
      submittedAt: '2026-09-17 14:22',
      fullName: 'Divya Kashyap',
      age: '29',
      city: 'Chandigarh',
      phoneNumber: '+91 98765 22109',
      email: 'divya.scripts@narrativehouse.in',
      instagramProfile: '@divya_writes_cinema',
      crewDepartment: 'Screenplay & Script Writer',
      categoryType: 'Prime Department',
      proofOfSkillLink: 'https://drive.google.com/drive/folders/sample-divya-scripts-public',
      portfolioSummary: 'Dialogue writer and script doctor for 2 streaming web series; bilingual in Hindi & English realism.',
      gearOrSoftware: 'Final Draft 13, Highland 2, Notion Film Bible templates',
      opportunityFeeAgreed: true,
      publicFilmmakingConsent: true,
      confirmed: true,
    },
    {
      id: 'CF-CREW-774129',
      type: 'crew',
      submittedAt: '2026-09-18 10:15',
      fullName: 'Nikhil Chawla',
      age: '26',
      city: 'Delhi',
      phoneNumber: '+91 98102 77410',
      email: 'nikhil.dop@grainlight.com',
      instagramProfile: '@nikhil_raw_frames',
      crewDepartment: 'Cinematography / Camera Operator',
      categoryType: 'Prime Department',
      proofOfSkillLink: 'https://vimeo.com/showcase/sample-nikhil-showreel',
      portfolioSummary: 'Documentary DoP with high altitude filming experience across Zanskar and Ladakh; natural light specialist.',
      gearOrSoftware: 'Sony FX6, FX3, DZOFilm Vespid Primes, DJI Ronin RS3 Pro',
      opportunityFeeAgreed: true,
      publicFilmmakingConsent: true,
      confirmed: true,
    },
    {
      id: 'CF-CREW-665182',
      type: 'crew',
      submittedAt: '2026-09-18 15:50',
      fullName: 'Pooja Verma',
      age: '25',
      city: 'Mumbai',
      phoneNumber: '+91 98200 66518',
      email: 'pooja.wardrobe.design@gmail.com',
      instagramProfile: '@pooja_costume_craft',
      crewDepartment: 'Costume Designer & Wardrobe Styling',
      categoryType: 'Creative & Production',
      proofOfSkillLink: 'https://www.behance.net/sample-pooja-textile-cinema',
      portfolioSummary: 'NIFT graduate with specialization in indigenous Himalayan woolens, distressed road-wear, and nomadic styling.',
      gearOrSoftware: 'Handloom textile sourcing, on-field weathering kit, iPad Pro Procreate design',
      opportunityFeeAgreed: true,
      publicFilmmakingConsent: true,
      confirmed: true,
    },
  ],
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

async function forwardToGoogleSheet(submission: any) {
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (!webhookUrl) return;

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'append_submission',
        submission: submission,
        timestamp: new Date().toISOString(),
      }),
    });
    console.log('[GoogleSheetSync] Status:', res.status);
  } catch (err: any) {
    console.error('[GoogleSheetSync] Error:', err.message);
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
    'INSTAGRAM': a.instagramProfile || 'N/A',
    'ROLE APPLIED': a.selectedRole,
    'ACTING EXP': a.actingExperience,
    'PHOTO FILE': a.photoFileName || 'Uploaded',
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
    'INSTAGRAM': p.instagramProfile || 'N/A',
    'BOARDING CITY': p.departureCity,
    'TRAVEL BATCH': p.travelBatch,
    'ROOM PREFERENCE': p.roomPreference,
    'EMERGENCY CONTACT': p.emergencyContact,
    'PRE-BOOKING TOKEN (PAID)': `₹${p.prebookingTokenPrice}/-`,
    'LOCKED TRIP PRICE': `₹${p.lockedTripPrice}/-`,
    'OCT 30 NOTICE': p.oct30PriceIncreaseNotice ? 'ACKNOWLEDGED (+₹1500 after 30 Oct)' : 'Standard',
    'TRANSACTION REF': p.transactionRef || 'PAID-TOKEN-1000',
    'UPLOADS': 'ZERO UPLOADS (Traveler Track)',
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
    if (url === '/api/submissions' && req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(cache));
      return;
    }

    // 2. POST /api/submissions
    if (url === '/api/submissions' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const item = JSON.parse(body);
          if (!item.type) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Pathway type required' }));
            return;
          }

          if (item.type === 'actor') {
            cache.actors.unshift(item);
          } else if (item.type === 'participant') {
            cache.participants.unshift(item);
          } else if (item.type === 'crew') {
            cache.crew.unshift(item);
          }

          saveSubmissions(cache);

          // Asynchronously forward to connected Google Sheet
          forwardToGoogleSheet(item).catch((err) => {
            console.error('Async Google Sheet forward failed:', err);
          });

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, submission: item }));
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
