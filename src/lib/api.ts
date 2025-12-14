import { config } from './config';

interface ContactSubmission {
    email: string;
    website?: string;
    message?: string;
}

export const api = {
    contact: {
        submit: async (data: ContactSubmission) => {
            // Simulation of an API call
            // In a real scenario:
            // const response = await fetch(`${config.api.baseUrl}/contact`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data),
            // });
            // if (!response.ok) throw new Error('Submission failed');
            // return response.json();

            // Mock delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Simulate success
            return { success: true };
        },
    },
};
