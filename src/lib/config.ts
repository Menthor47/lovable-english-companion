export const config = {
    api: {
        baseUrl:
            import.meta.env.VITE_API_URL ||
            (import.meta.env.VITE_SUPABASE_URL
                ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`
                : "/api"),
    },
    whatsapp: {
        number: import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890',
        message: "Hello AGSEO, I'm interested in your services.",
    },
    contact: {
        email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@agseo.pro',
        phone: import.meta.env.VITE_PHONE_NUMBER || '+15550123456',
        address: {
            street: import.meta.env.VITE_ADDRESS_STREET || "123 SEO Street",
            city: import.meta.env.VITE_ADDRESS_CITY || "Tech City",
            country: import.meta.env.VITE_ADDRESS_COUNTRY || "US"
        },
        siteUrl: import.meta.env.VITE_SITE_URL || "https://agseo.pro",
    },
    social: {
        twitter: "https://twitter.com/agseo",
        linkedin: "https://linkedin.com/company/agseo",
    },
    sentry: {
        dsn: import.meta.env.VITE_SENTRY_DSN || "",
    },
    analytics: {
        gtmContainerId: import.meta.env.VITE_GTM_CONTAINER_ID || "",
        gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "",
        ahrefsAnalyticsKey: import.meta.env.VITE_AHREFS_ANALYTICS_KEY || "",
    }
} as const;
