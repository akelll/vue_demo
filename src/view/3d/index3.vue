<template>
  <div class="page">
    <div class="left" data-left></div>
    <div class="right" data-right></div>
  </div>
</template>



<style scoped lang="scss">
.page{
  width: 375px;
  height: 667px;
  display: flex;
  div{
    width: 100%;
    height: 100%;

  }
  .left{
    background: url("../../assets/logo.png") no-repeat;
    background-size: 375px 667px;
    border-right: .5px solid #cccccc;
  }
  .right{
    background: url("../../assets/logo.png") no-repeat -187px 0;
    background-size: 375px 667px;
    border-left: .5px solid #cccccc;
    transform-origin: left center;
    animation: flip-to-left 2s ease-in-out forwards;
  }
}
@keyframes flip-to-left {
  from {
    transform:perspective(1000px) rotateY(0);
  }
  to {
    transform:perspective(1000px) rotateY(-180deg);
  }
}
</style>
