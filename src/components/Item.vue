<script setup lang="ts">
import { computed, ref } from "vue"
import TianZiGe from "./TianZiGe.vue"
import { savePNG } from "../utils/image"
import { showToast } from "vant"
import { itemsStore } from "../store/index"
import { useRoute, useRouter } from "vue-router"
import Edit from './Edit.vue'

const route = useRoute()
const router = useRouter()

const id = route.params.id
const item = computed(() => itemsStore.value.find(item => item.id === id));
const shareLink = computed(() => `${window.location.origin}/#/share?text=${encodeURIComponent(item.value?.text ?? '')}`)
const regex = /[\u4e00-\u9fa5]/;
const textList = computed(() =>
  item.value?.text.split("").filter((s) => !!s && regex.test(s))
);

const showShare = ref(false);
const showQr = ref(false);
const showEdit = ref(false)

const onBack = () => {
  router.push('/')
}

const onSave = (text: string) => {
  if (item.value) {
    item.value.text = text
    showEdit.value = false
  }
}

const onCancelSave = () => {
  showEdit.value = false
}

enum ShareOption {
  CopyLink = "复制链接",
  ShareImage = "分享图片",
  QRCode = "二维码",
}

const options = [
  { name: "复制链接", icon: "link", type: ShareOption.CopyLink },
  { name: "分享图片", icon: "poster", type: ShareOption.ShareImage },
  { name: "二维码", icon: "qrcode", type: ShareOption.QRCode },
];

const onSelect = async (option: { name: string; type: ShareOption }) => {
  switch (option.type) {
    case ShareOption.CopyLink:
      await navigator.clipboard.writeText(shareLink.value);
      showToast("复制成功");
      break;
    case ShareOption.ShareImage:
      await saveTianZiGeImage()
      break;
    case ShareOption.QRCode:
      showQr.value = true;
      break;
  }
  showShare.value = false;
};

const saveTianZiGeImage = async () => {
  const tianZiGeElement = document.querySelector("#tianzige");
  if (tianZiGeElement) {
    await savePNG(tianZiGeElement as HTMLElement, "田字格");
    showToast("保存成功");
  } else {
    showToast("田字格生成失败");
  }
};

const saveQrCodeImage = async () => {
  const qrCodeElement = document.querySelector('qr-code')
  if (qrCodeElement) {
    await savePNG(qrCodeElement as HTMLElement, "田字格二维码");
    showToast("保存成功");
  } else {
    showToast("二维码生成失败");
  }
  showQr.value = false;
};

</script>

<template>
  <van-nav-bar :title="`简单田字格`">
    <template #left >
      <van-icon name="arrow-left" size="18" @click="onBack"/>
    </template>
    <template #right>
      <van-icon name="share-o" size="18" @click="showShare = true"/>
    </template>
  </van-nav-bar>

  <div id="home" class="p-8 grow flex flex-col gap-2">
    <div class="flex-grow" id="tianzige">
      <div v-if="textList?.length" class="grid grid-cols-5 gap-2 p-4 rounded-lg shadow-md  shadow-slate-300 bg-white">
        <template v-for="char in textList">
          <TianZiGe :char="char" />
        </template>
      </div>
      <div v-else class="flex flex-col items-center justify-center h-full">
        <van-icon name="search" size="4rem" />
        <p class="text-gray-500">暂无数据</p>
      </div>
    </div>
  </div>

  <van-button round icon="edit" type="primary" v-if="textList?.length" class="right-4 bottom-16" style="position: fixed;" @click="showEdit = true"/>
  

  <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  <van-action-sheet v-model:show="showQr">
    <div class="p-8">
    <div id="qr-code" class="content w-36 h-36 m-auto">
      <qr-code :contents="shareLink"></qr-code>
    </div>
    <van-button text="保存二维码" @click="saveQrCodeImage" />
    </div>
  </van-action-sheet>
  
  <van-action-sheet v-if="item" v-model:show="showEdit">
    <div class="content">
      <Edit :text="item.text" :onOK="onSave" :onCancel="onCancelSave" />
    </div>
  </van-action-sheet>
</template>

<style scoped></style>
