import * as Sentry from "@sentry/react";
import { SITE_CONFIG } from "@/lib/constants";

// Initialize Sentry only if DSN is present
// Enable in production with reduced sampling, and in development with full sampling
if (SITE_CONFIG.sentry.dsn) {
    // Determine if we should enable full sampling (development) or reduced (production)
    const isDev = import.meta.env.MODE === 'development';
    const tracesSampleRate = isDev ? 1.0 : 0.1;
    const replaysSessionSampleRate = isDev ? 1.0 : 0.1;
    const replaysOnErrorSampleRate = 1.0; // Always sample on error

    Sentry.init({
        dsn: SITE_CONFIG.sentry.dsn,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: true,
                blockAllMedia: true,
            }),
        ],
        // Tracing - sample 10% in production, 100% in development
        tracesSampleRate,
        // Session Replay
        replaysSessionSampleRate,
        replaysOnErrorSampleRate,

        environment: import.meta.env.MODE,
        // Release tracking
        release: `agseo@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
        // Filter out common non-actionable events
        beforeSend(event) {
            // Filter out 404s from external links
            if (event.request?.url?.includes('chrome-extension')) {
                return null;
            }
            return event;
        },
    });

    console.log(`[AGSEO] Sentry initialized (${import.meta.env.MODE} mode, traces: ${tracesSampleRate * 100}%)`);
}
