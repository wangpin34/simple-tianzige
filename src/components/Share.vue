<script setup lang="ts">
import { nanoid } from "nanoid";
import TianZiGe from "./TianZiGe.vue"
import useItemsStore from "../store/items";
import { showToast  } from 'vant'
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const itemsStore = useItemsStore()

const queryText = route.query.text
const text = decodeURIComponent(queryText as string)
const textList = text.split("").filter((s) => !!s && regex.test(s))
const router = useRouter();

const onSave = () => {
  const id = nanoid()
  const item = {
    id,
    text
  }
  itemsStore.add(item)
  showToast('保存成功')
  router.push('/items/' +
    id);
}

const onBack = () => {
  router.push('/')
}

</script>

<template>
  <van-nav-bar title="来自分享">
    <template #left >
      <van-icon name="arrow-left" size="18" @click="onBack"/>
    </template>
    <template #right>
      <van-icon name="star-o" size="18" @click="onSave"/>
    </template>
  </van-nav-bar>
  <div id="home" class="p-8 grow flex flex-col gap-2">
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
