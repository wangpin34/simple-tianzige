<script setup lang="ts">
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import useItemsStore  from '../store/items'
import useSettingsStore from '../store/settings'
import BiShun from './BiShun.vue'
import TianZiGe from './TianZiGe/index.vue'
import { textToColor } from '../utils/text'

const itemsStore = useItemsStore()
const settingsStore = useSettingsStore()
const size = computed(() => settingsStore.size)
const text = ref<string>('')
const isValid = computed(() => !!text.value)
const router = useRouter()
const onOK = () => {
  const id = nanoid()
  const item = {
    id,
    text: text.value,
    color: textToColor(text.value)
  }
  itemsStore.add(item)
  router.push('/items/' + id)
}

const onBack = () => {
  router.push('/')
}

const showBinShun = ref(false)
const showSettings = ref(false)
const theChar = ref<string>()
const onTianZiGeClick = (char: string) => {
  theChar.value = char
  showBinShun.value = true
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full">
  <van-nav-bar title="新建" :fixed="true">
    <template #left>
      <van-icon name="arrow-left" size="18" @click="onBack" />
    </template>
    <template #right>
      <span @click="onOK">完成</span>
    </template>
  </van-nav-bar>
  <div class="m-content p-8">
    <van-cell-group class="bg-white p-4 rounded-lg">
      <van-row>
        <van-field
          v-model="text"
          type="textarea"
          placeholder="输入文字"
          :rules="[{ required: true }]"
          :error-message="`${!isValid ? '请输入文字' : ''}`"
          size="large"
          clearable
          autofocus
          autosize
          maxlength="100"
          show-word-limit
        />
      </van-row>
    </van-cell-group>

   <TianZiGe :text="text" @handle-selected="(char) => onTianZiGeClick(char)" />
  </div>

  <van-action-bar class="justify-end">
    <van-action-bar-icon
      icon="play-circle-o"
      text="笔顺"
      @click="showBinShun = true"
    />
    <van-action-bar-icon
      icon="setting-o"
      text="设置"
      @click="showSettings = true"
    />
  </van-action-bar>

  <!-- settings start-->
  <van-action-sheet v-model:show="showSettings">
    <div class="p-8 flex flex-col justify-start">
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
    </div>
  </van-action-sheet>
  <!-- settings end-->

  <!-- bishun start-->
  <van-action-sheet v-model:show="showBinShun">
    <div class="p-8 flex flex-col justify-center">
      <BiShun v-if="!!theChar" :char="theChar" />
    </div>
  </van-action-sheet>
  <!-- bishun end-->
  </div>
</template>

<style scoped></style>
