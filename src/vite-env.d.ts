/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SITE_URL?: string;

    readonly VITE_WHATSAPP_NUMBER?: string;
    readonly VITE_CONTACT_EMAIL?: string;
    readonly VITE_PHONE_NUMBER?: string;
    readonly VITE_ADDRESS_STREET?: string;
    readonly VITE_ADDRESS_CITY?: string;
    readonly VITE_ADDRESS_COUNTRY?: string;

    readonly VITE_FIREBASE_API_KEY?: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
    readonly VITE_FIREBASE_PROJECT_ID?: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
    readonly VITE_FIREBASE_APP_ID?: string;
    readonly VITE_FIREBASE_MEASUREMENT_ID?: string;

    readonly VITE_TWITTER_URL?: string;
    readonly VITE_LINKEDIN_URL?: string;

    readonly VITE_GTM_CONTAINER_ID?: string;
    readonly VITE_GA_MEASUREMENT_ID?: string;
    readonly VITE_AHREFS_ANALYTICS_KEY?: string;
    readonly VITE_APP_VERSION?: string;

    readonly VITE_RATE_LIMIT_MAX?: string;
    readonly VITE_RATE_LIMIT_WINDOW_SECONDS?: string;
    readonly VITE_RATE_LIMIT_FUNCTION_URL?: string;

    readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
