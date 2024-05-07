<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
//import useItemsStore from '../store/items'
import useSettingsStore from '../store/settings'
import { textToHanziList } from '../utils/char'
import BiShun from './BiShun.vue'
import HanZiGrid from './TianZiGe/HanZiGrid.vue'
//const itemsStore = useItemsStore()
const settingsStore = useSettingsStore()
const size = computed(() => settingsStore.size)
const router = useRouter()
const text = ref<string>('')
const hanziList = computed(() => textToHanziList(text.value))
// const onSave = () => {
//   const id = nanoid()
//   const item = {
//     id,
//     text: text.value,
//     color: textToColor(text.value),
//   }
//   itemsStore.add(item)
//   router.push('/items/' + id)
// }

const onBack = () => {
  router.push('/')
}

const showBinShun = ref(false)
const showSettings = ref(false)
const theChar = ref<string>()

const dummy = ref<HTMLElement>()

const sticked = ref<Boolean>(false)

const handleIntersection: IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  _: IntersectionObserver
) => {
  if (entries[0].isIntersecting) {
    console.log(`${entries[0].isIntersecting}`)
    sticked.value = false
  } else {
    console.log(`${entries[0].isIntersecting}`)
    sticked.value = true
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0,
  })
  const dummyDom = dummy.value
  if (dummyDom) {
    observer.observe(dummyDom)
  }
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full max-h-full overflow-auto">
    <van-nav-bar>
      <template #left>
        <van-icon name="cross" size="18" @click="onBack" />
      </template>
    </van-nav-bar>
    <div class="relative">
      <div class="h-4" ref="dummy"></div>
      <div
        class="sticky top-0 px-4 z-10 transition-all"
        :class="{ 'bg-wuzhilv': sticked }"
      >
        <van-field
          v-model="text"
          type="textarea"
          placeholder="输入汉字，例如：汉字"
          :rules="[{ required: true }]"
          size="large"
          font-size="16"
          autofocus
          clickable
          autosize
          class=" transition-all h-content input-textarea"
          :class="{ 'bg-wuzhilv': sticked }"
        >
          <template #button>
            <van-icon
              name="cross"
              size="18"
              color="blue"
              @click="text = ''"
              v-if="text.length"
            />
          </template>
        </van-field>
      </div>
      <van-row class="mt-4 px-4 flex flex-col gap-8" v-if="hanziList.length">
        <template v-for="text in hanziList">
          <HanZiGrid v-if="text.isChinese" :hanzi="text.char" />
          <div v-else-if="text.char == '\n'" class="w-full"></div>
          <!-- <div v-else class="w-[40px] aspect-square shrink relative outline-1 outline-slate-300 outline-dashed cursor-pointer" /> -->
        </template>
      </van-row>
      <!-- <van-row class="mt-4 px-4 flex justify-end">
        <van-button
          icon="plus"
          type="default"
          plain
          size="small"
          @click="onSave"
        ></van-button>
      </van-row> -->
    </div>

    <van-action-bar class="justify-end">
      <van-action-bar-icon
        icon="setting-o"
        text="设置"
        @click="showSettings = true"
      />
    </van-action-bar>

    <!-- settings start-->
    <van-action-sheet v-model:show="showSettings">
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
    <!-- settings end-->

    <!-- bishun start-->
    <van-action-sheet v-model:show="showBinShun">
      <div class="p-8 flex flex-col justify-center">
        <BiShun v-if="!!theChar" :char="theChar" />
      </div>
    </van-action-sheet>
    <!-- bishun end-->
  </div>
</template>

<style scoped>
</style>
