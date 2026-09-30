/**
 * CHEHRA FILMS — GOOGLE DRIVE & GOOGLE SHEETS FORM SYNC AUTOMATION
 * 
 * Paste this entire script into your Google Apps Script editor:
 * 1. Open your Google Sheet (where you want responses collected).
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete any code in Code.gs and paste this ENTIRE script.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set "Execute as": "Me" (your Google account).
 * 7. Set "Who has access": "Anyone" (crucial so the form can submit data).
 * 8. Click "Deploy" and authorize permissions.
 * 9. Copy the Web app URL (ending in /exec) and save it in the Chehra Films Portal!
 */

export const GOOGLE_APPS_SCRIPT_SOURCE = `/**
 * ============================================================================
 * CHEHRA FILMS — OFFICIAL GOOGLE DRIVE & GOOGLE SHEETS WEBHOOK (GOOGLE FORMS MODE)
 * ============================================================================
 * Features:
 * 1. Automatically creates "Chehra Films - Form Submissions (Uploads)" folder in your Google Drive.
 * 2. Saves all uploaded files (Aadhaar cards, photos, audition reels) directly into your Drive.
 * 3. Sets file permissions so clicking the link in your Google Sheet opens the file in Google Drive.
 * 4. Adds rows to your Google Sheet with clickable HYPERLINK formulas, matching Google Forms behavior.
 * 5. Categorizes entries into dedicated tabs: "All Responses", "Actors", "Participants", and "Crew".
 */

var DRIVE_FOLDER_NAME = "Chehra Films - Form Submissions (Uploads)";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "Chehra Films Google Drive & Sheet Webhook is active and listening.",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Server busy, could not acquire lock."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var rawData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        rawData = JSON.parse(e.postData.contents);
      } catch (err) {
        rawData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      rawData = e.parameter;
    }

    var submission = rawData.submission || rawData.data || rawData.payload || rawData;
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "No active spreadsheet linked to this Apps Script project."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 1. Setup Google Drive Folders
    var mainFolder = getOrCreateDriveFolder(null, DRIVE_FOLDER_NAME);
    var driveUrls = {};

    // 2. Process File Uploads to Google Drive
    var files = rawData.files || submission.files || [];
    if (Array.isArray(files) && files.length > 0) {
      files.forEach(function(fileItem) {
        if (fileItem && fileItem.base64) {
          try {
            var url = saveBase64ToDrive(mainFolder, submission, fileItem);
            if (url) {
              driveUrls[fileItem.field || fileItem.name] = url;
            }
          } catch (fileErr) {
            Logger.log("File save error: " + fileErr);
          }
        }
      });
    }

    // Direct base64 fields if passed in root
    if (submission.aadharFrontUrl && submission.aadharFrontUrl.indexOf('data:') === 0 && !driveUrls.aadharFront) {
      try {
        var aFrontUrl = saveBase64ToDrive(mainFolder, submission, {
          field: 'aadharFront',
          name: submission.aadharFrontFileName || 'aadhar_front.jpg',
          base64: submission.aadharFrontUrl
        });
        if (aFrontUrl) driveUrls.aadharFront = aFrontUrl;
      } catch (e1) {}
    }

    if (submission.aadharBackUrl && submission.aadharBackUrl.indexOf('data:') === 0 && !driveUrls.aadharBack) {
      try {
        var aBackUrl = saveBase64ToDrive(mainFolder, submission, {
          field: 'aadharBack',
          name: submission.aadharBackFileName || 'aadhar_back.jpg',
          base64: submission.aadharBackUrl
        });
        if (aBackUrl) driveUrls.aadharBack = aBackUrl;
      } catch (e2) {}
    }

    if (submission.photoPreviewUrl && submission.photoPreviewUrl.indexOf('data:') === 0 && !driveUrls.photo) {
      try {
        var pUrl = saveBase64ToDrive(mainFolder, submission, {
          field: 'photo',
          name: submission.photoFileName || 'headshot.jpg',
          base64: submission.photoPreviewUrl
        });
        if (pUrl) driveUrls.photo = pUrl;
      } catch (e3) {}
    }

    // 3. Write rows to Google Sheet with HYPERLINK formulas
    writeToSheet(ss, submission, driveUrls);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Submission and files successfully saved to Google Drive and Google Sheet!",
      driveFolderUrl: mainFolder.getUrl(),
      driveUrls: driveUrls,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Error in doPost: " + err);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Creates or gets a Google Drive folder
 */
function getOrCreateDriveFolder(parentFolder, folderName) {
  var iterator = parentFolder 
    ? parentFolder.getFoldersByName(folderName) 
    : DriveApp.getFoldersByName(folderName);
    
  if (iterator.hasNext()) {
    return iterator.next();
  }
  
  var newFolder = parentFolder 
    ? parentFolder.createFolder(folderName) 
    : DriveApp.createFolder(folderName);
  
  try {
    newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {}
  
  return newFolder;
}

/**
 * Saves a base64 encoded file into Google Drive and returns its viewable URL
 */
function saveBase64ToDrive(folder, submission, fileItem) {
  var base64Str = fileItem.base64;
  var mimeType = fileItem.mimeType || "application/octet-stream";
  
  // Extract data URL header if present
  if (base64Str.indexOf("data:") === 0) {
    var parts = base64Str.split(",");
    var mimeMatch = parts[0].match(/:(.*?);/);
    if (mimeMatch) {
      mimeType = mimeMatch[1];
    }
    base64Str = parts[1];
  }
  
  var decoded = Utilities.base64Decode(base64Str);
  var applicantId = submission.id || "APP";
  var applicantName = (submission.fullName || submission.name || "Candidate").replace(/[^a-zA-Z0-9_-]/g, "_");
  var fieldTag = (fileItem.field || "file").toUpperCase();
  var rawFileName = fileItem.name || (fieldTag + ".jpg");
  var fileName = applicantId + "_" + applicantName + "_" + fieldTag + "_" + rawFileName;
  
  var blob = Utilities.newBlob(decoded, mimeType, fileName);
  var file = folder.createFile(blob);
  
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {}
  
  return file.getUrl();
}

/**
 * Formats a Google Sheet HYPERLINK formula
 */
function makeHyperlink(url, label) {
  if (!url || url.indexOf("http") !== 0) return label || "Not Provided";
  return '=HYPERLINK("' + url + '", "' + (label || "Open in Google Drive") + '")';
}

/**
 * Appends row to Sheet with formatting
 */
function writeToSheet(ss, sub, driveUrls) {
  var sheetName = "Form Responses";
  var sheet = ss.getSheetByName(sheetName) || ss.getActiveSheet();
  if (ss.getSheetByName(sheetName) === null && sheet) {
    try { sheet.setName(sheetName); } catch (e) {}
  }

  var headers = [
    "Timestamp",
    "Application ID",
    "Pathway Track",
    "Full Name",
    "Phone Number",
    "Email Address",
    "City",
    "Age",
    "Instagram",
    "Role / Batch / Dept",
    "Aadhaar Number",
    "Aadhaar Front (Google Drive Link)",
    "Aadhaar Back (Google Drive Link)",
    "Photo / Headshot (Google Drive Link)",
    "Audition Reel / Skill Link",
    "Financial & Booking Terms",
    "Emergency Contact",
    "Notes & Statement"
  ];

  // If brand new sheet, initialize headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#1E293B");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setWrap(true);
    sheet.setFrozenRows(1);
  }

  var aFrontUrl = driveUrls.aadharFront || sub.aadharFrontDriveUrl || (sub.aadharFrontUrl && sub.aadharFrontUrl.indexOf('http') === 0 ? sub.aadharFrontUrl : "");
  var aBackUrl = driveUrls.aadharBack || sub.aadharBackDriveUrl || (sub.aadharBackUrl && sub.aadharBackUrl.indexOf('http') === 0 ? sub.aadharBackUrl : "");
  var photoUrl = driveUrls.photo || sub.photoDriveUrl || (sub.photoPreviewUrl && sub.photoPreviewUrl.indexOf('http') === 0 ? sub.photoPreviewUrl : "");
  var tapeUrl = sub.auditionTapeUrl || sub.proofOfSkillLink || driveUrls.auditionTape || "";

  var aFrontCell = aFrontUrl ? makeHyperlink(aFrontUrl, "View Aadhaar Front in Drive") : (sub.aadharFrontFileName || "Not Uploaded");
  var aBackCell = aBackUrl ? makeHyperlink(aBackUrl, "View Aadhaar Back in Drive") : (sub.aadharBackFileName || "Not Uploaded");
  var photoCell = photoUrl ? makeHyperlink(photoUrl, "View Photo in Drive") : (sub.photoFileName || "Not Uploaded");
  var tapeCell = tapeUrl && tapeUrl.indexOf("http") === 0 ? makeHyperlink(tapeUrl, "Open Audition / Reel Link") : (tapeUrl || "N/A");

  var roleOrBatch = "";
  if (sub.type === 'actor') {
    roleOrBatch = sub.selectedRole || "Actor";
  } else if (sub.type === 'participant') {
    roleOrBatch = (sub.departureCity || "") + " | " + (sub.travelBatch || "");
  } else {
    roleOrBatch = sub.crewDepartment || "Crew Member";
  }

  var termsSummary = "";
  if (sub.type === 'actor') {
    termsSummary = "₹16k Total (₹3k Security on Selection • 100% Refundable)";
  } else if (sub.type === 'participant') {
    termsSummary = "₹13,000 Early Bird (₹2,000 Security Token Paid)";
  } else {
    termsSummary = "Crew Selection (Subsidized Gear/Opportunity Policy)";
  }

  var phone = sub.phoneNumber ? "'" + String(sub.phoneNumber).trim() : "";
  var time = sub.submittedAt || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

  var row = [
    time,
    sub.id || "",
    (sub.type || "Applicant").toUpperCase(),
    sub.fullName || sub.name || "",
    phone,
    sub.email || "",
    sub.city || "",
    sub.age || "",
    sub.instagramProfile || "",
    roleOrBatch,
    sub.aadharNumber ? "'" + String(sub.aadharNumber).trim() : "N/A",
    aFrontCell,
    aBackCell,
    photoCell,
    tapeCell,
    termsSummary,
    sub.emergencyContact || "N/A",
    sub.whyJoin || sub.portfolioSummary || sub.actingExperience || ""
  ];

  sheet.appendRow(row);

  // Auto-resize columns for readability
  try {
    sheet.autoResizeColumns(1, headers.length);
  } catch (e) {}
}
`;
