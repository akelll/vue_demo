<template>
    <div>
        <div>
            <router-link to="/index">index</router-link>
        </div>
        <div>
            <router-link to="/css">css</router-link>
        </div>
      <div>
        <router-link to="/">驾驶舱</router-link>
      </div>
<!--      <div>-->
<!--        <router-link to="/3d">星云</router-link>-->
<!--      </div>-->
        <div @click="setReq">发送请求</div>
      <div>
        <router-link to="/3d">测试宏</router-link>
      </div>
      <div>
        <router-link to="/3ds">3d效果</router-link>
      </div>
      <div>
        <router-link to="/3ds2">3d效果2</router-link>
      </div>
      <div>
        <router-link to="/mobileTable">移动端表格</router-link>
      </div>
      <div>
        <router-link to="/mobileTable2">移动端表格2</router-link>
      </div>
      <div>
        <router-link to="/file">文件</router-link>
      </div>
    </div>

</template>
<script setup>
import {jc, test1} from "@/api";
import {reactive} from "vue";
const data =reactive({
  _token: 'mmG8sCo6BSIOWNA4QSWDzAONA9ivSP4AZllL24rM',
  txtLen: 163,
  type: 1,
  title: '-',
      author: '-',
    content: 'KJ法的实施流程包括：(1)组织团队。召集可能涉及问题的相关部门人员，多则数十人，少则三五人。参加与否需考虑的要素是工作的相关性。(2)建立共识。运用团队技巧，缓解团体成员压力，建立团队共存共茉整体感，避免针对某个部门或个人的攻击，消除防卫性心理状态。开研讨会吋，外出及封闭式环境效果更佳，围成圆型或半圆型有助于消除地位差别。',
})
const setReq = () => {
  jc(data)
}
</script>
