import { reactive } from 'vue'
import type { Graphic, Item } from 'types/index'


export const itemsStore = reactive<{value: Item[]}>({
  value: []
})

export const textStore = reactive({
  value: '简单田字格'
})

export const graphicsStore = reactive<{
  value: Record<string, Graphic>
}>({
  value: {}
})