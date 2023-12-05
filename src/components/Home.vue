<script setup lang="ts">
import { itemsStore } from "../store/index";
import { useRouter } from "vue-router";


const router = useRouter()

const onCreate = () => {
  router.push('/create')
}

</script>

<template>
  <div id="home" class="h-full max-h-full flex flex-col gap-2">
    <div class="flex-grow">
      <div class="flex gap-4 flex-wrap">
        <template v-for="item in itemsStore.value">
          <router-link :to="`/items/${item.id}`" class="bg-white rounded-lg p-4">{{item.text.slice(0, 6)}}</router-link>
        </template>
        <van-floating-bubble icon="plus" @click="onCreate"/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
