import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    gradient?: boolean;
}

export function GlassCard({ children, className, gradient = false, ...props }: GlassCardProps) {
    return (
        <motion.div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md",
                "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
                gradient && "bg-gradient-to-br from-white/10 to-transparent",
                className
            )}
            {...props}
        >
            {/* Noise texture overlay for texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-[100%] group-hover:animate-[shine_1s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
