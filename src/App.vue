<template>
  <div id="app">
    <router-view v-slot="{ Component }" />

  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {initDB} from "@/sql";

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      d:{name:'张三',age:'18'}
    }
  },
  created() {
    initDB()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
