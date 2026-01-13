import { supabase } from "./supabase";

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

            if (!supabase) {
                console.warn("[AGSEO] Supabase not configured. Using fallback simulation.");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return { success: true, message: "Message sent! (Demo Mode - Supabase API Missing)" };
            }

            try {
                const { data: responseData, error } = await supabase.functions.invoke('contact', {
                    body: {
                        ...data,
                        source: 'contact'
                    }
                });

                if (error) throw error;
                if (responseData && !responseData.success) {
                    throw new Error(responseData.error || "Submission failed");
                }

                return { success: true, message: "Message sent successfully!" };

            } catch (error) {
                console.error("Contact submission error:", error);

                // Friendly error message
                return {
                    success: false,
                    message: "Failed to send message. Please try again later."
                };
            }
        },
    },
};
