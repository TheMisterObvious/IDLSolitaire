import { CarteHtml } from "./carte"

/**
 * Représente un paquet de cartes (pile de cartes avec seulement la carte du dessus visible)
 * @param cartes Les cartes du paquet
 * @param element L'élément HTML du paquet
 * @returns L'objet Paquet
 */
export class Paquet {
    constructor(public cartes: CarteHtml[], public element: HTMLElement) {
        this.verificationEstVide();
    }

    /**
     * La carte du dessus du paquet
     * @returns La carte du dessus du paquet
     * @returns null Si le paquet est vide
     */
    get carteDessus(): CarteHtml {
        return this.cartes[0] || null;
    }

    /**
     * Réinitialise le paquet
     */
    reset(): void {
        // On vide le paquet et on le réinitialise visuellement
        this.cartes = [];
        this.element.innerHTML = "";

        this.verificationEstVide(); // On lance une vérification qui va ajouter la classe "vide" au paquet
    }

    /**
     * Vérifie si le paquet est vide et ajoute ou enlève la classe "vide" en conséquence
     * @private
     */
    private verificationEstVide(): void {
        if (this.cartes.length === 0) this.element.classList.add("vide");
        else this.element.classList.remove("vide");
    }

    /**
     * Ajoute une carte au dessus du paquet
     * @param carte La carte à ajouter
     */
    ajouterCarte(carte: CarteHtml): void {
        this.cartes = [carte, ...this.cartes]; // On ajoute la carte au dessus du paquet
        
        // On place la carte au dessus du paquet de façon visuelle
        carte.element.style.top = "0px";
        carte.element.style.zIndex = this.cartes.length.toString();
        this.element.appendChild(carte.element); 

        this.verificationEstVide(); // On lance une vérification qui va retirer la classe "vide" au paquet
    }

    /**
     * Retire la carte du dessus du paquet
     * @returns La carte retirée
     * @returns null Si le paquet est vide
     */
    tirerCarte(): CarteHtml {
        // On récupère la carte du dessus du paquet et on renvoie null si le paquet est vide
        const carte = this.carteDessus;
        if (carte === null) return null;

        this.cartes = this.cartes.slice(1); // On retire la carte du dessus du paquet

        this.verificationEstVide(); // On vérifie si le paquet est vide
        return carte;
    }
}