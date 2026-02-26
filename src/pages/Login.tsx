import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock, Mail, AlertTriangle } from 'lucide-react';

/**
 * Login Page Component
 * 
 * Handles user authentication with email and password.
 * Redirects to dashboard on successful login.
 * 
 * @example
 * ```tsx
 * // Access via /login route
 * ```
 */
export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading, error, clearError } = useAuth();

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    // Check Firebase configuration on mount
    useEffect(() => {
        // Check if Firebase is configured
        if (!import.meta.env.VITE_FIREBASE_API_KEY) {
            setFirebaseError('Firebase is not configured. Please contact support.');
        }
    }, []);

    // Where to redirect after login (default: dashboard)
    const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';

    /**
     * Handle form submission
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        const success = await login(email, password);
        
        if (success) {
            // Redirect to the page they were trying to access
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Lock className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {/* Firebase Configuration Error */}
                        {firebaseError && (
                            <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-950 rounded-md border border-red-200 dark:border-red-800">
                                <div className="flex items-center gap-2 font-semibold">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span>Configuration Error</span>
                                </div>
                                <p className="mt-1 text-red-500 dark:text-red-400">{firebaseError}</p>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-md">
                                {error.message || 'Login failed. Please check your credentials.'}
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                    disabled={loading}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                autoComplete="current-password"
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={loading || !!firebaseError}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                            Protected area. Authorized access only.
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
