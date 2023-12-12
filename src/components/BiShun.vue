<script setup lang="ts">
import { computed } from "vue";
import { graphicsStore } from "../store/index";

const props = defineProps<{ char: string }>();

const charCode = computed(() => props.char.charCodeAt(0));
const graphic = computed(() => graphicsStore.value[charCode.value]);
</script>

<template>

    <template v-for="step in graphic.strokes.length">
      <div class="aspect-square shrink relative outline-1 outline-slate-300 outline-dashed">
      <svg viewBox="0 0 1024 1024" class="absolute top-0 left-0">
        <g stroke="gray" stroke-dasharray="1,1" stroke-width="1" transform="scale(4, 4)">
          <line x1="0" y1="0" x2="256" y2="256"></line>
          <line x1="256" y1="0" x2="0" y2="256"></line>
          <line x1="128" y1="0" x2="128" y2="256"></line>
          <line x1="0" y1="128" x2="256" y2="128"></line>
        </g>
        <g transform="scale(1, -1) translate(0, -900)">
          <template v-for="(stroke, index) in graphic.strokes.slice(0, step)">
            <path :d="stroke" :fill="`${index + 1 === step ? 'red' : '#1a2a3a'}`"></path>
          </template>
        </g>
      </svg>
      </div>
    </template>
</template>

<style scoped></style>
