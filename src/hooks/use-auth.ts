import { useState, useEffect, useCallback } from 'react';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    User,
    AuthError
} from 'firebase/auth';

// Firebase app import - may be undefined if not configured
import { app } from '@/lib/firebase';

/**
 * Check if Firebase Auth is configured and available
 */
const isAuthConfigured = typeof window !== 'undefined' && 
    !!app && 
    !!import.meta.env.VITE_FIREBASE_API_KEY &&
    !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    !!import.meta.env.VITE_FIREBASE_PROJECT_ID;

/**
 * Authentication state
 */
interface AuthState {
    user: User | null;
    loading: boolean;
    error: AuthError | null;
    isAuthenticated: boolean;
}

/**
 * Authentication methods
 */
interface AuthMethods {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    clearError: () => void;
}

/**
 * Combined auth hook return type
 */
type UseAuthReturn = AuthState & AuthMethods;

/**
 * Firebase Auth instance
 * Only initialized if firebase app is available
 */
let auth: ReturnType<typeof getAuth> | null = null;

const getAuthInstance = () => {
    if (!auth && typeof window !== 'undefined') {
        try {
            // Only initialize if app exists
            if (app) {
                auth = getAuth(app);
            }
        } catch (error) {
            console.error('[Auth] Failed to initialize Firebase Auth:', error);
        }
    }
    return auth;
};

/**
 * useAuth Hook
 * 
 * Provides authentication state and methods for login/logout.
 * Always requires Firebase authentication - no demo mode.
 * 
 * @example
 * ```tsx
 * const { user, login, logout, isAuthenticated } = useAuth();
 * 
 * if (isAuthenticated) {
 *   return <Dashboard />;
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AuthError | null>(null);

    // Use module-level check for auth configuration
    const authConfigured = isAuthConfigured;

    useEffect(() => {
        if (!authConfigured) {
            // No Firebase auth configuration available: resolve loading state,
            // but do not silently authenticate users.
            setLoading(false);
            return;
        }

        const authInstance = getAuthInstance();
        if (!authInstance) {
            setLoading(false);
            return;
        }

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(
            authInstance,
            (user) => {
                setUser(user);
                setLoading(false);
            },
            (error) => {
                console.error('[Auth] Auth state error:', error);
                // Cast to AuthError - Firebase errors are also Error instances
                setError(error as AuthError);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [authConfigured]);

    /**
     * Login with email and password
     */
    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        if (!authConfigured) {
            setError({
                code: 'auth/not-configured',
                message: 'Firebase authentication is not configured. Please configure VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, and VITE_FIREBASE_PROJECT_ID environment variables.',
            } as AuthError);
            return false;
        }

        const authInstance = getAuthInstance();
        if (!authInstance) {
            setError({
                code: 'auth/not-configured',
                message: 'Firebase Auth is not configured'
            } as AuthError);
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await signInWithEmailAndPassword(authInstance, email, password);
            setUser(result.user);
            return true;
        } catch (err) {
            const authError = err as AuthError;
            setError(authError);
            console.error('[Auth] Login failed:', authError.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [authConfigured]);

    /**
     * Logout current user
     */
    const logout = useCallback(async (): Promise<void> => {
        if (!authConfigured) {
            setUser(null);
            return;
        }

        const authInstance = getAuthInstance();
        if (!authInstance) {
            setUser(null);
            return;
        }

        setLoading(true);
        try {
            await signOut(authInstance);
            setUser(null);
        } catch (err) {
            const authError = err as AuthError;
            console.error('[Auth] Logout failed:', authError.message);
            setError(authError);
        } finally {
            setLoading(false);
        }
    }, [authConfigured]);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        clearError,
    };
}

/**
 * Check if user is authenticated (synchronous check)
 * Useful for route guards
 * 
 * @returns true if user is authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
    const authInstance = getAuthInstance();
    return authInstance?.currentUser !== null && authInstance?.currentUser !== undefined;
}
