<script setup lang="ts">
import { computed, ref } from 'vue';

const { text, onOK, onCancel } = defineProps<{
  text: string
  onOK: (text: string) => void
  onCancel: () => void
}>()

const inputText = ref<string>(text)

const isValid = computed(() => !!inputText.value)


const handleOk = () => {
  onOK(inputText.value)
}
</script>

<template>
  <div class="min-h-80 flex flex-col px-2 py-4">
    <div class="flex-grow">
    <div class="rounded-sm border-2 border-slate-950">
    <van-field v-model="inputText" type="textarea" placeholder="输入文字" :rules="[{ required: true }]"
    :error-message="`${!isValid ? '请输入文字' : ''}`" size="large" clearable autofocus autosize maxlength="50"
    show-word-limit />
    </div>
    </div>
    <div class="grid grid-cols-2 gap-4">

    <van-button type="default" text="取消" @click="onCancel" />
    <van-button type="primary" text="完成" @click="handleOk" />
    </div>
  </div>
</template>

<style scoped></style>
