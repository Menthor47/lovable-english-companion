import { useRef, useEffect, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { blogPosts } from "@/data/blogPosts";
import { getAuthorById } from "@/data/authors";
import { Header } from "@/components/layout/Header";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Footer } from "@/components/layout/Footer";
import { Newsletter } from "@/components/sections/Newsletter";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import {
    ORGANIZATION_ID,
    SITE_BASE_URL,
    SITE_LOGO_URL,
    SITE_NAME,
    TEAM_ID,
    WEBSITE_ID,
    getAbsoluteUrl,
    parseDateToIso
} from "@/lib/siteMetadata";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
    const { toast } = useToast();
    const { t } = useTranslation();
    const { slug } = useParams();
    const rawPost = blogPosts.find((p) => p.slug === slug);
    const topRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [slug]);

    const post = useMemo(() => {
        if (!rawPost) return null;
        return {
            ...rawPost,
            title: t(`blog.posts.${rawPost.slug}.title`),
            excerpt: t(`blog.posts.${rawPost.slug}.excerpt`),
            category: t(`blog.posts.${rawPost.slug}.category`),
            date: t(`blog.posts.${rawPost.slug}.date`),
            content: t(`blog.posts.${rawPost.slug}.content`),
        };
    }, [rawPost, t]);

    // For now everything uses agseo-team id as per the current data structure
    const authorId = "agseo-team";
    const rawAuthor = getAuthorById(authorId);

    const author = useMemo(() => {
        if (!rawAuthor) return null;
        const translatedCredentials = t(`authors.${rawAuthor.id}.credentials`, { returnObjects: true });
        const credentials = Array.isArray(translatedCredentials)
            ? translatedCredentials.filter((value): value is string => typeof value === "string")
            : rawAuthor.credentials;
        return {
            ...rawAuthor,
            name: t(`authors.${rawAuthor.id}.name`),
            role: t(`authors.${rawAuthor.id}.role`),
            bio: t(`authors.${rawAuthor.id}.bio`),
            credentials,
        };
    }, [rawAuthor, t]);

    const relatedPosts = useMemo(() => {
        if (!post) return [];
        return blogPosts
            .filter(p => p.slug !== post.slug)
            .slice(0, 3)
            .map(p => ({
                ...p,
                title: t(`blog.posts.${p.slug}.title`),
                excerpt: t(`blog.posts.${p.slug}.excerpt`),
                category: t(`blog.posts.${p.slug}.category`),
            }));
    }, [post, t]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const authorPath = author ? `/authors/${author.id}` : undefined;
    const authorUrl = authorPath ? getAbsoluteUrl(authorPath) : undefined;

    const postPath = `/blog/${post.slug}`;
    const postUrl = getAbsoluteUrl(postPath);

    const breadcrumbItems = [
        { label: t("common.nav.home") || "Home", href: "/" },
        { label: t("blog.hub.title") || "Blog", href: "/blog" },
        { label: post.title, href: postPath },
    ];

    const datePublished = parseDateToIso(rawPost?.date || "");

    const authorSchema = (() => {
        if (author?.id === "agseo-team") {
            return {
                "@type": "Organization",
                "@id": TEAM_ID,
                name: author.name,
                ...(authorUrl ? { url: authorUrl } : {}),
            };
        }

        if (author) {
            return {
                "@type": "Person",
                "@id": `${SITE_BASE_URL}/#author-${author.id}`,
                name: author.name,
                ...(authorUrl ? { url: authorUrl } : {}),
            };
        }

        return {
            "@type": "Person",
            "@id": `${SITE_BASE_URL}/#person-${post.author.replace(/\s+/g, '-').toLowerCase()}`,
            name: post.author,
        };
    })();

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: postUrl,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl,
        },
        image: post.image,
        author: authorSchema,
        publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: SITE_LOGO_URL,
            },
        },
        isPartOf: {
            "@id": WEBSITE_ID,
        },
        ...(datePublished ? { datePublished } : {}),
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: t("blog.share.title"),
                description: t("blog.share.description"),
            });
        } catch (err: unknown) {
            toast({
                title: t("blog.share.failed"),
                description: t("blog.share.failedDesc"),
                variant: "destructive",
            });
        }
    };

    return (
        <div ref={topRef} className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{post.title} | AGSEO Blog</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={postUrl} />
                <meta property="og:url" content={postUrl} />
                <meta property="og:title" content={`${post.title} | AGSEO Blog`} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            </Helmet>

            <Header />

            <main id="main" className="flex-grow pt-24 pb-20">
                <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
                    <OptimizedImage
                        src={post.image}
                        alt={post.title}
                        priority
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <div className="container mx-auto max-w-4xl">
                            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
                            <Link to="/blog" className="inline-flex items-center text-primary mb-6 hover:underline font-medium">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {t("blog.backToBlog")}
                            </Link>

                            <div className="flex flex-wrap gap-4 mb-6">
                                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                    {post.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    {authorPath ? (
                                        <Link
                                            to={authorPath}
                                            className="hover:text-primary transition-colors"
                                        >
                                            {author?.name || post.author}
                                        </Link>
                                    ) : (
                                        <span>{author?.name || post.author}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <article className="container mx-auto px-4 max-w-4xl mt-12">
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-sm">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-bold mt-10 mb-6 text-foreground">{children}</h1>,
                                    h2: ({ children }) => <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h2>,
                                    h3: ({ children }) => <h3 className="text-xl sm:text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h3>,
                                    p: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
                                    ul: ({ children }) => <ul className="list-disc ml-6 mb-6 text-muted-foreground">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal ml-6 mb-6 text-muted-foreground">{children}</ol>,
                                    li: ({ children }) => <li className="mb-2">{children}</li>,
                                    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
                            <Link to="/blog">
                                <Button variant="outline">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    {t("blog.hub.allArticles")}
                                </Button>
                            </Link>

                            <Button variant="ghost" size="icon" onClick={handleShare}>
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Localized Author Bio Section */}
                        {author && (
                            <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                                        <OptimizedImage src={author.image} alt={author.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{author.name}</h3>
                                        <p className="text-primary font-medium text-sm mb-4">{author.role}</p>
                                        <p className="text-muted-foreground leading-relaxed mb-6 italic">
                                            "{author.bio}"
                                        </p>
                                        <div className="space-y-2">
                                            {author.credentials.map((cred, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                                    {cred}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Newsletter className="mt-16" />
                    </div>

                    {relatedPosts.length > 0 && (
                        <div className="mt-20 mb-12">
                            <h2 className="text-3xl font-bold mb-8 text-center">{t("blog.relatedArticles")}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group">
                                        <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                                            <div className="relative h-48 overflow-hidden">
                                                <OptimizedImage
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                                        {relatedPost.category}
                                                    </span>
                                                    <span>{relatedPost.readTime}</span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                                                    {relatedPost.excerpt}
                                                </p>
                                                <div className="flex items-center text-primary text-sm font-medium mt-auto">
                                                    {t("blog.home.readMore")} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
