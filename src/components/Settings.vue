<script setup lang="ts">
import { ref } from 'vue'
import { settingsStore } from '../store/settings'
import { showToast } from 'vant'

const colsNum = ref(settingsStore.value.tianzige.colsNum)

const onChange = (value: number) => {
  colsNum.value = value
}

const onSave = () => {
  settingsStore.value.tianzige.colsNum = colsNum.value
  showToast('保存成功')
}
</script>

<template>
  <van-nav-bar title="设置">
    <template #right>
      <span @click="onSave">完成</span>
    </template>
  </van-nav-bar>
  <div class="m-8">
    <div class="bg-white px-4 pt-2 pb-8 rounded-lg">
      <h1 class="text-lg leading-normal">田字格排版</h1>
      <div class="flex flex-col gap-4">
        <label class="text-md leading-tight">每行格数({{ colsNum }})</label>
        <van-slider
          v-model="colsNum"
          :min="1"
          :max="10"
          :step="1"
          @change="onChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
