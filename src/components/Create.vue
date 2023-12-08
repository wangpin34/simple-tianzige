<script setup lang="ts">
import { computed, ref } from 'vue'
import { nanoid } from 'nanoid'
import { itemsStore } from "../store/index";
import { useRouter } from "vue-router";
const text = ref<string>('')
const isValid = computed(() => !!text.value) 
const router = useRouter();
const regex = /[\u4e00-\u9fa5]/;
const filterNotChineseChar = (str: string) => {
  return str.split('').filter(s => !!s && regex.test(s)).join('')
}
const onOK = () => {
  const id = nanoid()
  const item = {
    id,
    text: filterNotChineseChar(text.value)
  }
  itemsStore.value.push(item)
  router.push('/items/' + 
  id);
};

const onBack = () => {
  router.push('/')
}

</script>

<template>
  <van-nav-bar title="新建">
    <template #left >
      <van-icon name="arrow-left" size="18" @click="onBack"/>
    </template>
    <template #right>
      <span @click="onOK">完成</span>
    </template>
  </van-nav-bar>
  <van-cell-group class="m-8 bg-white p-4 rounded-lg">
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
</template>

<style scoped></style>
