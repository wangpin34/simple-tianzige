// uno.config.ts
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetWind()],
  safelist: ['outline-red-500', 'outline-4'],
})
