<template>
  <div id="page1">
    <h1>该元素页面居中显示</h1>
    <p>new Tim</p>
    <p>old Tim</p>

    <div class="rotate_div">
      这个盒子将旋转45度
    </div>
    <div class="rotate_div2">
      这个盒子将向右移动200px
    </div>
    <div class="rotate_div3">
      这个盒子将扩大2倍
    </div>
    <div class="rotate_div4">
      这个盒子将上斜20度
    </div>
    <div class="div1">
      宽度增加过度
    </div>
    <div class="div2">
      宽度高度旋转过度动画
    </div>
    <div class="div3">
      动画效果
    </div>
    <span class="gradient-text-one">渐变文字</span>

  </div>
  <div>
    <span style="filter: glow(color=#4a7ac9,strength=12);font-size: 48px;">001</span>

  </div>


</template>
<style scoped>

</style>
<script setup>
  import {useRouter} from "vue-router/dist/vue-router";
  import {routerStack} from "@/stack";

  const router = useRouter()

</script>

<style >

.gradient-text-one{
  background-image:-webkit-linear-gradient(bottom,rgba(0, 223, 255, 1),white);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  font-size: 40px;
}
</style>
<style scoped>
*{
  margin: 0 auto;
}
  #page1{
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   width: 100%;
  }
  p:first-letter{
    color: rosybrown;
  }
  p:before{
    content: '这是新加的内容';
  }
  .rotate_div{
    width: 100px;
    height: 100px;
    background-color: red;
    transform: rotate(45deg);
  }
  .rotate_div2{
    width: 100px;
    height: 100px;
    background-color: greenyellow;
    transform: translate(200px,0px);
  }
  .rotate_div3{
    width: 100px;
    height: 100px;
    background-color: greenyellow;
    transform: scale(2,2);
  }
  .rotate_div4{
    width: 100px;
    height: 100px;
    background-color: greenyellow;
    transform: skew(20deg,-20deg)

  }
  .div1{
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    transition: width 2s;
  }
  .div1:hover{
    width: 400px;
  }
  .div2{
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    transition: width 2s,height 2s, transform 2s;
  }
  .div2:hover{
    width: 400px;
    height: 400px;
    transform: rotate(360deg);
  }
  .div3{
    width:100px;
    height:100px;
    background:red;
    animation:myfirst 5s linear infinite;
  }
  @keyframes myfirst {
    0%   {background:red;}
    25%  {background:yellow;}
    50%  {background:blue;}
    100% {background:green;}
  }
</style>
