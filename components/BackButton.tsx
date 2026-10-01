"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BackButton() {
    return (
        <Link href="/home">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.05, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.97 }}
                className="neu-sm neu-btn neu-focus fixed right-6 top-6 z-50 cursor-pointer rounded-xl px-4 py-2 text-sm font-medium text-midnight">
                &larr; Retour
            </motion.div>
        </Link>
    )
}