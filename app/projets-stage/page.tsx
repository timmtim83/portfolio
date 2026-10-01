"use client";

import CarouselProjets from "@/components/CarouselProjets";
import { projetsStage } from "@/lib/projets";

export default function ProjetsStagePage() {
    return (
        <CarouselProjets
            projets={projetsStage}
            titre="Projets de stage"
            emoji="💼"
        />
    );
}