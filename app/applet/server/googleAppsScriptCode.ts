/**
 * CHEHRA FILMS — GOOGLE DRIVE & GOOGLE SHEETS FORM SYNC AUTOMATION
 */

export const GOOGLE_APPS_SCRIPT_SOURCE = `/**
 * ============================================================================
 * CHEHRA FILMS — OFFICIAL GOOGLE DRIVE & GOOGLE SHEETS WEBHOOK (GOOGLE FORMS MODE)
 * ============================================================================
 */

var DRIVE_FOLDER_NAME = "Chehra Films - Form Submissions (Uploads)";

/**
 * ⚡ STEP 1: ONE-CLICK AUTHORIZATION
 * 1. Select "authorizeAndSetup" in the toolbar dropdown above (next to Run/Debug).
 * 2. Click "Run" (▶).
 * 3. When popup appears: Click "Review permissions" -> Choose account -> "Advanced" -> "Go to Chehra Films (unsafe)" -> "Allow".
 * 
 * ⚡ STEP 2: UPDATE DEPLOYMENT (CRITICAL)
 * 1. Click "Deploy" (top right) -> "Manage deployments".
 * 2. Click the Pencil (Edit) icon next to your Web app.
 * 3. Under "Version", select "New version".
 * 4. Click "Deploy".
 */
function authorizeAndSetup() {
  Logger.log("Starting Authorization for Google Drive & Google Sheets...");
  
  // 1. Authorize Google Sheets
  var ss = null;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      Logger.log("✅ Google Sheet Connected: " + ss.getName() + " (" + ss.getUrl() + ")");
    } else {
      Logger.log("⚠️ Notice: Open Apps Script from inside your Google Sheet (Extensions > Apps Script).");
    }
  } catch (err) {
    Logger.log("Google Sheets Authorization Required: " + err);
  }

  // 2. Authorize Google Drive
  var driveFolder = null;
  try {
    driveFolder = getOrCreateDriveFolder(null, DRIVE_FOLDER_NAME);
    if (driveFolder) {
      Logger.log("✅ Google Drive Folder Ready: " + driveFolder.getUrl());
    }
  } catch (err) {
    Logger.log("Google Drive Authorization Required: " + err);
  }

  // 3. Write a test verification row
  if (ss) {
    writeToSheet(ss, {
      id: "CF-AUTH-VERIFIED",
      type: "actor",
      fullName: "System Live Verification",
      phoneNumber: "+91 99999 99999",
      email: "director@chehrafilms.com",
      city: "Delhi Hub",
      age: "24",
      selectedRole: "SHANKAR",
      status: "Authorized & Ready"
    }, {});
    Logger.log("🎉 ALL PERMISSIONS GRANTED! Remember to click Deploy > Manage deployments > Edit > New version > Deploy!");
  }
}

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
    var ss = null;

    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (ssErr) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Google Sheets permission required. Please select 'authorizeAndSetup' in Apps Script, click Run (▶), then Deploy > Manage Deployments > Edit > New version: " + ssErr.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!ss) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "No active spreadsheet linked. Please open Apps Script from inside your Google Sheet via Extensions > Apps Script."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 1. Setup Google Drive Folders
    var mainFolder = null;
    var driveUrls = {};

    try {
      mainFolder = getOrCreateDriveFolder(null, DRIVE_FOLDER_NAME);
    } catch (driveErr) {
      Logger.log("Drive folder notice: " + driveErr);
    }

    // 2. Process File Uploads to Google Drive
    if (mainFolder) {
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
    }

    // 3. Write rows to Google Sheet
    writeToSheet(ss, submission, driveUrls);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Submission successfully recorded in Google Sheet!",
      driveFolderUrl: mainFolder ? mainFolder.getUrl() : null,
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

function saveBase64ToDrive(folder, submission, fileItem) {
  var base64Str = fileItem.base64;
  var mimeType = fileItem.mimeType || "application/octet-stream";

  if (base64Str.indexOf("data:") === 0) {
    var parts = base64Str.split(",");
    var mimeMatch = parts[0].match(/:(.*?);/);
    if (mimeMatch) mimeType = mimeMatch[1];
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

function makeHyperlink(url, label) {
  if (!url || url.indexOf("http") !== 0) return label || "Not Provided";
  return '=HYPERLINK("' + url + '", "' + (label || "Open in Google Drive") + '")';
}

function writeToSheet(ss, sub, driveUrls) {
  var sheetName = "Form Responses";
  var sheet = ss.getSheetByName(sheetName) || ss.getActiveSheet();
  if (ss.getSheetByName(sheetName) === null && sheet) {
    try { sheet.setName(sheetName); } catch (e) {}
  }

  var headers = [
    "Timestamp", "Application ID", "Pathway Track", "Full Name",
    "Phone Number", "Email Address", "City", "Age", "Instagram",
    "Role / Batch / Dept", "Aadhaar Number",
    "Aadhaar Front (Google Drive Link)", "Aadhaar Back (Google Drive Link)",
    "Photo / Headshot (Google Drive Link)", "Audition Reel / Skill Link",
    "Financial & Booking Terms", "Emergency Contact", "Notes & Statement"
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#1E293B");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setWrap(true);
    sheet.setFrozenRows(1);
  }

  var aFrontUrl = driveUrls.aadharFront || sub.aadharFrontDriveUrl || "";
  var aBackUrl = driveUrls.aadharBack || sub.aadharBackDriveUrl || "";
  var photoUrl = driveUrls.photo || sub.photoDriveUrl || "";
  var tapeUrl = sub.auditionTapeUrl || sub.proofOfSkillLink || driveUrls.auditionTape || "";

  var aFrontCell = aFrontUrl ? makeHyperlink(aFrontUrl, "View Aadhaar Front in Drive") : (sub.aadharFrontFileName || "Not Uploaded");
  var aBackCell = aBackUrl ? makeHyperlink(aBackUrl, "View Aadhaar Back in Drive") : (sub.aadharBackFileName || "Not Uploaded");
  var photoCell = photoUrl ? makeHyperlink(photoUrl, "View Photo in Drive") : (sub.photoFileName || "Not Uploaded");
  var tapeCell = tapeUrl && tapeUrl.indexOf("http") === 0 ? makeHyperlink(tapeUrl, "Open Audition / Reel Link") : (tapeUrl || "N/A");

  var roleOrBatch = sub.type === 'actor' 
    ? (sub.selectedRole || "Actor") 
    : sub.type === 'participant' 
    ? ((sub.departureCity || "") + " | " + (sub.travelBatch || ""))
    : (sub.crewDepartment || "Crew");

  var termsSummary = sub.type === 'actor'
    ? "₹16k Total (₹3k Security • 100% Refundable)"
    : sub.type === 'participant'
    ? "₹13,000 Early Bird (₹2,000 Security Token)"
    : "Crew (Subsidized Opportunity Policy)";

  var phone = sub.phoneNumber ? "'" + String(sub.phoneNumber).trim() : "";
  var time = sub.submittedAt || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

  var row = [
    time, sub.id || "", (sub.type || "Applicant").toUpperCase(),
    sub.fullName || sub.name || "", phone, sub.email || "",
    sub.city || "", sub.age || "", sub.instagramProfile || "",
    roleOrBatch, sub.aadharNumber ? "'" + String(sub.aadharNumber).trim() : "N/A",
    aFrontCell, aBackCell, photoCell, tapeCell, termsSummary,
    sub.emergencyContact || "N/A",
    sub.whyJoin || sub.portfolioSummary || sub.actingExperience || ""
  ];

  sheet.appendRow(row);
  try { sheet.autoResizeColumns(1, headers.length); } catch (e) {}
}
`;
