import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    website: z.string().url('Please enter a valid URL (include https://)').optional().or(z.literal('')),
    message: z.string().min(10, 'Message must be at least 10 characters').optional(),
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
            message: '' // Although unlikely to be used in the simple form, good to have in schema
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsLoading(true);
        try {
            await api.contact.submit(data);

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
