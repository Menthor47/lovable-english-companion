import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

/**
 * Props for ProtectedRoute component
 */
interface ProtectedRouteProps {
    /** The child components to render if authenticated */
    children: React.ReactNode;
    /** Optional: Path to redirect to if not authenticated (default: /login) */
    redirectTo?: string;
    /** Optional: Show loading spinner while checking auth state */
    showLoading?: boolean;
}

/**
 * ProtectedRoute Component
 * 
 * Guards routes that require authentication.
 * Redirects to login page if user is not authenticated.
 * 
 * SECURITY: This component fails closed - if Firebase Auth is not configured,
 * access is denied by default to prevent accidental exposure of protected pages.
 */
export function ProtectedRoute({ 
    children, 
    redirectTo = '/login',
    showLoading = true 
}: ProtectedRouteProps) {
    const location = useLocation();
    
    // This will be gracefully handled by useAuth even if Firebase is not configured
    const { isAuthenticated, loading } = useAuth();

    // Security check: verify Firebase is properly configured
    const isFirebaseConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY &&
        !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
        !!import.meta.env.VITE_FIREBASE_PROJECT_ID;

    // If Firebase is not configured, deny access by default (fail closed)
    if (!isFirebaseConfigured) {
        // In development, show a helpful message
        if (import.meta.env.DEV) {
            console.warn(
                '[Auth] Firebase not configured. Protected routes will deny access. ' +
                'Add Firebase environment variables to enable authentication.'
            );
        }
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Show loading state while checking authentication
    if (loading && showLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        // Save the location they were trying to go to
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Render children if authenticated
    return <>{children}</>;
}

/**
 * PublicRoute Component
 * 
 * The opposite of ProtectedRoute - renders children only if NOT authenticated.
 * Useful for login/signup pages that should redirect to dashboard if already logged in.
 */
interface PublicRouteProps {
    children: React.ReactNode;
    /** Optional: Path to redirect to if already authenticated (default: /dashboard) */
    redirectTo?: string;
}

export function PublicRoute({ 
    children, 
    redirectTo = '/dashboard' 
}: PublicRouteProps) {
    const location = useLocation();
    const { isAuthenticated, loading } = useAuth();

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Render children if not authenticated
    return <>{children}</>;
}
