<script setup lang="ts">
import { showToast } from "vant";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { itemsStore } from "../store/index";
import { settingsStore } from "../store/settings";
import { isChineseChar } from '../utils/char';
import { savePNG } from "../utils/image";
import BiShun from './BiShun.vue';
import Edit from "./Edit.vue";
import TianZiGe from "./TianZiGe.vue";

const route = useRoute();
const router = useRouter();

const colsNum = ref(settingsStore.value.tianzige.colsNum);

watch(settingsStore, () => {
  colsNum.value = settingsStore.value.tianzige.colsNum;
});

const id = route.params.id;
const item = computed(() => itemsStore.value.find((item) => item.id === id));
const shareLink = computed(
  () =>
    `${window.location.origin}/#/share?text=${encodeURIComponent(
      item.value?.text ?? ""
    )}`
);
const textList = computed(() =>
  item.value?.text.split("").map((s, index) => ({
    id: index,
    char: s,
    isChinese: isChineseChar(s)
  }))
);

const theChar = ref(textList.value?.find((char) => char.isChinese) ?? undefined);
const showShare = ref(false);
const showQr = ref(false);
const showEdit = ref(false);
const showBinShun = ref(false)

const onTianZiGeClick = (char: {id: number, char: string, isChinese: boolean}) => {
  theChar.value = char
};

const onBack = () => {
  router.push("/");
};

const onSave = (text: string) => {
  if (item.value) {
    item.value.text = text;
    showEdit.value = false;
  }
};

const onCancelSave = () => {
  showEdit.value = false;
};

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
      await saveTianZiGeImage();
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
  const qrCodeElement = document.querySelector("qr-code");
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
  <van-nav-bar>
    <template #left>
      <van-icon name="arrow-left" size="18" @click="onBack" />
    </template>
    <template #right>
      <div class="flex gap-4">
        <van-icon name="edit" size="18" @click="showEdit = true" />
      </div>
    </template>
  </van-nav-bar>

  <div id="home" class="p-8 grow flex flex-col gap-2">
    <div class="flex-grow" id="tianzige">
      <div
        v-if="textList?.length"
        class="grid gap-2 p-4 rounded-lg shadow-md shadow-slate-300 bg-white"
        :style="`grid-template-columns:repeat(${settingsStore.value.tianzige.colsNum},1fr)`"
      >
        <template v-for="text in textList">
          <TianZiGe v-if="text.isChinese" :selected="theChar?.char === text.char && theChar?.id === text.id" :char="text.char" @on-selected="() => onTianZiGeClick(text)"/>
          <div v-else class="self-end">
            <span  class="text-2xl ">{{ text.char }}</span>
          </div>
          
        </template>
      </div>
      <div v-else class="flex flex-col items-center justify-center h-full">
        <van-icon name="search" size="4rem" />
        <p class="text-gray-500">暂无数据</p>
      </div>
    </div>
  </div>

  <van-action-bar class="justify-end">
     <van-action-bar-icon icon="share-o" text="分享"  @click="showShare = true" />
     <van-action-bar-icon icon="play-circle-o" text="笔顺" @click="showBinShun = true "/>
  </van-action-bar>

  <van-action-sheet v-model:show="showBinShun">
    <div class="p-8 flex flex-col justify-center">
      <div v-if="theChar">
        <div class="grid grid-cols-3 gap-4">
        <BiShun :char="theChar.char" />
        </div>
      </div>
    </div>
  </van-action-sheet>


  <!-- share start-->
  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
    @select="onSelect"
  />
  <van-action-sheet v-model:show="showQr">
    <div class="p-8 flex flex-col justify-center">
      <div id="qr-code" class="w-36 h-36 m-auto">
        <qr-code :contents="shareLink"></qr-code>
      </div>
      <van-button text="保存二维码" @click="saveQrCodeImage" />
    </div>
  </van-action-sheet>
  <!-- share end -->

  <!-- edit start-->
  <van-action-sheet v-if="item" v-model:show="showEdit">
    <div>
      <Edit :text="item.text" :onOK="onSave" :onCancel="onCancelSave" />
    </div>
  </van-action-sheet>
  <!-- edit end-->
</template>

<style scoped></style>
