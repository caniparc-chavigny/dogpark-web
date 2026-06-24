# 🎨 Thèmes — Parc à chiens Boisbriand

## ✨ Sélecteur intégré (méthode principale)

L'app a maintenant un **sélecteur de thème en direct** sur l'écran d'accueil :
3 pastilles **Sakura 🌸 · Nature 🌿 · Neutre ✨**. Un clic change tout
instantanément, et le choix est mémorisé (localStorage `dogpark_theme`).

- Les couleurs sont des **jetons CSS** définis dans `src/index.css`
  (`[data-theme='sakura' | 'nature' | 'neutre']`).
- Pour **ajouter un thème** : ajouter un bloc `[data-theme='xxx']` dans
  `src/index.css`, l'entrée dans `THEMES` de `src/context/ThemeContext.tsx`,
  et ses couleurs de carte dans `MAP_COLORS`.

---

## 📦 Snapshots de secours (ci-dessous)

Sauvegarde des anciens fichiers CSS, au cas où. Chaque dossier contient les
fichiers complets d'un thème. La méthode manuelle ci-dessous reste valable mais
n'est plus nécessaire grâce au sélecteur intégré.

---

## Thèmes disponibles

### 01-foret (thème original)
Vert forêt sombre, sobre et naturel. C'était le tout premier design.
- `index.css` → va dans `src/index.css`
- `screens.module.css` → va dans `src/screens/screens.module.css`
- N'utilise PAS de pétales de sakura.

### 02-aube-de-sakura (thème actuel) 🌸
Aube japonaise : dégradé crème → rose → ciel, pétales de cerisier qui dansent,
police arrondie (Zen Maru Gothic + M PLUS Rounded 1c), boutons tout doux.
Conçu pour inspirer l'émerveillement à l'ouverture.
- `index.css` → va dans `src/index.css`
- `screens.module.css` → va dans `src/screens/screens.module.css`
- `sakura.module.css` → va dans `src/components/sakura.module.css`
- Utilise le composant `src/components/SakuraPetals.tsx`.

---

## Comment changer de thème

### Revenir au thème Forêt (01)
1. Copier `themes/01-foret/index.css` → `src/index.css`
2. Copier `themes/01-foret/screens.module.css` → `src/screens/screens.module.css`
3. Dans chaque écran (`LanguageScreen`, `ConsentScreen`, `ClosedScreen`,
   `NoteScreen`), retirer la ligne `<SakuraPetals />` et son import.
   (Le laisser ne casse rien, mais affiche des pétales roses sur fond vert.)

### Revenir au thème Sakura (02)
1. Copier `themes/02-aube-de-sakura/index.css` → `src/index.css`
2. Copier `themes/02-aube-de-sakura/screens.module.css` → `src/screens/screens.module.css`
3. Copier `themes/02-aube-de-sakura/sakura.module.css` → `src/components/sakura.module.css`
4. S'assurer que `<SakuraPetals />` est présent dans les écrans.

---

## Commande rapide (PowerShell)

```powershell
# Exemple : revenir au thème Forêt
$t = "C:\Users\Frozen\dogpark-web\themes\01-foret"
Copy-Item "$t\index.css" "C:\Users\Frozen\dogpark-web\src\index.css" -Force
Copy-Item "$t\screens.module.css" "C:\Users\Frozen\dogpark-web\src\screens\screens.module.css" -Force
```

> 💡 Après tout changement de thème : relancer `npm run dev` pour voir le rendu,
> puis `vercel --prod` pour déployer en production.

---

## Idées de thèmes futurs
- **Crépuscule** — couchers de soleil orangés (la fin de journée au parc)
- **Hiver québécois** — bleus glacés, flocons au lieu des pétales
- **Forêt enchantée** — vert tendre + lucioles dorées
