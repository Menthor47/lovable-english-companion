import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Code2, Plus, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

type SchemaType = "FAQPage" | "Article";

interface FAQItem {
    question: string;
    answer: string;
}

export default function SchemaGenerator() {
    const { t } = useTranslation();
    const [type, setType] = useState<SchemaType>("FAQPage");

    // FAQ State
    const [faqs, setFaqs] = useState<FAQItem[]>([{ question: "", answer: "" }]);

    // Article State
    const [headline, setHeadline] = useState("");
    const [image, setImage] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [datePublished, setDatePublished] = useState("");

    // Generate JSON-LD
    const generateSchema = () => {
        let schema = {};

        if (type === "FAQPage") {
            schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }))
            };
        } else if (type === "Article") {
            schema = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": headline,
                "image": image ? [image] : [],
                "author": {
                    "@type": "Person",
                    "name": authorName
                },
                "publisher": {
                    "@type": "Organization",
                    "name": publisherName
                },
                "datePublished": datePublished
            };
        }

        return JSON.stringify(schema, null, 2);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateSchema());
        toast.success(t("schemaGenerator.output.copied"));
    };

    const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
    const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
    const updateFaq = (index: number, field: keyof FAQItem, value: string) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("schemaGenerator.metaTitle")}</title>
                <meta name="description" content={t("schemaGenerator.metaDescription")} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-8">
                            <Link to="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t("schemaGenerator.backToTools")}
                            </Link>
                            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                {t("schemaGenerator.title")}
                            </h1>
                            <p className="text-muted-foreground">
                                {t("schemaGenerator.subtitle")}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Input Column */}
                            <AnimatedSection className="space-y-6">
                                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
                                    <div className="mb-6">
                                        <label className="text-sm font-medium mb-2 block">{t("schemaGenerator.selectType")}</label>
                                        <Select value={type} onValueChange={(v) => setType(v as SchemaType)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="FAQPage">{t("schemaGenerator.types.faq")}</SelectItem>
                                                <SelectItem value="Article">{t("schemaGenerator.types.article")}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {type === "FAQPage" && (
                                        <div className="space-y-6">
                                            {faqs.map((faq, index) => (
                                                <div key={index} className="space-y-3 p-4 bg-secondary/20 rounded-xl relative group">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                                                        onClick={() => removeFaq(index)}
                                                        disabled={faqs.length === 1}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                    <div>
                                                        <label className="text-xs font-medium uppercase text-muted-foreground">{t("schemaGenerator.faq.question")}</label>
                                                        <Input
                                                            value={faq.question}
                                                            onChange={(e) => updateFaq(index, "question", e.target.value)}
                                                            className="bg-background"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium uppercase text-muted-foreground">{t("schemaGenerator.faq.answer")}</label>
                                                        <Textarea
                                                            value={faq.answer}
                                                            onChange={(e) => updateFaq(index, "answer", e.target.value)}
                                                            className="bg-background min-h-[80px]"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <Button variant="outline" onClick={addFaq} className="w-full border-dashed">
                                                <Plus className="w-4 h-4 mr-2" /> {t("schemaGenerator.faq.add")}
                                            </Button>
                                        </div>
                                    )}

                                    {type === "Article" && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium">{t("schemaGenerator.article.headline")}</label>
                                                <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder={t("schemaGenerator.article.headlinePlaceholder")} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">{t("schemaGenerator.article.image")}</label>
                                                <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder={t("schemaGenerator.article.imagePlaceholder")} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">{t("schemaGenerator.article.author")}</label>
                                                <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder={t("schemaGenerator.article.authorPlaceholder")} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">{t("schemaGenerator.article.publisher")}</label>
                                                <Input value={publisherName} onChange={(e) => setPublisherName(e.target.value)} placeholder={t("schemaGenerator.article.publisherPlaceholder")} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">{t("schemaGenerator.article.date")}</label>
                                                <Input type="date" value={datePublished} onChange={(e) => setDatePublished(e.target.value)} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </AnimatedSection>

                            {/* Output Column */}
                            <AnimatedSection delay={200} className="sticky top-24 h-fit">
                                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="font-bold text-xl flex items-center gap-2">
                                            <Code2 className="w-5 h-5 text-primary" />
                                            {t("schemaGenerator.output.title")}
                                        </h2>
                                        <Button size="sm" onClick={copyToClipboard}>
                                            <Copy className="w-4 h-4 mr-2" />
                                            {t("schemaGenerator.output.copy")}
                                        </Button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute top-0 right-0 p-2 bg-secondary text-xs rounded-bl-lg font-mono text-muted-foreground">
                                            script type="application/ld+json"
                                        </div>
                                        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl overflow-x-auto text-sm font-mono min-h-[300px] border border-border">
                                            {generateSchema()}
                                        </pre>
                                    </div>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        <Trans i18nKey="schemaGenerator.output.instructions">
                                            Paste this code into the <code className="bg-secondary px-1 py-0.5 rounded text-foreground">&lt;head&gt;</code> section of your HTML or use Google Tag Manager.
                                        </Trans>
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
