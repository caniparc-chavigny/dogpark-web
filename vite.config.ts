import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Parc à chiens — Parc de Chavigny, Boisbriand',
        short_name: 'Parc à chiens',
        description: 'Carte en temps réel du parc à chiens du Parc de Chavigny, à Boisbriand. Aucune installation requise.',
        theme_color: '#4caf6a',
        background_color: '#f3fbf0',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
});
