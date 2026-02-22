import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly to bundle them and avoid 401 network errors
import enTranslation from '../public/locales/en/translation.json';
import roTranslation from '../public/locales/ro/translation.json';

i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
        resources: {
            en: { translation: enTranslation },
            ro: { translation: roTranslation }
        },
        fallbackLng: 'en',
        supportedLngs: ['en', 'ro'],
        load: 'languageOnly',
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
        }
    });

export default i18n;
