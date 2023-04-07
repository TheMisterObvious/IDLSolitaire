import { estMemeTypeCouleur, Carte, obtenirCarte, estInferieurDe1, estSuperieurDe1, estMemeCouleur, CarteHtml } from "./src/carte.js";
import { creerJeu, tirerCarte, melangerJeu } from "./src/jeu.js";
import { Paquet } from "./src/paquet.js";
import { Pile } from "./src/pile.js";

const jeu = creerJeu(); // Le jeu complet de cartes, jamais modifié

let deck: Carte[]; // La pile de cartes face cachée
const paquet = new Paquet([], document.getElementById("paquet")); // La pile de cartes face visible

// Les piles de cartes de la fin de jeu
const pileAs1 = new Paquet([], document.getElementById("pileAs1"));
const pileAs2 = new Paquet([], document.getElementById("pileAs2"));
const pileAs3 = new Paquet([], document.getElementById("pileAs3"));
const pileAs4 = new Paquet([], document.getElementById("pileAs4"));

// Les piles de cartes du terrain de jeu
const pile1 = new Pile([], document.getElementById("pile1"));
const pile2 = new Pile([], document.getElementById("pile2"));
const pile3 = new Pile([], document.getElementById("pile3"));
const pile4 = new Pile([], document.getElementById("pile4"));
const pile5 = new Pile([], document.getElementById("pile5"));
const pile6 = new Pile([], document.getElementById("pile6"));
const pile7 = new Pile([], document.getElementById("pile7"));

// Tous les éléments HTML dont on a besoin
// Eléments de la div d'acceuil
const startDiv = document.getElementById("start-div");
const solitaireBtn = document.getElementById("solitaire-btn");
// Eléments du jeu
const solitaire = document.getElementById("solitaire");
const deckCarte = document.getElementById("deck-card");
const paquetHtml = document.getElementById("paquet");
// Boutons et popups
const restart = document.getElementById("restart");
const popuprestart = document.getElementById("restart-popup");
const restartOui = document.getElementById("restart-oui");
const restartNon = document.getElementById("restart-non");

const aide = document.getElementById("aide");
const popupAide = document.getElementById("aide-popup");

const popupVictoire = document.getElementById("victoire-popup");
const victoireQuitter = document.getElementById("victoire-quitter");
const victoireRecommencer = document.getElementById("victoire-recommencer");

const popupBg = document.getElementById("popup-bg");

/**
 * Initialise une partie de solitaire
 * @ignore
 */
function jouerSolitaire() {
    // On cache la div d'acceuil et on affiche le jeu
    startDiv.classList.add("hide");
    restart.classList.remove("hide");
    solitaire.classList.remove("hide");

    // On mélange le jeu et on le place dans le deck
    deck = melangerJeu(creerJeu());
    deckCarte.classList.remove("vide");
    paquet.reset(); // Remise à zéro du paquet

    // Remise à zéro des piles d'as
    pileAs1.reset();
    pileAs2.reset();
    pileAs3.reset();
    pileAs4.reset();

    // Remise à zéro des piles du terrain
    pile1.reset();
    pile2.reset();
    pile3.reset();
    pile4.reset();
    pile5.reset();
    pile6.reset();
    pile7.reset();

    // On place les cartes dans les piles à la façon d'un vrai solitaire
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (i > j) continue;
            // /!\ eval() permet de transformer une chaîne de caractères en code Javascript
            // et donc de récupérer la pile correspondante à chaque tour de boucle
            // cela permet d'évité de répéter 7 fois la même ligne de code avec une pile différente.
            // Je préfère expliquer cela maintenant étant donné que vous reverez eval() plusieurs fois dans le code.
            // Ce n'est pas la meilleure solution, mais c'est la plus simple et la plus rapide à écrire.
            eval(`pile${j + 1}`).ajouterCarte(new CarteHtml(tirerCarte(deck), i !== j));
        }
    }
}

/**
 * Tire une carte du deck et la place dans le paquet
 * @ignore
 */
function tirerCarteDeck(): void {
    if (deck.length === 0) { // Si le deck est vide, on remet le paquet dans le deck
        deck = paquet.cartes.reverse().map((carte) => carte.carte); // On récupère les cartes du paquet, on les inverse et on récupère les cartes

        // On vide le paquet, aussi bien l'élément Html que le tableau de cartes
        paquet.cartes = [];
        paquet.element.innerHTML = "";
        
        deckCarte.classList.remove("vide"); // On enlève la classe "vide" du deck
        return;
    }
    
    // Création de la carte et ajout au paquet
    const carte = new CarteHtml(tirerCarte(deck), false);
    paquet.cartes = [carte, ...paquet.cartes];
    paquet.element.appendChild(carte.element);

    // Si le deck est vide, on ajoute la classe "vide" au deck
    if (deck.length === 0) deckCarte.classList.add("vide");
}

/**
 * Vérifie si la partie est gagnée
 * @returns Vrai si la partie est gagnée, faux sinon
 * @ignore
 */
function verificationVictoire(): boolean {
    return pileAs1.carteDessus?.carte.valeur === 13 && pileAs2.carteDessus?.carte.valeur === 13 && pileAs3.carteDessus?.carte.valeur === 13 && pileAs4.carteDessus?.carte.valeur === 13;
}

/**
 * Affiche la popup de victoire
 * @ignore
 */
function victoire(): void {
    popupBg.classList.remove("hide");
    popupVictoire.classList.remove("hide");
}

/**
 * Ouvre la popup d'aide
 * @ignore
 */
function ouvreAide(): void {
    popupBg.classList.remove("hide");
    popupAide.classList.remove("hide");
}

/**
 * Ouvre la popup de restart
 * @ignore
 */
function ouvreRestart(): void {
    popupBg.classList.remove("hide");
    popuprestart.classList.remove("hide");
}

/**
 * Ferme toutes les popups
 * @ignore
 */
function fermePopup(): void {
    popupAide.classList.add("hide");
    popuprestart.classList.add("hide");
    popupVictoire.classList.add("hide");
    popupBg.classList.add("hide");
}

/**
 * Gère le déplacement des cartes en initialisant les données de transfert dans l'objet DragEvent
 * @param e L'événement DragEvent
 * @ignore
 */
function dragStart(e: DragEvent): void {
    e.dataTransfer.setData("carte", (e.target as HTMLImageElement).id); // On enregistre l'id de la carte
    e.dataTransfer.setData("pile", (e.currentTarget as HTMLDivElement).id); // On enregistre l'id de la pile
}

/**
 * Gère le dépôt des cartes sur une pile du terrain
 * @param e L'événement DragEvent
 * @ignore
 */
function dropPileTerrain(e: DragEvent): void {
    e.preventDefault();

    // On récupère les données de transfert
    const carte = e.dataTransfer.getData("carte");
    const sourceId = e.dataTransfer.getData("pile");
    const destination = eval((e.currentTarget as HTMLDivElement).id) as Pile;

    if (sourceId === "paquet" || sourceId.includes("pileAs")) { // Si la carte vient du paquet ou d'un pile d'as
        // On récupère la pile source, la carte du dessus et on vérifie que ce n'est pas un 'faux transfert'
        // Grace à éval peut importe si c'est le paquet ou pile d'as étant donné que les 2 sont gérés de la même façon
        const source = eval(sourceId) as Paquet;
        const carteDessus = source.carteDessus;
        if (carteDessus === null) return;

        const carteDestination = destination.carteDessus; // On récupère la carte du dessus de la pile de destination
        if (carteDestination === null) return destination.ajouterCarte(source.tirerCarte()); // Si la pile de destination est vide, on ajoute la carte

        // Sinon on vérifie que la 'carte source' peut être posée sur la 'carte destination', si Vrai on continue, sinon on arrête
        if (!estInferieurDe1(carteDessus.carte, carteDestination.carte) || estMemeTypeCouleur(carteDessus.carte, carteDestination.carte)) return;
        
        destination.ajouterCarte(source.tirerCarte()); // Enfin on ajoute la carte à la pile de destination
        return;
    }

    // Si la carte vient d'une pile de terrain, on récupère la pile source et on vérifie que ce n'est pas un 'faux transfert'
    const source = eval(sourceId) as Pile;
    if (source === destination) return;

    const carteDessus = source.carteDessus; // On récupère la carte du dessus de la pile source
    // Si la carte transférée n'est pas la carte du dessus, on récupère toutes les cartes en dessous (déplacement de plusieurs cartes)
    const cartes = carte === obtenirCarte(carteDessus.carte) ? [carteDessus] : source.toutesEnDessous(source.carteFromId(carte));

    // On récupère la carte du dessus de la pile de destination
    const carteDestination = destination.carteDessus;
    if (carteDestination === null) { // Si la pile de destination est vide
        destination.ajouterCartes(cartes); // On ajoute les cartes à la pile de destination
        source.retirerCartes(cartes.length); // On retire les cartes de la pile source
        if (source.carteDessus !== null) source.carteDessus.afficher(); // Si la pile source n'est pas vide, on affiche la carte du dessus
        return;
    }

    // Sinon on vérifie que la 'carte source' peut être posée sur la 'carte destination', si Vrai on continue, sinon on arrête
    if (!estInferieurDe1(cartes[0].carte, carteDestination.carte) || estMemeTypeCouleur(cartes[0].carte, carteDestination.carte)) return;

    // Enfin on ajoute les cartes à la pile de destination et on retire les cartes de la pile source
    destination.ajouterCartes(cartes);
    source.retirerCartes(cartes.length);
    if (source.carteDessus !== null) source.carteDessus.afficher();
}

/**
 * Gère le dépôt des cartes sur une pile d'as
 * @param e L'événement DragEvent
 * @ignore
 */
function dropPileAs(e: DragEvent): void {
    e.preventDefault();

    // On récupère les données de transfert
    const carte = e.dataTransfer.getData("carte");
    const sourceId = e.dataTransfer.getData("pile");
    const destination = eval((e.currentTarget as HTMLDivElement).id) as Paquet;

    if (sourceId === "paquet") { // Si la carte vient du paquet
        // On récupère le paquet source, la carte du dessus et on vérifie que ce n'est pas un 'faux transfert'
        const carteDessus = paquet.carteDessus;
        if (carteDessus === null) return;

        // On récupère la carte du dessus de la pile d'as de destination
        const carteDestination = destination.carteDessus;
        if (carteDestination === null) { // Si la pile d'as de destination est vide
            if (carteDessus.carte.valeur !== 14) return; // Si la carte du dessus du paquet n'est pas un as, on arrête
            destination.ajouterCarte(paquet.tirerCarte()); // Sinon on ajoute la carte à la pile d'as de destination
            
            if (verificationVictoire()) victoire(); // On vérifie si avec cette carte posée la partie est gagnée
            return;
        }

        // Sinon on vérifie que la 'carte source' peut être posée sur la 'carte destination', si Vrai on continue, sinon on arrête
        if (!estSuperieurDe1(carteDessus.carte, carteDestination.carte) || !estMemeCouleur(carteDessus.carte, carteDestination.carte)) return;
        
        // Enfin on ajoute la carte à la pile d'as de destination et on retire la carte du paquet
        destination.ajouterCarte(paquet.tirerCarte());
        if (verificationVictoire()) victoire(); // On vérifie si avec cette carte posée la partie est gagnée
        return;
    }

    // Si la carte vient d'une pile d'as, on arrête (rien ne sert de déplacer d'un pile d'as à une autre, économie de temps)
    if (sourceId.includes("pileAs")) return;

    const source = eval(sourceId) as Pile; // On récupère la pile source

    // On récupère la carte du dessus de la pile source
    const carteDessus = source.carteDessus;
    // Si la carte transférée n'est pas une carte du dessus, on arrête (on ne peut déplacer qu'une carte à la fois)
    if (carte !== obtenirCarte(carteDessus.carte)) return;

    // On récupère la carte du dessus de la pile d'as de destination
    const carteDestination = destination.carteDessus;
    if (carteDestination === null) { // Si la pile d'as de destination est vide
        if (carteDessus.carte.valeur !== 14) return; // On vérifie que la carte à déplacer est un as, sinon on arrête

        // Sinon on ajoute la carte à la pile d'as de destination et on retire la carte de la pile source
        destination.ajouterCarte(carteDessus);
        source.retirerCarte();
        if (source.carteDessus !== null) source.carteDessus.afficher(); // Si la pile source n'est pas vide, on affiche la carte du dessus
        return;
    }

    // Sinon on vérifie que la 'carte source' peut être posée sur la 'carte destination', si Vrai on continue, sinon on arrête
    if (!estSuperieurDe1(carteDessus.carte, carteDestination.carte) || !estMemeCouleur(carteDessus.carte, carteDestination.carte)) return;

    // Enfin on ajoute la carte à la pile d'as de destination et on retire la carte de la pile source
    destination.ajouterCarte(carteDessus);
    source.retirerCarte();
    if (source.carteDessus !== null) source.carteDessus.afficher();

    if (verificationVictoire()) victoire(); // On vérifie si avec cette carte posée la partie est gagnée
}

// Ajout des lien évenements-functions nécessaires au bon fonctionnement du jeu
solitaireBtn.addEventListener("click", jouerSolitaire); // Bouton de lancement du jeu
deckCarte.addEventListener("click", tirerCarteDeck); // Clic sur le deck de carte

paquetHtml.addEventListener("dragstart", dragStart); // Récupération de la carte du paquet

// Dépot de la carte sur une pile et récupération de la carte depuis une pile
for (const pile of [...document.getElementsByClassName("pile")]) {
    pile.addEventListener("dragover", (e) => { e.preventDefault(); });
    pile.addEventListener("dragstart", dragStart);
    pile.addEventListener("drop", dropPileTerrain);
}

// Dépot de la carte sur une pile d'as et récupération de la carte depuis une pile d'as
for (const pile of [...document.getElementsByClassName("pileAs")]) {
    pile.addEventListener("dragover", (e) => { e.preventDefault(); });
    pile.addEventListener("dragstart", dragStart);
    pile.addEventListener("drop", dropPileAs);
}

popupBg.addEventListener("click", fermePopup); // Fermeture des popups en cliquant sur le fond
aide.addEventListener("click", ouvreAide); // Ouverture de la popup d'aide
restart.addEventListener("click", ouvreRestart); // Ouverture de la popup de restart
// Fermeture des popups en cliquant sur le bouton de fermeture
for (const ferme of [...document.getElementsByClassName("ferme")]) ferme.addEventListener("click", fermePopup);

// Choix de la réponse à la popup de restart
restartOui.addEventListener("click", () => {
    jouerSolitaire();
    fermePopup();
});
restartNon.addEventListener("click", fermePopup);

// Choix de la réponse à la popup de victoire
victoireQuitter.addEventListener("click", () => {
    startDiv.classList.remove("hide");
    restart.classList.add("hide");
    solitaire.classList.add("hide");
    
    fermePopup();
});
victoireRecommencer.addEventListener("click", () => {
    jouerSolitaire();
    fermePopup();
});