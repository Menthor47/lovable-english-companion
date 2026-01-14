import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

export default function Privacy() {
    const { t } = useTranslation();

    const pageUrl = getAbsoluteUrl("/privacy");

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("privacyPolicy.title")} | AGSEO</title>
                <meta name="description" content={t("privacyPolicy.description")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={`${t("privacyPolicy.title")} | AGSEO`} />
                <meta property="og:description" content={t("privacyPolicy.description")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
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
                                Last updated: January 14, 2026
                            </p>

                            <section className="mb-12">
                                <p className="text-muted-foreground leading-relaxed">
                                    This Privacy Notice for Agseo.pro ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you visit our website at agseo.pro or engage with us in other related ways.
                                </p>
                            </section>

                            <div className="space-y-12">
                                <section>
                                    <h2 className="text-2xl font-bold mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
                                    <h3 className="text-xl font-semibold mb-3 text-primary">Personal information you disclose to us</h3>
                                    <p className="text-muted-foreground mb-4">
                                        We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us. This may include:
                                    </p>
                                    <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                        <li>Names, phone numbers, and email addresses</li>
                                        <li>Contact preferences and business details</li>
                                    </ul>
                                    <h3 className="text-xl font-semibold mb-3 text-primary">Information automatically collected</h3>
                                    <p className="text-muted-foreground">
                                        Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services. This helps us maintain security and internal analytics.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                                    <p className="text-muted-foreground mb-4">
                                        We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. Purposes include:
                                    </p>
                                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                        <li>To deliver and facilitate delivery of services to the user.</li>
                                        <li>To respond to user inquiries and offer support.</li>
                                        <li>To send administrative and marketing information.</li>
                                        <li>To fulfill and manage orders.</li>
                                        <li>To identify usage trends and marketing effectiveness.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">3. WHAT LEGAL BASES DO WE RELY ON?</h2>
                                    <p className="text-muted-foreground">
                                        We only process your personal information when we have a valid legal reason (legal basis), such as your consent, contractual necessities, compliance with laws, or legitimate business interests that do not outweigh your rights.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">4. WHEN AND WITH WHOM DO WE SHARE YOUR INFORMATION?</h2>
                                    <p className="text-muted-foreground">
                                        We may share data with third-party vendors, service providers, contractors, or agents who perform services for us. This includes order fulfillment, data storage, analytics, and cloud computing services.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">5. DO WE USE COOKIES?</h2>
                                    <p className="text-muted-foreground">
                                        Yes, we use cookies and similar technologies (like web beacons and pixels) to gather information. For detailed information, please see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                                    <p className="text-muted-foreground">
                                        We keep your information for as long as necessary to fulfill the purposes outlined in this notice unless otherwise required by law (tax, accounting, etc).
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                                    <p className="text-muted-foreground">
                                        We have implemented appropriate organizational and technical security measures. However, no electronic transmission is 100% secure, and data transfer is at your own risk.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">8. YOUR PRIVACY RIGHTS</h2>
                                    <p className="text-muted-foreground">
                                        In many regions (like the EEA, UK), you have rights including access to your data, rectification, erasure, and data portability. You can withdraw your consent at any time.
                                    </p>
                                </section>

                                <section className="p-8 bg-card border border-border rounded-3xl">
                                    <h2 className="text-2xl font-bold mb-4">CONTACT US</h2>
                                    <address className="not-italic text-muted-foreground">
                                        <p>Email: <a href="mailto:privacy@agseo.pro" className="text-primary hover:underline">privacy@agseo.pro</a></p>
                                        <p className="mt-4">Agseo.pro</p>
                                        <p>Alexandru Obregia 37</p>
                                        <p>Bucharest, 042073, Romania</p>
                                    </address>
                                </section>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
