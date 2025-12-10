import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/animated-section";

const blogPosts = [
  {
    titleKey: "blog.posts.ai.title",
    excerptKey: "blog.posts.ai.excerpt",
    category: "Artificial Intelligence",
    date: "May 10, 2025",
    author: "Alex Turner",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    slug: "future-of-ai-seo"
  },
  {
    titleKey: "blog.posts.react.title",
    excerptKey: "blog.posts.react.excerpt",
    category: "Technical SEO",
    date: "May 3, 2025",
    author: "Alex Turner",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    slug: "react-seo-mastery"
  },
  {
    titleKey: "blog.posts.smart.title",
    excerptKey: "blog.posts.smart.excerpt",
    category: "Smart SEO",
    date: "April 26, 2025",
    author: "Alex Turner",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    slug: "smart-keyword-research"
  },
  {
    titleKey: "blog.posts.ecommerce.title",
    excerptKey: "blog.posts.ecommerce.excerpt",
    category: "E-commerce SEO",
    date: "April 22, 2025",
    author: "Alex Turner",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    slug: "ecommerce-conversion-optimization"
  },
];

export function BlogPreview() {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {t("blog.badge")}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("blog.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {blogPosts.map((post, index) => (
            <StaggerItem key={index}>
              <ScaleOnHover scale={1.02}>
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <article className="group h-full flex flex-col rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 overflow-hidden transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={t(post.titleKey, post.titleKey)}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
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
                      <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {t(post.titleKey, post.titleKey)}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {t(post.excerptKey, post.excerptKey)}
                      </p>

                      {/* Author & Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {post.author}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                          {t("blog.readMore")}
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScaleOnHover>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/blog">
              {t("blog.viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
