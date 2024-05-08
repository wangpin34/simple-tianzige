import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: parseInt(process.env.PORT || '3000'),
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => ['qr-code'].includes(tag),
        },
      },
    }),
    UnoCSS(),
    viteTsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      // includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'], // other assets you want to cache
      injectRegister: 'script-defer',
      workbox: {
        globPatterns: ['**/*'], // cache all files
        skipWaiting: true, // auto update service worker
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: '田字格',
        short_name: '田字格',
        description: '田字格是一个适用于手机端的汉字笔顺应用',
        theme_color: '#c03f3c',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/icon_x48.png',
            type: 'image/png',
            sizes: '48x48',
          },
          {
            src: '/icon_x72.png',
            type: 'image/png',
            sizes: '72x72',
          },
          {
            src: '/icon_x96.png',
            type: 'image/png',
            sizes: '96x96',
          },
          {
            src: '/icon_x128.png',
            type: 'image/png',
            sizes: '128x128',
          },
          {
            src: '/icon_x192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/icon_x384.png',
            type: 'image/png',
            sizes: '384x384',
          },
          {
            src: '/icon_x512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],
})
