<template>
  <div class="t">
    <div class="te">
      我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本我是一个文本
    </div>
  </div>
  <input placeholder="你好哈哈哈哈哈哈哈你好哈哈哈哈哈哈哈" width="100px" class="input1">

  <div class="extend">
    <div :class="type ? 'chrisT':'chrisF'">
      hhhhhhhhhhhhhhh
    </div>
  </div>
  <button @click="change">切换颜色</button>

<div class="big-box">
  <div class="screen-box">
    <div class="img-box">
      <el-image :src="data2.src" fit="contain" class="imgPhoto"></el-image>
      <div>{{data2.place}}</div>
    </div>
    <div class="msg-box">
      <div><span>类别/项目：</span><span>{{data2.item +'/'+ data2.proj}}</span></div>
      <div><span>规则：</span><span>{{data2.content}}</span></div>
      <div><span>分值：</span><span>{{data2.score}}</span></div>
      <div><span>记录时间：</span><span>{{data2.addTime}}</span></div>
    </div>
  </div>

</div>

</template>

<script setup>
import {onMounted, reactive, ref, watchEffect} from "vue";
const data = reactive({
  list:[{title:'关于留学的重要通知哈哈', date:'2020-09-06'},
    {title:'关于关于留学的重要通知关于留学的重要通知哈哈关于留学的重要通知哈哈哈哈留学关于留学的重要通知哈哈的重要通知哈哈', date:'2020-09-06'}]
})
const data2 = ref({
  src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  place:'教学楼 3楼',
  item:'类别1',
  proj:'项目1',
  content:'内容1',
  score:'-3',
  addTime:'10-01'
})

const type = ref(0)


onMounted(()=>{
  const number = parseInt(Math.random()*10)

})
const change = () => {
  window.document.documentElement.setAttribute('style-name', 'primary0' );
}
</script>
<style scoped lang="scss">
.big-box{
  display: flex;
  justify-content: space-around;
}
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
</style>
<style scoped lang="scss">
@mixin def_style(){
  /*判断匹配*/
  [style-name="primary0"] & {//匹配成功
    background-color:forestgreen;
    color: white;
  }
  //匹配不成功
    background-color:red;
    color: white;
}
.extend{
  @include def_style()  //调用
}

::-webkit-input-placeholder { /* WebKit browsers */
  color: red;

}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: red;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: red;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: red;
}
.t{
  width: 200px;
  height: 44px;
}
.te{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
}
.cell-box{
  display: flex;
  padding: 7px 14px;
  .cell-title{
    width: 100px;

    text-align: left;

  }
  .cell-value{
    width: 30%;
    text-align: right;
  }
}

</style>
