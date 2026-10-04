import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'] },
      manifest: {
        name: 'দুর্যোগ বন্ধু — Durjog Bondhu',
        short_name: 'দুর্যোগ বন্ধু',
        description: 'Offline Bangla disaster preparedness companion for Bangladesh — cyclone signals, flood & lightning safety, shelter finder, emergency kit and SOS.',
        theme_color: '#0f766e',
        background_color: '#f0fdfa',
        display: 'standalone',
        lang: 'bn',
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
