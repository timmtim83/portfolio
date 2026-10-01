export type Category = {
    icon: string;
    label: string;
    detail: string;
    href: string;
};

export const categories: Category[] = [
    { icon: "📚", label: "Projets Scolaires", detail: "Travaux réalisés en cours", href: "/projets-scolaires" },
    { icon: "🎨", label: "Projets personnels", detail: "Création sur mon temps libre", href: "/projets-personnels" },
    { icon: "💼", label: "Projets de stage", detail: "Missions en entreprise", href: "/projets-stage"},
];