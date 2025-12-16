import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export function OptimizedImage({
    src,
    alt,
    className,
    priority = false,
    ...props
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (priority) {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "image";
            link.href = src;
            document.head.appendChild(link);
            return () => {
                document.head.removeChild(link);
            };
        }
    }, [src, priority]);

    return (
        <div className={cn("overflow-hidden relative", className)}>
            <img
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={cn(
                    "transition-opacity duration-300 ease-in-out",
                    isLoaded ? "opacity-100" : "opacity-0 blur-sm",
                    className
                )}
                {...props}
            />
        </div>
    );
}
