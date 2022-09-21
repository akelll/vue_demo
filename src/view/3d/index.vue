<template>
  <div class="center_contion">
    <div class="wrapper">
      <div class="box" ref="box">
        <div class="ball ball_1" @click="start" :class="this.index==0?'active':''">
          <img class="icon" src="../../assets/logo.png" />
          <p>资金集中度</p>
          <p class="data">86%</p>
        </div>
        <div class="ball ball_2" :class="this.index==1?'active':''">
          <img class="icon" src="../../assets/logo.png" />
          <p>集中结算率</p>
          <p class="data">86%</p>
        </div>
        <div class="ball ball_3" :class="this.index==2?'active':''">
          <img class="icon" src="../../assets/logo.png" />
          <p>账户监控率</p>
          <p class="data">86%</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "centerContion",
  data() {
    return {
      timer: "",
      timeShow: false,
      x: 0,
      index: 0,
      timer1: null,
    };
  },
  methods: {
    //滚动函数
    roll() {
      let box = this.$refs["box"];
      this.x = this.x - 120;
      this.index = this.index == 2 ? 0 : this.index + 1;
      // this.x = this.x == 2 ? -180 : this.index * 180;

      box.style.transform = "rotateX(-8deg) rotateY(" + this.x + "deg)";
    },
    onVisibilityChange() {
      if (!document[hiddenProperty]) {

        this.timer1 = setInterval(this.roll, 2000);
      } else {
        clearInterval(this.timer1);
      }
    },
    getTime() {
      this.timeShow = !this.timeShow;
    },
    //点击图片滚动
    start() {
      clearInterval(this.timer1);
      this.roll();
      setTimeout(function () {
        clearInterval(this.timer1);
        this.timer1 = setInterval(roll, 2000);
      }, 2000);
    },
  },
  mounted() {
    //  this.timer = setInterval(this.getTime, 10000);
    this.timer = setInterval(this.roll, 4000);
  },
  beforeDestroy() {
    this.onVisibilityChange();
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.center_contion {
  width: 60%;
  height: 65%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 7%;
  /*background-image: url("../../assets/images/home1/car_bottom.png");*/
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
}
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  margin-top: 16%;
  perspective: 3000px;
  perspective-origin: 599px 146px;
}
.box {
  width: 450px;
  transform: rotateY(0deg) rotateX(-8deg);
  transform-style: preserve-3d;
  transition-duration: 1s;
  margin: 0 auto;
}
.ball:nth-child(1) {
  transform: rotateY(0deg) translateZ(400px);
}
.ball:nth-child(2) {
  transform: rotateY(120deg) translateZ(400px);
}
.ball:nth-child(3) {
  transform: rotateY(240deg) translateZ(400px);
}
.ball {
  width: 300px;
  height: 300px;
  text-align: center;
  position: absolute;
  cursor: pointer;
  background-size: 100% 100%;
  color: rgba(255, 255, 255, 0);
  overflow: hidden;
  color: #fff;
  /*background-image: url("../../assets/images/home1/card.png");*/
  p {
    text-align: center;
    font-size: 26px;
    font-family: SourceHanSansCN;
    font-weight: bold;
    color: #fff;
  }
  .data {
    color: #ec9a00;
  }
  .icon {
    width: 75px;
    height: 75px;
    margin-top: 40px;
  }
}
.active {
  width: 450px;
  height: 450px;
  p {
    text-align: center;
    font-size: 46px;
    font-weight: bold;
    color: #fff;
    text-indent: 10px;
  }
  .icon {
    width: 86px;
    height: 86px;
    margin-left: 6px;
  }
  .data {
    color: #ec9a00;
    // text-indent: 20px;
    padding-left: 10px;
  }
}
</style>
