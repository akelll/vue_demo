<template>
<div id="page1" @dblclick="data.screen">
  <div class="item1" >
    <el-image class="item1-img"  :src="title"></el-image>
    <span class="item1-time">{{data.nowTime}}</span>
  </div>
  <div class="item2">
    <div class="item2-1">
      <span class="title1">学生请假</span>
      <div class="item2-1-header">
        <div class="item2-1-header1">
          <el-image class="item2-1-header1-img"  :src="sch_icon"></el-image>
          <div class="item2-1-header1-div">
            <span class="text-green">{{data.inSchNum}}</span>
            <span>在校人数</span>
          </div>

        </div>
        <div class="item2-1-header2">
          <el-image class="item2-1-header1-img"  :src="use_deny"></el-image>
          <div class="item2-1-header1-div">
            <span class="text-org">{{data.leaveNum}}</span>
            <span>请假人数</span>
          </div>

        </div>
      </div>
      <div class="item2-1-item1">
      <span class="gradient-text">请假比例</span>
      <div>
        <div id="pie-l-1" ></div>
        <div id="pie-l-2" ></div>
        <div class="t1">
          <span>请假人数</span>
          <span>{{data.leaveNum}}人</span>
        </div>
        <div class="t2">
          <span>请假人数</span>
          <span>{{data.leaveNum}}人</span>
        </div>
      </div>
    </div>
      <div class="item2-1-item2 mt">
        <span class="gradient-text">每月请假人数</span>
        <div>
            <div id="line-l-1" ></div>
        </div>
      </div>
      <div class="item2-1-item2 mt2">
        <span class="gradient-text">当月各年级段请假人数</span>
        <div>
            <div id="bar" ></div>
        </div>
      </div>
    </div>
    <div class="item2-2">
      <div class="item2-2-1">
        <el-image class="item2-img"  :src="img"></el-image>
      </div>
      <div class="item2-2-2">
        <div class="test tt2"></div>
        <span class="title2">放学信息</span>
        <div class="item2-2-icon">
          <div class="item2-2-icon1">
            <el-avatar class="item2-2-icon-i" shape="square" :src="user"/>
            <div class="item2-2-icon-msg">
              <span class="icon-number text-green">{{data.afterSch}}</span>
              <span class="icon-text">已放学</span>
            </div>
          </div>
          <div>
            <el-avatar class="item2-2-icon-i" shape="square" :src="user"/>
            <div class="item2-2-icon-msg">
              <span class="icon-number text-ye" >{{data.inSch}}</span>
              <span class="icon-text">放学中</span>
            </div>

          </div>
          <div class="item2-2-icon3">
            <el-avatar class="item2-2-icon-i" shape="square" :src="user"/>
            <div class="item2-2-icon-msg">
              <span class="icon-number text-org" >{{data.beforeSch}}</span>
              <span class="icon-text">未放学</span>
            </div>

          </div>
        </div>
        <div class="item2-2-2-line"></div>
       <div class="item2-2-class"  v-for="(item,i) in data.leaveSchool" :key="i">
         <div class="item2-2-class-label">{{item.classLevel}}</div>
         <span class="text-ml" :class="data.getClass(ck.value)" v-for="(ck,j) in item.classInfo" :key="j">{{ck.name}}</span>
       </div>
      </div>
    </div>
    <div class="item2-3">
      <div class="test tt3"></div>
      <div class="test tt4"></div>
      <span class="title3">闸机出入数据</span>
      <div class="item2-3-item1">
        <div class="item2-3-item1-l">
          <div class="item1-l1">
            <span class="text-green">{{data.enterSch}}</span>
            <span>当日进校人数</span>
          </div>
          <div class="item1-l1 mt3">
            <span class="text-ye">{{data.outSch}}</span>
            <span>当日出校人数</span>
          </div>
        </div>
        <div class="item2-3-item1-r">
          <div class="item1-r-title ">
            <span class="gradient-text item1-r-title-p">师生员工测温情况</span>
          </div>
            <div id="pie-r-1"></div>
          <div class="t3">
            <span>测温人数</span>
            <span>{{data.tempNum}}人</span>
          </div>
        </div>
      </div>
      <div class="item2-1-item2">
        <span class="gradient-text">教师每月出勤情况</span>
        <div>
            <div id="line-r-1" ></div>
        </div>
      </div>
      <div class="item2-1-item2 mt4">
        <span class="gradient-text">学生每月出勤情况</span>
        <div>
          <div id="line-r-2" ></div>
        </div>
      </div>
    </div>
  </div>
  <div class="test tt1"></div>


</div>
</template>

<script setup>
import {onMounted, onUnmounted, reactive, watch} from "vue";
import * as echarts from 'echarts'
import img from '@/assets/jbSchool/img.jpg'
import title from '@/assets/jbSchool/title.png'
import user from '@/assets/jbSchool/icon_user.png'
import sch_icon from '@/assets/jbSchool/icon_sch.png'
import use_deny from '@/assets/jbSchool/icon_deny.png'
import {getInfo} from "@/api";

onMounted(()=>{
  data.ds()
  setInterval(()=>{
    data.setTime()
  },1000)
  data.getData()


})
onUnmounted(()=>{
  clearInterval(data.timer1)
  data.timer1 = null
  clearInterval(data.timer2)
  data.timer2 = null
  clearInterval(data.timer3)
  data.timer3 = null
})

const initChart = (name,data) => {
  const chartDom = document.getElementById(name);
  const myChart = echarts.init(chartDom);
  let option;

  option = {
    color:['rgba(0, 224, 255, 1)'],
    xAxis: {
      type: 'category',
      axisLabel:{
        color:'#fff',
        size:'11px'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(139, 208, 255, 1)',//坐标线的颜色
        }
      },
      data: data.name
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        lineStyle: {
          color: 'rgb(248,175,18)' // 线的颜色
        }
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: "rgba(139, 208, 255, 0.2)"
        }
      },
      axisLabel:{
        color:'#fff',
        size:'11px'
      }
    },

    series: [
      {
        data: data.value,
        type: 'line'
      }
    ]
  };
  option && myChart.setOption(option);

}
const initPie = (name,data,flag) => {
  // console.log(data)
  const chartDom = document.getElementById(name);
  const myChart = echarts.init(chartDom);
  let option;

  option = {
    tooltip: {
      trigger: 'item'
    },
    color:flag ? ['rgba(60, 255, 181, 1)','rgba(254, 86, 41, 1)']:['rgba(60, 255, 181, 1)','rgba(255, 208, 80, 1)','rgba(0, 224, 255, 1)'],
    legend: {
      top: 'middle',
      right: '0%',
      icon: "circle",
      itemHeight:7,
      orient: "vertical",
      formatter:function (name){
        for (var i=0;i<option.series[0].data.length;i++){
          if (name ===option.series[0].data[i].name)
            return `${name} ${option.series[0].data[i].value}人`
        }
      },
      textStyle:{
        color:'#ffffff',
        size:'12px',
      }
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['50%', '70%'],
        center:['29%','50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '12',
            fontWeight: 'bold',
            color:'#ffffff',
            formatter:function (val){
             return `请假人数\n\r15人`
            },
          },

        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };

  option && myChart.setOption(option);
  window.onresize = function () {
    myChart.resize();
  };
}
const initBar = (name,data) => {
  const chartDom = document.getElementById(name);
  const myChart = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: data.name,
      axisLabel:{
        color:'#fff',
        size:'11px'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(139, 208, 255, 1)',//坐标线的颜色
        }
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: "rgba(139, 208, 255, 0.2)"
        }
      },
      axisLabel:{
        color:'#fff',
        size:'11px'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        // lineStyle: {
        //   color: 'rgb(248,175,18)' // 线的颜色
        // }
      },
      // formatter: function (params) {  // 自定义显示
      //   console.log(params)
      //   var value = params[0].name + ': ' + params[0].value+'';
      //   return value
      // }
    },
    series: [
      {
        data: data.value,
        type: 'bar',
        itemStyle: {
          color: function (params) {
            // var colorList = ['#fac858','#91cc75','#5470c6'];
            var colorList = ['rgba(255, 208, 80, 1)', 'rgba(60, 255, 181, 1)', 'rgba(0, 224, 255, 1)', ];
            return colorList[params.dataIndex%3]
          },
        },
      }
    ]
  };

  option && myChart.setOption(option);
  window.onresize = function () {
    myChart.resize();
  };
}

const data =reactive({
  timer1:null,
  timer2:null,
  timer3:null,
  intervalTimes1:1,
  intervalTimes2:1,
  intervalTimes3:1,
  inSchNum:1680,
  leaveNum:15,
  enterSch:66,
  outSch:99,
  beforeSch:8,
  inSch:2,
  afterSch:9,
  tempNum:1665,
  leaveSchool:[],
  leaveSex:[],
  leaveCategory:[],
  temp:[],
  leaveMonth:null,
  attendanceStu:null,
  attendanceTea:null,
  leaveClass:null,
  nowTime:null,
  fullscreen:false,
  getClass:(value)=> value === 0 ? 'text-org':value === 1 ?'text-ye':'text-green',
  setTime:() => {
    let d=new Date()
    data.nowTime = `${d.getFullYear()}-${(d.getMonth()+1+'').padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
  },
  transferValue(data){
    let demo = {},list1=[],list2=[]
    data.forEach(item=>{
      list1.push(item.name)
      list2.push(item.value)
    })
    demo.name = list1
    demo.value = list2
    return demo
  },
  ds:(index)=>{
    if (index===1){
      data.timer1 = setInterval(()=>{
        getInfo(100001).then(res =>{
          data.intervalTimes1 = res.data.Data.ReqInterval
          let d =JSON.parse(res.data.Data.ModuleJson)
          data.inSchNum = d.inSchNum
          data.leaveNum = d.leaveNum
          data.leaveSex = d.leaveSex
          data.leaveCategory = d.leaveCategory
          data.leaveMonth = data.transferValue(d.leaveMonth)
          data.leaveClass = data.transferValue(d.leaveClass)
          initChart('line-l-1',data.leaveMonth)
          initPie('pie-l-1',data.leaveSex,0)
          initPie('pie-l-2',data.leaveCategory,0)
          initBar('bar',data.leaveClass)
          window.onresize = function () {
            let list = ['line-l-1','line-r-1','line-r-2','pie-l-1','pie-l-2','pie-r-1','bar']
            list.forEach(item=>{
              const chartDom = document.getElementById(item);
              const myChart = echarts.init(chartDom);
              myChart.resize();
            })

          };
        })
      },1000 * data.intervalTimes1)
    }else if (index===2){
      data.timer2 = setInterval(()=>{
        getInfo(100002).then(res=>{
          data.intervalTimes2 = res.data.Data.ReqInterval
          let d =JSON.parse(res.data.Data.ModuleJson)
          data.beforeSch = d.beforeSch
          data.inSch = d.inSch
          data.afterSch = d.afterSch
          data.leaveSchool = d.leaveSchool
        })
      },1000 * data.intervalTimes2)
    }else if(index===3){
      data.timer3 = setInterval(()=>{
        getInfo(100003).then(res =>{
          data.intervalTimes3 = res.data.Data.ReqInterval
          let d =JSON.parse(res.data.Data.ModuleJson)
          data.enterSch = d.enterSch
          data.outSch = d.outSch
          data.tempNum = d.tempNum
          data.leaveCategory = d.leaveCategory
          data.temp = d.temp
          data.attendanceStu = data.transferValue(d.attendanceStu)
          data.attendanceTea = data.transferValue(d.attendanceTea)
          data.leaveClass = d.leaveClass
          initPie('pie-r-1',data.temp,1)
          initChart('line-r-1',data.attendanceTea)
          initChart('line-r-2',data.attendanceStu)
          window.onresize = function () {
            let list = ['line-l-1','line-r-1','line-r-2','pie-l-1','pie-l-2','pie-r-1','bar']
            list.forEach(item=>{
              const chartDom = document.getElementById(item);
              const myChart = echarts.init(chartDom);
              myChart.resize();
            })

          };
        })
      },1000 * data.intervalTimes3)
    }


  },
  screen:()=>{
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

  },
  getData:()=>{
    getInfo(100002).then(res=>{
      data.intervalTimes2 = res.data.Data.ReqInterval
      let d =JSON.parse(res.data.Data.ModuleJson)
      data.beforeSch = d.beforeSch
      data.inSch = d.inSch
      data.afterSch = d.afterSch
      data.leaveSchool = d.leaveSchool
    })
    getInfo(100001).then(res =>{
      data.intervalTimes1 = res.data.Data.ReqInterval
      let d =JSON.parse(res.data.Data.ModuleJson)
      data.inSchNum = d.inSchNum
      data.leaveNum = d.leaveNum
      data.leaveSex = d.leaveSex
      data.leaveCategory = d.leaveCategory
      data.leaveMonth = data.transferValue(d.leaveMonth)
      data.leaveClass = data.transferValue(d.leaveClass)
      initChart('line-l-1',data.leaveMonth)
      initPie('pie-l-1',data.leaveSex,0)
      initPie('pie-l-2',data.leaveCategory,0)
      initBar('bar',data.leaveClass)
      window.onresize = function () {
        let list = ['line-l-1','line-r-1','line-r-2','pie-l-1','pie-l-2','pie-r-1','bar']
        list.forEach(item=>{
          const chartDom = document.getElementById(item);
          const myChart = echarts.init(chartDom);
          myChart.resize();
        })

      };
    })
    getInfo(100003).then(res =>{
      data.intervalTimes3 = res.data.Data.ReqInterval
      let d =JSON.parse(res.data.Data.ModuleJson)
      data.enterSch = d.enterSch
      data.outSch = d.outSch
      data.tempNum = d.tempNum
      data.leaveCategory = d.leaveCategory
      data.temp = d.temp
      data.attendanceStu = data.transferValue(d.attendanceStu)
      data.attendanceTea = data.transferValue(d.attendanceTea)
      data.leaveClass = d.leaveClass
      initPie('pie-r-1',data.temp,1)
      initChart('line-r-1',data.attendanceTea)
      initChart('line-r-2',data.attendanceStu)
      window.onresize = function () {
        let list = ['line-l-1','line-r-1','line-r-2','pie-l-1','pie-l-2','pie-r-1','bar']
        list.forEach(item=>{
          const chartDom = document.getElementById(item);
          const myChart = echarts.init(chartDom);
          myChart.resize();
        })

      };
    })
  }

})
watch(()=>data.intervalTimes1,()=>{
  clearInterval(data.timer1)
  data.timer1 = null
  data.ds(1)
})
watch(()=>data.intervalTimes2,()=>{
  clearInterval(data.timer2)
  data.timer2 = null
  data.ds(2)
})
watch(()=>data.intervalTimes3,()=>{
  clearInterval(data.timer3)
  data.timer3 = null
  data.ds(3)
})
</script>
<style scoped>
.tt4{
  top: calc(100vw * 890 /1920);
  left: calc(100vw * -15 /1920);
  animation:myfirst 5s linear infinite;
}
.tt3{
  top: calc(100vw * 0 /1920);
  left: calc(100vw * 355 /1920);
  animation:myfirst 4s linear infinite;
}
.tt2{
  top: calc(100vw * -15 /1920);
  left: calc(100vw * 414 /1920);
  animation:myfirst 6s linear infinite;
}
.tt1{
  top: calc(100vw * 113 /1920);
  left: calc(100vw * 393 /1920);
  animation:myfirst 5s linear infinite;
}
@keyframes myfirst {
  0%  {opacity: 1;}
  50%  {opacity: 0.6;}
  100%  {opacity: 1;}
}
.test{
  width: calc(100vw * 85 /1920);
  height: calc(100vw * 75 /1920);
  background: url("../../assets/jbSchool/right_bottom.png") no-repeat;
  background-size: 100% ;
  mix-blend-mode: screen;
  position: absolute;
  z-index: 99;
}
</style>
<style scoped>
#line-l-1,#bar,#line-r-1{
  width: calc(100vw * 512 / 1920);
  height:calc(100vw * 238 / 1920) ;
}
#line-r-2{
  width: calc(100vw * 512 / 1920);
  height:calc(100vw * 288 / 1920) ;
}
#pie-l-1,#pie-l-2{
  width: calc(100vw * 226 / 1920);
  height: calc(100vw * 152 / 1920);
}
.item2-1-item1,.item2-1-item2{
  height: calc(100vw * 27 / 1920);
  width: calc(100vw * 512 / 1920);
  background: url("../../assets/jbSchool/title_bg.png") no-repeat bottom;
  background-size: 100% calc(100vw * 22 / 1920);
  margin-top: calc(100vw * 45 / 1920);
}

.mt{
  margin-top: calc(100vw * 185 / 1920);
}
.mt2{
  margin-top: calc(100vw * 221 / 1920);
}
.item2-1-item1 >div{
  display: flex;
  position: relative;
  margin-top: calc(100vw * 14 / 1920);
}
@media (max-width: 1440px) {
  .t1{
    left: calc(100vw * 45 / 1920) !important;
  }
  .t2{
    left: calc(100vw * 302 / 1920) !important;
  }
  .t3{
    left: calc(100vw * 67 / 1920) !important;
  }
  #pie-r-1{
    width: calc(100vw * 260 / 1920) !important;
  }
  #pie-l-1,#pie-l-2{
    width: calc(100vw * 245 / 1920) !important;
  }
}
.t1{
  position: absolute;
  color: white;
  font-size: calc(100vw * 12 / 1920);
  display: flex;
  flex-direction: column;
  top: calc(100vw * 60 / 1920);
  left: calc(100vw * 58 / 1920);
}

.t2{
  position: absolute;
  color: white;
  font-size: calc(100vw * 12 / 1920);
  display: flex;
  flex-direction: column;
  top: calc(100vw * 60 / 1920);
  left: calc(100vw * 314 / 1920);
}
.t3{
  position: absolute;
  color: white;
  font-size: calc(100vw * 12 / 1920);
  display: flex;
  flex-direction: column;
  top: calc(100vw * 209 / 1920);
  left: calc(100vw * 79 / 1920);
}
.gradient-text{
  background-image:-webkit-linear-gradient(bottom,rgba(0, 223, 255, 1),white);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;

}
.item2-1-header1-img{
  width: calc(100vw * 62 / 1920) !important;
  height: calc(100vw * 55 / 1920) !important;
  margin: calc(100vw * 11 / 1920) calc(100vw * 18 / 1920) calc(100vw * 13 / 1920) calc(100vw * 36 / 1920) !important;

}
.item2-1-header{
  margin-top: calc(100vw * 97 / 1920);
  display: flex;
}
.item2-1-header1,.item2-1-header2{
  width: calc(100vw * 206 / 1920);
  height: calc(100vw * 79 / 1920);
  border: 1px solid rgba(88, 205, 255, 0.6800);
  box-shadow: 0 0 4px rgba(122, 210, 248, 0.68);
  display: flex;
}
.item2-1-header1{
  margin-left: calc(100vw * 51 / 1920)!important;
}
.item2-1-header2{
  margin-right: calc(100vw * 52 / 1920)!important;
}

.item2-1-header1-div{
  font-size: calc(100vw * 22 / 1920);
  margin: calc(100vw * 21 / 1920) 0 0 0;
  display: flex;
  flex-direction: column;
}
.item2-1-header1-div >span:last-child{
  font-size: calc(100vw * 14 / 1920);
  color: white;
}
</style>
<style scoped>
*{margin: 0 auto}
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
  margin-left: calc(100vw * 90 / 1920);
}
.item2-2-icon3{
  margin-right: calc(100vw * 90 / 1920);
}
.icon-text{
  font-size: calc(100vw * 14 / 1920);
  margin-left: calc(100vw * 20 / 1920);
}
.icon-number{
  font-size: calc(100vw * 22 / 1920);
  margin-left: calc(100vw * 23 / 1920);
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
  margin-top: calc(100vw * 21 / 1920);
  margin-bottom: calc(100vw * 21 / 1920);
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
  background-size: 100% 100%;
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
  width: calc(100vw * 494 / 1920);
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
  flex-direction: column;
  margin-top: calc(100vw * 40 / 1920);
}
.item2-2-1{
  background: url("../../assets/jbSchool/mid1.png") no-repeat;
  background-size: 100% 100%;
  width: calc(100vw * 672 / 1920);
  height: calc(100vw * 415 / 1920);
}

.item2-2-2{
  background: url("../../assets/jbSchool/mid2.png") no-repeat;
  background-size: 100% 100%;
  width: calc(100vw * 675 / 1920);
  height: calc(100vw * 485 / 1920);
  position: relative;
}
.item2-2-icon{
  height: calc(100vw * 44 / 1920) !important;
  padding-top: calc(100vw * 83 / 1920);
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
.item2-2-class-label{
  position: absolute;
  left: calc(100vw * 101 / 1920);
}
.text-ml{
  margin-left: calc(100vw * 38 / 1920) !important;
}
.item2-2-class{
  width: 100%;
  height: calc(100vw * 24 / 1920);
  background: url("../../assets/jbSchool/class_label.png") no-repeat  calc(100vw * 77 / 1920) 0;
  background-size: calc(100vw * 77 / 1920) calc(100vw * 24 / 1920);
  color: white;
  margin-top: calc(100vw * 9 / 1920);
  text-align: left;
  padding-left: calc(100vw * 153 / 1920);
  font-size: calc(100vw * 14 / 1920);
  line-height: calc(100vw * 24 / 1920);
  position: relative;
}
</style>
<style scoped>
.mt4{
  margin-top: calc(100vw * 240 / 1920);
}
.item2-3-item1-r{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: calc(100vw * 39 / 1920);
  position: relative;
}
#pie-r-1{
  width: calc(100vw * 240 / 1920);
  height: calc(100vw * 152 / 1920);
  /*margin-right: 60px;*/
}
.item2-3-item1{
  display: flex;
}
.mt3{
  margin-top: calc(100vw * 21 / 1920);
}
.item2-3-item1-l{
  margin-top: calc(100vw * 98 / 1920);
  width: calc(100vw * 160 / 1920);
  color: white;
  margin-left: calc(100vw * 38 / 1920);
}
.item1-l1{
  width: 100%;
  height: calc(100vw * 79 / 1920);
  display: flex;
  flex-direction: column;
  background: url("../../assets/jbSchool/right_item.png") no-repeat;
  background-size: 100%;
  justify-content: center;
}
.item1-l1 > span:first-child{
  font-size: calc(100vw * 22 / 1920);
}
.item1-l1 > span:last-child{
  font-size: calc(100vw * 14 / 1920);
}
.item1-r-title{
  height: calc(100vw * 56 / 1920);
  width: calc(100vw * 304 / 1920);
  background: url("../../assets/jbSchool/right_title.png") no-repeat left 6px;
  background-size: 100%;
  margin-top: calc(100vw * 92 / 1920);
  color: white;
  font-size: calc(100vw * 18 / 1920);
  position: relative;
}

</style>
