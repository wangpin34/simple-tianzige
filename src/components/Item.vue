<script setup lang="ts">
import { computed, ref } from "vue"
import TianZiGe from "./TianZiGe.vue"
import { showToast } from "vant"
import { itemsStore } from "../store/index"
import { useRoute } from "vue-router"
import QrCode from "./QrCode.vue"
import Edit from './Edit.vue'

const route = useRoute()

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

const onSelect = (option: { name: string; type: ShareOption }) => {
  switch (option.type) {
    case ShareOption.CopyLink:
      navigator.clipboard.writeText(shareLink.value);
      showToast("复制成功");
      break;
    case ShareOption.QRCode:
      showQr.value = true;
      break;
  }
  showShare.value = false;
};
</script>

<template>
  <div id="home" class="h-full max-h-full flex flex-col gap-2">
    <div class="flex-grow">
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
  <van-action-bar>
    <van-action-bar-button type="default" text="编辑" @click="showEdit=true" />
    <van-action-bar-button type="primary" @click="showShare = true" text="分享" />
  </van-action-bar>
  <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  <van-action-sheet v-model:show="showQr">
    <div class="p-8">
    <div class="content w-36 h-36 m-auto">
      <qr-code :contents="shareLink"></qr-code>
    </div>
    </div>
  </van-action-sheet>

  <van-action-sheet v-if="item" v-model:show="showEdit">
    <div class="content">
      <Edit :text="item.text" :onOK="onSave" :onCancel="onCancelSave" />
    </div>
  </van-action-sheet>
</template>

<style scoped></style>
