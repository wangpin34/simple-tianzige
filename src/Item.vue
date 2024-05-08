<script setup lang="ts">
import { showConfirmDialog, showToast } from "vant";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BiShun from "./components/BiShun.vue";
import Edit from "./components/Edit.vue";
import TianZiGe from "./components/TianZiGe/index.vue";
import useItemsStore from "./store/items";
import useSettingsStore from "./store/settings";
import { savePNG } from "./utils/image";

const itemsStore = useItemsStore();
const route = useRoute();
const router = useRouter();
const settingsStore = useSettingsStore();

const size = computed(() => settingsStore.size);

const id = route.params.id;
const item = computed(() => itemsStore.item(id as string));
const shareLink = computed(
  () =>
    `${window.location.origin}/#/share?text=${encodeURIComponent(
      item?.value?.text ?? ""
    )}`
);

const selectedCharIndex = ref<number>(0);
const theChar = computed(() =>
  item.value?.text.charAt(selectedCharIndex.value ?? 0)
);
const showShare = ref(false);
const showQr = ref(false);
const showEdit = ref(false);
const showBinShun = ref(false);
const showSettings = ref(false);

const onTianZiGeClick = (char: string, index: number) => {
  console.info(`selected "${char}" at index[${index}]`);
  selectedCharIndex.value = index;
  showBinShun.value = true;
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

const onRemove = () => {
  itemsStore.remove(item.value!);
  showToast("已删除");
};

const handleRemove = () => {
  showConfirmDialog({
    title: "删除",
  })
    .then(() => {
      onRemove();
      router.push("/items");
    })
    .catch(() => {
      // do nothing on cancel
    });
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

const onShare = async (option: { name: string; type: ShareOption }) => {
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
const title = computed(() => item.value?.text ?? "");
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full">
    <van-nav-bar :fixed="true" :title="title">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="onBack" />
      </template>
      <template #right>
        <div class="flex gap-4" v-if="!!item">
          <van-icon name="edit" size="18" @click="showEdit = true" />
        </div>
      </template>
    </van-nav-bar>

    <div id="home" class="m-content p-8 grow flex flex-col gap-2">
      <div class="flex-grow" id="tianzige" v-if="item">
        <TianZiGe
          :text="item.text"
          :selected="selectedCharIndex"
          @handle-selected="(char, index) => onTianZiGeClick(char, index)"
        />
      </div>
      <div
        v-else
        class="w-full h-full flex flex-col justify-center items-center"
      >
        <van-icon name="warn-o" size="24" />
        <p>数据加载失败</p>
      </div>
    </div>

    <van-action-bar class="justify-around" v-if="item">
      <van-action-bar-icon icon="delete-o" text="删除" @click="handleRemove" />
      <van-action-bar-icon
        icon="share-o"
        text="分享"
        @click="showShare = true"
      />
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

    <!-- font start-->
    <van-action-sheet v-if="item" v-model:show="showSettings">
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
    <!-- font end-->

    <!-- bishun start-->
    <van-action-sheet v-model:show="showBinShun">
      <div class="p-8 flex flex-col justify-center">
        <BiShun v-if="!!theChar" :char="theChar" />
      </div>
    </van-action-sheet>
    <!-- bishun end-->

    <!-- share start-->
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onShare"
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
  </div>
</template>

<style scoped></style>
./store/items./store/settings./utils/image