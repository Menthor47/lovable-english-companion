import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    website: z.preprocess(
        (value) => {
            if (typeof value !== 'string') return value;
            const trimmed = value.trim();
            if (!trimmed.length) return '';
            if (/^https?:\/\//i.test(trimmed)) return trimmed;
            return `https://${trimmed}`;
        },
        z.string().url('Please enter a valid URL (include https://)').optional().or(z.literal('')),
    ),
    message: z.string().min(10, 'Message must be at least 10 characters').optional(),
    website2: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function useContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: '',
            website: '',
            message: '', // Although unlikely to be used in the simple form, good to have in schema
            website2: '',
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsLoading(true);
        try {
            if (!data.email) {
                throw new Error('Missing email');
            }

            await api.contact.submit({
                email: data.email,
                website: data.website || undefined,
                message: data.message || undefined,
                website2: data.website2 || undefined,
            });

            toast({
                title: "Audit Request Received",
                description: "We'll analyze your site and send the report to your email shortly.",
            });

            form.reset();
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "Please try again later or contact us directly.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        isLoading,
        onSubmit: form.handleSubmit(onSubmit),
    };
}
