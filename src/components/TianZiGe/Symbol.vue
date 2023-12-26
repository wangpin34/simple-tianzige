<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ char: string }>();

const list1 = "！？》";
const list2 = "“‘";
const list3 = "’”";
const list4 = "；：";
const list5 = "《";

const coordinate = computed(() => {
  if (list1.includes(props.char)) {
    return { x: 0, y: 768 };
  } else if (list2.includes(props.char)) {
    return { x: 768, y: 512 };
  } else if (list3.includes(props.char)) {
    return { x: 170, y: 512 };
  } else if (list4.includes(props.char)) {
    return { x: 0, y: 850 };
  } else if (list5.includes(props.char)) {
    return { x: 500, y: 768 };
  } else {
    return { x: 0, y: 900 };
  }
});
</script>
<template>
  <div
    class="aspect-square shrink relative outline-1 outline-slate-300 outline-dashed relative"
  >
    <svg viewBox="0 0 1024 1024" class="absolute top-0 left-0">
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
      <text
        :x="coordinate.x"
        :y="coordinate.y"
        style="font-size: 512px"
        class="font-family-cn"
      >
        {{ props.char }}
      </text>
    </svg>
  </div>
</template>
