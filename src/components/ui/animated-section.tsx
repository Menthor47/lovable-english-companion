import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 1, y: 0 }, // Was opacity: 0, y: 60
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 1, y: 0 }, // Was opacity: 0, y: -60
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 1, x: 0 }, // Was opacity: 0, x: -60
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 1, x: 0 }, // Was opacity: 0, x: 60
    visible: { opacity: 1, x: 0 },
  },
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Safety timeout: Ensure content becomes visible even if observer fails
  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start("visible");
    }, 500); // Slightly longer timeout for local dev to see animations
    return () => clearTimeout(timer);
  }, [controls]);

  const activeVariants = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  } : variants[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={activeVariants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleOnHover({
  children,
  className,
  scale = 1.05,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({
  children,
  className,
  offset = 50,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = (ref.current as HTMLElement).getBoundingClientRect();
        const scrollProgress = 1 - rect.top / window.innerHeight;
        setScrollY(scrollProgress * offset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <motion.div
      ref={ref}
      style={{ y: scrollY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
