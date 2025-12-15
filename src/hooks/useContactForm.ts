import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
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
    website2: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function useContactForm() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setError(null);
        setSuccess(false);

        try {
            await api.contact.submit({
                email: data.email,
                website: data.website || undefined,
                source: "audit",
                website2: data.website2 || undefined,
            });
            setSuccess(true);
            toast({
                title: "Audit Request Sent!",
                description: "We'll analyze your site and get back to you soon.",
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
        error
    };
}
