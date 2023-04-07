import { creerCarte, Couleur, Carte } from "./carte.js";

/**
 * Crée un jeu de 52 cartes
 * @returns Le jeu de cartes
 */
export function creerJeu() {
    const cartes = [];

    for (let i = 2; i <= 14; i++) {
        for (const couleur of [Couleur.Coeur, Couleur.Carreau, Couleur.Pique, Couleur.Trefle]) {
            cartes.push(creerCarte(i, couleur));
        }
    }

    return cartes;
}

/**
 * Tire la carte au dessus du jeu
 * @param jeu 
 * @returns Première carte du jeu
 * @throws Une erreur si le jeu est vide
 */
export function tirerCarte(jeu: Carte[]): Carte {
    if (jeu.length === 0) throw new Error('Le jeu est vide');
    return jeu.shift();
}

/**
 * Mélange le jeu de cartes
 * @param jeu Le jeu de cartes
 * @returns Le jeu de cartes mélangé
 */
export function melangerJeu(jeu: any[]) {
    const jeuMelange = [];

    while (jeu.length > 0) {
        const index = Math.floor(Math.random() * jeu.length);
        jeuMelange.push(jeu.splice(index, 1)[0]);
    }

    return jeuMelange;
}