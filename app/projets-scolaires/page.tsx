"use client";

import CarouselProjets from "@/components/CarouselProjets";
import { projetsScolaires } from "@/lib/projets";

export default function ProjetsScolairesPage() {
    return (
        <CarouselProjets
            projets={projetsScolaires}
            titre="Projets Scolaires"
            emoji="📚"
        />
    );
}