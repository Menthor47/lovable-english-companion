import React from "react";
import * as Sentry from "@sentry/react";
import { Button } from "@/components/ui/button";

interface Props {
    children: React.ReactNode;
}

function ErrorFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="text-center max-w-md">
                <h1 className="text-4xl font-bold mb-4 gradient-text">Oops! Something went wrong</h1>
                <p className="text-muted-foreground mb-6">
                    An unexpected error occurred. Please try again.
                </p>
                <Button onClick={() => window.location.reload()} variant="hero">
                    Try again
                </Button>
            </div>
        </div>
    );
}

export function ErrorBoundary({ children }: Props) {
    return (
        <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
            {children}
        </Sentry.ErrorBoundary>
    );
}
