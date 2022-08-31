<template>
    <div>
        <div>
            <router-link to="/index">index</router-link>
        </div>
        <div>
            <router-link to="/css">css</router-link>
        </div>
      <div>
        <router-link to="/echarts">驾驶舱</router-link>
      </div>
      <div>
        <router-link to="/3d">星云</router-link>
      </div>
        <div @click="setReq">发送请求</div>
    </div>

</template>
<script setup>
import {test1} from "@/api";

const setReq = () => {
  test1()
}
</script>
