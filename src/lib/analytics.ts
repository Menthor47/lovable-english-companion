

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

/**
 * Track CTA button clicks
 * @param ctaName Unique name for the CTA (e.g., 'hero_cta', 'pricing_cta')
 * @param location Where the CTA is located (e.g., 'header', 'hero', 'footer')
 */
export const trackCTAClick = (ctaName: string, location: string) => {
    trackEvent('cta_click', {
        cta_name: ctaName,
        cta_location: location,
    });
};

/**
 * Track form submissions
 * @param formName Name of the form (e.g., 'contact', 'newsletter', 'audit')
 * @param success Whether the form submission was successful
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
    trackEvent('form_submit', {
        form_name: formName,
        form_success: success,
    });
};

/**
 * Track form errors
 * @param formName Name of the form
 * @param errorMessage The error message
 */
export const trackFormError = (formName: string, errorMessage: string) => {
    trackEvent('form_error', {
        form_name: formName,
        error_message: errorMessage,
    });
};

/**
 * Track scroll depth
 * @param depth The scroll depth percentage (25, 50, 75, 100)
 */
export const trackScrollDepth = (depth: number) => {
    trackEvent('scroll_depth', {
        scroll_depth: depth,
    });
};

/**
 * Track outbound link clicks
 * @param url The destination URL
 */
export const trackOutboundClick = (url: string) => {
    trackEvent('outbound_click', {
        outbound_url: url,
    });
};
