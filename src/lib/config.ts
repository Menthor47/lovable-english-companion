import { z } from "zod";

const envSchema = z.object({
    VITE_API_URL: z.string().url().optional(),
    VITE_WHATSAPP_NUMBER: z.string().optional(),
    VITE_CONTACT_EMAIL: z.string().email().optional(),
    VITE_TWITTER_URL: z.string().url().optional(),
    VITE_LINKEDIN_URL: z.string().url().optional(),
    VITE_GTM_CONTAINER_ID: z.string().optional(),
    VITE_GA_MEASUREMENT_ID: z.string().optional(),
    VITE_AHREFS_ANALYTICS_KEY: z.string().optional(),
    VITE_SENTRY_DSN: z.string().optional(),
});

const processEnv = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER,
    VITE_CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL,
    VITE_TWITTER_URL: import.meta.env.VITE_TWITTER_URL,
    VITE_LINKEDIN_URL: import.meta.env.VITE_LINKEDIN_URL,
    VITE_GTM_CONTAINER_ID: import.meta.env.VITE_GTM_CONTAINER_ID,
    VITE_GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
    VITE_AHREFS_ANALYTICS_KEY: import.meta.env.VITE_AHREFS_ANALYTICS_KEY,
    VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
};

// Validate env vars
const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
    console.warn("Invalid environment variables:", parsed.error.format());
}

export const config = {
    api: {
        baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    },
    whatsapp: {
        number: import.meta.env.VITE_WHATSAPP_NUMBER || "447455401962",
        message: "Hello, I'm interested in your SEO services",
    },
    contact: {
        email: import.meta.env.VITE_CONTACT_EMAIL || "hello@agseo.pro",
    },
    social: {
        twitter: import.meta.env.VITE_TWITTER_URL || "https://twitter.com/agseo",
        linkedin: import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com/company/agseo",
    },
    analytics: {
        gtmContainerId: import.meta.env.VITE_GTM_CONTAINER_ID,
        gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
        ahrefsAnalyticsKey: import.meta.env.VITE_AHREFS_ANALYTICS_KEY,
    },
    sentry: {
        dsn: import.meta.env.VITE_SENTRY_DSN,
    },
} as const;
