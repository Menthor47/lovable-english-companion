

// Declare global dataLayer for TypeScript
declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

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

/**
 * Initialize Analytics
 * Ensures dataLayer and gtag are defined.
 * Actual script loading and consent management is handled by GTM and Silktide in index.html.
 */
export const initAnalytics = () => {
    if (typeof window === "undefined") return;
    ensureDataLayer();
    ensureGtag();
};

/**
 * Track custom events
 * @param eventName Name of the event (e.g., 'form_submit', 'click_cta')
 * @param params Additional parameters (e.g., { value: 100, currency: 'USD' })
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    // Push to dataLayer - GTM will handle consent checks
    ensureDataLayer().push({ event: eventName, ...(params ?? {}) });
};

export const trackPageView = (pagePath: string) => {
    if (typeof window === "undefined") return;
    // Push to dataLayer - GTM will handle consent checks
    ensureDataLayer().push({ event: "page_view", page_path: pagePath });
};
