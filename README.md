# 🐾 Parc à chiens — Parc de Chavigny (PWA web)

Application web progressive (PWA) gratuite et open source pour les visiteurs du
parc canin Chavigny, à Boisbriand (Québec). Voir qui est au parc en temps réel
et laisser de courtes notes — **sans inscription, sans aucune donnée conservée**.

🔗 **Application en ligne :** https://dogpark-web.vercel.app

## Fonctionnalités
- Carte satellite en temps réel des visiteurs présents (géorepérage du parc)
- Notes éphémères, mode visible / invisible, mode « voir à distance »
- 3 thèmes (Nature, Sakura, Neutre), bilingue FR / EN
- **Zéro donnée personnelle** collectée ou conservée (conforme à la Loi 25)

## Stack technique
React + Vite + TypeScript · Leaflet (carte) · Socket.IO (temps réel) · PWA.
Le serveur temps réel est dans le dépôt [dogpark-server](https://github.com/caniparc-chavigny/dogpark-server).

## Développement
```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
```

## Sécurité & contribution
- Vulnérabilités : voir [SECURITY.md](SECURITY.md)
- Contribuer : voir [CONTRIBUTING.md](CONTRIBUTING.md)

## Licence
[MIT](LICENSE) — librement réutilisable, notamment par d'autres municipalités.
