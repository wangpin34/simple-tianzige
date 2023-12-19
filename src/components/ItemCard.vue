<script setup lang="ts">
import { ref, computed } from "vue";
import { showToast, showConfirmDialog } from "vant";
import { useRouter } from "vue-router";
import useItemsStore from "../store/items";
import { defaultColor } from "../utils/text";
import type { Item } from "../types/index";
import { savePNG } from "../utils/image";
import TianZiGe from "./TianZiGe/index.vue";

const props = defineProps<{ item: Item }>();
const itemsStore = useItemsStore();
const router = useRouter();
const shareLink = computed(
  () =>
    `${window.location.origin}/#/share?text=${encodeURIComponent(
      props.item.text ?? ""
    )}`
);

enum Action {
  Share = "分享",
  View = "查看",
  Delete = "删除",
}
const showShare = ref(false);
const showQr = ref(false);
const showPopover = ref(false);
const showTianZiGe = ref(false);
const actions = [
  { text: Action.Share, icon: "share-o" },
  { text: Action.View, icon: "info-o" },
  { text: Action.Delete, icon: "delete-o" },
];

const onRemove = () => {
  itemsStore.remove(props.item);
  showToast("已删除");
};

const handleRemove = () => {
  showConfirmDialog({
    title: "删除",
  })
    .then(() => {
      onRemove();
      router.push("/");
    })
    .catch(() => {
      // do nothing on cancel
    });
};
const onSelectOption = ({ text: action }: { text: string }) => {
  switch (action) {
    case Action.Share:
      showShare.value = true;
      break;
    case Action.View:
      router.push(`/items/${props.item.id}`);
      break;
    case Action.Delete:
      handleRemove();
      break;
    default:
      showToast("未知操作");
  }
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
      showTianZiGe.value = true;
      break;
    case ShareOption.QRCode:
      showQr.value = true;
      break;
  }
  showShare.value = false;
};

const saveTianZiGeImage = async () => {
  const tianZiGeElement = document.querySelector(`#tianzige-${props.item.id}`);
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
  <router-link
    :to="`/items/${props.item.id}`"
    class="rounded-lg p-2 aspect-square flex flex-col"
    :style="{ backgroundColor: props.item.color ?? defaultColor }"
  >
    <van-popover
      v-model:show="showPopover"
      overlay
      :show-arrow="false"
      :actions="actions"
      @select="(action) => onSelectOption(action)"
      placement="bottom-end"
    >
      <template #reference>
        <div class="flex justify-end">
          <button
            class="bg-white w-fit rounded-full w-[32px] h-[32px] p-[8px] z-1 border-none cursor-pointer"
            type="button"
            @click.stop.prevent="showPopover = true"
          >
            <van-icon
              name="ellipsis"
              :color="props.item.color ?? defaultColor"
            />
          </button>
        </div>
      </template>
    </van-popover>

    <div class="grow overflow-clip px-2">
      <p class="m-0 text-base text-slate-100 leading-normal">
        {{ item.text }}
      </p>
    </div>
    <div id="tianzige" class="fixed opacity-0 pointer-events-none"></div>
  </router-link>

  <!-- share start-->
  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
    @select="onShare"
  />

  <van-action-sheet v-model:show="showTianZiGe">
    <div class="h-full p-8 flex flex-col justify-between">
      <div class="py-2" :id="`tianzige-${props.item.id}`">
        <TianZiGe :text="props.item.text" />
      </div>
      <van-button text="保存图片" @click="saveTianZiGeImage" />
    </div>
  </van-action-sheet>

  <van-action-sheet v-model:show="showQr">
    <div class="p-8 flex flex-col justify-center">
      <div id="qr-code" class="w-36 h-36 m-auto">
        <qr-code :contents="shareLink"></qr-code>
      </div>
      <van-button text="保存二维码" @click="saveQrCodeImage" />
    </div>
  </van-action-sheet>

  <!-- share end -->
</template>

<style scoped></style>
