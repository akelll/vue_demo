<template>
  <div >
    <tableLyz style="padding: 0 34px 0 24px;" :columns="groupColumns" :list="groupList">
      <template slot="nodata">暂无数据</template>
    </tableLyz>
  </div>
</template>
<script setup>

const groupList= [
      {
        statTime: '111',
        groupTotal: 11,
        groupInc: 222,
        groupCustomTotal: 2223,
        groupCustomInc: 43,
        groupCustomDec: 12
      },
  {
        statTime: '111',
        groupTotal: 11,
        groupInc: 222,
        groupCustomTotal: 2223,
        groupCustomInc: 43,
        groupCustomDec: 12
      },
  {
        statTime: '111',
        groupTotal: 11,
        groupInc: 222,
        groupCustomTotal: 2223,
        groupCustomInc: 43,
        groupCustomDec: 12
      },
  {
        statTime: '111',
        groupTotal: 11,
        groupInc: 222,
        groupCustomTotal: 2223,
        groupCustomInc: 43,
        groupCustomDec: 12
      },
  {
        statTime: '111',
        groupTotal: 11,
        groupInc: 222,
        groupCustomTotal: 2223,
        groupCustomInc: 43,
        groupCustomDec: 12
      }]
const groupColumns=[
        {
        title: '日期',
        key: 'statTime',
        fixed: 'left',
        style: {
          width: '120px',
          color: '#494949',
          paddingLeft: '10px',
          textAlign: 'center'
        },
        columnStyle: {
          width: '120px',
          color: 'pink',
        }
      },
        {
          title: '客户群总数',
          key: 'groupTotal',
          style: {
            width: '200px',
            color: '#494949'
          }
        },
        {
          title: '新增客户群',
          key: 'groupInc',
          style: {
            width: '200px',
            color: '#494949'
          }
        },
        {
          title: '客户群总人数',
          key: 'groupCustomTotal',
          style: {
            width: '200px',
            color: '#494949'
          }
        },
        {
          title: '客户群新增人数',
          key: 'groupCustomInc',
          style: {
            width: '200px',
            color: '#494949'
          }
        },
        {
          title: '退群客户数',
          key: 'groupCustomDec',
          style: {
            width: '200px',
            color: '#494949'
          }
        }
      ]




</script>
