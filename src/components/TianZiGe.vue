<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import useGraphicsStore from '../store/graphics';
import type { Graphic } from "../types/index";
const graphicsStore = useGraphicsStore()

const props = defineProps<{ char: string, selected?: boolean}>();

const graphic = ref<Graphic>()
const charCode = computed(() => props.char.charCodeAt(0))

onMounted(() => {
  graphic.value = graphicsStore.getGraphicsByCode(charCode.value)
  if (!graphic.value) {
    ;(async () => {
      const graphicObj = await fetch(`/graphics/${charCode.value}.json`).then(res => res.json())
      graphic.value = graphicObj
      graphicsStore.addGraphic(charCode.value, graphicObj)
    })()
  }
})

//const graphic = graphicsStore.graphics[props.char.charCodeAt(0)]
</script>

<template>
  <div  :data-char="char" class="aspect-square shrink relative outline-1 outline-slate-300 outline-dashed" :class="{'outline-4': props.selected}" @click="$emit('onSelected', props.char)">
  <svg v-if="!!graphic" viewBox="0 0 1024 1024" class="absolute top-0 left-0">
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
      <template v-for="stroke in graphic.strokes">
        <path :d="stroke"></path>
      </template>
    </g>
  </svg>
  </div>
</template>

<style scoped></style>
