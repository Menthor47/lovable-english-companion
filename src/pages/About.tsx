import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Target,
    Lightbulb,
    Users,
    Zap,
    ArrowRight,
    CheckCircle2
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { authors } from "@/data/authors";
import {
    ORGANIZATION_ID,
    SITE_OG_IMAGE_URL,
    WEBSITE_ID,
    getAbsoluteUrl
} from "@/lib/siteMetadata";

const values = [
    {
        icon: Target,
        title: "Results-Driven",
        description: "Every strategy we implement is backed by data and designed to deliver measurable improvements in your search visibility."
    },
    {
        icon: Lightbulb,
        title: "Innovation First",
        description: "We stay ahead of the curve, combining traditional SEO expertise with cutting-edge AI technologies."
    },
    {
        icon: Users,
        title: "Partnership Approach",
        description: "We work as an extension of your team, providing transparent communication and dedicated support."
    },
    {
        icon: Zap,
        title: "Agile Execution",
        description: "Our methodology enables rapid testing, learning, and optimization to maximize your ROI."
    }
];

const expertise = [
    "Answer Engine Optimization (AEO)",
    "Generative Engine Optimization (GEO)",
    "Technical SEO Audits",
    "Local & E-commerce SEO",
    "AI-Powered Content Strategy",
    "Link Building & Digital PR"
];

export default function About() {
    const pageUrl = getAbsoluteUrl("/about");

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${pageUrl}#aboutpage`,
        url: pageUrl,
        name: "About AGSEO",
        isPartOf: {
            "@id": WEBSITE_ID
        },
        about: {
            "@id": ORGANIZATION_ID
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>About Us | AGSEO - AI-Powered SEO Agency</title>
                <meta
                    name="description"
                    content="Learn about AGSEO, the AI-powered SEO agency helping businesses dominate search engines and AI platforms. Meet our team and discover our mission."
                />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="About Us | AGSEO - AI-Powered SEO Agency" />
                <meta property="og:description" content="Learn about AGSEO, the AI-powered SEO agency helping businesses dominate search engines and AI platforms." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(aboutPageSchema)}</script>
            </Helmet>

            <Header />

            <main>
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-24">
                    <Breadcrumbs />
                </div>

                {/* Hero Section */}
                <section className="pt-32 pb-16 relative overflow-hidden">
                    <div className="absolute inset-0 circuit-pattern opacity-20" />
                    <div className="container mx-auto px-4 relative z-10">
                        <AnimatedSection direction="up" className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                                    About AGSEO
                                </span>
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Pioneering the Future of{" "}
                                <span className="text-gradient">Search Visibility</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                AGSEO is an AI-powered SEO agency dedicated to helping businesses
                                rank on traditional search engines and emerging AI platforms like
                                ChatGPT, Gemini, and Perplexity.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 bg-card/30">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <AnimatedSection direction="left">
                                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                                    Our Mission
                                </h2>
                                <p className="text-muted-foreground mb-6 text-lg">
                                    We believe in a future where AI and human expertise work together
                                    to create exceptional digital experiences. Our mission is to help
                                    businesses navigate the evolving search landscape—from traditional
                                    Google rankings to AI-generated answers.
                                </p>
                                <p className="text-muted-foreground mb-8">
                                    By combining proven SEO methodologies with proprietary AI tools,
                                    we deliver strategies that don't just adapt to change—they anticipate it.
                                    Our <strong>AG SEO formula (AEO + GEO + SEO)</strong> ensures comprehensive
                                    coverage across all search modalities.
                                </p>
                                <Link to="/contact">
                                    <Button className="group">
                                        Start a Conversation
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </AnimatedSection>

                            <AnimatedSection direction="right">
                                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8">
                                    <h3 className="font-heading text-xl font-semibold mb-6">Our Expertise</h3>
                                    <ul className="space-y-4">
                                        {expertise.map((item, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                                className="flex items-center gap-3"
                                            >
                                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center mb-12">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                Our Values
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                The principles that guide our work and define how we deliver value to our clients.
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <AnimatedSection
                                    key={index}
                                    direction="up"
                                    delay={index * 0.1}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="h-full p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                            <value.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="font-heading text-lg font-semibold mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {value.description}
                                        </p>
                                    </motion.div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-card/30">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center mb-12">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                Our Team
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                The people behind the research, strategy, and execution.
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {authors.map((author) => (
                                <motion.div
                                    key={author.id}
                                    whileHover={{ scale: 1.01 }}
                                    className="p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <Link to={`/authors/${author.id}`} className="inline-flex">
                                            <img
                                                src={author.image}
                                                alt={author.name}
                                                loading="lazy"
                                                className="w-24 h-24 rounded-2xl object-cover border border-border"
                                            />
                                        </Link>
                                        <div className="flex-1">
                                            <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                                                <Link
                                                    to={`/authors/${author.id}`}
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    {author.name}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-primary font-medium mb-4">
                                                {author.role}
                                            </p>
                                            <p className="text-muted-foreground mb-4">
                                                {author.bio}
                                            </p>

                                            <ul className="space-y-1 text-sm text-muted-foreground">
                                                {author.credentials.map((credential) => (
                                                    <li key={credential} className="flex items-start gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                                        <span>{credential}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-5 flex flex-wrap gap-4">
                                                {author.socialLinks.linkedin ? (
                                                    <a
                                                        href={author.socialLinks.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                ) : null}
                                                {author.socialLinks.twitter ? (
                                                    <a
                                                        href={author.socialLinks.twitter}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        X (Twitter)
                                                    </a>
                                                ) : null}
                                                {author.socialLinks.website ? (
                                                    <a
                                                        href={author.socialLinks.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        Website
                                                    </a>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                Ready to Transform Your Search Presence?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Let's discuss how our AI-powered approach can help you achieve
                                your visibility goals across Google, ChatGPT, and beyond.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/tools/audit">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Get Free AI Audit
                                    </Button>
                                </Link>
                                <Link to="/case-studies">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                        View Case Studies
                                    </Button>
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
