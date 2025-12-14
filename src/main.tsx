import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import './i18n';
import './sentry';
import { initAnalytics } from "@/lib/analytics";

// Initialize Analytics
initAnalytics();

const container = document.getElementById("root")!;

if (container.hasChildNodes()) {
    const { hydrateRoot } = await import("react-dom/client");
    hydrateRoot(
        container,
        <BrowserRouter>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg transition-colors"
            >
                Skip to main content
            </a>
            <App />
        </BrowserRouter>
    );
} else {
    createRoot(container).render(
        <BrowserRouter>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg transition-colors"
            >
                Skip to main content
            </a>
            <App />
        </BrowserRouter>
    );
}
