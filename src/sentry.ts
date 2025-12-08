import * as Sentry from "@sentry/react";
import { config } from "@/lib/config";

// Initialize Sentry only if DSN is present
if (config.sentry.dsn) {
    Sentry.init({
        dsn: config.sentry.dsn,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
        ],
        // Tracing
        tracesSampleRate: 1.0, // Capture 100% of the transactions
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, always sample the session when an error occurs.

        environment: import.meta.env.MODE,
    });

    if (import.meta.env.DEV) {
        console.log("Sentry initialized");
    }
}
