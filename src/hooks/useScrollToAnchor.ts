import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToAnchor = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const elementId = location.hash.replace('#', '');
            const element = document.getElementById(elementId);

            if (element) {
                // Add a small delay to ensure DOM is fully rendered
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        } else {
            // Scroll to top if no hash (unless we want to preserve scroll position on back navigation, 
            // but for main nav clicks this is usually desired)
            window.scrollTo(0, 0);
        }
    }, [location]);
};
