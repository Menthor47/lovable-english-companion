import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StructuredData } from "@/components/seo/StructuredData";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { AnimatedRoutes } from "@/components/layout/AnimatedRoutes";
import { CookieConsent } from "@/components/ui/cookie-consent";

const queryClient = new QueryClient();

const App = ({ helmetContext }: { helmetContext?: any }) => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <StructuredData />
              <Toaster />
              <Sonner />
              <AnalyticsTracker />
              <AnimatedRoutes />
              <CookieConsent />
            </Suspense>
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
