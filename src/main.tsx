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

/**
 * Detect whether the server-rendered HTML is valid and hydrate-able.
 * We must exclude:
 *  - SSR error <template data-msg="..."> elements (React Suspense failure)
 *  - The PageLoader fallback (meaningless to hydrate against)
 *  - Empty containers or comment-only nodes
 */
function hasValidServerHTML(): boolean {
    const children = Array.from(container.childNodes);

    // Check for React SSR error templates — these indicate renderToString/Suspense failure
    const hasSSRError = container.querySelector('template[data-msg]') !== null;
    if (hasSSRError) return false;

    // Must have at least one real element node (not just comments or text)
    const hasElements = children.some(node => node.nodeType === 1);
    if (!hasElements) return false;

    // If the only element is the loading spinner, don't hydrate — just client-render
    const elementChildren = children.filter(node => node.nodeType === 1) as Element[];
    if (elementChildren.length === 1) {
        const el = elementChildren[0];
        const className = typeof el.className === 'string' ? el.className : el.getAttribute('class') || '';
        // The PageLoader has backdrop-blur and z-[100]
        if (className.includes('backdrop-blur') || className.includes('z-[100]')) {
            return false;
        }
    }

    return true;
}

const shouldHydrate = hasValidServerHTML();

type RenderStateWindow = Window & {
    __HYDRATED__?: boolean;
    __CLIENT_RENDERED__?: boolean;
};

function getRenderStateWindow(): RenderStateWindow {
    return window as RenderStateWindow;
}

function clearContainer() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

/**
 * Force a clean reload by unregistering service workers and clearing caches.
 * This is our "emergency brake" if the app is stuck in a loading loop.
 */
async function triggerEmergencyRecovery() {
    console.warn("🚀 AGSEO: Stuck loading state detected. Triggering emergency recovery...");

    // 1. Unregister all service workers
    if ('serviceWorker' in navigator) {
        try {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
                console.log("ServiceWorker unregistered");
            }
        } catch (e) {
            console.error("SW unregister failed:", e);
        }
    }

    // 2. Clear all caches
    if ('caches' in window) {
        try {
            const keys = await caches.keys();
            for (const key of keys) {
                await caches.delete(key);
                console.log(`Cache cleared: ${key}`);
            }
        } catch (e) {
            console.error("Cache clear failed:", e);
        }
    }

    // 3. Force reload the page from server
    window.location.reload();
}

/**
 * Start a watchdog timer to detect if the loading spinner gets stuck.
 */
function startLoadingWatchdog() {
    // If the app hasn't rendered or hydrated within 8 seconds, something is likely wrong (e.g. stale cache crash)
    const timeout = setTimeout(() => {
        const isStillLoading = !!document.querySelector('.backdrop-blur.z-\\[100\\]');
        const renderState = getRenderStateWindow();
        const isRendered = !!renderState.__HYDRATED__ || !!renderState.__CLIENT_RENDERED__;

        if (isStillLoading && !isRendered) {
            triggerEmergencyRecovery();
        }
    }, 8000);

    return () => clearTimeout(timeout);
}

function clientRender() {
    clearContainer();
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
    getRenderStateWindow().__CLIENT_RENDERED__ = true;
}

async function mountApp() {
    // Start the safety watchdog
    startLoadingWatchdog();

    if (shouldHydrate) {
        try {
            const { hydrateRoot } = await import("react-dom/client");
            hydrateRoot(
                container,
                <BrowserRouter>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg transition-colors"
                        aria-label="Skip to main content"
                    >
                        Skip to main content
                    </a>
                    <App />
                </BrowserRouter>,
                {
                    onRecoverableError(error: unknown) {
                        console.warn("Hydration mismatch (recoverable):", error);
                    },
                }
            );
            getRenderStateWindow().__HYDRATED__ = true;
            return;
        } catch (error: unknown) {
            console.error("Hydration failed, falling back to client-side render:", error);
        }
    }

    // Fallback: full client-side render
    clientRender();
}

mountApp();

