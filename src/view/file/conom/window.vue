<template>
  <el-dialog v-model="dialogVisible" width="1440px">
    <iframe src="https://jike777.com/" id="myrame"
            width="100%"
            height="700px"
    />


  </el-dialog>
</template>

<script setup>
import {onMounted, watch} from "vue";
  const props = defineProps({
    dialogVisible:{type:Boolean,default:false}
  })
  watch(()=>props.dialogVisible,(val)=>{
    console.log(val)

  })
</script>

<style scoped>
</style>
