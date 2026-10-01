/**
 * Google Apps Script source code for Chehra Films.
 * Paste this script into your Google Sheet (Extensions > Apps Script) to receive
 * live submissions from the website and store them in the corresponding tab.
 */

export const GOOGLE_APPS_SCRIPT_SOURCE = `/**
 * =========================================================================
 * CHEHRA FILMS — GOOGLE SHEETS & DRIVE AUTOMATION WEBHOOK
 * Parindaa Travels / Chehra Films Lead Casting & Expedition Portal
 * =========================================================================
 * Instructions:
 * 1. In your Google Sheet, click Extensions > Apps Script.
 * 2. Delete any existing code and paste this script.
 * 3. Click Deploy > New deployment.
 * 4. Choose type: "Web app".
 * 5. Set:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial for webhooks)
 * 6. Click Deploy and copy the Web App URL (starts with https://script.google.com/macros/s/...).
 * 7. Paste that Web App URL into the Chehra Films Admin Portal or your .env (GOOGLE_SHEET_WEBHOOK_URL).
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var rawContents = e.postData ? e.postData.contents : '';
    if (!rawContents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'No POST data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(rawContents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Determine target sheet tab based on pathway
    var pathway = (data.pathway || data.track || 'general').toLowerCase();
    var sheetName = 'Submissions';

    if (pathway.indexOf('actor') !== -1) {
      sheetName = 'Actors (Cast Auditions)';
    } else if (pathway.indexOf('participant') !== -1) {
      sheetName = 'Participants (Expedition)';
    } else if (pathway.indexOf('crew') !== -1) {
      sheetName = 'Crew (Production Team)';
    }

    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      initializeSheetHeaders(sheet, sheetName);
    }

    var timestamp = data.submittedAt || new Date().toISOString();
    var rowData = [];

    if (sheetName === 'Actors (Cast Auditions)') {
      rowData = [
        data.id || '',
        timestamp,
        data.fullName || '',
        data.phoneNumber ? ("'" + data.phoneNumber) : '',
        data.email || '',
        data.city || '',
        data.selectedRole || '',
        data.dialogueVideoLink || data.monologueLink || '',
        data.headshotPhotoUrl || '',
        data.aadharNumber ? ("'" + data.aadharNumber) : '',
        data.paymentStatus || 'Verified',
        data.transactionReferenceId || data.paymentReference || '',
        data.notes || ''
      ];
    } else if (sheetName === 'Participants (Expedition)') {
      rowData = [
        data.id || '',
        timestamp,
        data.fullName || '',
        data.phoneNumber ? ("'" + data.phoneNumber) : '',
        data.email || '',
        data.city || '',
        data.departureCity || '',
        data.travelBatch || '',
        data.idCardType || 'Aadhaar',
        data.aadharNumber ? ("'" + data.aadharNumber) : '',
        data.paymentStatus || 'Verified',
        data.transactionReferenceId || data.paymentReference || '',
        data.notes || ''
      ];
    } else if (sheetName === 'Crew (Production Team)') {
      rowData = [
        data.id || '',
        timestamp,
        data.fullName || '',
        data.phoneNumber ? ("'" + data.phoneNumber) : '',
        data.email || '',
        data.city || '',
        data.crewDepartment || '',
        data.categoryType || '',
        data.proofOfSkillLink || data.portfolioLink || '',
        data.paymentStatus || 'Verified',
        data.transactionReferenceId || data.paymentReference || '',
        data.notes || ''
      ];
    } else {
      rowData = [
        data.id || '',
        timestamp,
        data.fullName || '',
        data.phoneNumber ? ("'" + data.phoneNumber) : '',
        data.email || '',
        data.city || '',
        data.pathway || '',
        JSON.stringify(data)
      ];
    }

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      id: data.id || '',
      sheet: sheetName,
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    message: 'Chehra Films Webhook endpoint is active and listening for POST requests.',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function initializeSheetHeaders(sheet, sheetName) {
  var headers = [];

  if (sheetName === 'Actors (Cast Auditions)') {
    headers = [
      'Submission ID', 'Submitted At', 'Full Name', 'Phone', 'Email',
      'City', 'Character / Role', 'Monologue Video Link', 'Headshot Photo Link',
      'Aadhaar / ID', 'Status', 'Transaction Ref', 'Notes'
    ];
  } else if (sheetName === 'Participants (Expedition)') {
    headers = [
      'Submission ID', 'Submitted At', 'Full Name', 'Phone', 'Email',
      'City', 'Departure City', 'Travel Batch', 'ID Type', 'Aadhaar / ID',
      'Status', 'Transaction Ref', 'Notes'
    ];
  } else if (sheetName === 'Crew (Production Team)') {
    headers = [
      'Submission ID', 'Submitted At', 'Full Name', 'Phone', 'Email',
      'City', 'Department', 'Role Category', 'Portfolio / Showreel Link',
      'Status', 'Transaction Ref', 'Notes'
    ];
  } else {
    headers = ['Submission ID', 'Submitted At', 'Full Name', 'Phone', 'Email', 'City', 'Pathway', 'Raw Data'];
  }

  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0E1626');
  headerRange.setFontColor('#FACC15');
}
`;
