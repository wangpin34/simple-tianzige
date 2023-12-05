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
</script>

<template>
  <van-cell-group class="bg-white px-2 py-4 rounded-lg">
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
        maxlength="50"
        show-word-limit
      />
    </van-row>
  </van-cell-group>
  <van-action-bar>
    <van-action-bar-button type="default" text="取消" to="/"/>
    <van-action-bar-button type="primary" text="完成" @click="onOK" />
  </van-action-bar>
</template>

<style scoped></style>
