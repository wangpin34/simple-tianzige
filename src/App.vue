<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import type { Graphic, Item  } from './types/index'
import { graphicsStore, itemsStore } from './store/index'

const route = useRoute()
const router = useRouter()
const isNotHome = computed(() => route.path !== '/')

const onBack = () => {
  router.push('/')
}

onMounted(() => {

  const cachedItemsVal = localStorage.getItem('items')
  if (cachedItemsVal) {
    const items = JSON.parse(cachedItemsVal)
    itemsStore.value = items ?? [] as Item[]
  }

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

watch(itemsStore, () => {
  localStorage.setItem('items', JSON.stringify(itemsStore.value))
}, { deep: true })

</script>

<template>
  <div class="flex flex-col h-screen">
  <van-nav-bar :title="`简单田字格(${itemsStore.value.length})`" v-bind:left-arrow="isNotHome" v-bind:left-text="`${isNotHome ? '返回' : ''}`"  @click-left="onBack"/>
  <div class="px-8 grow bg-slate-50">
    <router-view></router-view>
  </div>
  </div>
</template>

<style scoped>

</style>
