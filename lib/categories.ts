export type Category = {
    icon: string;
    label: string;
    detail: string;
    href: string;
};

export const categories: Category[] = [
    { icon: "🖥️", label: "UX / UI & Interactif", detail: "Design d'interfaces et d'expériences immersives", href: "/ui-ux" },
    { icon: "🎬", label: "Motion & 3D", detail: "Animation, modélisation et audiovisuel", href: "/motion-3d" },
    { icon: "🎨", label: "Graphisme & Print", detail: "Réalisations d'identités visuelle, d'édition et signalétique", href: "/graphisme" },
];