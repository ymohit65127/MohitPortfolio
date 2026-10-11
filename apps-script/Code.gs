/**
 * Portfolio contact form backend — Google Apps Script
 * ----------------------------------------------------
 * Receives POST requests from the portfolio contact form, appends every
 * submission as a row in the bound Google Sheet (the "log"), and emails
 * the submission to TO_EMAIL.
 *
 * Deploy: Deploy → New deployment → Web app → Execute as: Me →
 *         Who has access: Anyone → Deploy. Paste the /exec URL into
 *         the form's action attribute in index.html.
 */

const TO_EMAIL   = 'ymohit65127@gmail.com';
const SHEET_NAME = 'Submissions';
const HEADERS    = ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Page URL', 'User Agent'];

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    // Honeypot: real users never fill this hidden field.
    if (p._gotcha) return json_({ ok: true });

    const name    = clean_(p.name);
    const email   = clean_(p.email);
    const subject = clean_(p.subject);
    const message = clean_(p.message);

    if (!name || !email || !message) {
      return json_({ ok: false, error: 'Name, email and message are required.' });
    }

    // 1) Log to sheet
    const sheet = getSheet_();
    sheet.appendRow([new Date(), name, email, subject, message, clean_(p.page), clean_(p.ua)]);

    // 2) Email notification
    MailApp.sendEmail({
      to: TO_EMAIL,
      replyTo: email,
      subject: '[Portfolio] ' + (subject || 'New message') + ' — ' + name,
      htmlBody:
        '<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#14161f">' +
        '<h2 style="margin:0 0 14px">New portfolio enquiry</h2>' +
        '<table cellpadding="6" style="border-collapse:collapse">' +
        row_('Name', name) +
        row_('Email', '<a href="mailto:' + esc_(email) + '">' + esc_(email) + '</a>') +
        row_('Subject', subject || '—') +
        '</table>' +
        '<p style="margin:18px 0 6px;font-weight:600">Message</p>' +
        '<div style="white-space:pre-wrap;background:#f6f7fb;border:1px solid #e3e5ee;border-radius:10px;padding:14px">' +
        esc_(message) + '</div>' +
        '<p style="margin-top:20px;font-size:12px;color:#7b8198">Logged to Google Sheet “' +
        SpreadsheetApp.getActiveSpreadsheet().getName() + '” · ' + new Date().toString() + '</p>' +
        '</div>',
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Health check: open the /exec URL in a browser to confirm deployment.
function doGet() {
  return json_({ ok: true, service: 'portfolio-contact', time: new Date().toISOString() });
}

/* ---------- helpers ---------- */

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean_(v) {
  return String(v == null ? '' : v).trim().slice(0, 5000);
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function row_(label, valueHtml) {
  return '<tr><td style="color:#7b8198;padding-right:14px">' + label + '</td><td>' + valueHtml + '</td></tr>';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
