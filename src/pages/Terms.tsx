import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Helmet } from "react-helmet-async";

export default function Terms() {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Terms of Service | AGSEO</title>
                <meta name="description" content="AGSEO Terms of Service. Read our terms and conditions for using our AI SEO services." />
                <link rel="canonical" href="https://agseo.pro/terms" />
                <meta property="og:url" content="https://agseo.pro/terms" />
                <meta property="og:title" content="Terms of Service | AGSEO" />
                <meta property="og:description" content="AGSEO Terms of Service. Read our terms and conditions for using our AI SEO services." />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                            Terms of Service
                        </h1>
                        <div className="prose prose-invert max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-8">
                                Last updated: December 7, 2024
                            </p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                                <p className="text-muted-foreground mb-4">
                                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and AGSEO ("we," "us" or "our"), concerning your access to and use of the AGSEO website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                                </p>
                                <p className="text-muted-foreground">
                                    You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>
                                <p className="text-muted-foreground mb-4">
                                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">3. User Representations</h2>
                                <p className="text-muted-foreground mb-4">
                                    By using the Site, you represent and warrant that:
                                </p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                    <li>All registration information you submit will be true, accurate, current, and complete.</li>
                                    <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                                    <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                                    <li>You are not a minor in the jurisdiction in which you reside.</li>
                                    <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">4. Prohibited Activities</h2>
                                <p className="text-muted-foreground mb-4">
                                    You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">5. Disclaimer</h2>
                                <p className="text-muted-foreground">
                                    The site is provided on an as-is and as-available basis. You agree that your use of the site and our services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the site and your use thereof.
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
