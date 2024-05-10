<script setup lang="ts">
import { computed, ref } from 'vue';
import useGraphicsStore from '../../store/graphics';

const graphicsStore = useGraphicsStore()
const timestamp = ref(Date.now())
const props = defineProps<{ hanzi: string }>()
const charCode = computed(() => props.hanzi.charCodeAt(0))
const graphic = computed(() => graphicsStore.graphic(charCode.value))
const onReplay = () => {
  timestamp.value = Date.now()
}
</script>
<template>
  <div class="w-full box-border flex flex-col rounded-lg bg-white p-8">
    <div
      @click="onReplay"
      class="w-[180px] flex items-baseline justify-start"
    >
      <img
        :src="`/graphics-bishun/${charCode}.svg?timestamp=${timestamp}`"
        :alt="`${props.hanzi} 笔顺`"
        class="max-h-full aspect-square outline-1 outline-slate-300 outline-dashed"
      />
      <van-icon
        name="replay"
        size="24"
      />
    </div>
    <div class="mt-4 flex flex-row gap-4 flex-wrap">
      <template v-if="graphic" v-for="step in graphic.strokes.length">
        <div
          class="w-[125px] aspect-square shrink relative outline-1 outline-slate-300 outline-dashed"
        >
          <svg viewBox="0 0 1024 1024">
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
              <template
                v-for="(stroke, index) in graphic.strokes.slice(0, step)"
              >
                <path
                  :d="stroke"
                  :fill="`${index + 1 === step ? 'red' : '#1a2a3a'}`"
                ></path>
              </template>
            </g>
          </svg>
        </div>
      </template>
    </div>
  </div>
</template>
