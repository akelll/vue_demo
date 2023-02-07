import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementPlus, {ElTable} from 'element-plus'
import 'element-plus/dist/index.css'
import vue3dLoader from "vue-3d-loader";
import dataV from '@jiaminghi/data-view'

import vueSeamlessScroll from 'vue-seamless-scroll/src';
import htmlToPdf from "@/common/htmlToPdf";
import VueCropper from '../lib';


// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();


import * as THREE from "three";

const app = createApp(App)

app.config.globalProperties.$THREE = THREE;

app.use(ElementPlus).use(vue3dLoader).use(dataV).use(vueSeamlessScroll).use(htmlToPdf).use(VueCropper)
app.use(router).mount('#app')

