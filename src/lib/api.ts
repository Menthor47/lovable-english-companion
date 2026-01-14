import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
            // Check for honeypot
            if (data.website2) {
                return { success: true, message: "Message sent!" }; // Silently fail for bots
            }

            // Fallback for missing config - check if API Key is present
            const isConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY;

            if (!isConfigured) {
                console.warn("[AGSEO] Firebase API Key missing. Using fallback simulation.");
                await new Promise((resolve) => setTimeout(resolve, 1500));
                return { success: true, message: "Message sent! (Demo Mode - Firebase Config Missing)" };
            }

            try {
                const collectionName = data.source === "audit" ? "audit_requests" : "contact_requests";

                // Add a small delay to simulate network for better UX
                await new Promise(resolve => setTimeout(resolve, 500));

                await addDoc(collection(db, collectionName), {
                    email: data.email,
                    phone: data.phone || null,
                    website: data.website || null,
                    message: data.message || null,
                    source: data.source || "contact",
                    timestamp: serverTimestamp()
                });

                return { success: true, message: "Message sent successfully!" };

            } catch (error: unknown) { // Changed 'any' to 'unknown'
                console.error("Firestore submission error:", error);

                // If it's a permission error, it might be due to rules or unauthenticated access
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
