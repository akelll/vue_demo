<template>
  <vue-seamless-scroll :data="data.listData" :class-option="optionSingleHeightTime" class="seamless-warp">
    <ul class="item">
      <li v-for="item in data.listData">
        <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>

<script setup>
import { reactive, ref} from "vue";

const data = reactive({
  listData:
      [{
    'title': '无缝滚动第一行无缝滚动第一行',
    'date': '2017-12-16'
  }, {
    'title': '无缝滚动第二行无缝滚动第二行',
    'date': '2017-12-16'
  }, {
    'title': '无缝滚动第三行无缝滚动第三行',
    'date': '2017-12-16'
  }, {
    'title': '无缝滚动第四行无缝滚动第四行',
    'date': '2017-12-16'
  }, {
    'title': '无缝滚动第五行无缝滚动第五行',
    'date': '2017-12-16'
  }, {
    'title': '无缝滚动第六行无缝滚动第六行',
    'date': '2017-12-16'
  }, {
    'title': '无缝滚动第七行无缝滚动第七行',
    'date': '2017-12-16'
  }, {
    'title': '无缝滚动第八行无缝滚动第八行',
    'date': '2017-12-16'
  }, {
    'title': '无缝滚动第九行无缝滚动第九行',
    'date': '2017-12-16'
  }]
})
const optionSingleHeightTime = ref({
  singleHeight: 26,
  waitTime: 10000
})

</script>

<style  scoped>
.seamless-warp {
  height: 229px;
  overflow: hidden;
}
</style>

