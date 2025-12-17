
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
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

        return this.props.children;
    }
}
