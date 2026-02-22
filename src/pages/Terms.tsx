import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

export default function Terms() {
    const { t } = useTranslation();

    const pageUrl = getAbsoluteUrl("/terms");

    const sectionKeys = [
        "agreement",
        "ip",
        "userRep",
        "prohibited",
        "disclaimer",
        "sla"
    ];

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("termsOfService.title")} | AGSEO</title>
                <meta name="description" content={t("termsOfService.description")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={`${t("termsOfService.title")} | AGSEO`} />
                <meta property="og:description" content={t("termsOfService.description")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                            {t("termsOfService.title")}
                        </h1>
                        <div className="prose prose-invert max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-8">
                                {t("termsOfService.lastUpdated")}
                            </p>

                            {sectionKeys.map((key) => {
                                const rawSection = t(`termsOfService.sections.${key}`, { returnObjects: true });
                                const section = (rawSection && typeof rawSection === 'object' && !Array.isArray(rawSection))
                                    ? rawSection as {
                                        title: string;
                                        content: string;
                                        items?: string[];
                                    }
                                    : { title: key, content: '' };

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
