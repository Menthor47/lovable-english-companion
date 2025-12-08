import { config } from "./config";

// Declare global dataLayer for TypeScript
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

/**
 * Initialize Google Analytics 4
 * Checks if window exists (SSR safety) and if ID is present
 */
export const initAnalytics = () => {
    if (typeof window === "undefined") return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Define gtag function if it doesn't exist
    if (!window.gtag) {
        window.gtag = function (...args: any[]) {
            window.dataLayer.push(args);
        };
    }

    // Get Measurement ID from config (or use placeholder if not set)
    // In a real app, this would come from env vars in config.ts
    const GA_MEASUREMENT_ID = "G-MB50YLY7YQ";

    // Basic configuration
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: true, // Auto-track page views
        anonymize_ip: true,   // Privacy
    });

    // Inject the script tag dynamically if it doesn't exist
    const scriptId = "google-analytics-script";
    if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);
    }
};

/**
 * Track custom events
 * @param eventName Name of the event (e.g., 'form_submit', 'click_cta')
 * @param params Additional parameters (e.g., { value: 100, currency: 'USD' })
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, params);
    }
};
