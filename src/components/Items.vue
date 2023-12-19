<script setup lang="ts">
import { useRouter } from 'vue-router';
import useItemsStore from "../store/items";
import { defaultColor } from '../utils/text'

const itemsStore = useItemsStore()
const router = useRouter()


</script>

<template>
  <van-nav-bar title="字帖" :fixed="true">
    <template #right>
      <van-icon name="plus" size="18" @click="router.push('/create')" />
    </template>
  </van-nav-bar>
  <div id="home" class="m-content p-8 grow  max-h-full flex flex-col gap-2">
    <div class="flex-grow">
      <div class="grid grid-cols-2 gap-4" >
        <template v-for="item in itemsStore.items">
          <router-link :to="`/items/${item.id}`" class="rounded-lg p-5 aspect-square flex" :style="{ backgroundColor: item.color ?? defaultColor }">
            <div class="grow overflow-clip">              
              <p class="m-0 text-base text-slate-100 leading-normal">{{ item.text }}</p>
            </div>
          </router-link>
        </template>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
