<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Graphic, Item } from "./types/index";
import { graphicsStore, itemsStore } from "./store/index";

const activeTab = ref(0);
const route = useRoute();
const router = useRouter();
const isNotHome = computed(() => route.path !== "/");

const onCreate = () => {
  router.push("/create");
};

const onBack = () => {
  router.push("/");
};

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
    graphicsStore.value = lines
      .map((line) => JSON.parse(line) as Graphic)
      .reduce((a, c) => {
        a[c.character.charCodeAt(0)] = c;
        return a;
      }, {} as Record<string, Graphic>);
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
    <van-tabbar v-model="activeTab">
      <van-tabbar-item icon="home-o">书架</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置(WIP)</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped></style>
