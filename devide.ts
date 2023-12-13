import fs from 'fs/promises'
import path from 'path'
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
        path.join('public/graphics', `${charCode}.json`),
        g,
        'utf-8'
      )
    }
  }
})()
