/**
 * AGSEO API Client
 * 
 * This module handles all API communications using Firebase.
 * - Contact form submissions are stored in Firestore
 * - Email notifications are sent via Firebase Cloud Functions (or Resend Extension)
 * 
 * @example
 * import { api } from '@/lib/api';
 * await api.contact.submit({ email: 'test@example.com' });
 */

import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, Firestore } from "firebase/firestore";

/**
 * Rate limit configuration from environment
 */
const RATE_LIMIT_CONFIG = {
    maxRequests: parseInt(import.meta.env.VITE_RATE_LIMIT_MAX || '8', 10),
    windowSeconds: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW_SECONDS || '600', 10),
};

/**
 * Check rate limit before making a request
 * Calls the Firebase Cloud Function for server-side rate limiting
 */
async function checkRateLimit(): Promise<{ allowed: boolean; retryAfter?: number }> {
    // Skip rate limiting in demo mode or if not configured
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
        return { allowed: true };
    }

    try {
        // Try to call the rate limit Cloud Function
        // Note: You'll need to deploy the checkRateLimit function and configure its URL
        const rateLimitUrl = import.meta.env.VITE_RATE_LIMIT_FUNCTION_URL;
        
        if (rateLimitUrl) {
            const response = await fetch(rateLimitUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.status === 429) {
                const data = await response.json();
                return { allowed: false, retryAfter: data.retryAfter };
            }
        }
        
        // If no rate limit URL configured, allow request
        return { allowed: true };
    } catch (error) {
        // On rate limit check failure, fail closed in production for security
        console.error("[AGSEO] Rate limit check failed:", error);
        if (import.meta.env.MODE === 'production') {
            // In production, deny the request to prevent abuse
            return { allowed: false, retryAfter: 60 };
        }
        // In development, allow the request but warn
        console.warn("[AGSEO] Rate limit check failed, allowing request (dev mode)");
        return { allowed: true };
    }
}

interface ContactSubmission {
    email: string;
    website?: string;
    phone?: string;
    message?: string;
    source?: string;
    // Honeypot field (should be empty)
    website2?: string;
}

type ContactSubmissionResult = {
    success: boolean;
    message?: string;
    error?: string;
};

export const api = {
    contact: {
        submit: async (data: ContactSubmission): Promise<ContactSubmissionResult> => {
            // Check for honeypot (bot protection)
            if (data.website2) {
                return { success: true, message: "Message sent!" };
            }

            // Check rate limit first
            const rateCheck = await checkRateLimit();
            if (!rateCheck.allowed) {
                return { 
                    success: false, 
                    message: `Too many requests. Please wait ${rateCheck.retryAfter} seconds before trying again.`,
                    error: `Too many requests - retry after ${rateCheck.retryAfter} second`
                };
            }

            // Check if Firebase is configured
            const isConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY;

            if (!isConfigured) {
                console.warn("[AGSEO] Firebase not configured. Using demo mode.");
                await new Promise((resolve) => setTimeout(resolve, 1500));
                return { 
                    success: true, 
                    message: "Message sent! (Demo Mode - Firebase Not Configured)"
                };
            }

            // Check if Firestore is initialized
            if (!db) {
                console.error("[AGSEO] Firestore is not initialized.");
                return { 
                    success: false, 
                    message: "Database not available. Please try again later."
                };
            }

            try {
                const collectionName = data.source === "audit" ? "audit_requests" : "contact_requests";

                // Add a small delay to simulate network for better UX
                await new Promise(resolve => setTimeout(resolve, 500));

                await addDoc(collection(db as Firestore, collectionName), {
                    email: data.email,
                    phone: data.phone || null,
                    website: data.website || null,
                    message: data.message || null,
                    source: data.source || "contact",
                    timestamp: serverTimestamp(),
                    // Email status - will be updated by Cloud Function
                    emailSent: false,
                    emailSentAt: null,
                });

                return { 
                    success: true, 
                    message: "Message sent successfully! We'll get back to you shortly."
                };

            } catch (error: unknown) {
                console.error("[AGSEO] Firestore submission error:", error);

                // If it's a permission error
                if (error instanceof Error && (error as { code?: string }).code === 'permission-denied') {
                    return {
                        success: false,
                        message: "Permission denied. Please check Firestore rules."
                    };
                }

                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Failed to send message. Please try again later."
                };
            }
        },
    },
};
