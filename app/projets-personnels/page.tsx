"use client";

import CarouselProjets from "@/components/CarouselProjets";
import { projetsPersonnels } from "@/lib/projets";

export default function ProjetsPersonnelsPage() {
    return (
        <CarouselProjets
            projets={projetsPersonnels}
            titre="Projets personnels"
            emoji="🎨"
        />
    );
}