<script setup lang="ts">
</script>

<template>
  <van-action-bar safe-area-inset-bottom class="justify-around">
    <RouterLink to="/query" class="van-action-bar-icon">
      <van-icon name="search" size="18" />
      <span class="text-xs"> 查询 </span>
    </RouterLink>
    <RouterLink to="/items" class="van-action-bar-icon">
      <van-icon name="orders-o" size="18" />
      <span class="text-xs"> 字帖 </span>
    </RouterLink>
    <RouterLink to="/settings" class="van-action-bar-icon">
      <van-icon name="setting-o" size="18" />
      <span class="text-xs"> 设置 </span>
    </RouterLink>
    <RouterLink to="/about" class="van-action-bar-icon">
      <van-icon name="info-o" size="18" />
      <span class="text-xs"> 关于 </span>
    </RouterLink>
  </van-action-bar>
</template>
<style>
.router-link-active {
  color: #827100;
}
</style>
