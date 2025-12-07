import { config } from "./config";

export interface ContactData {
    email: string;
    website?: string;
    message?: string; // Optional if you want, but usually required
}

export const api = {
    contact: {
        submit: async (data: ContactData) => {
            // MOCK: Simulate network request
            console.log("Submitting contact data to:", `${config.api.baseUrl}/contact`);
            console.log("Data:", data);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Simulate success
            return { success: true };

            // Uncomment to simulate error
            // throw new Error("Failed to submit form. Please try again later.");
        },
    },
};
