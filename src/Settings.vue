<script setup lang="ts">
import { ref } from 'vue';
import Footer from './components/Footer.vue';
import useSettingsStore from './store/settings';
const settingsStore = useSettingsStore()
const size = ref(settingsStore.size)
</script>

<template>
  <van-nav-bar title="设置" :fixed="true">
    </van-nav-bar>
  <main class="m-content p-8 flex flex-col justify-start">
    <div class="py-4 flex items-center">
      <van-icon name="/icons/font.svg" size="14" class="pr-4" />
      <van-slider
        v-model="size"
        :min="0"
        :max="2"
        :step="1"
        @change="(n) => settingsStore.setSize(n)"
      />
      <van-icon name="/icons/font.svg" size="20" class="pl-4" />
    </div>
  </main>
   <Footer />
</template>
