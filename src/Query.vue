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
  <van-nav-bar title="查询汉字笔顺">
      <template #right>
        <van-button @click="onSave" size="small">保存为字帖</van-button>
      </template>
    </van-nav-bar>
  <div class="h-full max-h-full overflow-auto">
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
      <div class="my-8 px-4 flex flex-col gap-8" v-if="hanziList.length">
        <template v-for="text in hanziList">
          <HanZiGrid v-if="text.isChinese" :hanzi="text.char" />
        </template>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
</style>
