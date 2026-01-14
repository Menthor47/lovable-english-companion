import { setGlobalOptions } from "firebase-functions";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { Resend } from "resend";

initializeApp();

// Use params for secrets if possible, or config.
// The user previously used functions.config().resend.apikey.
// In v2, we should ideally use defineSecret or just process.env if set via secrets.
// But I will stick to what was requested if possible, or more modern params.

const SITE_OWNER_EMAIL = "hello@agseo.pro";
const FROM_EMAIL = "notifications@agseo.pro";

setGlobalOptions({ maxInstances: 10, region: "europe-west3" });

// Initialize Resend
let resend: Resend;
const getResend = () => {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not defined in environment variables or secrets.");
    }
    resend = new Resend(key);
  }
  return resend;
};

// --- Newsletter Signup Function ---
export const sendNewsletterConfirmation = onDocumentCreated("newsletter_signups/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const data = snapshot.data();
  const userEmail = data.email;

  try {
    const mailer = getResend();
    await mailer.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: "Welcome to Our Newsletter! - AGSEO",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Welcome to AGSEO!</h2>
          <p>Hi,</p>
          <p>Thank you for subscribing to our newsletter. We're excited to share the latest AI-powered SEO insights and strategies with you.</p>
          <p>Stay tuned for updates!</p>
          <p>Best regards,<br/>The AGSEO Team</p>
        </div>
      `,
    });

    await mailer.emails.send({
      from: FROM_EMAIL,
      to: SITE_OWNER_EMAIL,
      subject: "New Newsletter Signup!",
      html: `<p>New subscriber: <strong>${userEmail}</strong></p>`,
    });
  } catch (error) {
    logger.error("Error sending newsletter emails:", error);
  }
});

// --- Contact Request Function ---
export const sendContactEmails = onDocumentCreated("contact_requests/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const data = snapshot.data();
  const userEmail = data.email;
  const phone = data.phone || "Not provided";
  const website = data.website || "Not provided";
  const message = data.message || "No message";

  try {
    const mailer = getResend();
    await mailer.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: "We received your message - AGSEO",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p>Hi,</p>
          <p>Thanks for reaching out! We've received your message regarding <strong>${website}</strong>.</p>
          <p>We'll get back to you shortly.</p>
          <p>AGSEO Team</p>
        </div>
      `,
    });

    await mailer.emails.send({
      from: FROM_EMAIL,
      to: SITE_OWNER_EMAIL,
      subject: "New Contact Request!",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h3>New Lead Details:</h3>
          <ul>
            <li><strong>Email:</strong> ${userEmail}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Website:</strong> ${website}</li>
          </ul>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });
  } catch (error) {
    logger.error("Error sending contact emails:", error);
  }
});

// --- Audit Request Function ---
export const sendAuditEmails = onDocumentCreated("audit_requests/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const data = snapshot.data();
  const userEmail = data.email;
  const url = data.url;
  const phone = data.phone || "Not provided";

  try {
    const mailer = getResend();
    await mailer.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: "Audit Request Received - AGSEO",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p>Hi,</p>
          <p>We've received your request for an AI-powered SEO audit for <strong>${url}</strong>.</p>
          <p>Our team is reviewing the details and we'll send you the results shortly.</p>
          <p>AGSEO Team</p>
        </div>
      `,
    });

    await mailer.emails.send({
      from: FROM_EMAIL,
      to: SITE_OWNER_EMAIL,
      subject: "New AI Audit Request!",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h3>New Audit Request Details:</h3>
          <ul>
            <li><strong>Website URL:</strong> ${url}</li>
            <li><strong>Contact Email:</strong> ${userEmail}</li>
            <li><strong>Phone:</strong> ${phone}</li>
          </ul>
        </div>
      `,
    });
  } catch (error) {
    logger.error("Error sending audit emails:", error);
  }
});
