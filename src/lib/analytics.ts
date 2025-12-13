import { config } from "./config";

// Declare global dataLayer for TypeScript
declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

const COOKIE_CONSENT_KEY = "agseo_cookie_consent";
const CONSENT_EVENT_NAME = "agseo:cookie-consent";

type CookieConsentState = {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
    timestamp: number;
};

let hasLoadedGtm = false;
let hasLoadedGa = false;
let hasLoadedAhrefs = false;

function ensureDataLayer(): unknown[] {
    if (typeof window === "undefined") return [];
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
}

function ensureGtag(): (...args: unknown[]) => void {
    if (typeof window === "undefined") return () => undefined;
    if (!window.gtag) {
        window.gtag = (...args: unknown[]) => {
            ensureDataLayer().push(args);
        };
    }
    return window.gtag;
}

function parseStoredConsent(value: string): CookieConsentState | null {
    try {
        const parsed: unknown = JSON.parse(value);
        if (typeof parsed !== "object" || parsed === null) return null;

        const obj = parsed as Record<string, unknown>;
        const necessary = obj["necessary"];
        const analytics = obj["analytics"];
        const marketing = obj["marketing"];
        const preferences = obj["preferences"];
        const timestamp = obj["timestamp"];

        if (
            typeof necessary !== "boolean" ||
            typeof analytics !== "boolean" ||
            typeof marketing !== "boolean" ||
            typeof preferences !== "boolean" ||
            typeof timestamp !== "number"
        ) {
            return null;
        }

        return { necessary, analytics, marketing, preferences, timestamp };
    } catch {
        return null;
    }
}

function readStoredConsent(): CookieConsentState | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return parseStoredConsent(raw);
}

function loadScriptOnce(id: string, src: string): void {
    if (typeof document === "undefined") return;
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
}

function loadGtm(containerId: string): void {
    if (hasLoadedGtm) return;
    if (!containerId) return;

    ensureDataLayer().push({
        "gtm.start": Date.now(),
        event: "gtm.js",
    });

    loadScriptOnce("google-tag-manager", `https://www.googletagmanager.com/gtm.js?id=${containerId}`);
    hasLoadedGtm = true;
}

function loadGa(measurementId: string): void {
    if (hasLoadedGa) return;
    if (!measurementId) return;

    loadScriptOnce("google-analytics-script", `https://www.googletagmanager.com/gtag/js?id=${measurementId}`);

    const gtag = ensureGtag();
    gtag("js", new Date());
    gtag("config", measurementId, {
        send_page_view: false,
        anonymize_ip: true,
    });

    hasLoadedGa = true;
}

function loadAhrefs(analyticsKey: string): void {
    if (hasLoadedAhrefs) return;
    if (!analyticsKey) return;
    if (typeof document === "undefined") return;
    if (document.getElementById("ahrefs-analytics-script")) return;

    const script = document.createElement("script");
    script.id = "ahrefs-analytics-script";
    script.async = true;
    script.src = "https://analytics.ahrefs.com/analytics.js";
    script.setAttribute("data-key", analyticsKey);
    document.head.appendChild(script);

    hasLoadedAhrefs = true;
}

function updateConsentMode(consent: CookieConsentState): void {
    const gtag = ensureGtag();
    gtag("consent", "update", {
        ad_storage: consent.marketing ? "granted" : "denied",
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_user_data: consent.marketing ? "granted" : "denied",
        ad_personalization: consent.marketing ? "granted" : "denied",
        functionality_storage: consent.preferences ? "granted" : "denied",
        personalization_storage: consent.preferences ? "granted" : "denied",
        security_storage: "granted",
    });
}

function syncTrackingToConsent(consent: CookieConsentState | null): void {
    if (!consent) return;

    updateConsentMode(consent);

    const gtmContainerId = config.analytics.gtmContainerId;
    const shouldLoadGtm = Boolean(gtmContainerId) && (consent.analytics || consent.marketing);
    if (shouldLoadGtm) loadGtm(gtmContainerId ?? "");

    const gaMeasurementId = config.analytics.gaMeasurementId;
    const shouldLoadGa = Boolean(gaMeasurementId) && consent.analytics && !gtmContainerId;
    if (shouldLoadGa) loadGa(gaMeasurementId ?? "");

    const ahrefsAnalyticsKey = config.analytics.ahrefsAnalyticsKey;
    const shouldLoadAhrefs = Boolean(ahrefsAnalyticsKey) && consent.analytics;
    if (shouldLoadAhrefs) loadAhrefs(ahrefsAnalyticsKey ?? "");
}

function hasAnalyticsConsent(): boolean {
    return Boolean(readStoredConsent()?.analytics);
}

/**
 * Initialize Google Analytics 4
 * Checks if window exists (SSR safety) and if ID is present
 */
export const initAnalytics = () => {
    if (typeof window === "undefined") return;

    // Initialize dataLayer
    ensureDataLayer();

    // Define gtag function if it doesn't exist
    ensureGtag();

    // Get Measurement ID from config (or use placeholder if not set)
    // In a real app, this would come from env vars in config.ts
    syncTrackingToConsent(readStoredConsent());

    window.addEventListener(CONSENT_EVENT_NAME, (event: Event) => {
        const customEvent = event as CustomEvent<CookieConsentState | undefined>;
        syncTrackingToConsent(customEvent.detail ?? readStoredConsent());
        trackPageView(window.location.pathname + window.location.search);
    });
};

/**
 * Track custom events
 * @param eventName Name of the event (e.g., 'form_submit', 'click_cta')
 * @param params Additional parameters (e.g., { value: 100, currency: 'USD' })
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    if (!hasAnalyticsConsent()) return;

    if (hasLoadedGtm) {
        ensureDataLayer().push({ event: eventName, ...(params ?? {}) });
        return;
    }

    if (hasLoadedGa) {
        ensureGtag()("event", eventName, params ?? {});
    }
};

export const trackPageView = (pagePath: string) => {
    if (typeof window === "undefined") return;
    if (!hasAnalyticsConsent()) return;

    if (hasLoadedGtm) {
        ensureDataLayer().push({ event: "page_view", page_path: pagePath });
        return;
    }

    if (hasLoadedGa) {
        ensureGtag()("event", "page_view", { page_path: pagePath });
    }
};
