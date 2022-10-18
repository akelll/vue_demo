<template>
  <dv-loading v-if="data.loading">加载中...</dv-loading>
  <div class="border-box">
<!--    <dv-border-box-1 :color="['red', 'green']" backgroundColor="#fff" >dv-border-box-1</dv-border-box-1>-->
    <dv-border-box-1>dv-border-box-1</dv-border-box-1>
    <dv-border-box-8>dv-border-box-8</dv-border-box-8>
    <dv-border-box-11 title="dv-border-box-11">dv-border-box-11</dv-border-box-11>
  </div>

  <dv-decoration-3 style="width:250px;height:30px;" />
  <dv-decoration-9 style="width:150px;height:150px;">66%</dv-decoration-9>

  <dv-charts :option="opt" style="width:600px;height:300px;"/>

  <div style="background-color: black">
    <dv-active-ring-chart :config="cof" style="width:200px;height:200px" />
    <dv-capsule-chart :config="cof2" style="width:300px;height:200px" />
    <dv-percent-pond :config="jd" style="width:200px;height:100px;" />
  </div>
  <dv-conical-column-chart :config="config" style="width:400px;height:200px;" />



</template>

<script setup>
import {onMounted, ref} from "vue";

const data = ref({
  loading:true
})
const config = ref({
  data: [
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 71
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    },
    {
      name: '信阳',
      value: 35
    },
    {
      name: '漯河',
      value: 15
    }
  ],
})
const opt = ref()
const cof = ref()
const cof2 = ref()
const option1 = {
  title: {
    text: '周销售额趋势'
  },
  xAxis: {
    name: '第一周',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    name: '销售额',
    data: 'value'
  },
  series: [
    {
      data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
      type: 'bar'
    }
  ]
}
const cof1 = {
  data: [
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 78
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    }
  ]
}
const cof3 = {
  data: [
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 123
    },
    {
      name: '漯河',
      value: 98
    },
    {
      name: '郑州',
      value: 75
    },
    {
      name: '西峡',
      value: 66
    },
  ],
  colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
  unit: '单位'
}
const jd = ref(
    { value: 66,
  borderWidth: 5,
  borderRadius: 10,
  borderGap: 5})
onMounted(()=>{
  setTimeout(()=>data.value.loading = false,1000)
  opt.value = option1
  cof.value = cof1
  cof2.value = cof3
  setInterval(()=>{
    if (jd.value.value <=100)
      jd.value.value += 10
    else jd.value.value = 100
  },1000)
})
</script>

<style scoped lang="scss">
.border-box{
  div{
    width: 500px;
    height: 300px;
  }
}
</style>
