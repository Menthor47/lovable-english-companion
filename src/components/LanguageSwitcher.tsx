import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: "en", label: "English", flag: "🇺🇸" },
        { code: "ro", label: "Română", flag: "🇷🇴" },
    ];

    const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-14 px-2 gap-2">
                    <span className="text-lg leading-none">{currentLanguage.flag}</span>
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xl leading-none">{lang.flag}</span>
                            <span>{lang.label}</span>
                        </div>
                        {i18n.language === lang.code && (
                            <Check className="h-4 w-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
