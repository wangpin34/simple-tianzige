// uno.config.ts
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetWind()],
  rules: [
    [
      'm-content',
      {
        'margin-top': 'var(--van-nav-bar-height)',
        'margin-bottom': 'var(--van-action-bar-height)',
      },
    ],
  ],
  safelist: ['outline-red-500', 'outline-4'],
})
