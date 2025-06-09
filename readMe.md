# Portfolio Dynamique - Template SPA

Ce template fournit une structure de base pour un portfolio personnel sous forme de Single Page Application (SPA). Il est inspiré par des designs modernes et épurés, utilise [Tailwind CSS](https://tailwindcss.com/) pour le style, et intègre une animation générative avec [P5.js](https://p5js.org/).

## Structure du Projet


portfolio-spa/
├── index.html          # Fichier HTML principal (structure de la SPA)
├── css/
│   └── style.css       # Styles CSS personnalisés
├── js/
│   └── script.js       # Logique JavaScript pour la SPA, mode sombre, et animation P5.js
└── README.md           # Ce fichier d'instructions


## Palette de Couleurs Principale (Mode Sombre par défaut)

* **Fond Principal** : Noir profond (`near-black`)
* **Texte Principal** : Blanc cassé (`light-contrast`)
* **Couleur Primaire (Accents)** : Bleu Électrique (`electric-blue`)
* **Couleur Secondaire (Accents)** : Doré (`gold-custom`)

Le thème peut être basculé en mode clair via un bouton.

## Sections

La SPA est organisée autour des sections suivantes, accessibles via la barre de navigation :

1.  **Présentation (`#about`)**: Une introduction avec photo de profil et une phrase d'accroche.
2.  **Projets (`#projects`)**: Présentation des projets sous forme de chronologie.
3.  **Études (`#studies`)**: Parcours académique sous forme de chronologie.
4.  **IRL (`#irl`)**: Activités et passions personnelles, également en chronologie.
5.  **Socials (`#socials`)**: Liens vers les réseaux sociaux, style Linktree.
6.  **Animation (`#fibonacci`)**: Une section dédiée à une animation P5.js (motif floral basé sur Fibonacci).

## Comment Utiliser

1.  **Télécharger les fichiers** :
    * Créez un dossier pour votre projet (par exemple, `mon-portfolio-spa`).
    * À l'intérieur, créez les sous-dossiers `css` et `js`.
    * Copiez le contenu de `index.html` dans `mon-portfolio-spa/index.html`.
    * Copiez le contenu de `css/style.css` dans `mon-portfolio-spa/css/style.css`.
    * Copiez le contenu de `js/script.js` dans `mon-portfolio-spa/js/script.js`.

2.  **Ouvrir `index.html`** : Ouvrez `index.html` dans votre navigateur pour visualiser la page.

3.  **Personnaliser le contenu**:
    * **`index.html`**:
        * Remplacez `Votre Nom` dans l'en-tête et le pied de page.
        * Mettez à jour la photo de profil (actuellement `https://placehold.co/...`).
        * Personnalisez la phrase d'accroche et les détails dans la section "Présentation".
        * Remplissez les sections "Projets", "Études", et "IRL" avec vos propres informations, en suivant la structure des `<article class="timeline-item">`. Choisissez des icônes SVG pertinentes.
        * Mettez à jour les liens dans la section "Socials".
        * Ajustez les dates, titres, descriptions et tags.
    * **`js/script.js`**:
        * L'animation P5.js peut être personnalisée davantage (couleurs, vitesse, nombre de points, etc.) dans la fonction `initP5Sketch`.

4.  **Personnaliser le style (optionnel)**:
    * **Tailwind CSS**: Les classes sont utilisées directement dans `index.html`. La configuration de base des couleurs personnalisées (`electric-blue`, `gold-custom`, etc.) est injectée via un tag `<script>` dans le `<head>` pour la simplicité de ce template. Pour un projet plus conséquent, une installation locale de Tailwind avec un fichier `tailwind.config.js` est recommandée.
    * **`css/style.css`**: Contient des styles complémentaires pour les éléments de la chronologie, les titres de section, les liens sociaux, et les animations de transition des sections. Vous pouvez y ajouter vos propres règles.

5.  **Déployer**:
    * Hébergez ces fichiers sur des plateformes comme [GitHub Pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), etc.

## Fonctionnalités

* **Structure SPA** : Navigation fluide sans rechargement de page.
* **Design Moderne et Minimaliste** : Palette de couleurs noir, bleu électrique et doré.
* **Mode Sombre/Clair** : Bascule de thème avec persistance dans `localStorage`.
* **Sections Distinctes** : Présentation, Projets, Études, IRL, Socials.
* **Chronologie (Timeline)** : Pour présenter les expériences et projets de manière séquentielle.
* **Animation P5.js** : Motif floral génératif basé sur la suite de Fibonacci, intégré dans une section dédiée.
* **Responsive Design** : S'adapte aux différentes tailles d'écran.
* **Tailwind CSS & P5.js** : Utilisation de bibliothèques modernes.

## Pour aller plus loin

* **Installation locale de Tailwind CSS**: Pour une personnalisation avancée (via `tailwind.config.js`) et optimisation (PurgeCSS).
* **Routage côté client plus avancé**: Pour des URL uniques par section (par exemple avec `history.pushState` ou une petite bibliothèque de routage).
* **Internationalisation (i18n)**: Si vous avez besoin de supporter plusieurs langues.
* **Optimisation des performances**: Minification des assets, lazy loading pour les images si vous en ajoutez beaucoup.

---

Adaptez ce template pour qu'il reflète votre personnalité et votre parcours unique. Bonne création !
