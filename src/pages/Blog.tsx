import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/animated-section";
import { Newsletter } from "@/components/sections/Newsletter";
import { blogPosts } from "@/data/blogPosts";
import { getAuthorByName } from "@/data/authors";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";
import { useMemo } from "react";

const Blog = () => {
    const { t } = useTranslation();
    const pageUrl = getAbsoluteUrl("/blog");

    const translatedPosts = useMemo(() => {
        return blogPosts.map((post) => ({
            ...post,
            title: t(`blog.posts.${post.slug}.title`),
            excerpt: t(`blog.posts.${post.slug}.excerpt`),
            category: t(`blog.posts.${post.slug}.category`),
            date: t(`blog.posts.${post.slug}.date`),
        }));
    }, [t]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{t("blog.hub.metaTitle")}</title>
                <meta name="description" content={t("blog.hub.metaDescription")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={t("blog.hub.metaTitle")} />
                <meta property="og:description" content={t("blog.hub.metaDescription")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>

            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <span className="text-sm font-medium text-primary uppercase tracking-wider">
                                {t("blog.hub.badge")}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {t("blog.hub.title")}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t("blog.hub.subtitle")}
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
                        {translatedPosts.map((post) => {
                            const author = getAuthorByName(post.author);
                            const authorPath = author ? `/authors/${author.id}` : undefined;

                            return (
                                <StaggerItem key={post.slug}>
                                    <ScaleOnHover scale={1.02} className="h-full">
                                        <article className="group h-full flex flex-col rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                                            {/* Image */}
                                            <Link to={`/blog/${post.slug}`} className="relative h-56 overflow-hidden block">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                                                {/* Category Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-md">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </Link>

                                            {/* Content */}
                                            <div className="flex-1 p-6 flex flex-col">
                                                {/* Meta */}
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {post.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.readTime}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <Link to={`/blog/${post.slug}`} className="block mb-3">
                                                    <h2 className="font-heading text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h2>
                                                </Link>

                                                {/* Excerpt */}
                                                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                                                    {post.excerpt}
                                                </p>

                                                {/* Author & Read More */}
                                                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <User className="w-4 h-4 text-primary" />
                                                        </div>
                                                        {authorPath ? (
                                                            <Link
                                                                to={authorPath}
                                                                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                                                            >
                                                                {post.author}
                                                            </Link>
                                                        ) : (
                                                            <span className="text-xs font-medium text-muted-foreground">
                                                                {post.author}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Link
                                                        to={`/blog/${post.slug}`}
                                                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                                    >
                                                        {t("blog.readArticle")}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </ScaleOnHover>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                    <Newsletter className="mt-24" />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
