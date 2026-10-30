"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html, Environment, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import type { Category } from "@/lib/categories";

function Screen({ selected }: { selected: Category | null }) {
    const group = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/computer.glb");
    const { pointer } = useThree();
    const entryRef = useRef(0);

    // Teinte le modèle pour qu'il s'accorde au fond neumorphe
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
            child.material = child.material.clone();
            child.material.color.set("#cfd5e0");
        }
    });

    useFrame((state, delta) => {
        if (!group.current) return;

        if (entryRef.current < 1) {
            entryRef.current = Math.min(entryRef.current + delta / 1.2, 1);
        }
        const p = entryRef.current;
        const eased = 1 - Math.pow(1 - p, 3);
        group.current.position.y = -0.2 - 3 * (1 - eased);

        const t = state.clock.elapsedTime;
        const idleY = Math.sin(t * 0.4) * 0.06;
        const idleX = Math.cos(t * 0.3) * 0.04;

        const targetY = pointer.x * 0.35 + idleY;
        const targetX = -pointer.y * 0.22 + idleX;
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y, targetY, 0.05
        );
        group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x, targetX, 0.05
        );
    });

    return (
        <group ref={group}>
            <primitive
                object={scene}
                scale={0.22}
                position={[0, -0.5, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />

            <Html transform position={[0, 0.30, 0.10]} scale={0.17}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected ? selected.label : "accueil"}
                        initial={{ opacity: 0, y: -60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        whileHover={{
                            scale: 1.06,
                            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                        }}
                        className="rounded-3xl bg-[#e0e5ec] px-12 py-8 shadow-[8px_8px_20px_rgba(15,14,71,0.25)]"
                    >
                        {selected ? (
                            <h1 className="whitespace-nowrap text-4xl font-bold text-midnight">
                                {selected.icon} {selected.label}
                            </h1>
                        ) : (
                            <div className="text-center">
                                <h1 className="whitespace-nowrap text-5xl font-bold tracking-tight text-midnight">
                                    Timéo VINCENT
                                </h1>
                                <p className="mt-3 whitespace-nowrap text-2xl font-light text-midnight/60">
                                    Designer UI/UX - Graphiste
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </Html>
        </group>
    );
}

export default function Scene3D({ selected }: { selected: Category | null }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 40 }}
            dpr={[1, 1.5]}
            className="h-full w-full"
        >
            <ambientLight intensity={0.25} />
            <directionalLight position={[4, 5, 3]} intensity={0.7} />
            <directionalLight position={[-4, 2, 2]} intensity={0.25} />
            <directionalLight position={[0, 2, -4]} intensity={0.5} color="#a5b4fc" />
            <pointLight position={[-2, 1, 2]} intensity={2} color="#0f0e47" distance={8} />

            <Suspense fallback={null}>
                <Screen selected={selected} />
                <ContactShadows
                    position={[0, -1.0, 0]}
                    opacity={0.5}
                    blur={2}
                    far={2}
                    color="#0f0e47"
                />
                <Environment preset="studio" environmentIntensity={0.10} />
            </Suspense>
        </Canvas>
    );
}

useGLTF.preload("/models/computer.glb");