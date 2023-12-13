<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useGraphicsStore from './store/graphics';
import { itemsStore } from "./store/index";
import type { Graphic, Item } from "./types/index";

const graphicsStore = useGraphicsStore()

const activeTab = ref(0);
const router = useRouter();
const route = useRoute()

const showTabbar = computed(() => route.path === '/' || route.path === '/settings')


watch(activeTab, () => {
  switch (activeTab.value) {
    case 0:
      router.push("/");
      break;
    case 1:
      router.push("/settings");
      break;
    default:
      console.log(`unknown tab(${activeTab.value}) activated`);
  }
});

onMounted(() => {
  const cachedItemsVal = localStorage.getItem("items");
  if (cachedItemsVal) {
    const items = JSON.parse(cachedItemsVal);
    itemsStore.value = items ?? ([] as Item[]);
  }

  (async () => {
    const rep = await fetch("/graphics.txt");
    const gStr = await rep.text();
    const lines = gStr.split("\n").filter((s) => !!s);
    const graphics = lines
      .map((line) => JSON.parse(line) as Graphic)
      .reduce((a, c) => {
        a[c.character.charCodeAt(0)] = c;
        return a;
      }, {} as Record<string, Graphic>);
    graphicsStore.graphics = graphics
  })();
});

watch(
  itemsStore,
  () => {
    localStorage.setItem("items", JSON.stringify(itemsStore.value));
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-50">
    <router-view></router-view>
    <van-tabbar v-model="activeTab" v-if="showTabbar">
      <van-tabbar-item icon="orders-o">字帖</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped></style>
