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
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50 MB
      },
      devOptions: {
        enabled: false,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: '简单田字格',
        short_name: '田字格',
        description: '简单田字格是一个适用于手机端的汉字笔顺应用',
        theme_color: '#FF5722',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192-maskable.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/icon-512-maskable.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],
})
