export type Projet = {
    id: string;
    titre: string;
    description: string;
    image?: string;
    images?: string[];
    media?: string;
    lien?: string;
    vertical?: boolean;
    fit?: "cover" | "contain";
    type: "image" | "video" | "audio" | "interactif" | "gif";
};

export const uiux: Projet[] = [
    { id: "u1", titre: "Fit4rm", description: "Application de données pour la musculation, en Flat Design", type: "image", image: "/projets/personnels/fit4rm-cover.webp", images: ["/projets/personnels/fit4rm1.webp", "/projets/personnels/fit4rm2.webp", "/projets/personnels/fit4rm3.webp", "/projets/personnels/fit4rm4.webp", "/projets/personnels/fit4rm5.webp", "/projets/personnels/fit4rm6.webp", "/projets/personnels/fit4rm7.webp", "/projets/personnels/fit4rm8.webp"] },
    { id: "u2", titre: "Bibliothèque interactive", description: "Expérience interactive autour de la culture du livre", type: "interactif", image: "/projets/stage/miniature-bibliotheque.webp", lien: "https://www.compographie.com/bibliotheque/…" },
];

export const motion3d: Projet[] = [
    { id: "m1", titre: "Projet - Motion Design - JO", description: "S'approprier une marque et en créer une identité visuelle", type: "video", image: "/projets/logo-jo.webp", media: "https://www.youtube.com/embed/rbdMWDxqcTs", vertical: true },
    { id: "m2", titre: "Projet - Motion Design - Song", description: "Travail d'effets visuels et de transitions autour d'une musique", type: "video", image: "/projets/1.webp", media: "https://www.youtube.com/embed/…", vertical: true },
    { id: "m3", titre: "Motion Design Tutoriel", description: "Création d'un motion design destiné aux clients, pour faciliter l'envoi de fichiers", type: "video", image: "/projets/stage/miniature-motion-tuto.webp", media: "https://www.youtube.com/embed/QiNnxgR7J4A", vertical: false },
    { id: "m4", titre: "Projet audiovisuel", description: "Créer une histoire et une atmosphère à travers de l'audio", type: "audio", media: "/projets/the_last_call.wav" },
    { id: "m5", titre: "Projet 3D", description: "Une création 3D à partir d'une architecture", type: "image", image: "/projets/3d-projet.webp", images: ["/projets/3d-projet.webp", "/projets/architecture 3d.webp"] },
];

export const graphisme: Projet[] = [
    { id: "g1", titre: "Projet - SloWorld", description: "Planche graphique autour de la nourriture culinaire d'un pays", type: "image", image: "/projets/mockup_sloworld.webp", images: ["/projets/sloworld-1.webp", "/projets/sloworld-2.webp", "/projets/sloworld-3.webp"] },
    { id: "g2", titre: "Projet typographique", description: "Recherche graphique à partir de lettres", type: "image", image: "/projets/typographie1.webp", images: ["/projets/typographie1.webp", "/projets/typographie2.webp", "/projets/typographie3.webp"] },
    { id: "g3", titre: "Projet - Visual", description: "Création d'une ambiance graphique à destination des personnes malvoyantes", type: "image", image: "/projets/planche-graphique2.webp", images: ["/projets/planche-graphique2.webp", "/projets/planche-graphique3.webp", "/projets/planche-graphique4.webp"] },
    { id: "g4", titre: "Carte de visite BSK", description: "Création et réflexion autour de la mise en forme d'éléments", type: "image", image: "/projets/stage/bsk-1.webp", images: ["/projets/stage/bsk-1.webp", "/projets/stage/bsk-2.webp", "/projets/stage/bsk-3.webp", "/projets/stage/bsk-4.webp", "/projets/stage/bsk-5.webp", "/projets/stage/bsk-6.webp", "/projets/stage/bsk-7.webp", "/projets/stage/bsk-8.webp"] },
    { id: "g5", titre: "Carte de visite Grenier", description: "Création d'une carte de visite recto-verso de A à Z", type: "image", image: "/projets/stage/grenier-4.webp", images: ["/projets/stage/grenier-4.webp", "/projets/stage/grenier-3.webp", "/projets/stage/grenier-2.webp", "/projets/stage/grenier-1.webp"] },
    { id: "g6", titre: "Carte de visite SARL", description: "Réflexion et élaboration d'une carte de visite pour une société d'hivernage", type: "image", image: "/projets/stage/sarl-3.webp", images: ["/projets/stage/sarl-1.webp", "/projets/stage/sarl-2.webp", "/projets/stage/sarl-3.webp", "/projets/stage/sarl-4.webp"] },
    { id: "g7", titre: "Kakemono", description: "Création de kakémonos pour présenter les activités de l'imprimerie", type: "image", image: "/projets/stage/kakemono-3.webp", fit: "contain", images: ["/projets/stage/kakemono-1.webp", "/projets/stage/kakemono-2.webp", "/projets/stage/kakemono-3.webp", "/projets/stage/kakemono-4.webp", "/projets/stage/kakemono-5.webp"] },
]