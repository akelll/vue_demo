<template>
<div id="page1">
  <div class="item1">
    <el-image class="item1-img"  :src="title"></el-image>
    <span class="item1-time">2022-02-17 16:00</span>
  </div>
  <div class="item2">
    <div class="item2-1">
      <span class="title1">学生请假</span>
    </div>
    <div class="item2-2">
      <div class="item2-2-1">
        <el-image class="item2-img"  :src="img"></el-image>
      </div>
      <div class="item2-2-2">
        <span class="title2">放学信息</span>
        <div class="item2-2-icon">
          <div class="item2-2-icon1">
            <el-avatar class="item2-2-icon-i" shape="square" :src="user"/>
            <div class="item2-2-icon-msg">
              <span class="icon-number text-green">18</span>
              <span class="icon-text">已放学</span>
            </div>
          </div>
          <div>
            <el-avatar class="item2-2-icon-i" shape="square" :src="user"/>
            <div class="item2-2-icon-msg">
              <span class="icon-number text-ye" >18</span>
              <span class="icon-text">放学中</span>
            </div>

          </div>
          <div class="item2-2-icon3">
            <el-avatar class="item2-2-icon-i" shape="square" :src="user"/>
            <div class="item2-2-icon-msg">
              <span class="icon-number text-org" >18</span>
              <span class="icon-text">未放学</span>
            </div>

          </div>
        </div>
        <div class="item2-2-2-line"></div>
      </div>
    </div>
    <div class="item2-3">
      <span class="title3">闸机出入数据</span>
    </div>
  </div>

<!--  <div id="line-l-1" style="width: 400px;height: 400px"></div>-->
<!--  <div id="line-r-1" style="width: 400px;height: 400px"></div>-->
<!--  <div id="line-r-2" style="width: 400px;height: 400px"></div>-->
<!--  <div id="pie-l-1" style="width: 500px;height: 400px"></div>-->
<!--  <div id="pie-l-2" style="width: 500px;height: 400px"></div>-->
<!--  <div id="pie-r-1" style="width: 500px;height: 400px"></div>-->
<!--  <div id="bar" style="width: 400px;height: 400px"></div>-->
</div>
</template>

<script setup>
import {onMounted} from "vue";
import * as echarts from 'echarts'
import img from '@/assets/jbSchool/img.jpg'
import title from '@/assets/jbSchool/title.png'
import user from '@/assets/jbSchool/icon_user.png'

onMounted(()=>{
  // initChart('line-l-1')
  // initChart('line-r-1')
  // initChart('line-r-2')
  // initPie('pie-l-1')
  // initPie('pie-l-2')
  // initPie('pie-r-1')
  // initBar('bar')
})
const initChart = (name) => {
  const chartDom = document.getElementById(name);

  const myChart = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },

    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  option && myChart.setOption(option);
}
const initPie = (name) => {
  const chartDom = document.getElementById(name);
  const myChart = echarts.init(chartDom);
  let option;

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'middle',
      right: '5%',
      icon: "circle",
      orient: "vertical",
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center:['35%','50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };

  option && myChart.setOption(option);
}
const initBar = (name) => {
  const chartDom = document.getElementById(name);
  const myChart = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
      }
    ]
  };

  option && myChart.setOption(option);
}

</script>

<style scoped>
.text-green{
  color: #00F645;
}
.text-ye{
  color: #FFF04B;
}
.text-org{
  color: #FE5629;
}
.item2-2-icon1{
  margin-left: 90px;
}
.item2-2-icon3{
  margin-right: 90px;
}
.icon-text{
  font-size: 14px;
  margin-left: 20px;
}
.icon-number{
  font-size: 22px;
  margin-left: 23px;
}
.item2-2-icon-i{
  width: calc(100vw * 44 / 1920) !important;
  height: calc(100vw * 44 / 1920) !important;
}
.item2-img{
  width: calc(100vw * 617 / 1920) !important;
  height: calc(100vw * 347 / 1920) !important;
  margin-top: calc(100vw * 44 / 1920);
}
.title1{
  color: white;
  font-size: calc(100vw * 20 / 1920);
  position: absolute;
  top: calc(100vw * 36 / 1920);
  left: calc(100vw * 239 / 1920);
}
.title2{
  color: white;
  font-size: calc(100vw * 20 / 1920);
  position: absolute;
  top: calc(100vw * 22 / 1920);
  left: calc(100vw * 296 / 1920);
}
.item2-2-2-line{
  background-image: linear-gradient(to right, rgba(0, 216, 255,0), rgba(0, 216, 255,1), rgba(0, 216, 255,0));
  width: 60%;
  height: 1px;
  margin-top: 21px;
}
.title3{
  color: white;
  font-size: calc(100vw * 20 / 1920);
  position: absolute;
  top: calc(100vw * 36 / 1920);
  left: calc(100vw * 219 / 1920);
}
#page1{
  background: url("../../assets/jbSchool/bg.png") no-repeat;
  background-size: cover;
  padding-bottom: calc(100vw * 34 / 1920);
}
.item1{
  width: 100%;
  height: calc(100vw * 114 / 1920);
  background: url("../../assets/jbSchool/header_bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.item1-img{
  height: calc(100vw * 44 / 1920);
  margin-top: calc(100vw * 23 / 1920);
}
.item1-time{
  position: absolute;
  color: white;
  font-size:calc(100vw * 24 / 1920);
  top: calc(100vw * 31 / 1920);
  right: calc(100vw * 45 / 1920);
}
.item2{
  height: calc(100vw * 930 / 1920);
  display: flex;
}
.item2-1{
  width: calc(100vw * 560 / 1920);
  height: calc(100vw * 930 / 1920);
  position: relative;
  background: url("../../assets/jbSchool/left.png") no-repeat;
  background-size: 100% 100%;
  margin-left: calc(100vw * 37 / 1920);
}
.item2-2{
  width: calc(100vw * 672 / 1920);
  height: calc(100vw * 930 / 1920);
  flex-direction: column;
  padding-top: calc(100vw * 45 / 1920);
}
.item2-2-1{
  background: url("../../assets/jbSchool/mid1.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: calc(100vw * 415 / 1920);
}

.item2-2-2{
  background: url("../../assets/jbSchool/mid2.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: calc(100vw * 475 / 1920);
  position: relative;
}
.item2-2-icon{
  height: 44px !important;
  padding-top: 83px;
  color: white;
  display: flex;
}
.item2-2-icon >div{
  display: flex;
}
.item2-2-icon-msg{
  display: flex;
  flex-direction: column;
}
.item2-3{
  width: calc(100vw * 560 / 1920);
  height: calc(100vw * 930 / 1920);
  position: relative;
  background: url("../../assets/jbSchool/right.png") no-repeat;
  background-size: 100% 100%;
  margin-right: calc(100vw * 37 / 1920);
}
</style>
