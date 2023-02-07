<template>
  <div id="xxhh" @mousedown="move">
    <img
        draggable="true"
        style="width: 100px; height: 100px"
        ondragstart="move"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        />
  </div>

  <div id="info">
    <colorPicker v-model="color" />
  </div>
</template>

<script setup>

import {ref} from "vue";

const posX = ref(0)
const color = ref()
const posY = ref(0)
function move(e) {
  let odiv = e.target
  let disX = e.clientX - odiv.offsetLeft
  let disY = e.clientY - odiv.offsetTop

  document.onmousemove = (e) =>{
    let left = e.clientX - disX
    let top = e.clientY - disY
    posX.value = left
    posY.value = top

    // odiv.style.left = left +'px'
    // odiv.style.top = top +'px'
  }
  document.onmouseup = (e) =>{
    document.onmousemove = null
    document.onmouseup = null
  }
}
</script>

<style scoped>
#xxhh{
  position: relative;
  top: 10px;
  left: 10px;
  width: 200px;
  height: 200px;
  background: #666666;
}

</style>
<style>
*{
  margin: 0 !important;
}
</style>
