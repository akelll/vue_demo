<template>
  <div class="content">
    <div class="responsive">
      <div >
        <a target="_blank" href="http://static.runoob.com/images/demo/demo3.jpg">
          <img loading="lazy" src="http://static.runoob.com/images/demo/demo3.jpg" alt="图片文本描述" width="300" height="200">
        </a>
        <div>这里添加图片文本描述</div>
      </div>
    </div>
    <div class="btn">
      <el-button type="success">成功按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="success">成功按钮</el-button>
    </div>
    <div class="color-c">
      <span v-for="i in 8"> 颜色变量</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="scss">
@import "../../assets/style/common";

.btn{
  @include fixedBtn(3)
}
.responsive{
  @include imgBox
}
.color-c{
  @include colorMutiply(8)
}



</style>
