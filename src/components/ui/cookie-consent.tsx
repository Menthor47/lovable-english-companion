import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { CookieConsentState } from "@/types/cookie-consent";

const COOKIE_CONSENT_KEY = "agseo_cookie_consent";
const CONSENT_EVENT_NAME = "agseo:cookie-consent";

export const CookieConsent = () => {
    const { t } = useTranslation();
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const initTimeoutRef = useRef<number | null>(null);

    // State for toggles in settings
    const [consentSettings, setConsentSettings] = useState<Omit<CookieConsentState, 'timestamp'>>({
        necessary: true, // Always true
        analytics: false,
        marketing: false,
        preferences: false,
    });

    useEffect(() => {
        const hasCookiebotNow = () =>
            (typeof window !== "undefined" && "Cookiebot" in window) ||
            (typeof document !== "undefined" && Boolean(document.getElementById("Cookiebot")));

        const hideIfCookiebot = () => {
            if (!hasCookiebotNow()) return;
            setShowBanner(false);
            setShowSettings(false);
        };

        const handleCookiebotEvent = () => {
            hideIfCookiebot();
        };

        window.addEventListener("CookiebotOnConsentReady", handleCookiebotEvent);
        window.addEventListener("CookiebotOnAccept", handleCookiebotEvent);
        window.addEventListener("CookiebotOnDecline", handleCookiebotEvent);

        hideIfCookiebot();
        if (hasCookiebotNow()) {
            return () => {
                window.removeEventListener("CookiebotOnConsentReady", handleCookiebotEvent);
                window.removeEventListener("CookiebotOnAccept", handleCookiebotEvent);
                window.removeEventListener("CookiebotOnDecline", handleCookiebotEvent);
            };
        }

        initTimeoutRef.current = window.setTimeout(() => {
            hideIfCookiebot();
            if (hasCookiebotNow()) return;

            const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

            if (storedConsent) {
                try {
                    const parsedConsent: CookieConsentState = JSON.parse(storedConsent);
                    applyConsent(parsedConsent);
                    setConsentSettings({
                        necessary: parsedConsent.necessary,
                        analytics: parsedConsent.analytics,
                        marketing: parsedConsent.marketing,
                        preferences: parsedConsent.preferences,
                    });
                } catch (error: unknown) {
                    console.error("Error parsing cookie consent:", error);
                    setShowBanner(true);
                }
            } else {
                setShowBanner(true);
            }
        }, 2000);

        return () => {
            if (initTimeoutRef.current) {
                window.clearTimeout(initTimeoutRef.current);
            }
            window.removeEventListener("CookiebotOnConsentReady", handleCookiebotEvent);
            window.removeEventListener("CookiebotOnAccept", handleCookiebotEvent);
            window.removeEventListener("CookiebotOnDecline", handleCookiebotEvent);
        };
    }, []);

    const applyConsent = (consent: CookieConsentState) => {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': consent.marketing ? 'granted' : 'denied',
                'analytics_storage': consent.analytics ? 'granted' : 'denied',
                'ad_user_data': consent.marketing ? 'granted' : 'denied',
                'ad_personalization': consent.marketing ? 'granted' : 'denied',
                'functionality_storage': consent.preferences ? 'granted' : 'denied',
                'personalization_storage': consent.preferences ? 'granted' : 'denied',
                'security_storage': 'granted',
            });
        }
    };

    const saveConsent = (settings: Omit<CookieConsentState, 'timestamp'>) => {
        const finalConsent: CookieConsentState = {
            ...settings,
            necessary: true,
            timestamp: Date.now(),
        };

        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(finalConsent));
        applyConsent(finalConsent);

        window.dispatchEvent(new CustomEvent<CookieConsentState>(CONSENT_EVENT_NAME, { detail: finalConsent }));
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleAcceptAll = () => {
        saveConsent({
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        });
    };

    const handleRejectAll = () => {
        saveConsent({
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        });
    };

    const handleSavePreferences = () => {
        saveConsent(consentSettings);
    };

    if (!showBanner) return null;

    return (
        <div
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
            className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:p-6 animate-in slide-in-from-bottom duration-500"
        >
            <div className="container mx-auto max-w-5xl">
                {!showSettings ? (
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-1 space-y-2">
                            <h2 id="cookie-consent-title" className="font-semibold text-lg flex items-center gap-2">
                                🍪 {t("cookieBanner.title")}
                            </h2>
                            <p id="cookie-consent-description" className="text-sm text-muted-foreground leading-relaxed">
                                {t("cookieBanner.description")}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs text-primary underline cursor-pointer">
                                <Link to="/privacy" className="hover:text-primary/80">
                                    {t("footer.links.privacy", "Privacy Policy")}
                                </Link>
                                <span>•</span>
                                <Link to="/cookies" className="hover:text-primary/80">
                                    {t("footer.links.cookies", "Cookie Policy")}
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-row flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
                            <Button variant="outline" onClick={handleRejectAll} className="flex-1 md:flex-none">
                                {t("cookieBanner.rejectAll")}
                            </Button>
                            <Button variant="outline" onClick={() => setShowSettings(true)} className="flex-1 md:flex-none">
                                {t("cookieBanner.customize")}
                            </Button>
                            <Button onClick={handleAcceptAll} className="flex-1 md:flex-none min-w-[120px]">
                                {t("cookieBanner.acceptAll")}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h3 className="font-semibold text-lg">
                                {t("cookieBanner.preferences.title")}
                            </h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Necessary */}
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                                <div className="pt-1">
                                    <Switch checked disabled />
                                </div>
                                <div className="space-y-1">
                                    <div className="font-medium flex items-center gap-2">
                                        {t("cookieBanner.preferences.necessary.title")}
                                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                                            {t("cookies.settings.necessary.badge", "Required")}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {t("cookieBanner.preferences.necessary.description")}
                                    </p>
                                </div>
                            </div>

                            {/* Analytics */}
                            <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/20 transition-colors">
                                <div className="pt-1">
                                    <Switch
                                        checked={consentSettings.analytics}
                                        onCheckedChange={(checked) => setConsentSettings(s => ({ ...s, analytics: checked }))}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="font-medium">
                                        {t("cookieBanner.preferences.analytics.title")}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {t("cookieBanner.preferences.analytics.description")}
                                    </p>
                                </div>
                            </div>

                            {/* Marketing */}
                            <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/20 transition-colors">
                                <div className="pt-1">
                                    <Switch
                                        checked={consentSettings.marketing}
                                        onCheckedChange={(checked) => setConsentSettings(s => ({ ...s, marketing: checked }))}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="font-medium">
                                        {t("cookieBanner.preferences.marketing.title")}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {t("cookieBanner.preferences.marketing.description")}
                                    </p>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/20 transition-colors">
                                <div className="pt-1">
                                    <Switch
                                        checked={consentSettings.preferences}
                                        onCheckedChange={(checked) => setConsentSettings(s => ({ ...s, preferences: checked }))}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="font-medium">
                                        {t("cookies.settings.preferences.title", "Preferences")}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {t("cookies.settings.preferences.description", "Remember your settings (language, region) for future visits.")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="ghost" onClick={() => setShowSettings(false)}>
                                {t("common.back", "Back")}
                            </Button>
                            <Button onClick={handleSavePreferences} className="min-w-[140px]">
                                {t("cookieBanner.savePreferences")}
                            </Button>
                            <Button variant="secondary" onClick={handleAcceptAll}>
                                {t("cookieBanner.acceptAll")}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
