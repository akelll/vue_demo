<template>
  <table-view :title="title" :data="data">
  </table-view>

<!--  <wjh-table  :data="data">-->
<!--    <wjh-table-col prop="start" label="开始时间"/>-->
<!--    <wjh-table-col prop="end" label="结束时间"/>-->
<!--    <wjh-table-col prop="topic" label="主题"/>-->
<!--  </wjh-table>-->
</template>

<script setup>
import TableView from "./common/tableView";
import {ref} from "vue";
import WjhTable from "@/view/mobile/common/wjhTable";

import WjhTableCol from "@/view/mobile/common/wjhTableCol";
const title = ref(['开始时间','结束时间','主题'])
const data = ref([{start:'2022-09-09',end:'2022-09-09',topic:'抗日战争1'},{start:'2022-09-09',end:'2022-09-19',topic:'抗日战争2'},{start:'2022-09-09',end:'2022-09-29',topic:'抗日战争3'},])
</script>

<style lang="scss" scoped>

</style>
