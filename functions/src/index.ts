import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { Resend } from "resend";

initializeApp();
const db = getFirestore();

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

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
};

function escapeHtml(value: unknown): string {
  const normalized = typeof value === "string" ? value : String(value ?? "");
  return normalized.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

async function markEmailProcessed(
  collectionName: string,
  docId: string,
  status: { ok: boolean; reason?: string }
): Promise<boolean> {
  const ref = db.collection(collectionName).doc(docId);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return false;

    const data = snap.data() ?? {};
    if (data.emailProcessedAt) {
      logger.info("Email already processed, skipping duplicate execution", { collectionName, docId });
      return false;
    }

    tx.update(ref, {
      emailProcessedAt: FieldValue.serverTimestamp(),
      emailSent: status.ok,
      emailSentAt: status.ok ? FieldValue.serverTimestamp() : null,
      emailError: status.ok ? null : (status.reason ?? "unknown_error"),
    });
    return true;
  });
}

// --- Newsletter Signup Function ---
export const sendNewsletterConfirmation = onDocumentCreated("newsletter_signups/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;
  const docId = event.params.docId;

  const data = snapshot.data();
  const userEmail = data.email;

  const shouldProcess = await markEmailProcessed("newsletter_signups", docId, { ok: false, reason: "processing" });
  if (!shouldProcess) return;

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
      html: `<p>New subscriber: <strong>${escapeHtml(userEmail)}</strong></p>`,
    });

    await db.collection("newsletter_signups").doc(docId).update({
      emailSent: true,
      emailSentAt: FieldValue.serverTimestamp(),
      emailError: null,
    });
  } catch (error) {
    logger.error("Error sending newsletter emails:", error);
    await db.collection("newsletter_signups").doc(docId).update({
      emailSent: false,
      emailError: error instanceof Error ? error.message : "unknown_error",
    });
  }
});

// --- Contact Request Function ---
export const sendContactEmails = onDocumentCreated("contact_requests/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;
  const docId = event.params.docId;

  const data = snapshot.data();
  // Store RAW values to Firestore (preserve original data)
  const userEmail = data.email;
  const phone = data.phone || "Not provided";
  const website = data.website || "Not provided";
  const message = data.message || "No message";

  const shouldProcess = await markEmailProcessed("contact_requests", docId, { ok: false, reason: "processing" });
  if (!shouldProcess) return;

  try {
    const mailer = getResend();
    await mailer.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "We received your message - AGSEO",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p>Hi,</p>
          <p>Thanks for reaching out! We've received your message regarding <strong>${escapeHtml(website)}</strong>.</p>
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
            <li><strong>Email:</strong> ${escapeHtml(userEmail)}</li>
            <li><strong>Phone:</strong> ${escapeHtml(phone)}</li>
            <li><strong>Website:</strong> ${escapeHtml(website)}</li>
          </ul>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message)}</p>
        </div>
      `,
    });

    await db.collection("contact_requests").doc(docId).update({
      emailSent: true,
      emailSentAt: FieldValue.serverTimestamp(),
      emailError: null,
    });
  } catch (error) {
    logger.error("Error sending contact emails:", error);
    await db.collection("contact_requests").doc(docId).update({
      emailSent: false,
      emailError: error instanceof Error ? error.message : "unknown_error",
    });
  }
});

// --- Audit Request Function ---
export const sendAuditEmails = onDocumentCreated("audit_requests/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;
  const docId = event.params.docId;

  const data = snapshot.data();
  // Store RAW values to Firestore (preserve original data)
  const userEmail = data.email;
  const website = data.website || data.url || "Not provided";
  const phone = data.phone || "Not provided";

  const shouldProcess = await markEmailProcessed("audit_requests", docId, { ok: false, reason: "processing" });
  if (!shouldProcess) return;

  try {
    const mailer = getResend();
    await mailer.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Audit Request Received - AGSEO",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p>Hi,</p>
          <p>We've received your request for an AI-powered SEO audit for <strong>${escapeHtml(website)}</strong>.</p>
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
            <li><strong>Website URL:</strong> ${escapeHtml(website)}</li>
            <li><strong>Contact Email:</strong> ${escapeHtml(userEmail)}</li>
            <li><strong>Phone:</strong> ${escapeHtml(phone)}</li>
          </ul>
        </div>
      `,
    });

    await db.collection("audit_requests").doc(docId).update({
      emailSent: true,
      emailSentAt: FieldValue.serverTimestamp(),
      emailError: null,
    });
  } catch (error) {
    logger.error("Error sending audit emails:", error);
    await db.collection("audit_requests").doc(docId).update({
      emailSent: false,
      emailError: error instanceof Error ? error.message : "unknown_error",
    });
  }
});

// --- Rate Limiting HTTP Function ---
// Simple Firestore-based rate limiter per IP address

interface RateLimitConfig {
  maxRequests: number;
  windowSeconds: number;
}

const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 8,
  windowSeconds: 600, // 10 minutes
};

export const checkRateLimit = onRequest({ cors: true }, async (req, res) => {
  // Extract IP from request (Express-like object in Firebase Functions)
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = (req as { ip?: string }).ip || 
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0]?.trim()) || 
    "unknown";
  const now = Date.now();
  const windowMs = DEFAULT_RATE_LIMIT.windowSeconds * 1000;
  
  try {
    // Get rate limit document
    const rateLimitRef = db.collection("rate_limits").doc(ip);
    const doc = await rateLimitRef.get();
    
    let count = 1;
    let resetAt = now + windowMs;
    
    if (doc.exists) {
      const data = doc.data();
      if (data && data.resetAt > now) {
        // Within window, increment count
        count = (data.count || 0) + 1;
        resetAt = data.resetAt;
      }
    }
    
    // Check if rate limited
    if (count > DEFAULT_RATE_LIMIT.maxRequests) {
      const retryAfter = Math.ceil((resetAt - now) / 1000);
      res.set("Retry-After", String(retryAfter));
      res.status(429).json({
        success: false,
        error: "Too many requests",
        retryAfter,
      });
      return;
    }
    
    // Clean up stale rate limit documents (older than 2 windows)
    // This prevents accumulation of stale documents in Firestore
    const cleanupThreshold = now - (windowMs * 2); // Clean entries older than 2 windows
    const oldDocs = await db.collection("rate_limits")
      .where("resetAt", "<", cleanupThreshold)
      .get();
    
    if (!oldDocs.empty) {
      const batch = db.batch();
      oldDocs.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      logger.info(`Cleaned up ${oldDocs.size} stale rate limit documents`);
    }
    
    // Update rate limit document
    await rateLimitRef.set({
      count,
      resetAt,
      lastRequest: FieldValue.serverTimestamp(),
    }, { merge: true });
    
    res.status(200).json({
      success: true,
      remaining: Math.max(0, DEFAULT_RATE_LIMIT.maxRequests - count),
      resetIn: Math.ceil((resetAt - now) / 1000),
    });
  } catch (error) {
    logger.error("Rate limit check error:", error);
    // On error, fail closed for security - deny the request
    const retryAfter = 60;
    res.set("Retry-After", String(retryAfter));
    res.status(500).json({ 
      success: false, 
      error: "Rate limit unavailable",
      retryAfter,
    });
  }
});
