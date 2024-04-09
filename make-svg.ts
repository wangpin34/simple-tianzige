import fs from 'fs/promises'
import path from 'path'

function graphicToSVG(graphic: { strokes: Array<string> }) {
  return `
<svg version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <g
    stroke="gray"
    stroke-dasharray="1,1"
    stroke-width="1"
    transform="scale(4, 4)"
  >
    <line x1="0" y1="0" x2="256" y2="256"></line>
    <line x1="256" y1="0" x2="0" y2="256"></line>
    <line x1="128" y1="0" x2="128" y2="256"></line>
    <line x1="0" y1="128" x2="256" y2="128"></line>
  </g>
  <g transform="scale(1, -1) translate(0, -900)">
    ${graphic.strokes.map((stroke) => `<path d="${stroke}"></path>`).join('\n')}
  </g>
</svg>
  `.trim()
}

;(async () => {
  const graphicsStr = await fs.readFile('public/graphics.txt', 'utf-8')
  const graphics = graphicsStr.split('\n').filter((s) => !!s)
  for (const g of graphics) {
    const graphic = JSON.parse(g)
    if (
      typeof graphic.character === 'string' &&
      graphic.character.length === 1
    ) {
      const charCode = graphic.character.charCodeAt(0)
      await fs.writeFile(
        path.join('public/hanzi-svg', `${charCode}.svg`),
        graphicToSVG(graphic),
        'utf-8'
      )
    }
  }
})()
