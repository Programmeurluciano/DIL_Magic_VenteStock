# DIL Magic VenteStock


Ce projet est une application React construite avec Vite et TypeScript. Il fournit une configuration minimale pour faire fonctionner React avec Vite, le rechargement à chaud des modules (HMR) et quelques règles ESLint. Cette configuration utilise SWC pour un rafraîchissement rapide.

## Stack Technique

*   **React 19**
*   **TypeScript**
*   **Vite** (avec [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utilisant [SWC](https://swc.rs/) pour le Fast Refresh)
*   **ESLint**

## Bien démarrer

### Prérequis

*   Node.js (v18.x ou v20.x ou plus recommandé)
*   npm (inclus avec Node.js)

### Installation

1.  Cloner le dépôt :
    ```bash
    git clone https://github.com/programmeurluciano/DIL_Magic_VenteStock.git
    ```
2.  Aller dans le dossier du projet :
    ```bash
    cd DIL_Magic_VenteStock
    ```
3.  Installer les dépendances :
    ```bash
    npm install
    ```

## Scripts Disponibles

Dans le dossier du projet, vous pouvez exécuter les scripts suivants :

### `npm run dev`

Lance l’application en mode développement avec Vite.  
Ouvrez [http://localhost:5173](http://localhost:5173) (ou un autre port si 5173 est occupé) pour la voir dans le navigateur.  
La page se rechargera si vous effectuez des modifications. Vous verrez également les erreurs ESLint dans la console.

### `npm run build`

Construit l’application pour la production dans le dossier `dist`.  
Il assemble correctement React en mode production et optimise le build pour de meilleures performances.  
Ce script exécute d’abord `tsc -b` pour vérifier la compilation TypeScript.

### `npm run lint`

Analyse les fichiers du projet à l’aide d’ESLint selon les règles configurées.

### `npm run preview`

Servez localement le build de production depuis le dossier `dist`.  
Pratique pour vérifier le rendu final avant déploiement.

## Structure du projet
```text
src/
├── admin/                         # Partie admin (interface back-office)
│   ├── components/                # UI spécifique admin (table, modale…)
│   ├── layout/                    # Sidebar, AdminNavbar
│   ├── pages/                     # Dashboard, gestion produits/commandes
│   ├── routes/                    # Routing admin
│   └── store/                     # Stores spécifiques admin
│
├── client/                        # Partie visible par les clients
│   ├── components/                # UI client (cards, sliders…)
│   ├── layout/                    # Header, Footer client
│   ├── pages/                     # Accueil, Produit, Panier, Checkout
│   ├── routes/                    # Routing client
│   └── store/                     # Stores client (panier, produits…)
│
├── components/                    # UI partagée (modale, loader, button…)
│
├── constants/                     # Constantes globales (routes, configs…)
│
├── features/                      # Logique partagée (auth, produits…)
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   └── user/
│
├── hooks/                         # Hooks personnalisés (useDebounce, etc.)
│
├── lib/                           # Fonctions utilitaires (format, validation…)
│
├── services/                      # Gestion des appels API
│   ├── apiClient.ts               # Axios instance (token, baseURL…)
│   ├── auth.service.ts
│   ├── product.service.ts
│   ├── cart.service.ts
│   ├── order.service.ts
│   └── user.service.ts
│
├── store/                         # Stores globaux (UI, thème…)
│   ├── uiStore.ts
│   └── themeStore.ts
│
├── types/                         # Types TypeScript partagés
│   ├── product.ts
│   ├── user.ts
│   └── index.ts
│
├── i18n/                          # Traductions
│
├── App.tsx                        # Composant principal (routes centralisées)
├── main.tsx                       # Point d'entrée Vite
└── vite-env.d.ts
````

## Étendre la configuration ESLint

La configuration actuelle (`eslint.config.js`) fournit un ensemble de règles de base.  
Si vous développez une application pour la production, il est recommandé d’activer les règles de lint utilisant les types :

```js
// eslint.config.js
import tseslint from 'typescript-eslint';

export default tseslint.config({
  // ... autres configurations
  extends: [
    // Remplacez ...tseslint.configs.recommended ou js.configs.recommended par ceci
    ...tseslint.configs.recommendedTypeChecked,
    // Optionnel : utilisez ceci pour des règles plus strictes
    // ...tseslint.configs.strictTypeChecked,
    // Optionnel : ajoutez ceci pour des règles de style
    // ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // ... autres languageOptions
    parserOptions: {
      project: true, // ou ['./tsconfig.app.json', './tsconfig.node.json']
      tsconfigRootDir: import.meta.dirname,
    },
  },
  // ... autres configurations
});

