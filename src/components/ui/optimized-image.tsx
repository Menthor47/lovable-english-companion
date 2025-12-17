import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    /** 
     * Responsive image srcSet for different viewport sizes.
     * Example: "/img/hero-480.webp 480w, /img/hero-800.webp 800w, /img/hero-1200.webp 1200w"
     */
    srcSet?: string;
    /**
     * Sizes attribute for responsive images.
     * Example: "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
     */
    sizes?: string;
}

export function OptimizedImage({
    src,
    alt,
    className,
    priority = false,
    srcSet,
    sizes,
    ...props
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (priority) {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "image";
            link.href = src;
            // Add imagesrcset for responsive preloading if srcSet is provided
            if (srcSet) {
                link.setAttribute('imagesrcset', srcSet);
            }
            if (sizes) {
                link.setAttribute('imagesizes', sizes);
            }
            document.head.appendChild(link);
            return () => {
                document.head.removeChild(link);
            };
        }
    }, [src, srcSet, sizes, priority]);

    // Safety timeout: If image is cached or load event missed, force visible after delay
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 150);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cn("overflow-hidden relative", className)}>
            <img
                src={src}
                alt={alt}
                srcSet={srcSet}
                sizes={sizes}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                {...{ fetchpriority: priority ? "high" : "auto" }}
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsLoaded(true)} // Ensure we show *something* (even alt text) on error
                className={cn(
                    "transition-opacity duration-300 ease-in-out w-full h-auto",
                    isLoaded ? "opacity-100" : "opacity-0 blur-sm",
                )}
                {...props}
            />
        </div>
    );
}
