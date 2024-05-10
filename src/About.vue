<script setup lang="ts">
import Footer from './components/Footer.vue';
</script>
<template>
  <van-nav-bar title="关于" :fixed="true"> </van-nav-bar>
  <main class="m-content">
    <div id="home" class="m-content p-8 grow max-h-full flex flex-col gap-2">
      田字格 搜索汉字笔顺，分享和创建字帖
    </div>
  </main>
  <Footer />
</template>
