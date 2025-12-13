import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Search, Brain, Bot, Network, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

const terms = [
    {
        term: "Generative Engine Optimization (GEO)",
        definition: "The process of optimizing content not just for search engines like Google, but for AI answer engines like ChatGPT, Claude, and Gemini. It focuses on citation authority and answerability.",
        icon: Sparkles,
    },
    {
        term: "Retrieval-Augmented Generation (RAG)",
        definition: "A technique used by AI models to fetch relevant data from an external knowledge base (like your website) before generating an answer. Optimizing for RAG is key to appearing in AI citations.",
        icon: Search,
    },
    {
        term: "Agentic Workflow",
        definition: "A system where autonomous AI agents perform complex tasks—like keyword research, content drafting, and internal linking—without human intervention, often chaining steps together.",
        icon: Bot,
    },
    {
        term: "LLM Hallucination",
        definition: "When a Large Language Model generates incorrect or nonsensical information. SEO strategy now involves 'grounding' LLMs with high-quality, authoritative content to prevent this about your brand.",
        icon: Brain,
    },
    {
        term: "Knowledge Graph",
        definition: "A network of real-world entities (people, places, things) and their relationships. AI engines rely heavily on structured structured data to build these graphs and understand your brand authority.",
        icon: Network,
    },
    {
        term: "Zero-Click Search",
        definition: "A search result where the answer is displayed directly at the top of the SERP (or in an AI chat), meaning the user never clicks through to a website. GEO aims to win these 'position zero' spots.",
        icon: Search,
    },
];

export default function Glossary() {
    const pageUrl = getAbsoluteUrl("/resources/glossary");

    const definedTermSetSchema = {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": `${pageUrl}#definedtermset`,
        url: pageUrl,
        name: "AI SEO Dictionary",
        description: "Definitions for GEO, RAG, agentic workflows, knowledge graphs, and other AI SEO terms.",
        hasDefinedTerm: terms.map((item) => ({
            "@type": "DefinedTerm",
            name: item.term,
            description: item.definition
        }))
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>AI SEO Glossary | AGSEO</title>
                <meta name="description" content="Definitions for GEO, RAG, agentic workflows, knowledge graphs, and other AI SEO terms." />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="AI SEO Glossary | AGSEO" />
                <meta property="og:description" content="Definitions for GEO, RAG, agentic workflows, knowledge graphs, and other AI SEO terms." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(definedTermSetSchema)}</script>
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            The AI SEO <span className="text-primary">Dictionary</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Speak the language of the future. Master the terminology that defines the new era of Generative Search.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {terms.map((item, index) => (
                            <AnimatedSection key={index} delay={index * 100}>
                                <div className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-colors h-full">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
                                                {item.term}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {item.definition}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
