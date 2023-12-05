<script setup lang="ts">
import { nanoid } from "nanoid";
import TianZiGe from "./TianZiGe.vue"
import { itemsStore } from "../store/index";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();

const regex = /[\u4e00-\u9fa5]/;
const filterNotChineseChar = (str: string) => {
  return str
    .split("")
    .filter((s) => !!s && regex.test(s))
    .join("");
};

const queryText = route.query.text
const text = filterNotChineseChar(decodeURIComponent(queryText as string));
const textList = text.split("").filter((s) => !!s && regex.test(s))
const router = useRouter();

const onSave = () => {
  const id = nanoid()
  const item = {
    id,
    text: filterNotChineseChar(text)
  }
  itemsStore.value.push(item)
  router.push('/items/' +
    id);
}

</script>

<template>
  <div id="home" class="h-full max-h-full flex flex-col gap-2">
    <div class="flex-grow">
      <div
        v-if="textList?.length"
        class="grid grid-cols-5 gap-2 p-4 rounded-lg shadow-md shadow-slate-300 bg-white"
      >
        <template v-for="char in textList">
          <TianZiGe :char="char" />
        </template>
      </div>
      <div v-else class="flex flex-col items-center justify-center h-full">
        <van-icon name="search" size="4rem" />
        <p class="text-gray-500">无法识别的内容</p>
      </div>
    </div>
  </div>
  <van-action-bar>
    <van-action-bar-button type="primary" text="保存" @click="onSave" />
  </van-action-bar>
</template>

<style scoped></style>
