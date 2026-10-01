"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    icon: string;
    label: string;
    detail: string;
    href?: string;
    mobile?: boolean;
    onSelect?: (rect: DOMRect) => void;
};

export default function CategoryItem({ icon, label, detail, mobile, onSelect }: Props) {
    const [hover, setHover] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (!ref.current || !onSelect) return;
        onSelect(ref.current.getBoundingClientRect());
    };

    return (
        <div
            className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
            <motion.div
                ref={ref}
                onClick={handleClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="neu-sm neu-focus cursor-pointer rounded-2xl px-4 py-3 text-sm font-medium text-midnight">
                {icon} {label}
            </motion.div>

            <AnimatePresence>
                {hover && !mobile && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="neu absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl px-4 py-3 text-xs text-midnight/70">

                        {detail}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}