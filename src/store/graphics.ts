import { defineStore } from 'pinia'
import type { Graphic } from 'types/index'

const graphicsStore = defineStore('graphics', {
  state: () => ({
    graphics: {} as Record<string, Graphic>,
  }),
  getters: {
    getGraphics: (state) => state.graphics,
    getGraphicsByCode: (state) => {
      return (code: number) => {
        return state.graphics[code]
      }
    },
    graphic: (state) => {
      return (code: number) => {
        return state.graphics[code]
      }
    },
  },
  actions: {
    replaceGraphics(newGraphics: Record<string, Graphic>) {
      this.graphics = newGraphics
    },
    addGraphic(code: number, graphic: Graphic) {
      this.graphics[code] = graphic
    },
  },
})

export default graphicsStore
