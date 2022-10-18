<template>
  <dv-loading v-if="data.loading">加载中...</dv-loading>
</template>

<script setup>
import {onMounted, ref} from "vue";

const data = ref({
  loading:true
})
onMounted(()=>{
  setTimeout(()=>data.value.loading = false,1000)
})
</script>

<style scoped>

</style>
