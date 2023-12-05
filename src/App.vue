<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import type { Graphic  } from './types/index'
import { graphicsStore } from './store/index'

const route = useRoute()
const isNotHome = computed(() => route.path !== '/')

const onBack = () => {
  if (isNotHome) {
    history.back()
  }
}

onMounted(() => {
  (async () => {
    const rep = await fetch("/graphics.txt");
    const gStr = await rep.text();
    const lines = gStr.split("\n").filter((s) => !!s);
    graphicsStore.value = lines
      .map((line) => JSON.parse(line) as Graphic)
      .reduce((a, c) => {
        a[c.character.charCodeAt(0)] = c;
        return a;
      }, {} as Record<string, Graphic>);
  })()
  
})

</script>

<template>
  <van-nav-bar title="简单字帖" v-bind:left-arrow="isNotHome" v-bind:left-text="`${isNotHome ? '返回' : ''}`"  @click-left="onBack"/>
  <div class="px-8">
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
