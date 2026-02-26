/**
 * AGSEO Site Constants
 * 
 * Single source of truth for site-wide configuration values.
 * This file consolidates configuration from multiple sources:
 * - Environment variables
 * - Site metadata
 * - Feature flags
 * 
 * @example
 * import { SITE_CONFIG } from '@/lib/constants';
 * console.log(SITE_CONFIG.name); // "AGSEO"
 */

export const SITE_CONFIG = {
    // Base URL - used for canonical URLs, sitemaps, etc.
    baseUrl: import.meta.env.VITE_SITE_URL || 'https://agseo.pro',
    
    // Site name
    name: 'AGSEO',
    alternateName: 'AG SEO',
    
    // Contact information
    contact: {
        email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@agseo.pro',
        phone: import.meta.env.VITE_PHONE_NUMBER || '',
        address: {
            street: import.meta.env.VITE_ADDRESS_STREET || '',
            city: import.meta.env.VITE_ADDRESS_CITY || '',
            country: import.meta.env.VITE_ADDRESS_COUNTRY || 'USA',
        },
    },
    
    // WhatsApp configuration
    whatsapp: {
        number: import.meta.env.VITE_WHATSAPP_NUMBER || '',
        message: 'Hello AGSEO, I\'m interested in your services.',
    },
    
    // Social media links
    social: {
        twitter: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/agseo',
        linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/company/agseo',
    },
    
    // API Configuration (Firebase-only architecture)
    api: {
        baseUrl: '/api',
    },
    
    // Analytics & Monitoring
    analytics: {
        gtmContainerId: import.meta.env.VITE_GTM_CONTAINER_ID || '',
        gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
        ahrefsAnalyticsKey: import.meta.env.VITE_AHREFS_ANALYTICS_KEY || '',
    },
    
    // Error monitoring
    sentry: {
        dsn: import.meta.env.VITE_SENTRY_DSN || '',
    },
    
    // Feature flags
    features: {
        // Enable/disable features based on environment
        enableAnalytics: !!import.meta.env.VITE_GTM_CONTAINER_ID,
        enableSentry: !!import.meta.env.VITE_SENTRY_DSN,
        enableFirebase: !!import.meta.env.VITE_FIREBASE_API_KEY,
        isProduction: import.meta.env.MODE === 'production',
        isDevelopment: import.meta.env.MODE === 'development',
    },
} as const;

/**
 * Default SEO meta tags
 * Used as fallback when page-specific meta tags are not provided
 */
export const DEFAULT_SEO = {
    title: 'AGSEO - AI-Powered SEO Agency | Future of Web Ranking',
    description: 'AGSEO combines AI with proven SEO strategies to multiply your visibility and conversions. Get measurable results with our data-driven methodology.',
    keywords: 'SEO agency, AI SEO, artificial intelligence, web ranking, local SEO, e-commerce SEO, digital marketing',
    image: '/og-image.png',
    siteName: 'AGSEO',
    twitterHandle: '@AGSEO',
} as const;

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES = ['en', 'ro'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Default language
 */
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/**
 * Pagination defaults
 */
export const PAGINATION = {
    defaultPageSize: 10,
    maxPageSize: 100,
} as const;

/**
 * API Rate limiting
 */
export const RATE_LIMITS = {
    contactForm: {
        maxRequests: parseInt(import.meta.env.VITE_RATE_LIMIT_MAX || '8', 10),
        windowSeconds: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW_SECONDS || '600', 10),
    },
} as const;
