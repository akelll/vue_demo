
<template>
  <div class="content-table">
    <template v-if="props.tableData.length > 0">
      <div class="left-div">
        <div class="left-div1">
          <table>
            <tr>
              <th>{{ header }}</th>
            </tr>
          </table>
        </div>
        <div
            ref="firstColLayer"
            class="left-div2"
            :style="{ height: `calc(100vh - ${tableScrollHeight}px` }"
        >
          <table class="left-table2">
            <tr v-for="(col, index) in firstCol" :key="index">
              <td>{{ col }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="right-div">
        <div ref="firstRowLayer" class="right-div1">
          <table class="right-table1" :style="{ width: (firstRow.length - 1) * 100 + 'px' }">
            <tr>
              <th class="first-row-style" v-for="(row, index) in firstRow" :key="index">{{ row }}</th>
            </tr>
          </table>
        </div>
        <div
            ref="tableContainer"
            class="right-div2"
            :style="{ height: `calc(100vh - ${tableScrollHeight}px` }"
            @scroll="tableScroll()"
        >
          <table class="right-table2" :style="{ width: (firstRow.length - 1) * 100 + 'px' }">
            <tr v-for="(body,index) in tableBodyRows" :key="index">
              <td v-for="(col, i) in tableBodyCols" :key="col.props + i">{{ body[col.props] }}</td>
            </tr>
          </table>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="empty-content">
        <table
            cellspacing="0"
            :style="{ width: (headerData.length - 1) * 100 + 'px', height: '10rem', overflow: 'auto' }"
        >
          <thead class="table-header">
          <tr>
            <th v-for="(item,index) in props.headerData" :key="item.title">{{ item.title }}</th>
          </tr>
          </thead>

          <van-empty class="empty-res" description="空空如也！" />
        </table>
      </div>
    </template>
  </div>
</template>
<script lang='ts' setup>
import { computed, Ref, ref } from 'vue'

const props = defineProps<{

  // 传我表头,表头的列数，需要和tableData每一个对象里的属性值一样
  headerData: { title: string, props: string }[],
  // 表格数据
  tableData: { [key: string]: any }[],
  // 表格高度
  tableScrollHeight: number
}>()

const tableContainer: Ref<HTMLDivElement | null> = ref(null);
const firstRowLayer: Ref<HTMLDivElement | null> = ref(null);
const firstColLayer: Ref<HTMLDivElement | null> = ref(null);

// 第一列数据
const firstCol = computed(() => props.tableData.map(p => {
  const pArr = Object.keys(p);
  return p[pArr[0]]
}))
// 第一个表头，第一列
const header = computed(() => props.headerData[0].title);
// 第一行
const firstRow = computed(() => {
  const rows: string[] = [];
  props.headerData.forEach((f, i) => {
    if (i !== 0) {
      rows.push(f.title)
    }
  })
  return rows;
})



// 表格内容行
const tableBodyRows = computed(() => {
  let arr: { [key: string]: any }[] = [];
  props.tableData.forEach((f, index) => {
    // 接下来排除第一列
    let res: { [key: string]: any } = {};
    for (const key in f) {
      if (Object.prototype.hasOwnProperty.call(f, key)) {
        if (key !== props.headerData[0].title) {
          res[key] = f[key]
        }
      }
    }
    arr.push(res)
  })
  return arr
})
// 表格内容列
const tableBodyCols = computed(() => {
  let arr: { title: string, props: string }[] = []
  props.headerData.forEach((f, i) => {
    if (i !== 0) {
      arr.push(f)
    }
  })
  return arr;
})


// table滚动
const tableScroll = () => {
  // 首行固定
  firstRowLayer.value!.scrollLeft = tableContainer.value!.scrollLeft;
  // 首列固定
  firstColLayer.value!.scrollTop = tableContainer.value!.scrollTop;
}
</script>
<style lang="scss" scoped>
.content-table {
  box-sizing: border-box;
  overflow-x: hidden;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  border-spacing: 0;
  font-size: 13px;
}
th {
  word-break: break-all;
  word-wrap: break-word;
  height: 40px;
  width: 100px;
  vertical-align: middle;
  text-align: center;
  border-left: 1px solid #999;
  background: #d9d9d9;
  box-sizing: border-box;
}
td {
  word-break: break-all;
  word-wrap: break-word;
  width: 100px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
  border-left: 1px solid #999;
  box-sizing: border-box;
}
tr {
  border-top: 1px solid #999;
  box-sizing: border-box;
}
.left-div {
  width: 100px;
  float: left;
}
.left-div1 {
  width: 100%;
}
.left-div2 {
  width: 100%;
  overflow: hidden;
}
.left-table2 {
  margin-bottom: 4px;
}
.right-div {
  float: left;
  width: calc(100vw - 100px);
  margin-left: -1px;
}
.right-div1 {
  width: 100%;
  overflow: hidden;

  .first-row-style {
    box-sizing: border-box;
  }
}
.right-div2 {
  width: 100%;
  overflow: auto;
}

.right-table2 {
  overflow: hidden;
}
table tr:nth-child(odd) {
  background: rgba(255, 255, 255, 0.3);
}
table tr:nth-child(even) {
  background: rgba(153, 153, 153, 0.3);
}
.empty-content {
  width: 100%;
  overflow: auto;
}
</style>
