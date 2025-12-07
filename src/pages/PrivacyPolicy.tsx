import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { config } from "@/lib/config";

export default function PrivacyPolicy() {
    const email = config.contact.email;
    const website = "https://evolveseo.com";
    const city = "San Francisco";
    const country = "USA";

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Helmet>
                <title>Privacy Policy | EvolveSEO</title>
                <meta name="description" content="Privacy policy for EvolveSEO. Learn how we collect, use, and protect your personal data." />
            </Helmet>

            <Header />

            <main className="flex-1 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 gradient-text">Privacy Policy</h1>
                        <p className="text-muted-foreground">Last updated: December 2025</p>
                    </div>

                    {/* Content Section */}
                    <div className="max-w-3xl mx-auto prose prose-invert prose-headings:font-heading prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                        <section className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">1. Data Controller</h2>
                                <p className="text-muted-foreground">
                                    EvolveSEO, located in {city}, {country}, is the data controller responsible for your personal data collected through this website ({website}).
                                </p>
                                <p className="text-muted-foreground mt-2">
                                    For any privacy-related inquiries, contact us at: <a href={`mailto:${email}`}>{email}</a>
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">2. Information We Collect</h2>
                                <p className="text-muted-foreground mb-4">We collect information you provide directly when using our services:</p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li><strong>Contact information:</strong> Name, email address, website URL, company name.</li>
                                    <li><strong>Service inquiries:</strong> Details about your SEO needs, current traffic, and goals.</li>
                                    <li><strong>Communications:</strong> Messages sent through our contact forms or email.</li>
                                    <li><strong>Technical data:</strong> IP address, browser type, device information (collected automatically via analytics).</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Use Your Information</h2>
                                <p className="text-muted-foreground mb-4">We use your personal data to:</p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>Process and respond to your audit requests and inquiries.</li>
                                    <li>Provide SEO and digital marketing services you request.</li>
                                    <li>Send service-related notifications and reports.</li>
                                    <li>Improve our website and services through aggregated analytics.</li>
                                    <li>Comply with legal obligations.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Sharing</h2>
                                <p className="text-muted-foreground mb-4">We may share your data with:</p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li><strong>Service providers:</strong> Hosting (Vercel/Netlify), analytics (Google), and communication tools.</li>
                                    <li><strong>Legal authorities:</strong> When required by law or to protect our rights.</li>
                                </ul>
                                <p className="text-muted-foreground mt-4">We do <strong>not</strong> sell your personal data to third parties.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">5. Your Rights</h2>
                                <p className="text-muted-foreground mb-4">Depending on your location (e.g., GDPR, CCPA), you may have rights to:</p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>Access, correct, or delete your personal data.</li>
                                    <li>Opt-out of marketing communications.</li>
                                    <li>Restrict processing of your data.</li>
                                </ul>
                                <p className="text-muted-foreground mt-4">
                                    To exercise these rights, contact us at <a href={`mailto:${email}`}>{email}</a>.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">6. Cookies</h2>
                                <p className="text-muted-foreground">
                                    Our website uses cookies to enhance your experience and analyze traffic. For detailed information, please visit our <a href="/cookies">Cookie Policy</a>.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">7. Contact Us</h2>
                                <p className="text-muted-foreground">
                                    If you have any questions about this Privacy Policy, please contact us at <a href={`mailto:${email}`}>{email}</a>.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
