<template>
  <div>
    <div class="title">
      {{title}}
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

const Api = defineProps({
  data:{
    type:Array,
    default:[]
  },
  title:{
    type:String,
    default: ''
  }
})
onMounted(()=>{
  console.log(Api.data)
  sessionStorage.setItem('dataApi',JSON.stringify(Api.data))
})
</script>

<style scoped>
.title {
  height: 35px;
}
.content {
  padding: 5px;
}
.content{
  display: flex;
}
</style>
