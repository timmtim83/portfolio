"use client"
import CarouselProjets from "@/components/CarouselProjets";
import { motion3d } from "@/lib/projets";

export default function Motion3dPage() {
    return <CarouselProjets projets={motion3d} titre="Motion & 3D" emoji="🎬" />;
}