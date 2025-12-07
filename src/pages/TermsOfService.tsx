import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { config } from "@/lib/config";

export default function TermsOfService() {
    const email = config.contact.email;
    const website = "https://evolveseo.com";
    const city = "San Francisco";
    const country = "USA";

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Helmet>
                <title>Terms of Service | EvolveSEO</title>
                <meta name="description" content="Terms of Service for EvolveSEO. Read our terms and conditions for using our digital marketing and SEO services." />
            </Helmet>

            <Header />

            <main className="flex-1 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 gradient-text">Terms of Service</h1>
                        <p className="text-muted-foreground">Last updated: December 2025</p>
                    </div>

                    <div className="max-w-3xl mx-auto prose prose-invert prose-headings:font-heading prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                        <section className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
                                <p className="text-muted-foreground">
                                    These Terms of Service ("Terms") govern your use of the website {website} and the SEO and digital marketing services provided by EvolveSEO, located in {city}, {country} ("we", "us", "our").
                                </p>
                                <p className="text-muted-foreground mt-4">
                                    By using our website, requesting an audit, or engaging our services, you agree to be bound by these Terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">2. Services</h2>
                                <p className="text-muted-foreground mb-4">We provide digital marketing services including but not limited to:</p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>Search Engine Optimization (SEO) audits and strategy.</li>
                                    <li>Content creation and optimization.</li>
                                    <li>Technical SEO implementation.</li>
                                    <li>Link building and outreach.</li>
                                    <li>Local and E-commerce SEO specialized services.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">3. User Responsibilities</h2>
                                <p className="text-muted-foreground mb-4">When using our services, you agree to:</p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>Provide accurate information about your business and website.</li>
                                    <li>Grant necessary access (e.g., Google Analytics, Search Console) for us to perform our services (if applicable).</li>
                                    <li>Ensure your website content does not violate applicable laws or third-party rights.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">4. Intellectual Property</h2>
                                <p className="text-muted-foreground">
                                    All content, tools, and methodologies on this website are the property of EvolveSEO. Reports and deliverables created specifically for you under a service agreement become your property upon full payment.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">5. Limitation of Liability</h2>
                                <p className="text-muted-foreground">
                                    While we strive for the best results, SEO is influenced by third-party search engines (like Google) whose algorithms change frequently. We cannot guarantee specific rankings or traffic numbers. We are not liable for incidental, indirect, or consequential damages arising from the use of our services.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">6. Changes to Terms</h2>
                                <p className="text-muted-foreground">
                                    We may update these Terms at any time. Continued use of our website or services after changes constitutes acceptance.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">7. Contact</h2>
                                <p className="text-muted-foreground">
                                    For questions about these Terms, contact us at <a href={`mailto:${email}`}>{email}</a>.
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
