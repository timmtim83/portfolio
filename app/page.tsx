"use client";

import { motion } from "framer-motion";
import StartButton from "@/components/StartButton";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        whileHover={{
          scale: 1.04, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
        }}
        className="rounded-3xl bg-midnight px-8 py-6 text-4xl font-bold tracking-tight shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff] sm:px-12 sm:py-8 sm:text-6xl">
        <span className="glow-title">PORTFOLIO 2026/2027</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        whileHover={{
          scale: 1.04, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        }}
        className="mt-12 text-lg font-light text-midnight/70 sm:text-2xl">
        Timéo VINCENT - <span className="font-bold">WEBDESIGNER</span>
      </motion.p>
      <StartButton />
    </main>
  );
}