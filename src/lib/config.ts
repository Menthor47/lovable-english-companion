import { SITE_CONFIG } from "@/lib/constants";

/**
 * Backward-compatible configuration adapter.
 *
 * Prefer importing SITE_CONFIG directly from '@/lib/constants' for new code.
 */
export const config = {
    api: {
        baseUrl: "/api",
    },
    whatsapp: {
        number: SITE_CONFIG.whatsapp.number,
        message: SITE_CONFIG.whatsapp.message,
    },
    contact: {
        email: SITE_CONFIG.contact.email,
        phone: SITE_CONFIG.contact.phone,
        address: {
            street: SITE_CONFIG.contact.address.street,
            city: SITE_CONFIG.contact.address.city,
            country: SITE_CONFIG.contact.address.country,
        },
        siteUrl: SITE_CONFIG.baseUrl,
    },
    social: {
        twitter: SITE_CONFIG.social.twitter,
        linkedin: SITE_CONFIG.social.linkedin,
    },
    sentry: {
        dsn: SITE_CONFIG.sentry.dsn,
    },
    analytics: {
        gtmContainerId: SITE_CONFIG.analytics.gtmContainerId,
        gaMeasurementId: SITE_CONFIG.analytics.gaMeasurementId,
        ahrefsAnalyticsKey: SITE_CONFIG.analytics.ahrefsAnalyticsKey,
    },
} as const;
