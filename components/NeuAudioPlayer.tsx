"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function NeuAudioPlayer({ src }: { src: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTime = () => {
            setCurrent(audio.currentTime);
            setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
        };
        const onLoaded = () => setDuration(audio.duration);
        const onEnd = () => setPlaying(false);

        audio.addEventListener("timeupdate", onTime);
        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("ended", onEnd);
        return () => {
            audio.removeEventListener("timeupdate", onTime);
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("ended", onEnd);
        };
    }, []);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) {
            audio.pause();
        } else {
            audio.play();
        }
        setPlaying(!playing);
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        audio.currentTime = ratio * audio.duration;
    };

    const format = (s: number) => {
        if (!s || isNaN(s)) return "0:00";
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <div className="neu mt-6 flex w-full items-center gap-5 rounded-3xl px-7 py-5">
            <audio ref={audioRef} src={src} preload="metadata" />

            {/* Bouton play rond, s'enfonce à la lecture */}
            <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.94 }}
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl text-midnight transition-shadow duration-300 ${
                    playing ? "neu-pressed" : "neu"
                }`}
                aria-label={playing ? "Pause" : "Lecture"}
            >
                {playing ? "❚❚" : "▶"}
            </motion.button>

            <div className="flex-1">
                {/* Barre de progression creusée */}
                <div
                    onClick={seek}
                    className="neu-pressed relative h-3 cursor-pointer overflow-hidden rounded-full"
                >
                    <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.15, ease: "linear" }}
                        className="absolute left-0 top-0 h-full rounded-full bg-midnight/70"
                    />
                </div>

                <div className="mt-2 flex justify-between text-xs text-midnight/50">
                    <span>{format(current)}</span>
                    <span>{format(duration)}</span>
                </div>
            </div>
        </div>
    );
}