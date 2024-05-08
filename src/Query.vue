<script setup lang="ts">
import { nanoid } from 'nanoid'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Footer from './components/Footer.vue'
import HanZiGrid from './components/TianZiGe/HanZiGrid.vue'
import useItemsStore from './store/items'
import { textToHanziList } from './utils/char'
import { textToColor } from './utils/text'
const itemsStore = useItemsStore()
const router = useRouter()
const text = ref<string>('')
const hanziList = computed(() => textToHanziList(text.value))
const onSave = () => {
  const id = nanoid()
  const item = {
    id,
    text: text.value,
    color: textToColor(text.value),
  }
  itemsStore.add(item)
  router.push('/items/' + id)
}

const dummy = ref<HTMLElement>()

const sticked = ref<Boolean>(false)

const handleIntersection: IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  _: IntersectionObserver
) => {
  if (entries[0].isIntersecting) {
    sticked.value = false
  } else {
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
    <van-nav-bar title="查询汉字">
      <!-- <template #left>
        <van-icon name="cross" size="18" @click="onBack" />
      </template> -->
      <template #right>
        <van-button @click="onSave">保存为字帖</van-button>
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
      <div class="mt-4 px-4 flex flex-col gap-8" v-if="hanziList.length">
        <template v-for="text in hanziList">
          <HanZiGrid v-if="text.isChinese" :hanzi="text.char" />
          <div v-else-if="text.char == '\n'" class="w-full"></div>
          <!-- <div v-else class="w-[40px] aspect-square shrink relative outline-1 outline-slate-300 outline-dashed cursor-pointer" /> -->
        </template>
      </div>
    </div>


    <!-- settings start-->
    <!-- <van-action-sheet v-model:show="showSettings">
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
    </van-action-sheet> -->
    <!-- settings end-->

    <!-- bishun start-->
    <!-- <van-action-sheet v-model:show="showBinShun">
      <div class="p-8 flex flex-col justify-center">
        <BiShun v-if="!!theChar" :char="theChar" />
      </div>
    </van-action-sheet> -->
    <!-- bishun end-->
  </div>
  <Footer />
</template>

<style scoped>
</style>
