// uno.config.ts
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind({
      theme: {
        extend: {
          colors: {
            wuzhilv: '#123456', // Replace '#123456' with the actual color value of 'wuzhilv'
            // Add more colors...
          },
        },
      },
    }),
  ],
  rules: [
    [
      'm-content',
      {
        'margin-top': 'var(--van-nav-bar-height)',
        'margin-bottom': 'var(--van-action-bar-height)',
      },
    ],
    [
      'font-family-cn',
      {
        'font-family':
          '"Helvetica", "Arial", "LiHei Pro", "黑體-繁", "微軟正黑體", sans-serif',
      },
    ],
  ],
  safelist: [
    'outline-red-500',
    'outline-4',
    ...['none', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
      (n) => `grid-cols-${n}`
    ),
    'bg-wuzhilv',
  ],
})
