"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function NeuVideoPlayer({
    src,
    poster,
    titre,
    vertical = true,
}: {
    src: string;
    poster?: string;
    titre: string;
    vertical?: boolean;
}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={`neu mx-auto mt-6 rounded-3xl p-4 ${
                vertical ? "w-full max-w-[260px]" : "w-full max-w-[560px]"
            }`}
        >
            <div
                className={`neu-pressed relative overflow-hidden rounded-2xl ${
                    vertical ? "aspect-[9/16]" : "aspect-video"
                }`}
            >
                <AnimatePresence mode="wait">
                    {!loaded ? (
                        <motion.div
                            key="cover"
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setLoaded(true);
                            }}
                            className="absolute inset-0 flex cursor-pointer items-center justify-center"
                        >
                            {poster && (
                                <Image
                                    src={poster}
                                    alt={titre}
                                    fill
                                    sizes="320px"
                                    className="object-cover opacity-60"
                                />
                            )}

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.94 }}
                                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                className="neu relative z-10 flex h-20 w-20 items-center justify-center rounded-full text-2xl text-midnight"
                            >
                                ▶
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.iframe
                            key="video"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            src={`${src}?autoplay=1`}
                            className="absolute inset-0 h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                            allowFullScreen
                            title={titre}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}