<template>
  <div class="wrapper">
    <div class="model" v-show="data.model">
      <div class="model-show" @click="data.model = false">
        <img :src="data.modelSrc" alt="" @click="data.model = false">
      </div>
    </div>
    <div class="content">


      <div class="show-info">
        <h2>图片裁剪</h2>
        <div class="test test1">
          <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :fixedBox="option.fixedBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :centerBox="option.centerBox"
              :high="option.high"
              :infoTrue="option.infoTrue"
              :maxImgSize="option.maxImgSize"
              @realTime="realTime"
              @imgLoad="imgLoad"
              @cropMoving="cropMoving"
              :enlarge="option.enlarge"
              :mode="option.mode"
              :limitMinSize="option.limitMinSize"
          ></vueCropper>
        </div>
        <div class="test-button">
          <button @click="changeImg" class="btn">changeImg</button>
          <label class="btn" for="uploads">upload</label>
          <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg1($event, 1)" ref="uploadImg">
          <button @click="startCrop" v-if="!data.crap" class="btn">start</button>
          <button @click="stopCrop" v-else class="btn">stop</button>
          <button @click="clearCrop" class="btn">clear</button>
          <button @click="refreshCrop" class="btn">refresh</button>
          <button @click="changeScale(1)" class="btn">+</button>
          <button @click="changeScale(-1)" class="btn">-</button>
          <button @click="rotateLeft" class="btn">rotateLeft</button>
          <button @click="rotateRight" class="btn">rotateRight</button>
          <button @click="finish('base64')" class="btn">preview(base64)</button>
          <button @click="finish('blob')" class="btn">preview(blob)</button>
          <button @click="() => option.img = ''" class="btn">清除图片</button>
          <a @click="down('base64')" class="btn">download(base64)</a>
          <a @click="down('blob')" class="btn">download(blob)</a>
          <a :href="data.downImg" download="demo.png" ref="downloadDom"></a>
        </div>

        <div class="pre">
          <!-- <section class="pre-item">
            <p>固定大小 固定宽度100px</p>
            <section v-html="previews.html"></section>
          </section> -->

          <section class="pre-item">
            <p>截图框大小</p>
            <div class="show-preview" :style="{'width': data.previews.w + 'px', 'height': data.previews.h + 'px',  'overflow': 'hidden',
							'margin': '5px'}">
              <div :style="data.previews.div">
                <img :src="data.previews.url" :style="data.previews.img">
              </div>
            </div>
          </section>

          <section class="pre-item">
            <p>中等大小</p>
            <div :style="data.previewStyle1">
              <div :style="data.previews.div">
                <img :src="data.previews.url" :style="data.previews.img">
              </div>
            </div>
          </section>

          <section class="pre-item">
            <p>迷你大小</p>
            <div :style="data.previewStyle2">
              <div :style="data.previews.div">
                <img :src="data.previews.url" :style="data.previews.img">
              </div>
            </div>
          </section>

          <section class="pre-item" title="zoom: (100 / previews.w)">
            <p>固定为100宽度</p>
            <div :style="data.previewStyle3">
              <div :style="data.previews.div">
                <img :src="data.previews.url" :style="data.previews.img">
              </div>
            </div>
          </section>


          <section class="pre-item" title="zoom: (100 / previews.h)">
            <p>固定为100高度</p>
            <div :style="data.previewStyle4">
              <div :style="data.previews.div">
                <img :src="data.previews.url" :style="data.previews.img">
              </div>
            </div>
          </section>
        </div>


        <div style="display:block; width: 100%;">
          <label class="c-item">
            <span>图片默认渲染方式</span>
            <select v-model="option.mode">
              <option value="contain">contain</option>
              <option value="cover">cover</option>
              <option value="400px auto">400px auto</option>
              <option value="auto 400px">auto 400px</option>
              <option value="50%">50%</option>
              <option value="auto 50%">auto 50%</option>
            </select>
            <section>
              类似css background属性设置  设置不符合规范不生效， 参照文档说明
            </section>
          </label>
          <!-- <label class="c-item">
						<span>截图框最小限制 </span>
						<input type="text" v-model="option.limitMinSize">
					</label> -->
          <label class="c-item">
            <span>上传时图片最大大小(默认会压缩尺寸到这个大小)</span>
            <input type="nubmer" v-model="option.maxImgSize">
          </label>
          <label class="c-item">
            <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
            <input type="checkbox" v-model="option.original">
            <span>original: {{ option.original}}</span>
          </label>
          <label class="c-item">
            <span>是否根据dpr生成适合屏幕的高清图片</span>
            <input type="checkbox" v-model="option.high">
            <span>high: {{ option.high}}</span>
          </label>
          <label class="c-item">
            <span>是否输出原图比例的截图</span>
            <input type="checkbox" v-model="option.full">
            <span>full: {{ option.full}}</span>
          </label>
          <label class="c-item">
            <span>截图信息展示是否是真实的输出宽高</span>
            <input type="checkbox" v-model="option.infoTrue">
            <span>infoTrue: {{ option.infoTrue}}</span>
          </label>
          <label class="c-item">
            <span>能否拖动图片</span>
            <input type="checkbox" v-model="option.canMove">
            <span>canMove: {{ option.canMove}}</span>
          </label>
          <label class="c-item">
            <span>能否拖动截图框</span>
            <input type="checkbox" v-model="option.canMoveBox">
            <span>canMoveBox: {{ option.canMoveBox}}</span>
          </label>
          <label class="c-item">
            <span>截图框固定大小</span>
            <input type="checkbox" v-model="option.fixedBox">
            <span>fixedBox: {{ option.fixedBox}}</span>
          </label>
          <label class="c-item">
            <span>是否自动生成截图框</span>
            <input type="checkbox" v-model="option.autoCrop">
            <span>autoCrop: {{ option.autoCrop}}</span>
          </label>
          <label class="c-item">
            <span>自动生成截图框的宽高</span>
            <span>宽度:  </span><input type="number" v-model="option.autoCropWidth">
            <span>高度:  </span><input type="number" v-model="option.autoCropHeight">
          </label>
          <label class="c-item">
            <span>截图框是否限制在图片里(只有在自动生成截图框时才能生效)</span>
            <input type="checkbox" v-model="option.centerBox">
            <span>centerBox: {{ option.centerBox}}</span>
          </label>
          <label class="c-item">
            <span>是否按照截图框比例输出 默认为1 </span>
            <input type="number" v-model="option.enlarge">
          </label>
          <p>输出图片格式</p>
          <label class="c-item">
            <label>jpg  <input type="radio" name="type" value="jpeg" v-model="option.outputType"></label>
            <label>png  <input type="radio" name="type" value="png" v-model="option.outputType"></label>
            <label>webp <input type="radio" name="type" value="webp" v-model="option.outputType"></label>
          </label>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
// import { VueCropper } from "../lib/index";
// import '../dist/index.css'
// import { VueCropper }  from "../dist/vue-cropper.es.js";
// import 'vue-cropper/dist/index.css'
// import { VueCropper }  from "vue-cropper";


import {reactive, ref} from "vue";
const cropper = ref(null)
const cropper2 = ref(null)
const cropper3 = ref(null)
const downloadDom = ref(null)
const uploadImg = ref(null)
const option = reactive({ img: "",
  size: 1,
  full: false,
  outputType: "png",
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 200,
  autoCropHeight: 150,
  centerBox: false,
  high: false,
  cropData: {},
  enlarge: 1,
  mode: 'contain',
  maxImgSize: 3000,
  limitMinSize: [100, 120]})
const data = reactive({
    model: false,
    modelSrc: "",
    crap: false,
    previews: {
      url: ''
    },
    lists: [
      // {
      // 	img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
      // },
      {
        img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4"
      },
      {
        img: "http://cdn.xyxiao.cn/Landscape_1.jpg"
      },
      {
        img: "http://cdn.xyxiao.cn/Landscape_2.jpg"
      },
      {
        img: "http://cdn.xyxiao.cn/Landscape_3.jpg"
      },
      {
        img: "http://cdn.xyxiao.cn/Landscape_4.jpg"
      },
      {
        img: "http://cdn.xyxiao.cn/Portrait_1.jpg"
      },
      {
        img: "http://cdn.xyxiao.cn/Portrait_2.jpg"
      }
    ],

    example2: {
      img: "http://cdn.xyxiao.cn/Landscape_2.jpg",
      info: true,
      size: 1,
      outputType: "jpeg",
      canScale: true,
      autoCrop: true,
      // 只有自动截图开启 宽度高度才生效
      autoCropWidth: 300,
      autoCropHeight: 250,
      fixed: true,
      // 真实的输出宽高
      infoTrue: true,
      fixedNumber: [4, 3]
    },
    example3: {
      img: "http://cdn.xyxiao.cn/Landscape_1.jpg",
      autoCrop: true,
      autoCropWidth: 200,
      autoCropHeight: 200,
      fixedBox: true
    },
    downImg: "#",
    previewStyle1: {},
    previewStyle2: {},
    previewStyle3: {},
    previewStyle4: {},
    code0: '',
    code1: '',
    code2: '',
    code3: '',
    preview3: '',
   })
  const changeImg = () => {
    option.img = data.lists[~~(Math.random() * data.lists.length)].img;
  }
  const startCrop = () => {
    data.crap = true;
    cropper.value.startCrop();
  }
  const stopCrop = () => {
    data.crap = false;
    cropper.value.stopCrop();
  }
  const clearCrop = () => {
    cropper.value.clearCrop();
  }
  const refreshCrop = () => {
    cropper.value.refresh();
  }
  const changeScale = (num) => {
    num = num || 1;
    cropper.value.changeScale(num);
  }
  const rotateLeft = () => {
    cropper.value.rotateLeft();
  }
  const rotateRight = () => {
    cropper.value.rotateRight();
  }

 const finish =(type)=> {
  // 输出
  // var test = window.open('about:blank')
  // test.document.body.innerHTML = '图片生成中..'
  if (type === "blob") {
    cropper.value.getCropBlob(data1 => {
      const img = window.URL.createObjectURL(data1);
      data.model = true;
      data.modelSrc = img;
    });
  } else {
    cropper.value.getCropData(data => {
      data.model = true;
      data.modelSrc = data;
    });
  }
}
const realTime = (data1) =>{
  const previews = data1;
  const h = 0.5;
  const w = 0.2;

  data.previewStyle1 = {
    width: previews.w + "px",
    height: previews.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: h
  };

  data.previewStyle2 = {
    width: previews.w + "px",
    height: previews.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: w
  };

  data.previewStyle3 = {
    width: previews.w + "px",
    height: previews.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: (100 / previews.w)
  };

  data.previewStyle4 = {
    width: previews.w + "px",
    height: previews.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: (100 / previews.h)
  };

  data.previews = data1;
}
const cropMoving = (data1) => {
  option.cropData = data1;
}
const imgLoad =(msg)=> {
  console.log(msg);
}
const uploadImg1 =(e, num)=> {
  //上传图片
  // this.option.img
  const file = e.target.files[0];
  if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
    alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
    return false;
  }
  const reader = new FileReader();
  reader.onload = e => {
    let data1;
    if (typeof e.target.result === "object") {
      // 把Array Buffer转化为blob 如果是base64不需要
      data1 = window.URL.createObjectURL(new Blob([e.target.result]));
    } else {
      data1 = e.target.result;
    }
    if (num === 1) {
      option.img = data1;
    } else if (num === 2) {
      data.example2.img = data1;
    }
    uploadImg.value.value = ''
  };
  // 转化为base64
  // reader.readAsDataURL(file)
  // 转化为blob
  reader.readAsArrayBuffer(file);
}
const finish2 = (type)=> {
  cropper2.value.getCropData(data => {
    data.model = true;
    data.modelSrc = data;
  });
}
const finish3=(type)=> {
  cropper3.value.getCropData(data => {
    data.model = true;
    data.modelSrc = data;
  });
}
const down = (type) =>{
  // event.preventDefault()
  // 输出
  if (type === "blob") {
    cropper.value.getCropBlob(data1 => {
      data.downImg = window.URL.createObjectURL(data1);
      if (window.navigator.msSaveBlob) {
        const blobObject = new Blob([data1]);
        window.navigator.msSaveBlob(blobObject, "demo.png");
      } else {
        nextTick(()=>{
          downloadDom.value.click();
        })

      }
    });
  } else {
    cropper.value.getCropData(data1 => {
      data.downImg = data1;
      if (window.navigator.msSaveBlob) {
        const blobObject = new Blob([data1]);
        window.navigator.msSaveBlob(blobObject, "demo.png");
      } else {
        nextTick(()=>{
          downloadDom.value.click();
        })

      }
    });
  }
}


</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.content {
  margin: auto;
  max-width: 1200px;
  margin-bottom: 100px;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
}





.show-info {
  margin-bottom: 50px;
}

.show-info h2 {
  line-height: 50px;
}

/*.title, .title:hover, .title-focus, .title:visited {
		color: black;
	}*/

.title {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0px;
  background-image: -webkit-linear-gradient(
      left,
      #3498db,
      #f47920 10%,
      #d71345 20%,
      #f7acbc 30%,
      #ffd400 40%,
      #3498db 50%,
      #f47920 60%,
      #d71345 70%,
      #f7acbc 80%,
      #ffd400 90%,
      #3498db
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}

.test {
  height: 500px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  width: auto;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
  ),
  linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

.c-item {
  display: block;
  padding: 10px 0;
  user-select: none;
}

.pre {
  display: flex;
  flex-wrap: wrap;
}

.pre-item {
  padding-right: 20px;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@media screen and (max-width: 1000px) {
  .content {
    max-width: 90%;
    margin: auto;
  }

  .test {
    height: 400px;
  }
}
</style>
