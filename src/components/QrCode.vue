<script setup lang="ts">
const { text } = defineProps<{ text: string }>()

</script>
<template>
  <qr-code
    id="qr1"
    :contents="text"
    module-color="#1c7d43"
    position-ring-color="#13532d"
    position-center-color="#70c559"
    mask-x-to-y-ratio="1.2"
    style="
    width: 200px;
    height: 200px;
    margin: 2em auto;
    background-color: #fff;
  "
  >
    
  </qr-code>
</template>