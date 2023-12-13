<script setup lang="ts">
import { useRouter } from 'vue-router';
import { itemsStore } from "../store/index";

const router = useRouter()

const colors = ['#569597', '#7ba1a8', '#f36838', '#ff4777', '#057748', '#574266', '#8d4bbb', '#3d3b4f']

const textToNumber = (text: string, max: number) => {
  const sum = text.split('').map(t => t.charCodeAt(0)).reduce((a, c) => a + c, 0)
  return sum % max
}

const textToColor = (text: string) => {
  const num = textToNumber(text, colors.length)
  return colors[num]
}

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
        <template v-for="item in itemsStore.value">
          <router-link :to="`/items/${item.id}`" class="rounded-lg p-5 aspect-square flex" :style="{ backgroundColor: textToColor(item.text) }">
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
