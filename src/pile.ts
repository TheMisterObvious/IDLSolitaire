import { CarteHtml } from "./carte";

/**
 * Représente une pile de cartes
 * @param cartes Les cartes de la pile
 * @param element L'élément HTML de la pile
 * @returns L'objet Pile
 */
export class Pile {
    constructor(public cartes: CarteHtml[], public element: HTMLElement) {
        this.verificationEstVide();
    }

    /**
     * La carte du dessus de la pile
     * @returns La carte du dessus de la pile
     * @returns null Si la pile est vide
     */
    get carteDessus(): CarteHtml {
        return this.cartes[0] || null;
    }

    /**
     * Réinitialise la pile
     */
    reset(): void {
        // On vide la pile et on la réinitialise visuellement
        this.cartes = [];
        this.element.innerHTML = "";

        this.verificationEstVide(); // On lance une vérification qui va ajouter la classe "vide" à la pile
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
     * Ajoute une carte au dessus de la pile
     * @param carte La carte à ajouter
     */
    ajouterCarte(carte: CarteHtml): void {
        this.cartes = [carte, ...this.cartes]; // On ajoute la carte au dessus de la pile

        // On place la carte au dessus de la pile de façon visuelle
        carte.element.style.zIndex = "0";
        carte.deplacer(this.cartes.length - 1);
        this.element.appendChild(carte.element);

        this.verificationEstVide(); // On lance une vérification qui va retirer la classe "vide" à la pile
    }

    /**
     * Ajoute plusieurs cartes au dessus de la pile
     * @param cartes Les cartes à ajouter
     */
    ajouterCartes(cartes: CarteHtml[]): void {
        for (const carte of cartes) this.ajouterCarte(carte);
    }

    /**
     * Retire la carte du dessus de la pile
     * @returns La carte retirée
     * @returns null Si la pile est vide
     */
    retirerCarte(): CarteHtml {
        // On récupère la carte du dessus de la pile et on renvoie null si la pile est vide
        const carte = this.carteDessus;
        if (carte === null) return null;

        this.cartes = this.cartes.slice(1); // On retire la carte du dessus de la pile

        this.verificationEstVide(); // On vérifie si la pile est vide
        return carte;
    }

    /**
     * Retire plusieurs cartes du dessus de la pile
     * @param nb Le nombre de cartes à retirer
     * @returns Les cartes retirées
     */
    retirerCartes(nb: number): CarteHtml[] {
        const cartesRetirees = [];
        // On retire les cartes une par une
        for (let i = 0; i < nb; i++) cartesRetirees.push(this.retirerCarte());

        // Puis on inverse le tableau pour qu'elles soient dans le bon ordre
        return cartesRetirees.reverse();
    }

    /**
     * Récupère toutes les cartes sous la carte spécifiée (inclus)
     * @param carte La carte à partir de laquelle récupérer les cartes
     * @returns Les cartes sous la carte spécifiée
     */
    toutesEnDessous(carte: CarteHtml): CarteHtml[] {
        // Si la carte n'est pas dans la pile, on retourne un tableau vide
        const index = this.cartes.indexOf(carte);
        if (index === -1) return [];

        // Sinon, on retourne les cartes sous la carte spécifiée
        return this.cartes.slice(0, index + 1).reverse();
    }

    /**
     * Récupère une carte (version Html) à partir de son id (si elle se trouve dans la pile)
     * @param id L'id de la carte
     * @returns La carte
     * @returns null Si la carte n'existe pas dans la pile
     */
    carteFromId(id: string): CarteHtml {
        return this.cartes.find(carte => carte.element.id === id) || null;
    }
}