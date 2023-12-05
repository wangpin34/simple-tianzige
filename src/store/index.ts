import { reactive } from 'vue'
import type { Graphic } from 'types/index'

export const textStore = reactive({
  value: '简单字帖'
})

export const graphicsStore = reactive<{
  value: Record<string, Graphic>
}>({
  value: {}
})