<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()



</script>

<template>
    <van-action-bar class="justify-around">
      <van-action-bar-icon
        icon="search"
        text="搜索"
        @click="router.push('/query')"
      />
      <van-action-bar-icon
        icon="orders-o"
        text="字帖"
        @click="router.push('/items')"
      />
      <van-action-bar-icon
        icon="setting-o"
        text="设置"
        @click="router.push('/settings')"
      />
      <van-action-bar-icon
        icon="info-o"
        text="关于"
        @click="router.push('/about')"
      />
    </van-action-bar>
</template>
<style scoped></style>