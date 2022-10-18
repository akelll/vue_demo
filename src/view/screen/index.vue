<template>
  <div>第一周 10111 待认领10条</div>
  <vue-seamless-scroll :data="listData" :class-option="optionSingleHeightTime" class="seamless-warp">
    <ul class="item" @dblclick="screen">
      <li v-for="item1 in listData">
        <div class="screen-box">
          <div class="img-box">
            <el-image :src="item1.src" fit="contain"></el-image>
            <div>{{item1.place}}</div>
          </div>
          <div class="msg-box">
            <div><span>类别：</span><span>{{item1.item }}</span></div>
            <div><span>项目：</span><span>{{item1.proj}}</span></div>
            <div><span>规则：</span><span>{{item1.content}}</span></div>
            <div><span>分值：</span><span>{{item1.score}}</span></div>
            <div><span>记录时间：</span><span>{{item1.addTime}}</span></div>
          </div>
        </div>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
const listData = ref()
const data = reactive({
  listData: []
})
onMounted(()=>{
  let list = [
    {
      'src': 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      place:'教学楼 3楼',
  item:'类别1',
  proj:'项目1',
  content:'内容1',
  score:'-3',
  addTime:'10-01'
    }, {
      'src': 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      place:'教学楼 3楼',
  item:'类别1',
  proj:'项目1',
  content:'内容1',
  score:'-3',
  addTime:'10-01'
    }, {
      'src': 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      place:'教学楼 3楼',
  item:'类别1',
  proj:'项目1',
  content:'内容1',
  score:'-3',
  addTime:'10-01'
    }, {
      'src': 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      place:'教学楼 3楼',
  item:'类别1',
  proj:'项目1',
  content:'内容1',
  score:'-3',
  addTime:'10-01'
    }, {
      'src': 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      place:'教学楼 3楼',
  item:'类别1',
  proj:'项目1',
  content:'内容1',
  score:'-3',
  addTime:'10-01'
    }]

  if (list.length % 2 !== 0){
    // list.push.call(list,...list)
    // list.push.apply(list,list)
    list.push(...list)
    // list = list.concat(list)
    // list.forEach(item=>{
    //   list.push(item)
    // })
  }
  listData.value = list
})
const  screen=()=>{
  let element = document.documentElement;
  if (data.fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen();
    }
  }
  data.fullscreen = !data.fullscreen;

}
const optionSingleHeightTime = ref({
  singleHeight: 360,
  waitTime: 5000,
  hoverStop: true
})

</script>

<style lang="scss" scoped>
.screen-box{
  margin: 0;
  width: (100vw * 902 / 1920);
  display: flex;
  justify-content: left;
  border: 1px solid red;
  .img-box{
    width: (100vw / 4);
    margin: 0;
    text-align: left;
  }
  .msg-box{
    text-align: left;
    margin: 0;

  }
}

.seamless-warp {
  height: 1000px;
  overflow: hidden;
}
.item{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  list-style: none;

  li{
    width: 47%;
    height: 360px;
  }
}
.demonstration{
  text-align: left;
}
</style>

