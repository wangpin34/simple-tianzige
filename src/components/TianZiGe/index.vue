<script setup lang="ts">
import { computed } from "vue";
import { isChineseChar } from "../../utils/char";
import useSettingsStore from "../../store/settings";
import HanZi from "./HanZi.vue";
import Symbol from './Symbol.vue'

const settingsStore = useSettingsStore();
const props = defineProps<{ text: string; cols?: number; selected?: number }>();
const textList = computed(() =>
  props.text?.split("").map((s, index) => ({
    id: index,
    char: s,
    isChinese: isChineseChar(s),
  }))
);
</script>
<template>
  <div
    v-if="textList?.length"
    class="grid gap-2 p-4 rounded-lg shadow-md shadow-slate-300 bg-white"
    :class="[`grid-cols-${cols ?? settingsStore.cols}`]"
  >
    <template v-for="text in textList">
      <HanZi
        v-if="text.isChinese"
        :selected="selected === text.id"
        :char="text.char"
        @selected="() => $emit('handle-selected', text.char, text.id)"
      />
      <Symbol v-else :char="text.char"/>
    </template>
  </div>
</template>
