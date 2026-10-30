"use client"
import CarouselProjets from "@/components/CarouselProjets";
import { uiux } from "@/lib/projets";

export default function UiUxPage() {
    return <CarouselProjets projets={uiux} titre="UI/UX & Interactif" emoji="🖥️" />;
}