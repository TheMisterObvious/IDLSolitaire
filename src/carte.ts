/**
 * Représente une couleur de carte
 */
export enum Couleur {
    Coeur,
    Carreau,
    Pique,
    Trefle
}

/**
 * Représente une carte
 */
export type Carte = {
    /**
     * Valeur de la carte (comprise entre 2 et 14)
     */
    valeur: number;

    /**
     * Couleur de la carte
     */
    couleur: Couleur;
}

/**
 * Crée une carte
 * @param valeur Valeur de la carte (comprise entre 2 et 14)
 * @param couleur Couleur de la carte
 * @returns La carte créée
 * @throws Une erreur si la valeur n'est pas comprise entre 2 et 14
 */
export function creerCarte(valeur: number, couleur: Couleur): Carte {
    if (valeur < 2 || valeur > 14) throw new Error('La valeur doit être comprise entre 2 et 14');
    return { valeur, couleur };
}

/**
 * Obtenir la valeur et la couleur d'une carte
 * @param carte 
 * @returns La valeur et la couleur de la carte
 */
export function obtenirCarte(carte: Carte) {
    const valeur = carte.valeur === 11 ? 'J' : carte.valeur === 12 ? 'Q' : carte.valeur === 13 ? 'K' : carte.valeur === 14 ? 'A' : carte.valeur;

    let couleur = '';
    switch (carte.couleur) {
        case Couleur.Coeur:
            couleur = '♥';
            break;
        case Couleur.Carreau:
            couleur = '♦';
            break;
        case Couleur.Pique:
            couleur = '♠';
            break;
        case Couleur.Trefle:
            couleur = '♣';
            break;
    }

    return `${valeur}${couleur}`;
}

/**
 * Affiche une carte
 * @param carte La carte à afficher
 */
export function afficherCarte(carte: Carte): void {
    console.log(obtenirCarte(carte));
}

/**
 * Compare deux cartes
 * @param carte1 La première carte
 * @param carte2 La seconde carte
 * @returns 1 si la première carte est supérieure à la seconde, -1 si la première carte est inférieure à la seconde, 0 si les deux cartes sont égales
 */
export function comparerCarte(carte1: Carte, carte2: Carte): number {
    if (carte1.valeur > carte2.valeur) return 1;
    else if (carte1.valeur < carte2.valeur) return -1;
    else return 0;
}

/**
 * Compare si deux cartes sont de la même couleur
 * @param carte1 La première carte
 * @param carte2 La seconde carte
 * @return true si les deux cartes sont de la même couleur, false sinon
 */
export function estMemeCouleur(carte1: Carte, carte2: Carte): boolean {
    return carte1.couleur === carte2.couleur;
}

/**
 * Compare si deux cartes sont du même "type de couleur" (Rouge ou Noir)
 * @param carte1 La première carte
 * @param carte2 La seconde carte
 * @return true si les deux cartes sont du même "type de couleur", false sinon
 */
export function estMemeTypeCouleur(carte1: Carte, carte2: Carte): boolean {
    const redType = [Couleur.Coeur, Couleur.Carreau];
    return redType.includes(carte1.couleur) === redType.includes(carte2.couleur);
}

/**
 * Compare si la première carte est supérieure de 1 seulement à la seconde
 * @param carte1 La première carte
 * @param carte2 La seconde carte
 * @return true si la première carte est supérieure de 1 seulement à la seconde, false sinon
 */
export function estSuperieurDe1(carte1: Carte, carte2: Carte): boolean {
    const asEgal1_1 = carte1.valeur === 14 ? 1 : carte1.valeur;
    const asEgal1_2 = carte2.valeur === 14 ? 1 : carte2.valeur;
    return asEgal1_1 - 1 === asEgal1_2;
}

/**
 * Compare si la première carte est inférieure de 1 seulement à la seconde
 * @param carte1 La première carte
 * @param carte2 La seconde carte
 * @return true si la première carte est inférieure de 1 seulement à la seconde, false sinon
 */
export function estInferieurDe1(carte1: Carte, carte2: Carte): boolean {
    const asEgal1_1 = carte1.valeur === 14 ? 1 : carte1.valeur;
    const asEgal1_2 = carte2.valeur === 14 ? 1 : carte2.valeur;
    return asEgal1_1 + 1 === asEgal1_2;
}

/**
 * Permet d'associer le type Carte à un élément HTML et de gérer l'affichage de la carte
 * @param carte La carte à associer
 * @param hidden true si la carte doit être cachée, false sinon
 * @throws Une erreur si la valeur n'est pas comprise entre 2 et 14
 * @throws Une erreur si la couleur n'est pas valide
 * @returns L'objet CarteHtml
 */
export class CarteHtml {
    public element: HTMLImageElement;

    constructor(public carte: Carte, private hidden: boolean = true) {
        // Vérification des paramètres
        if (carte.valeur < 2 || carte.valeur > 14) throw new Error('La valeur doit être comprise entre 2 et 14');
        if (!(carte.couleur in Couleur)) throw new Error('La couleur n\'est pas valide');

        // Création de l'élément HTML
        const img = document.createElement("img");
        img.id = obtenirCarte(carte);
        img.classList.add("carte");
        img.draggable = true;

        this.element = img;

        // Affichage de la carte (ou non)
        if (this.hidden) this.cacher();
        else this.afficher();
    }

    /**
     * Indique si la carte est cachée
     * @returns true si la carte est cachée, false sinon
     */
    get estCachee(): boolean {
        return this.hidden;
    }

    /**
     * Indique si la carte est visible
     * @returns true si la carte est visible, false sinon
     */
    get estVisible(): boolean {
        return !this.hidden;
    }

    /**
     * Affiche la carte si celle ci ne l'est pas déjà
     */
    afficher(): void {
        if (!this.hidden) return;

        this.hidden = false;
        this.element.src = `./ressources/${obtenirCarte(this.carte)}.png`;
    }

    /**
     * Cache la carte si celle ci ne l'est pas déjà
     */
    cacher(): void {
        if (this.hidden) return;

        this.hidden = true;
        this.element.src = `./ressources/dos_cartes.png`;
    }

    /**
     * Déplace la carte dans le pile (de façon visuelle)
     * @param nbDansPile Le nombre de cartes dans la pile
     */
    deplacer(nbDansPile: number): void {
        this.element.style.top = `${nbDansPile * 20}px`;
    }
}