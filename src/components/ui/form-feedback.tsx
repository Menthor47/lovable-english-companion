import { Loader2 } from "lucide-react";

interface FormFeedbackProps {
    isLoading: boolean;
    error?: string | null;
    success?: boolean;
}

export function FormFeedback({
    isLoading,
    error,
    success
}: FormFeedbackProps) {
    if (isLoading) {
        return (
            <div className="flex items-center gap-2 text-primary text-sm mt-2 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing your request...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mt-4">
                {error}
            </div>
        );
    }

    if (success) {
        return (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm mt-4">
                Message sent successfully! We'll be in touch soon.
            </div>
        );
    }

    return null;
}
