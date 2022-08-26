<template>
<h1>this is page2</h1>
  <el-button @click="gopage">go page3</el-button>
  <el-button @click="goback">返回page1</el-button>
</template>

<script setup>
import {useRouter} from "vue-router/dist/vue-router";
import {routerStack} from "@/stack";

const router = useRouter()
const gopage = () => {
  routerStack.push('/page3',router)
}
const goback = () => {
  routerStack.go(-1,router)
}
</script>

<style scoped>

</style>
