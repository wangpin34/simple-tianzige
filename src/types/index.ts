interface Graphic {
  character: string
  strokes: string[]
  medians: Array<[number, number]>
}

// TianZiGe Item
interface Item {
  id: string
  text: string
}

export type { Graphic, Item }