"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileText } from "lucide-react";

// Lucide v1 a retiré les icônes de marque : on dessine LinkedIn au trait
function LinkedinIcon({ size = 20 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

// Le bouton grossit légèrement au survol
const buttonVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.08,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

// L'icône s'agite, déclenchée par le survol du parent
const wiggle = {
    rest: { rotate: 0 },
    hover: {
        rotate: [0, -10, 8, -6, 4, 0],
        transition: { duration: 0.6, ease: "easeInOut" as const },
    },
};

export default function ContactButtons() {
    const [open, setOpen] = useState<string | null>(null);

    const base =
        "neu neu-btn neu-focus flex h-12 cursor-pointer items-center overflow-hidden rounded-full text-midnight";
    const spring = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const };

    return (
        <div className="flex flex-row-reverse items-center justify-center gap-5">
            {/* --- CV : deux choix --- */}
            <motion.div
                layout
                variants={buttonVariants}
                initial="rest"
                animate="rest"
                whileHover="hover"
                onClick={() => open !== "cv" && setOpen("cv")}
                onMouseLeave={() => open === "cv" && setOpen(null)}
                transition={spring}
                aria-label="CV"
                className={`${base} ${open === "cv" ? "gap-2 px-4" : "w-12 justify-center"}`}
            >
                <motion.span layout variants={wiggle} className="shrink-0">
                    <FileText size={20} strokeWidth={1.8} />
                </motion.span>

                <AnimatePresence>
                    {open === "cv" && (
                        <motion.span
                            layout="position"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            className="flex shrink-0 gap-2"
                        >
                            <a
                                href="/cv-timeo-vincent-graphique.pdf"
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="neu-xs whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium"
                            >
                                CV graphique
                            </a>
                            <a
                                href="/cv-timeo-vincent-classique.pdf"
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="neu-xs whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium"
                            >
                                CV classique
                            </a>
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.a
                layout
                variants={buttonVariants}
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                href={
                    open === "linkedin"
                        ? "https://www.linkedin.com/in/tim%C3%A9o-vincent-05a0aa301/"
                        : undefined
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    if (open !== "linkedin") {
                        e.preventDefault();
                        setOpen("linkedin");
                    }
                }}
                onMouseLeave={() => open === "linkedin" && setOpen(null)}
                transition={spring}
                aria-label="LinkedIn"
                className={`${base} ${open === "linkedin" ? "gap-3 px-6" : "w-12 justify-center"}`}
            >
                <motion.span layout variants={wiggle} className="shrink-0">
                    <LinkedinIcon size={20} />
                </motion.span>
                <AnimatePresence>
                    {open === "linkedin" && (
                        <motion.span
                            layout="position"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            className="shrink-0 whitespace-nowrap text-sm font-medium"
                        >
                            Voir mon profil LinkedIn
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.a>

            <motion.a
                layout
                variants={buttonVariants}
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                href={open === "mail" ? "mailto:timeovincent19@gmail.com" : undefined}
                onClick={(e) => {
                    if (open !== "mail") {
                        e.preventDefault();
                        setOpen("mail");
                    }
                }}
                onMouseLeave={() => open === "mail" && setOpen(null)}
                transition={spring}
                aria-label="Email"
                className={`${base} ${open === "mail" ? "gap-3 px-6" : "w-12 justify-center"}`}
            >
                <motion.span layout variants={wiggle} className="shrink-0">
                    <Mail size={20} strokeWidth={1.8} />
                </motion.span>
                <AnimatePresence>
                    {open === "mail" && (
                        <motion.span
                            layout="position"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            className="shrink-0 whitespace-nowrap text-sm font-medium"
                        >
                            timeovincent19@gmail.com
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.a>
        </div>
    );
}