<script setup lang="ts">
import { textStore  } from '../store/index'
import { useRouter } from 'vue-router'
const router = useRouter()
const onOK = () => {
  router.back()
}
</script>

<template>
  <van-cell-group inset>
    <van-field v-model="textStore.value" type="textarea" label-align="top" label="文字" placeholder="输入文字" size="large" clearable
      autofocus />
  </van-cell-group>
  <van-button square type="primary" :click="onOK">完成</van-button>
</template>

<style scoped></style>
