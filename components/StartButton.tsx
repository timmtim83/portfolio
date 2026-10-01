"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function StartButton() {
    const router = useRouter();

    return (
        <motion.button
            onClick={() => router.push("/home")}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.05, transition: { duration: 0.25, ease: "easeOut" } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.08 } }}
            className="neu neu-btn neu-focus mt-14 flex items-center gap-3 rounded-2xl px-12 py-5 text-xl font-medium text-midnight">
            Start <span aria-hidden>→</span>
        </motion.button>

    )
}