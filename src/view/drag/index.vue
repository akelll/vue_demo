<template>
  <div class="itxst">
    <div style="padding-left:6px">clone例子,左边往右边拖动试试看</div>
    <div class="col">
      <draggable v-model="arr1" @end="end1" :options="{group:{name: 'itxst',pull:'clone'},sort: true}" animation="300" :move="onMove">
        <transition-group>
          <div :class="item.id==1?'item forbid':'item'" v-for="item in arr1" :key="item.id">{{item.name}}</div>
        </transition-group>
      </draggable>
    </div>
    <div class="col">
      <draggable v-model="arr2" @end="end2" group="itxst" animation="300" :move="onMove">
        <transition-group>
          <div :class="item.id==12?'item2 forbid':'item2'" v-for="item in arr2" :key="item.id">{{item.name}}</div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script setup>

import {reactive, ref} from "vue";
import draggable from 'vuedraggable'

const arr1 = reactive(
    [
  { id: 1, name: 'www.itxst.com' },
  { id: 2, name: 'www.jd.com' },
  { id: 3, name: 'www.baidu.com' },
  { id: 4, name: 'www.taobao.com' }
])
const arr2 = reactive([])
const style= ref('min-height:120px;display: block;')
const moveId = ref(-1)

function end1(e) {
  console.log(e)
  var items = arr2.filter(function (m) {
    return m.id === moveId
  })
  //如果左边
  if (items.length < 2) return;
  arr2.splice(e.newDraggableIndex, 1)
}
function end2() {
  var items = arr1.filter(function (m) {
    return m.id == moveId
  })
  //如果左边
  if (items.length < 2) return;
  arr1.splice(e.newDraggableIndex, 1)
}
function onMove(e, originalEvent) {

}
const posX = ref(0)
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
.itxst {
  margin: 10px;
  text-align: left;
}

.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}

.col + .col {
  margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
  text-align: left;
}

.item + .item {
  border-top: none;
  margin-top: 6px;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}

.item2 {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: pink;
  text-align: left;
}

.item2 + .item2 {
  border-top: none;
  margin-top: 6px;
}

.item2:hover {
  outline: solid 1px #ddd;
  cursor: move;
}
<style>
*{
  margin: 0 !important;
}
</style>
