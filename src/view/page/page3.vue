<template>
<h1>this is page3</h1>
  <el-button @click="goback(-1)">返回page2</el-button>
  <el-button @click="goback(-2)">返回page1</el-button>
  <el-button @click="goback(-3)">返回index</el-button>
</template>

<script setup>
import {routerStack} from "@/stack";
import {useRouter} from "vue-router/dist/vue-router";
import {onMounted} from "vue";
 import {test} from "@/common/straight";
const router = useRouter()
const goback = (i) => {
  routerStack.go(i,router)
}
onMounted(()=>{
  const performance = window.performance.timing;
  getTime(performance)
})
const getTime=(t)=> {
  const t2 = t.domComplete -  t.fetchStart
  const t0 =  t.responseEnd - t.fetchStart
  test.set_t2(t2)
  test.set_t0(t0)
}
</script>

<style scoped>

</style>
