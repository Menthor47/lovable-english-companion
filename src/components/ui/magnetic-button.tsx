import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonProps {
    children: React.ReactNode;
    strength?: number; // How far the button moves (default: 30)
}

export function MagneticButton({
    children,
    strength = 30,
    className,
    ...props
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <Button
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn("will-change-transform", className)}
                {...props}
            >
                {children}
            </Button>
        </motion.div>
    );
}
