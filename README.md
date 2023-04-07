# IDL Mini-Projet

Ce projet réalisé par **Sqlt+ _GNYG%M (groupe ???µ)** est un simple solitaire.

Il à pour but d'être évaluer sur sa documentation aussi bien du **code** que de ce **README**.

Il permet ni plus ni moins que de jouer au solitaire tout en donnant la possibilité de **redémarer la partie** si celle ci devient impossible ou trop longue.
<br>

## Configuration / Compilation

<ins>La configuration du projet est la suivante:</ins>
```JSON
{
    "compilerOptions": {
        "target": "es2016",
        "sourceMap": true,
        "outDir": "build",
        "experimentalDecorators": true,
    },
    "exclude": [
        "node_modules"
    ]
}
```
Libre à vous de la changer mais je ne garantie aucunement le bon fonctionnement du projet en ce cas.
<br>

Afin de compiler le projet vous devez avoir, au préalable, installé [TypeScript](https://www.typescriptlang.org/),<br>
puis, ensuite, exécuter les commandes suivantes dans votre **terminal**:

• `cd {le chemin de votre Pc où installer le projet}`

• `git clone https://gitlab.univ-nantes.fr/E223023R/distanciel-idl-jeu-cartes.git`

• `cd distanciel-idl-jeu-cartes`

• `npm install`

• `tsc`
<br>

Si la documentation du projet vous intéresse, effctuer la commande `npm run docs` à la racine du projet puis ouvrez le fichier `docs/index.html` ou aller sur le fichier `index.html` et cliquez sur le bouton en haut à gauche de l'écran pour vous y rendre (ce bouton ne marche que si la documentation a été généré).
<br>

## Comment l'utiliser

Une fois compilé vous pouvez simplement ouvrir le fichier `index.html` présent à la racine du projet et jouer au solitaire.
Si vous ne connaissez pas les règles du solitaires, pas de panique, cliquez simplement sur le petit `?` en haut à gauche de la page puis lisez.
<br>
Si vous ne voulez pas installer le tout mais quand même jouer au solitaire, vous pouvez le faire [ici](https://idlsolitaire.studio-evident.fr).
La documentation est également disponible [ici](https://idlsolitaire.studio-evident.fr/docs).
<br>

## Structure du projet

<ins>Le projet comporte:</ins>

• Le dossier `src/` où sont stocké les fichiers modules fournissant type, énumérations et fonctions utilitaires sur les cartes ou le jeu en lui même.

• Le fichier `main.ts` permettant d'utiliser les différents modules afin d'assurer le bon fonctionnement du solitaire.

• Le fichier `index.html` ainsi que le dossier `styles/` comportant 3 fichier `.css` permettant dans l'ensemble de fournir une interface graphique au dit solitaire.

• Le dossier `ressources/` comportant toutes les images nécéssaire au projet.

• Le dossier `build/` contenant tous les fichier `.ts` compilé en `.js`

• Le dossier `docs/` contenant la documentation du projet si vous l'avez généré.
<br>

## License

Ce projet ne possède pas de license, il est en open source complet.
Il vous est possible de le modifier autant que vous le souhaitez, aucun citation de l'auteur n'est obligatoire si vous l'utilisez même si cela reste très apprécié.
<br>

## Contact

[![Github](https://img.shields.io/badge/Github-%23161b22.svg?logo=Github&logoColor=white)](https://github.com/TheMisterObvious) [![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/th3misterobvious) [![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?logo=stack-overflow&logoColor=white)](https://stackoverflow.com/users/20817296) [![Website](https://img.shields.io/website?down_color=red&down_message=down&up_color=green&up_message=up&url=https%3A%2F%2Fstudio-evident.fr)](https://studio-evident.fr)
