import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function PageLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
            >
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                    <motion.div
                        className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <Search className="absolute inset-0 m-auto text-primary w-8 h-8 animate-pulse" />
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-sm font-medium tracking-widest uppercase text-muted-foreground text-center"
                >
                    AGSEO Intelligence
                </motion.p>
            </motion.div>
        </div>
    );
}
