<template>
  <div style="width: 200px;height: 200px">
    <el-upload
        class="upload-demo"
        action="#"
        drag
        :show-file-list="false"
        :on-change="onbeforeunload"
        :auto-upload="false"
    >

      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        推动文件或 <em>点击上传</em>
      </div>
<!--      <template #tip>-->
<!--        <div class="el-upload__tip">-->
<!--          jpg/png files with a size less than 500kb-->
<!--        </div>-->
<!--      </template>-->
    </el-upload>
  </div>
<div style="justify-content: center;align-items: center">
  <el-input v-model="data.title" style="width:200px"></el-input>
  <el-button @click="exportWord" style="margin: 40px 0">导出</el-button>
  <el-button @click="clearText" style="margin: 40px 0">清空</el-button>
  <el-button @click="showDialog" style="margin: 40px 0">显示/隐藏</el-button>
</div>
  <div ref="word" style="width:0;height:0"></div>
  <el-input type="textarea" v-model="data.docVal" style="width: 1000px;"></el-input>
  <span>{{data.len}}</span>

  <window :dialogVisible="dialogVisible"/>

</template>

<script setup>
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { UploadFilled } from '@element-plus/icons-vue'
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import {computed, getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
const docx = require("docx-preview");
import axios from "axios";
import Window from "@/view/file/conom/window";

const dialogVisible = ref(false)
const currentInstance = getCurrentInstance()
const data=reactive({
  title:'',
  len:0,
  file:null,
  docVal:'',
  timeVal:new Date(),
})
watch(()=>data.docVal,(val)=>{
  if (val) {
    data.len = val.trim().length
    localStorage.setItem('text', data.docVal)
  }
})
onMounted(()=>{
  data.docVal = localStorage.getItem('text')

})
const onbeforeunload = (file,files) => {
   data.title = file.name.split('.')[0]
  const blob = new Blob([file.raw],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
  const reader = new FileReader();
  reader.addEventListener('loadend', function (e) {
    data.docVal = e.target.result
  })
  reader.readAsText(blob,'utf-8')

}
const showDialog = () => {
  dialogVisible.value = !dialogVisible.value

}
const getFile = () => {
  axios
      .get("C://fakepath/server.docx", {
        responseType: "blob",//注意返回数据类型
      })
      .then((res) => {
        // 对后端返回二进制流做处理
        const blob = new Blob([res.data]);
        //加载完成后，调打印预览接口
        docx.renderAsync(blob, this.$refs.word).then(res=>{
          console.log(res)
        });
      })
}
const clearText = () => {

}
// 打印文档处理
const exportWord=()=> {
  // 读取并获得模板文件的二进制内容
  JSZipUtils.getBinaryContent("./server.docx", function (error, content) {
    // gy-agree-service.docx.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
    // 抛出异常
    if (error) {
      throw error;
    }
    // 创建一个PizZip实例，内容为模板的内容
    const zip = new PizZip(content);
    // 创建并加载docxtemplater实例对象
    const doc = new Docxtemplater().loadZip(zip);
    // 设置模板变量的值
    doc.setData({
      title:data.title,
      content:data.docVal
    })
    // doc.setData({
    //   date: data.timeVal,
    //   isTable: data.rightTable, // 文档中循环数据
    //   loseTable: data.errorTable, // 文档中循环的数据
    // });
    try {
      // 用模板变量的值替换所有模板变量
      doc.render();
    } catch (error) {
      // 抛出异常
      const e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      };
      console.log(JSON.stringify({ error: e }));
      throw error;
    }

    // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // 将目标文件对象保存为目标类型的文件，并命名
    saveAs(out, data.title + ".docx");
  });
}


</script>

<style >
textarea{
  min-height: 400px;
}
</style>
