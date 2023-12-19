<script setup lang="ts">
import { nanoid } from "nanoid";
import TianZiGe from './TianZiGe/index.vue'
import useItemsStore from "../store/items";
import { showToast  } from 'vant'
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const itemsStore = useItemsStore()

const queryText = route.query.text
const text = decodeURIComponent(queryText as string)
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
      <TianZiGe :text="text"  @handle-selected="(char, index) => console.log(char,index)" />
    </div>
  </div>
  <van-action-bar>
    <van-action-bar-button type="primary" text="保存" @click="onSave" />
  </van-action-bar>
</template>

<style scoped></style>
