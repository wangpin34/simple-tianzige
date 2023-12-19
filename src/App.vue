<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import useGraphicsStore from './store/graphics';
import useItemsStore from "./store/items"
import type { Graphic, Item } from "./types/index";

const itemsStore = useItemsStore()
const graphicsStore = useGraphicsStore()

const activeTab = ref(0);
const router = useRouter();


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
    items && itemsStore.replaceItems(items as Item[])
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
    localStorage.setItem("items", JSON.stringify(itemsStore.items));
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-50">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
