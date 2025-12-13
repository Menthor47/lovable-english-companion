import { supabase } from "./supabase";

export interface ContactData {
    email: string;
    website?: string;
}

export const api = {
    contact: {
        submit: async (data: ContactData) => {
            if (!supabase) throw new Error("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");

            const { error } = await supabase
                .from('contact_submissions')
                .insert([
                    {
                        email: data.email,
                        website: data.website || null,
                    }
                ]);

            if (error) {
                console.error("Supabase error:", error);
                throw new Error("Failed to submit form. Please try again later.");
            }

            return { success: true };
        },
    },
};
