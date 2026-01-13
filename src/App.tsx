import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { AnimatedRoutes } from "@/components/layout/AnimatedRoutes";


import { useState } from 'react';

// Removed global queryClient for SSR safety

type HelmetContext = Record<string, unknown>;

const App = ({ helmetContext }: { helmetContext?: HelmetContext }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <TooltipProvider>
            <ErrorBoundary>
              <Toaster />
              <Sonner />
              <AnalyticsTracker />
              <AnimatedRoutes />

            </ErrorBoundary>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
