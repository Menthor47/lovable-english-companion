import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { config } from "@/lib/config";

export const AnalyticsTracker = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const gaId = config.analytics.gaMeasurementId;
        if (gaId && !initialized) {
            ReactGA.initialize(gaId);
            setInitialized(true);
            if (import.meta.env.DEV) {
                console.log("GA4 Initialized with ID:", gaId);
            }
        }
    }, [initialized]);

    useEffect(() => {
        if (initialized) {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
            if (import.meta.env.DEV) {
                console.log("GA4 Page View Sent:", location.pathname + location.search);
            }
        }
    }, [initialized, location]);

    return null;
};
