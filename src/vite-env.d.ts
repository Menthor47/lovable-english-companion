/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL?: string;
    readonly VITE_SUPABASE_ANON_KEY?: string;

    readonly VITE_API_URL?: string;
    readonly VITE_WHATSAPP_NUMBER?: string;
    readonly VITE_CONTACT_EMAIL?: string;
    readonly VITE_TWITTER_URL?: string;
    readonly VITE_LINKEDIN_URL?: string;

    readonly VITE_GTM_CONTAINER_ID?: string;
    readonly VITE_GA_MEASUREMENT_ID?: string;
    readonly VITE_AHREFS_ANALYTICS_KEY?: string;

    readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
