import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState, useCallback, useRef } from "react";

const PHONE_ALLOWED_REGEX = /^[0-9+()\-.\s]+$/;

function isValidPhone(value: string): boolean {
    if (value.length < 7 || value.length > 50) return false;
    if (!PHONE_ALLOWED_REGEX.test(value)) return false;
    const digitCount = (value.match(/\d/g) ?? []).length;
    return digitCount >= 7;
}

const contactSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    phone: z.preprocess(
        (value: unknown) => {
            if (typeof value !== "string") return value;
            const trimmed = value.trim();
            if (!trimmed.length) return undefined;
            return trimmed;
        },
        z
            .string()
            .max(50, "Please enter a valid phone number")
            .refine((value) => isValidPhone(value), "Please enter a valid phone number")
            .optional(),
    ),
    website: z.preprocess(
        (value) => {
            if (typeof value !== "string") return value;
            const trimmed = value.trim();
            if (!trimmed.length) return "";
            if (/^https?:\/\//i.test(trimmed)) return trimmed;
            return `https://${trimmed}`;
        },
        z
            .string()
            .url("Please enter a valid URL (e.g., https://example.com)")
            .optional()
            .or(z.literal("")),
    ),
    message: z.preprocess(
        (value) => {
            if (typeof value !== "string") return value;
            return value.trim();
        },
        z.string().max(2000, "Message must be less than 2000 characters").optional(),
    ),
    website2: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormOptions {
    source?: "contact" | "audit";
}

/**
 * Rate limit state interface
 */
interface RateLimitState {
    isLimited: boolean;
    retryAfter: number; // seconds remaining
}

export function useContactForm(options: ContactFormOptions = {}) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rateLimit, setRateLimit] = useState<RateLimitState>({ isLimited: false, retryAfter: 0 });
    const { toast } = useToast();
    
    // Ref to track countdown timer
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    /**
     * Start countdown timer for rate limit
     */
    const startCountdown = useCallback((seconds: number) => {
        // Clear any existing countdown
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
        }

        setRateLimit({ isLimited: true, retryAfter: seconds });

        countdownRef.current = setInterval(() => {
            setRateLimit(prev => {
                const newRetryAfter = prev.retryAfter - 1;
                if (newRetryAfter <= 0) {
                    if (countdownRef.current) {
                        clearInterval(countdownRef.current);
                        countdownRef.current = null;
                    }
                    return { isLimited: false, retryAfter: 0 };
                }
                return { isLimited: true, retryAfter: newRetryAfter };
            });
        }, 1000);
    }, []);

    /**
     * Handle rate limit response from API
     */
    const handleRateLimit = useCallback((retryAfter: number) => {
        if (retryAfter > 0) {
            startCountdown(retryAfter);
            toast({
                variant: "destructive",
                title: "Too Many Requests",
                description: `Please wait ${retryAfter} seconds before trying again.`,
                duration: retryAfter * 1000,
            });
        }
    }, [startCountdown, toast]);

    const onSubmit = async (data: ContactFormData) => {
        // Check if rate limited
        if (rateLimit.isLimited) {
            const message = `Please wait ${rateLimit.retryAfter} seconds before submitting again.`;
            setError(message);
            toast({
                variant: "destructive",
                title: "Rate Limited",
                description: message,
            });
            return { success: false };
        }

        setError(null);
        setSuccess(false);

        try {
            const result = await api.contact.submit({
                email: data.email,
                phone: data.phone || undefined,
                website: data.website || undefined,
                source: options.source || "contact",
                website2: data.website2 || undefined,
            });

            if (!result.success) {
                // Check for rate limit error (429)
                if (result.error?.includes("Too many requests") || result.error?.includes("rate")) {
                    // Extract retry-after from error message if present
                    const match = result.error?.match(/(\d+)\s*second/);
                    const retryAfter = match ? parseInt(match[1], 10) : 60;
                    handleRateLimit(retryAfter);
                }
                throw new Error(result.message);
            }

            setSuccess(true);
            toast({
                title: options.source === "audit" ? "Audit Request Sent!" : "Message Sent!",
                description: options.source === "audit"
                    ? "We'll analyze your site and get back to you soon."
                    : "Thanks for reaching out! We'll get back to you shortly.",
            });
            reset();
            return { success: true };
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message);
            toast({
                variant: "destructive",
                title: "Error",
                description: message,
            });
            return { success: false };
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        success,
        error,
        rateLimit,
        isRateLimited: rateLimit.isLimited,
    };
}
