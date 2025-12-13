import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { config } from "@/lib/config";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

 interface CookiePolicySubsection {
     heading: string;
     text: string;
 }

 interface CookiePolicySection {
     title: string;
     content: string;
     subsections?: CookiePolicySubsection[];
 }

export default function CookiePolicy() {
    const email = config.contact.email;
    const pageUrl = getAbsoluteUrl("/cookies");

    const sections: CookiePolicySection[] = [
        {
            title: "1. What Are Cookies?",
            content: "Cookies are small text files stored on your device (computer, mobile phone, or tablet) when you visit our website. They help us recognize you, remember your preferences, and understand how you use our site."
        },
        {
            title: "2. Types of Cookies We Use",
            content: "We use several types of cookies to ensure our website functions properly and to improve your experience:",
            subsections: [
                {
                    heading: "Essential",
                    text: "Strictly necessary for security and core functionality. Cannot be disabled."
                },
                {
                    heading: "Analytics",
                    text: "We use tools like Google Analytics to understand visitor behavior. Data is aggregated and anonymized."
                },
                {
                    heading: "Marketing",
                    text: "Cookies that help us track the effectiveness of our marketing campaigns (if applicable)."
                }
            ]
        },
        {
            title: "3. Managing Cookies",
            content: "You can control specific cookie preferences through your browser settings. Note that disabling essential cookies may affect website functionality."
        },
        {
            title: "4. Updates to This Policy",
            content: "We may update this Cookie Policy periodically. Please check back regularly for changes."
        },
        {
            title: "5. Contact",
            content: `If you have questions about our use of cookies, please contact us at ${email}.`
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Helmet>
                <title>Cookie Policy | AGSEO</title>
                <meta name="description" content="Cookie Policy for AGSEO. Understand how we use cookies to improve your experience." />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="Cookie Policy | AGSEO" />
                <meta property="og:description" content="Cookie Policy for AGSEO. Understand how we use cookies to improve your experience." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>

            <Header />

            <main className="flex-1 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 gradient-text">Cookie Policy</h1>
                        <p className="text-muted-foreground">Last updated: December 2025</p>
                    </div>

                    <div className="max-w-3xl mx-auto prose prose-invert prose-headings:font-heading">
                        <div className="space-y-12">
                            {sections.map((section, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>

                                    {section.subsections && (
                                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                                            {section.subsections.map((sub, sIdx) => (
                                                <div key={sIdx} className="bg-card border border-border rounded-lg p-6">
                                                    <h3 className="text-lg font-semibold mb-2 text-primary">{sub.heading}</h3>
                                                    <p className="text-sm text-muted-foreground">{sub.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
