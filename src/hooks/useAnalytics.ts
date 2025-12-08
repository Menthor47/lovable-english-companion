import { trackEvent } from "@/lib/analytics";

export const useAnalytics = () => {
    return {
        trackEvent,
        trackFormSubmit: (formName: string) => {
            trackEvent("form_submit", { form_name: formName });
        },
        trackClick: (elementName: string) => {
            trackEvent("click", { element: elementName });
        }
    };
};
