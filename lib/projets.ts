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

export const projetsScolaires: Projet[] = [
    { id: "p1", titre: "Projet 3D", description: "Une création 3D à partir d'une architecture", type: "image", image: "/projets/3d-projet.webp", fit: "contain", images: ["/projets/oeuvre architecture.webp", "/projets/3d-projet.webp", "/projets/architecture 3d.webp"] },
    { id: "p2", titre: "Planche graphique", description: "Réflexion et création de logotypes", type: "image", image: "/projets/planche-graphique.webp", fit: "contain" },
    { id: "p3", titre: "Projet audiovisuel", description: "Créer une histoire et une atmosphère à travers de l'audio", type: "audio", media: "/projets/the_last_call.wav" },
    { id: "p4", titre: "Projet - Motion Design - JO", description: "S'approprier une marque et en créer une identité visuelle", type: "video", image: "/projets/logo-jo.webp", fit: "contain", media: "https://www.youtube.com/embed/7X4ZEA6hpwU", vertical: true },
    { id: "p5", titre: "Projet - Motion Design - Song", description: "Travail d'effets visuels et de transitions autour d'une musique", type: "video", image: "/projets/miniature-song.webp", fit: "contain", media: "https://www.youtube.com/embed/rbdMWDxqcTs", vertical: true },
    { id: "p6", titre: "Planche graphique - musical", description: "Recherche de visuelles autour de la musique", type: "image", image: "/projets/1.webp", fit: "contain", },
    { id: "p7", titre: "Projet - SloWorld", description: "Planche graphique autour de la nourriture culinaire d'un pays", type: "image", image: "/projets/mockup_sloworld.webp", fit: "contain", images: ["/projets/Concept1@2x-100.webp", "/projets/Concept2@2x-100.webp", "/projets/Concept3@2x-100.webp"] },
    { id: "p8", titre: "Projet - Typographique", description: "Recherche graphique à partir de lettres", type: "image", image: "/projets/typographie2.webp", fit: "contain", images: ["/projets/typographie1.webp", "/projets/typographie2.webp", "/projets/typographie3.webp"] },
    { id: "p9", titre: "Projet - Visual", description: "Création d'une ambiance graphique à destination des personnes malvoyantes", type: "image", image: "/projets/planche-graphique2.webp", fit: "contain", images: ["/projets/planche-graphique2.webp", "/projets/planche-graphique3.webp", "/projets/planche-graphique4.webp"] },
    { id: "p10", titre: "Projet - IA VarSport", description: "Imaginer et concevoir un site Internet à partir d'un concept libre et qui nous plaît", type: "image", image: "/projets/mockup-varsport.webp", fit: "contain", images: ["/projets/page-d'accueil-varsport.webp", "/projets/map-varsport.wbep", "/projets/associations-varsport.wbep", "/projets/categories-varsport.wbep"] },
];

export const projetsStage: Projet[] = [
    { id: "s1", titre: "Bibliothèque interactive", description: "Création d'une expérience interactive 3D sur le plan culturel", type: "interactif", image: "/projets/stage/miniature-bibliotheque.webp", lien: "https://www.compographie.com/bibliotheque/" },
    { id: "s2", titre: "Carte de visite BSK", description: "Création et réflexion autour de la mise en forme d'éléments", type: "image", image: "/projets/stage/maquette-cartes de visite5.webp", images: ["/projets/stage/maquette-cartes de visite1.webp", "/projets/stage/maquette-cartes de visite2.webp", "/projets/stage/maquette-cartes de visite3.webp", "/projets/stage/maquette-cartes de visite4.webp", "/projets/stage/maquette-cartes de visite5.webp", "/projets/stage/maquette-cartes de visite6.webp", "/projets/stage/maquette-cartes de visite7.webp", "/projets/stage/maquette-cartes de visite8.webp"] },
    { id: "s3", titre: "Carte de visite Grenier", description: "Création d'une carte de visite recto-verson de A à Z", type: "image", image: "/projets/stage/Maquettes_cartes de visites_EricGrenier4.webp", images: ["/projets/stage/Maquettes_cartes de visites_EricGrenier.webp", "/projets/stage/Maquettes_cartes de visites_EricGrenier2.webp", "/projets/stage/Maquettes_cartes de visites_EricGrenier3.webp", "/projets/stage/Maquettes_cartes de visites_EricGrenier4.webp"] },
    { id: "s4", titre: "Carte de visite SARL", description: "Réflexion et élaboration d'une carte de visite pour une société d'hivernage", type: "image", image: "/projets/stage/maquette_carte de visite_sarl.webp", images: ["/projets/stage/maquette_carte de visite_sarl.webp", "/projets/stage/maquette_carte de visite_sarl2.webp", "/projets/stage/maquette_carte de visite_sarl3.webp", "/projets/stage/maquette_carte de visite_sarl4.webp"] },
    { id: "s5", titre: "Motion Design Tutoriel", description: "Analyse et création d'un motion design à l'encontre des cliens pour faciliter un envoi de fichier", type: "video", image: "/projets/stage/miniature-motion-tuto.webp", media: "https://www.youtube.com/embed/QiNnxgR7J4A", vertical: false },
    { id: "s6", titre: "Kakemono Compographie", description: "Créer un chemin graphique montrant les différentes activités de l'entreprise en gardant la charte graphique", type: "image", image: "/projets/stage/Mockup Kakemono2.webp", images: ["/projets/stage/Mockup Kakemono.webp", "/projets/stage/Mockup Kakemono2.webp", "/projets/stage/Mockup Kakemono3.webp", "/projets/stage/Mockup Kakemono4.webp", "/projets/stage/Mockup Kakemono5.webp"] },
    { id: "s7", titre: "Soleil de Provence", description: "Imaginer une élément graphique pouvant être floqué sur des sacs et lui donner de la convivialité", type: "image", image: "/projets/stage/maquette-soleil1.webp", images: ["/projets/stage/maquette-soleil1.webp", "/projets/stage/maquette-soleil2.webp", "/projets/stage/maquette-soleil3.webp", "/projets/stage/maquette-soleil4.webp"] },
];

export const projetsPersonnels: Projet[] = [
    { id: "pp1", titre: "Affiche avec effet", description: "Assemblage et création d'effet sur une affiche, réflexion autour de la lumière", type: "image", image: "/projets/personnels/affiche-effets.webp", images: ["/projets/personnels/affiche-effets.webp", "/projets/personnels/affiche-effets-typo.webp"] },
    { id: "pp2", titre: "Bannière stylisée - Bleu", description: "Utilisation d'éléments graphique et d'un jeu d'effets afin de créer une atmosphère", type: "image", image: "/projets/personnels/header2.webp", images: ["/projets/personnels/header2.webp", "/projets/personnels/header2-typo.webp"] },
    { id: "pp3", titre: "Bannière stylisée - Bleu et Blanc", description: "Nouvelle bannière créative à base d'effets et de jeu de superposition de matiéres", type: "image", image: "/projets/personnels/header3.webp", images: ["/projets/personnels/header3.webp", "/projets/personnels/header3-typo.webp"] },
    { id: "pp4", titre: "Diorama - Fantasy", description: "Utilisation de la 3D afin de créer un diorama inspiré d'un univers", type: "image", image: "/projets/personnels/diorama_fantasy.webp", images: ["/projets/personnels/diorama_fantasy.webp"] },
    { id: "pp5", titre: "Diorama - StarTank", description: "Intégration dun diorama 3D pour accompagné l'univers d'un jeu vidéo", type: "image", image: "/projets/personnels/diorama_startank.webp", images: ["/projets/personnels/diorama_startank.webp", "/projets/personnels/diorama_startank_element1.webp", "/projets/personnels/diorama_startank_element2.webp"] },
    { id: "pp6", titre: "Isometric Room", description: "Utilisation de Blender afin de créer une mini chambre en isométrie", type: "image", image: "/projets/personnels/isometrie-1.webp", images: ["/projets/personnels/isometrie-1.webp", "/projets/personnels/isometrie-2.webp", "/projets/personnels/isometrie-3.webp"] },
    { id: "pp7", titre: "Plateau 3D", description: "Réalisation d'un plateau 3D sur Blender", type: "image", image: "/projets/personnels/plateau-3d.webp", images: ["/projets/personnels/plateau-3d.webp", "/projets/personnels/plateau-element1.webp", "/projets/personnels/plateau-element-2.webp"] },
    { id: "pp8", titre: "Projet Typographique Effets", description: "Réalisation d'effets sur typographie", type: "image", image: "/projets/personnels/typo-effet1.webp", images: ["/projets/personnels/typo-effet1.webp", "/projets/personnels/typo-effet2.webp"] },
    { id: "pp9", titre: "Fit4rm", description: "Conception d'une application de données pour la musculation, dans le style Flat Design", type: "image", image: "/projets/personnels/fit4rm-cover.webp", images: ["/projets/personnels/fit4rm1.webp", "/projets/personnels/fit4rm2.webp", "/projets/personnels/fit4rm3.webp", "/projets/personnels/fit4rm4.webp", "/projets/personnels/fit4rm5.webp", "/projets/personnels/fit4rm6.webp", "/projets/personnels/fit4rm7.webp", "/projets/personnels/fit4rm8.webp"] },

];