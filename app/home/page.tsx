"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import StickyNavbar from "@/components/StickyNavbar";
import type { Category } from "@/lib/categories";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center">
            <div className="neu rounded-2xl px-8 py-4">
                <p className="text-midnight/60">Chargement…</p>
            </div>
        </div>
    ),
});

export default function HomePage() {
    const router = useRouter();
    const [selected, setSelected] = useState<Category | null>(null);
    const [leaving, setLeaving] = useState(false);
    const [flying, setFlying] = useState<{ cat: Category; rect: DOMRect } | null>(null);
    const [arrived, setArrived] = useState(false);

    const mouseX = useMotionValue(0);
    const socleX = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), {
        stiffness: 120,
        damping: 20,
    });

    useEffect(() => {
        const handlePageShow = () => {
            setSelected(null);
            setLeaving(false);
            setFlying(null);
            setArrived(false);
        };
        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    const handleSelect = (c: Category, rect: DOMRect) => {
        setFlying({ cat: c, rect });
    };

    useEffect(() => {
        if (!flying) return;
        const t0 = setTimeout(() => {
            setSelected(flying.cat);
            setArrived(true);
        }, 1400);
        const t1 = setTimeout(() => setLeaving(true), 2250);
        const t2 = setTimeout(() => router.push(flying.cat.href), 2700);
        return () => {
            clearTimeout(t0);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [flying, router]);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set((e.clientX / window.innerWidth) * 2 - 1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen overflow-hidden"
        >
            {/* Le clone volant */}
            <AnimatePresence>
                {flying && !arrived && (
                    <motion.div
                        initial={{
                            top: flying.rect.top,
                            left: flying.rect.left,
                            width: flying.rect.width,
                            rotateY: 0,
                            scale: 1,
                            opacity: 1,
                        }}
                        animate={{
                            top: [flying.rect.top, flying.rect.top - 60, window.innerHeight / 2 - 30],
                            left: [flying.rect.left, flying.rect.left, window.innerWidth / 2 - flying.rect.width / 2],
                            rotateY: [0, 180, 360],
                            scale: [1, 1.15, 1.3],
                            opacity: [1, 1, 0],
                        }}
                        transition={{
                            duration: 1.4,
                            ease: [0.25, 0.1, 0.25, 1],
                            times: [0, 0.5, 1],
                        }}
                        style={{ position: "fixed", transformStyle: "preserve-3d", perspective: 900 }}
                        className="neu-sm pointer-events-none z-[100] rounded-2xl px-4 py-3 text-center text-sm font-medium text-midnight"
                    >
                        {flying.cat.icon} {flying.cat.label}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={leaving ? { y: -120, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.6, 1] }}
            >
                <StickyNavbar
                    onSelect={handleSelect}
                    disabled={flying !== null}
                    hiddenLabel={flying?.cat.label ?? null}
                />

                <main className="relative h-[calc(100vh-80px)] w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                        }}
                        className="neu-xs absolute left-1/2 top-6 z-30 -translate-x-1/2 cursor-default rounded-full px-6 py-2"
                    >
                        <p className="text-sm text-midnight/50">
                            Choisissez une catégorie pour découvrir mes projets
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ x: socleX }}
                        className="neu-sm absolute left-1/2 top-[65%] z-0 h-[50px] w-[280px] -translate-x-1/2 rounded-[50%]"
                    />

                    <Scene3D selected={selected} />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                        whileHover={{
                            scale: 1.04,
                            transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                        }}
                        className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 rounded-2xl bg-midnight px-8 py-4 shadow-[8px_8px_20px_rgba(15,14,71,0.25)]"
                    >
                        <p className="whitespace-nowrap text-lg font-light">
                            <span className="glow-title">
                                Timéo VINCENT - <span className="font-semibold">Webdesigner</span>
                            </span>
                        </p>
                    </motion.div>
                </main>
            </motion.div>
        </motion.div>
    );
}