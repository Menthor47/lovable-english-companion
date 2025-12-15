import { useRef, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { blogPosts } from "@/data/blogPosts";
import { getAuthorByName } from "@/data/authors";
import { Header } from "@/components/layout/Header";

import { OptimizedImage } from "@/components/ui/optimized-image";
import { Footer } from "@/components/layout/Footer";
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

// Simple markdown renderer component since we don't have react-markdown installed
// and we want to keep dependencies minimal as requested.
const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {content.split('\n').map((line, index) => {
                // Headers
                if (line.startsWith('# ')) return <h1 key={index} className="text-3xl sm:text-4xl font-bold mt-10 mb-6 text-foreground">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={index} className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-foreground">{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={index} className="text-xl sm:text-2xl font-bold mt-6 mb-3 text-foreground">{line.replace('### ', '')}</h3>;

                // Lists (basic support)
                if (line.trim().startsWith('- ')) return <li key={index} className="ml-4 mb-2">{line.replace('- ', '')}</li>;
                if (line.trim().match(/^\d+\. /)) return <div key={index} className="ml-4 mb-2 flex"><span className="font-bold mr-2">{line.split('.')[0]}.</span><span>{line.substring(line.indexOf('.') + 1).trim()}</span></div>;

                // Code blocks (very basic)
                if (line.startsWith('```')) return null; // Skip code formatting for now or handle simply

                // Empty lines
                if (line.trim() === '') return <div key={index} className="h-4"></div>;

                // Paragraphs
                return <p key={index} className="mb-4 leading-relaxed text-muted-foreground">{line}</p>;
            })}
        </div>
    );
};

const BlogPost = () => {
    const { toast } = useToast();
    const { t } = useTranslation();
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);
    const topRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const author = getAuthorByName(post.author);

    const authorPath = author ? `/authors/${author.id}` : undefined;
    const authorUrl = authorPath ? getAbsoluteUrl(authorPath) : undefined;

    const postPath = `/blog/${post.slug}`;
    const postUrl = getAbsoluteUrl(postPath);
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: post.title, href: postPath }
    ];
    const datePublished = parseDateToIso(post.date);

    const authorSchema =
        author?.id === "agseo-team"
            ? {
                "@type": "Organization",
                "@id": TEAM_ID,
                name: author.name,
                ...(authorUrl ? { url: authorUrl } : {})
            }
            : author
                ? {
                    "@type": "Person",
                    "@id": `${SITE_BASE_URL}/#author-${author.id}`,
                    name: author.name,
                    ...(authorUrl ? { url: authorUrl } : {})
                }
                : {
                    "@type": "Person",
                    name: post.author
                };

    // Schema.org structured data for Article
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: postUrl,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl
        },
        image: post.image,
        author: authorSchema,
        publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: SITE_LOGO_URL
            }
        },
        isPartOf: {
            "@id": WEBSITE_ID
        },
        ...(datePublished ? { datePublished } : {})
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Link copied",
                description: "Article link copied to clipboard",
            });
        } catch (err) {
            toast({
                title: "Failed to copy",
                description: "Could not copy link to clipboard",
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

            <main className="flex-grow pt-24 pb-20">
                {/* Hero Section */}
                <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <div className="container mx-auto max-w-4xl">
                            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
                            <Link to="/blog" className="inline-flex items-center text-primary mb-6 hover:underline font-medium">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Blog
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
                                            {post.author}
                                        </Link>
                                    ) : (
                                        <span>{post.author}</span>
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

                {/* Content Section */}
                <article className="container mx-auto px-4 max-w-4xl mt-12">
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-sm">
                        <MarkdownRenderer content={post.content} />

                        <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
                            <Link to="/blog">
                                <Button variant="outline">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    All Articles
                                </Button>
                            </Link>

                            <Button variant="ghost" size="icon" onClick={handleShare}>
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Related Articles */}
                    {blogPosts.filter(p => p.slug !== post.slug).length > 0 && (
                        <div className="mt-20 mb-12">
                            <h2 className="text-3xl font-bold mb-8 text-center">{t("blog.relatedArticles") || "Related Articles"}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogPosts
                                    .filter(p => p.slug !== post.slug)
                                    .slice(0, 3)
                                    .map((relatedPost) => (
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
                                                        Read More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
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
