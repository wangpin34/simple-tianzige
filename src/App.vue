<script setup lang="ts">
import { onMounted, watch } from "vue";
//import { useRouter } from "vue-router";

import useGraphicsStore from './store/graphics';
import useItemsStore from "./store/items";
import type { Graphic, Item } from "./types/index";

const itemsStore = useItemsStore()
const graphicsStore = useGraphicsStore()

// const activeTab = ref(0);
// const router = useRouter();

// watch(activeTab, () => {
//   switch (activeTab.value) {
//     case 0:
//       router.push("/");
//       break;
//     case 1:
//       router.push("/settings");
//       break;
//     default:
//       console.log(`unknown tab(${activeTab.value}) activated`);
//   }
// });

onMounted(() => {
  const cachedItemsVal = localStorage.getItem("items");
  if (cachedItemsVal) {
    try {
      const items = JSON.parse(cachedItemsVal);
      items && itemsStore.replaceItems(items as Item[])
    } catch(err) {
      console.error(err)
    }
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
  <div class="m-auto w-screen sm:max-w-[640px] flex flex-col h-screen bg-slate-50">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition as string || 'none'">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<style>

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-left-enter-to, .slide-left-leave-from, .slide-right-enter-to, .slide-right-leave-from {
  transform: translate(0%);
}

.slide-left-enter-from {
  transform: translate(100%);
}

.slide-left-leave-to {
  transform: translate(-100%);
}


.slide-right-enter-from {
  transform: translate(-100%);
}

.slide-right-leave-to {
  transform: translate(100%);
}

</style>
