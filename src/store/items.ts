import type { Item } from 'types/index'
import { defineStore } from 'pinia'

const itemsStore = defineStore('items', {
  state: () => ({
    items: [] as Item[]
  }),
  getters: {
    item: (state) => {
      return (id: string) => state.items.find(item => item.id === id)
    },
  },
  actions: {
    replaceItems(newItems: Item[]) {
      this.items = newItems
    },
    add (item: Item) {
      this.items.unshift(item)
    },
    remove (item: Item) {
      const index = this.items.findIndex(i => i.id === item.id)
      if (index >= 0) {
        this.items.splice(index, 1)
        return true
      }
      return false
    }
  }
})

export default itemsStore