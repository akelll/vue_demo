<template>
<h1>this is page3</h1>
  <el-button @click="goback(-1)">返回page2</el-button>
  <el-button @click="goback(-2)">返回page1</el-button>
  <el-button @click="goback(-3)">返回index</el-button>
</template>

<script setup>
import {routerStack} from "@/stack";
import {useRouter} from "vue-router/dist/vue-router";
const router = useRouter()
const goback = (i) => {
  routerStack.go(i,router)
}
</script>

<style scoped>

</style>
