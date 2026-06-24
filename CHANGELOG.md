# Journal des modifications / Changelog

Toutes les modifications notables de ce projet sont documentées ici.
Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/)
et le projet suit le [versionnage sémantique](https://semver.org/lang/fr/).

## [1.0.0] — 2026-06-24

### Ajouté
- Carte satellite en temps réel des visiteurs présents (géorepérage du parc).
- Notes éphémères, mode visible / invisible, mode « voir à distance » (spectateur).
- Trois thèmes (Nature, Sakura, Neutre) et interface bilingue FR / EN.
- Serveur temps réel durci : plafond de 100 visiteurs simultanés, anti-flood par
  socket, diffusion groupée, validation stricte des entrées.
- Statistiques agrégées en lecture seule (`/stats`) — aucune donnée individuelle.
- Suite de tests automatisés (géorepérage, génération de noms).
- Fichiers de gouvernance : LICENSE (MIT), SECURITY.md, CONTRIBUTING.md.

### Principe fondateur
- **Zéro donnée personnelle** collectée ou conservée (conforme à la Loi 25 du Québec).
