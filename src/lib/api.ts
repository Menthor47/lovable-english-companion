import { supabase } from "./supabase";

export interface ContactData {
    email: string;
    website?: string;
}

export const api = {
    contact: {
        submit: async (data: ContactData) => {
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
