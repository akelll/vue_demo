<template>
<h1>this is page1</h1>
  <el-button @click="gopage">go page2</el-button>
  <el-button @click="goback">返回index</el-button>
</template>

<script setup>
  import {useRouter} from "vue-router/dist/vue-router";
  import {routerStack} from "@/stack";
  import {onMounted} from "vue";
  import {test} from "@/common/straight";

  const router = useRouter()
  const gopage = () => {
    routerStack.push('/page2',router)
  }
  const goback = () => {
    routerStack.go(-1,router)
  }
  onMounted(()=>{
    const performance = window.performance.timing;
    getTime(performance)
  })
  const getTime=(t)=> {
    const t2 = t.domComplete - t.fetchStart
    const t0 = t.responseEnd - t.fetchStart
    test.set_t2(t2)
    test.set_t0(t0)
  }
</script>

<style scoped>

</style>
