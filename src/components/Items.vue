<script setup lang="ts">
import { useRouter } from "vue-router";
import useItemsStore from "../store/items";
import ItemCard from "./ItemCard.vue";

const itemsStore = useItemsStore();
const router = useRouter();
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full">
    <van-nav-bar title="字帖" :fixed="true">
      <template #right>
        <van-icon name="plus" size="18" @click="router.push('/create')" />
      </template>
    </van-nav-bar>
    <div id="home" class="m-content p-8 grow max-h-full flex flex-col gap-2">
      <div class="flex-grow">
        <div class="grid grid-cols-2 gap-4">
          <template v-for="item in itemsStore.items">
            <ItemCard :item="item" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
