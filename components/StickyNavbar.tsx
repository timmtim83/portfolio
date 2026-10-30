"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CategoryItem from "@/components/CategoryItem";
import ContactButtons from "@/components/ContactButtons";
import { categories, type Category } from "@/lib/categories";

type Props = {
    onSelect: (c: Category, rect: DOMRect) => void;
    disabled?: boolean;
    hiddenLabel?: string | null;
};

export default function StickyNavbar({ onSelect, disabled, hiddenLabel }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md">
            {/* Boutons de contact, collés au bord droit de l'écran */}
            <div className="absolute right-6 top-10 z-10 hidden -translate-y-1/2 md:block">
                <ContactButtons />
            </div>

            <nav className="relative mx-auto flex h-20 max-w-6xl items-center justify-center px-6">
                {/* Catégories, centrées */}
                <motion.div layout className="hidden items-center gap-4 md:flex">
                    {categories
                        .filter((c) => c.label !== hiddenLabel)
                        .map((c) => (
                            <motion.div
                                key={c.label}
                                layout
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <CategoryItem
                                    {...c}
                                    onSelect={(rect) => !disabled && onSelect(c, rect)}
                                />
                            </motion.div>
                        ))}
                </motion.div>

                {/* Menu hamburger, mobile uniquement */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="neu-sm neu-btn neu-focus absolute right-6 rounded-xl px-3 py-2 text-midnight md:hidden"
                    aria-label="Menu"
                >
                    ☰
                </button>
            </nav>

            {/* Menu déroulant mobile */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col gap-3 px-6 pb-6 md:hidden"
                >
                    {categories.map((c) => (
                        <CategoryItem
                            key={c.label}
                            {...c}
                            mobile
                            onSelect={(rect) => !disabled && onSelect(c, rect)}
                        />
                    ))}

                    <div className="mt-2 flex justify-center">
                        <ContactButtons />
                    </div>
                </motion.div>
            )}
        </header>
    );
}