import type { Item } from 'types/index'
import { reactive } from 'vue'

export const itemsStore = reactive<{ value: Item[] }>({
  value: [],
})

export const textStore = reactive({
  value: '简单田字格',
})
