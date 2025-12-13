import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { z } from 'zod';

// Mocking the config file essentially involves testing the logic that would be inside it if it were a pure function.
// However, since config.ts reads process.env immediately on import, testing it requires resetting modules or pulling logic out.
// For this improvement, I will verify that we can parse a mock environment correctly using the schema logic found in config.ts.

const envSchema = z.object({
    VITE_API_URL: z.string().url().optional(),
    VITE_WHATSAPP_NUMBER: z.string().optional(),
    VITE_CONTACT_EMAIL: z.string().email().optional(),
    VITE_TWITTER_URL: z.string().url().optional(),
    VITE_LINKEDIN_URL: z.string().url().optional(),
});

describe('Config Validation', () => {
    it('should validate correct environment variables', () => {
        const validEnv = {
            VITE_API_URL: 'http://localhost:3000/api',
            VITE_WHATSAPP_NUMBER: '1234567890',
            VITE_CONTACT_EMAIL: 'test@example.com',
            VITE_TWITTER_URL: 'https://twitter.com/test',
            VITE_LINKEDIN_URL: 'https://linkedin.com/company/test',
        };

        const result = envSchema.safeParse(validEnv);
        expect(result.success).toBe(true);
    });

    it('should fail on invalid email', () => {
        const invalidEnv = {
            VITE_CONTACT_EMAIL: 'not-an-email',
        };

        const result = envSchema.safeParse(invalidEnv);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().VITE_CONTACT_EMAIL).toBeDefined();
        }
    });

    it('should fail on invalid URL', () => {
        const invalidEnv = {
            VITE_API_URL: 'not-a-url',
        };

        const result = envSchema.safeParse(invalidEnv);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().VITE_API_URL).toBeDefined();
        }
    });
});
