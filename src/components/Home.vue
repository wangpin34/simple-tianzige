<script setup lang="ts">
import { computed } from 'vue';
import { textStore } from '../store/index'
import TianZiGe from './TianZiGe.vue'
const regex = /[\u4e00-\u9fa5]/
const text = computed(() => 
  textStore.value
)
const textList = computed(() => text.value.split('').filter((s) => regex.test(s)))

</script>

<template>
  <div>
    <router-link to="/edit">编辑</router-link>
    <div class="grid grid-cols-5">
      <template v-for="char in textList">
        <TianZiGe :char="char"/>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
