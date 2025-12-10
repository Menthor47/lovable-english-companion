import { useRef, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

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
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);
    const topRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    // Schema.org structured data for Article
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "AGSEO",
            "logo": {
                "@type": "ImageObject",
                "url": "https://agseo.pro/logo.png"
            }
        },
        "datePublished": post.date, // Note: Should ideally be ISO format
        "description": post.excerpt
    };

    return (
        <div ref={topRef} className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{post.title} | AGSEO Blog</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={`https://agseo.pro/blog/${post.slug}`} />
                <meta property="og:url" content={`https://agseo.pro/blog/${post.slug}`} />
                <meta property="og:title" content={`${post.title} | AGSEO Blog`} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
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
                                    <span>{post.author}</span>
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

                            <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
