<template>
  <div >
    <div>{{data.label}}</div>
    <div v-for="(item,i) in info.content" :key="i">{{item}}</div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";

const data = defineProps({
  prop:{
    type:String,
    default:''
  },
  data:{
    type:Array,
    default: []
  },
  label:{
    type:String,
    default:''
  },
})
onMounted(()=>{

  const data = JSON.parse(sessionStorage.getItem("dataApi"))
  info.setVal(data)
})
const info = reactive({
  content:[],
  setVal:(val)=>{
    let list=[]
    val.forEach(item=>{
      list.push(item[data.prop])
    })
    info.content = list
  }
})
</script>

<style scoped>

</style>
