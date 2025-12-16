import { config } from "./config";

type LeadSource = "contact" | "audit";

const SUPABASE_EDGE_FUNCTION_HOST_MARKER = ".functions.supabase.co";
const SUPABASE_EDGE_FUNCTION_PATH_MARKER = "/functions/v1/";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function shouldAttachSupabaseAnonHeaders(endpoint: string): boolean {
    return (
        endpoint.includes(SUPABASE_EDGE_FUNCTION_HOST_MARKER) ||
        endpoint.includes(SUPABASE_EDGE_FUNCTION_PATH_MARKER)
    );
}

interface ContactSubmission {
    email: string;
    website?: string;
    phone?: string;
    message?: string;
    source?: LeadSource;
    website2?: string;
}

type ContactSubmissionResult = {
    success: boolean;
    confirmationSent?: boolean;
    error?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function getString(value: unknown): string | null {
    return typeof value === "string" ? value : null;
}

function getErrorFromBody(body: unknown): string | null {
    if (!isRecord(body)) return null;
    return getString(body.error);
}

export const api = {
    contact: {
        submit: async (data: ContactSubmission): Promise<ContactSubmissionResult> => {
            // Simulation of an API call
            // In a real scenario:
            // const response = await fetch(`${config.api.baseUrl}/contact`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data),
            // });
            // if (!response.ok) throw new Error('Submission failed');
            // return response.json();

            const endpoint = `${config.api.baseUrl}/contact`;

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (
                shouldAttachSupabaseAnonHeaders(endpoint) &&
                typeof supabaseAnonKey === "string" &&
                supabaseAnonKey.trim().length
            ) {
                headers.apikey = supabaseAnonKey;
                headers.Authorization = `Bearer ${supabaseAnonKey}`;
            }

            let response: Response;
            try {
                response = await fetch(endpoint, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(data),
                });
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "Network error";
                throw new Error(message);
            }

            let body: unknown = null;
            try {
                body = await response.json();
            } catch {
                body = null;
            }

            if (!response.ok) {
                const apiError = getErrorFromBody(body);
                throw new Error(apiError ?? `Submission failed (${response.status})`);
            }

            if (isRecord(body) && body.success === false) {
                throw new Error(getErrorFromBody(body) ?? "Submission failed");
            }

            if (isRecord(body)) {
                const confirmationSent =
                    typeof body.confirmationSent === "boolean" ? body.confirmationSent : undefined;
                return { success: true, confirmationSent };
            }

            return { success: true };
        },
    },
};
