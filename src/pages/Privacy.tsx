import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function Privacy() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                            Privacy Policy
                        </h1>
                        <div className="prose prose-invert max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-8">
                                Last updated: December 7, 2024
                            </p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                                <p className="text-muted-foreground mb-4">
                                    Welcome to AGSEO ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.
                                </p>
                                <p className="text-muted-foreground">
                                    When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                                <p className="text-muted-foreground mb-4">
                                    We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                                </p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                    <li>Personal Data: Name, email address, phone number, etc.</li>
                                    <li>Business Data: Company name, website URL, industry, etc.</li>
                                    <li>Technical Data: IP address, browser type, device information, operating system, etc.</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                                <p className="text-muted-foreground mb-4">
                                    We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                                </p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                    <li>To provide and maintain our Service</li>
                                    <li>To notify you about changes to our Service</li>
                                    <li>To allow you to participate in interactive features of our Service</li>
                                    <li>To provide customer support</li>
                                    <li>To gather analysis or valuable information so that we can improve our Service</li>
                                    <li>To monitor the usage of our Service</li>
                                    <li>To detect, prevent and address technical issues</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
                                <p className="text-muted-foreground">
                                    We collect certain information by automated means, such as cookies and web beacons, when a user visits our website. The information we collect in this manner includes IP address, browser characteristics, device characteristics, operating system, language preferences, referring URLs, information on actions taken on our site, and dates and times of website visits.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
                                <p className="text-muted-foreground">
                                    If you have questions or comments about this policy, you may contact us via the contact form on our website or by email at legal@agseo.pro.
                                </p>
                            </section>
                        </div>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
