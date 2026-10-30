"use client"
import CarouselProjets from "@/components/CarouselProjets";
import { graphisme } from "@/lib/projets";

export default function GraphismePage() {
    return <CarouselProjets projets={graphisme} titre="Graphisme & Print" emoji="🎨" />;
}