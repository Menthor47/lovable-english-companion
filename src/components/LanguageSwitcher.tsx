import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ro" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-semibold w-12"
            aria-label="Toggle language"
        >
            {i18n.language === "en" ? "RO" : "EN"}
        </Button>
    );
};
