"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from "framer-motion";
import { type Projet } from "@/lib/projets";
import BackButton from "@/components/BackButton";
import NeuAudioPlayer from "@/components/NeuAudioPlayer";
import NeuVideoPlayer from "@/components/NeuVideoPlayer";
import Image from "next/image";

const CARD_W = 340;

function Carte({
    p,
    onClick,
    icone,
}: {
    p: Projet;
    onClick: () => void;
    icone: (t: Projet["type"]) => string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [dist, setDist] = useState(1);

    useAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centreBloc = rect.left + rect.width / 2;
        const centreEcran = window.innerWidth / 2;
        const d = Math.min(Math.abs(centreBloc - centreEcran) / 420, 1);
        setDist(d);
    });

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            style={{
                scale: 1 - dist * 0.22,
                opacity: 1 - dist * 0.45,
            }}
            whileHover={{
                scale: 1.05,
                opacity: 1,
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            }}
            className="neu flex h-[380px] w-[300px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-3xl px-8 py-6"
        >
            <div className="neu-pressed relative mb-6 h-[200px] w-full overflow-hidden rounded-2xl">
                {p.image ? (
                    <Image
                        src={p.image}
                        alt={p.titre}
                        fill
                        sizes="600px"
                        unoptimized={p.image.endsWith(".gif")}
                        className={p.fit === "contain" ? "object-contain p-3" : "object-cover"}
                        draggable={false}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="text-4xl">{icone(p.type)}</span>
                    </div>
                )}

                <div className="neu-xs absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full">
                    <span className="text-sm">{icone(p.type)}</span>
                </div>
            </div>
            <h2 className="text-center text-lg font-bold text-midnight">{p.titre}</h2>
            <p className="mt-2 text-center text-sm text-midnight/60">{p.description}</p>
        </motion.div>
    );
}

export default function CarouselProjets({
    projets,
    titre,
    emoji,
}: {
    projets: Projet[];
    titre: string;
    emoji: string;
}) {
    const [selected, setSelected] = useState<Projet | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [paused, setPaused] = useState(false);
    const [hoveredImg, setHoveredImg] = useState(0);
    const [dragging, setDragging] = useState(false);

    const total = projets.length;
    const trackWidth = total * CARD_W;

    const x = useMotionValue(0);
    const dragStart = useRef(0);
    const xStart = useRef(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const px = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), { stiffness: 120, damping: 20 });
    const py = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 120, damping: 20 });

    function handleMouse(e: React.MouseEvent) {
        mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
        mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    }

    const onPointerDown = (e: React.PointerEvent) => {
        setDragging(true);
        setPaused(true);
        dragStart.current = e.clientX;
        xStart.current = x.get();
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragging) return;
        const delta = e.clientX - dragStart.current;
        let next = xStart.current + delta;
        while (next <= -trackWidth) next += trackWidth;
        while (next > 0) next -= trackWidth;
        x.set(next);
    };

    const onPointerUp = () => {
        setDragging(false);
        setPaused(false);
    };

    useAnimationFrame((_, delta) => {
        if (paused || selected || dragging) return;
        const speed = 40;
        let next = x.get() - (speed * delta) / 1000;
        if (next <= -trackWidth) next += trackWidth;
        x.set(next);
    });

    const icone = (t: Projet["type"]) =>
        t === "video" ? "🎬" : t === "audio" ? "🎧" : t === "interactif" ? "🖱️" : "🖼️";

    const nomType = (t: Projet["type"]) =>
        t === "video" ? "Vidéo" : t === "audio" ? "Audio" : t === "interactif" ? "Interactif" : "Image";

    const boucle = [...projets, ...projets];

    return (
        <div
            onMouseMove={handleMouse}
            className={`relative ${selected ? "min-h-screen" : "h-screen overflow-hidden"}`}
        >
            {!selected && <BackButton />}

            <AnimatePresence>
                {!selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -80 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex h-screen flex-col items-center justify-center overflow-hidden"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                            whileHover={{
                                scale: 1.04,
                                transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                            }}
                            className="glow-title mb-4 rounded-3xl bg-midnight px-10 py-5 text-3xl font-bold shadow-[8px_8px_20px_rgba(15,14,71,0.25)] sm:px-14 sm:py-6 sm:text-4xl"
                        >
                            <span className="glow-title">{emoji} {titre}</span>
                        </motion.h1>

                        <motion.div
                            style={{ x: px, y: py }}
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => { setPaused(false); setDragging(false); }}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            className={`relative w-full touch-none select-none overflow-hidden py-8 ${dragging ? "cursor-grabbing" : "cursor-grab"
                                }`}
                        >
                            <motion.div style={{ x }} className="flex gap-10 will-change-transform">
                                {boucle.map((p, i) => (
                                    <Carte
                                        key={`${p.id}-${i}`}
                                        p={p}
                                        icone={icone}
                                        onClick={() => {
                                            if (Math.abs(x.get() - xStart.current) > 5) return;
                                            setExpanded(false);
                                            setHoveredImg(0);
                                            setSelected(p);
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>

                        <div className="neu-xs mt-12 rounded-full px-6 py-3">
                            <p className="text-xs text-midnight/50">
                                Glissez pour parcourir · Cliquez pour découvrir
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {selected && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex min-h-screen items-center justify-center px-6 py-16"
                >
                    <div
                        onMouseEnter={() => setExpanded(true)}
                        onMouseLeave={() => setExpanded(false)}
                        className="neu relative flex w-full max-w-[860px] cursor-pointer flex-col items-center rounded-3xl px-12 py-10 text-center"
                    >
                        <div className="neu-xs mb-4 flex items-center gap-2 rounded-full px-4 py-1.5">
                            <span className="text-sm">{icone(selected.type)}</span>
                            <span className="text-xs font-medium uppercase tracking-wider text-midnight/60">
                                {nomType(selected.type)}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-midnight">{selected.titre}</h2>
                        <p className="mt-3 text-midnight/60">{selected.description}</p>

                        <div className="neu-line mt-6 w-3/4 rounded-full" />

                        <AnimatePresence initial={false}>
                            {expanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="w-full"
                                >
                                    {selected.type === "audio" && selected.media && (
                                        <NeuAudioPlayer src={selected.media} />
                                    )}

                                    {selected.type === "video" && selected.media?.includes("youtube") && (
                                        <NeuVideoPlayer
                                            src={selected.media}
                                            poster={selected.image}
                                            titre={selected.titre}
                                            vertical={selected.vertical ?? true}
                                        />
                                    )}

                                    {selected.type === "interactif" && selected.lien && (
                                        <div className="mt-6 flex flex-col items-center">
                                            {selected.image && (
                                                <div className="neu-pressed relative mx-auto h-[280px] w-full max-w-[480px] overflow-hidden rounded-2xl">
                                                    <Image
                                                        src={selected.image}
                                                        alt={selected.titre}
                                                        fill
                                                        sizes="960px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}

                                            <motion.a
                                                href={selected.lien}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                                                whileTap={{ scale: 0.96 }}
                                                className="neu neu-btn neu-focus mt-6 flex items-center gap-3 rounded-2xl px-8 py-4 text-sm font-medium text-midnight"
                                            >
                                                Consulter le projet <span aria-hidden>&#8599;</span>
                                            </motion.a>
                                        </div>
                                    )}

                                    {selected.type === "image" && selected.images && (
                                        <div className="mt-8 flex flex-col items-center">
                                            <div className="relative h-[420px] w-full max-w-[560px]">
                                                {selected.images.map((img, i) => {
                                                    const actif = hoveredImg === i;
                                                    return (
                                                        <motion.div
                                                            key={img}
                                                            onMouseEnter={() => setHoveredImg(i)}
                                                            initial={{ opacity: 0, y: 30 }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: actif ? 0 : i * 26,
                                                                y: actif ? -14 : i * 18,
                                                                rotate: actif ? 0 : i * 1.5,
                                                                scale: actif ? 1.04 : 1 - i * 0.03,
                                                                zIndex: actif ? 50 : 10 - i,
                                                            }}
                                                            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                                                            className="neu absolute left-1/2 top-0 h-[360px] w-[400px] -translate-x-1/2 cursor-pointer rounded-3xl p-3"
                                                        >
                                                            <div className="neu-pressed relative h-full w-full overflow-hidden rounded-2xl">
                                                                <Image
                                                                    src={img}
                                                                    alt={`${selected.titre} ${i + 1}`}
                                                                    fill
                                                                    sizes="800px"
                                                                    unoptimized={img.endsWith(".gif")}
                                                                    className="object-contain p-2"
                                                                />
                                                            </div>

                                                            <div className="neu-dot absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-full">
                                                                <span className="text-xs font-bold text-midnight/60">{i + 1}</span>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-6 flex items-center gap-5">
                                                <motion.button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setHoveredImg((i) => (i - 1 + selected.images!.length) % selected.images!.length);
                                                    }}
                                                    whileHover={{ scale: 1.08, transition: { duration: 0.25 } }}
                                                    whileTap={{ scale: 0.94 }}
                                                    className="neu neu-btn neu-focus flex h-12 w-12 items-center justify-center rounded-full text-lg text-midnight"
                                                    aria-label="Image précédente"
                                                >
                                                    &larr;
                                                </motion.button>

                                                <div className="neu-pressed rounded-full px-4 py-1.5">
                                                    <span className="text-xs font-medium text-midnight/60">
                                                        {hoveredImg + 1} / {selected.images.length}
                                                    </span>
                                                </div>

                                                <motion.button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setHoveredImg((i) => (i + 1) % selected.images!.length);
                                                    }}
                                                    whileHover={{ scale: 1.08, transition: { duration: 0.25 } }}
                                                    whileTap={{ scale: 0.94 }}
                                                    className="neu neu-btn neu-focus flex h-12 w-12 items-center justify-center rounded-full text-lg text-midnight"
                                                    aria-label="Image suivante"
                                                >
                                                    &rarr;
                                                </motion.button>
                                            </div>
                                        </div>
                                    )}

                                    {selected.type === "image" && !selected.images && selected.image && (
                                        <div className="neu-pressed relative mx-auto mt-6 h-[380px] w-full max-w-[520px] overflow-hidden rounded-2xl">
                                            <Image
                                                src={selected.image}
                                                alt={selected.titre}
                                                fill
                                                sizes="1040px"
                                                unoptimized={selected.image.endsWith(".gif")}
                                                className="object-contain p-3"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!expanded && (
                            <div className="neu-xs mt-6 rounded-full px-5 py-2">
                                <p className="text-xs text-midnight/50">Survolez pour découvrir</p>
                            </div>
                        )}

                        <button
                            onClick={() => setSelected(null)}
                            className="neu-sm neu-btn mt-8 rounded-xl px-5 py-2 text-sm text-midnight"
                        >
                            &larr; Retour aux projets
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}