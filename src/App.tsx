import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StructuredData } from "@/components/seo/StructuredData";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { AnimatedRoutes } from "@/components/layout/AnimatedRoutes";
import { CookieConsent } from "@/components/ui/cookie-consent";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <ErrorBoundary>
            <StructuredData />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg transition-colors"
              >
                Skip to main content
              </a>
              <AnalyticsTracker />
              <AnimatedRoutes />
              <CookieConsent />
            </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
