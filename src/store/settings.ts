import { defineStore } from 'pinia'

enum Size {
  small,
  medium,
  large,
}

const defaultSettings = {
  size: Size.medium,
}

const settingsStore = defineStore('settings', {
  state: () => {
    return {
      settings: defaultSettings,
    }
  },
  getters: {
    size: (state) => {
      return state.settings.size
    },
    cols: (state) => {
      return sizeToCols(state.settings.size)
    },
  },
  actions: {
    setSize(size: Size) {
      this.settings.size = size
    },
  },
})

export function sizeToCols(size: Size) {
  switch (size) {
    case Size.small:
      return 10
    case Size.medium:
      return 7
    case Size.large:
      return 5
    default:
      return 5
  }
}

export default settingsStore
