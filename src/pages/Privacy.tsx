import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function Privacy() {
    const { t } = useTranslation();

    const sectionKeys = [
        "introduction",
        "collection",
        "use",
        "ai",
        "retention",
        "international",
        "rights",
        "cookies",
        "contact"
    ];

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("privacyPolicy.title")} | AGSEO</title>
                <meta name="description" content={t("privacyPolicy.description")} />
                <link rel="canonical" href="https://agseo.pro/privacy" />
                <meta property="og:url" content="https://agseo.pro/privacy" />
                <meta property="og:title" content={`${t("privacyPolicy.title")} | AGSEO`} />
                <meta property="og:description" content={t("privacyPolicy.description")} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                            {t("privacyPolicy.title")}
                        </h1>
                        <div className="prose prose-invert max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-8">
                                {t("privacyPolicy.lastUpdated")}
                            </p>

                            {sectionKeys.map((key) => {
                                const section = t(`privacyPolicy.sections.${key}`, { returnObjects: true }) as {
                                    title: string;
                                    content: string;
                                    items?: string[]
                                };

                                return (
                                    <section key={key} className="mb-8">
                                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                                        <p className="text-muted-foreground mb-4">
                                            {section.content}
                                        </p>
                                        {section.items && (
                                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                                {section.items.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </section>
                                );
                            })}
                        </div>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
