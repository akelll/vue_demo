import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementPlus, {ElTable} from 'element-plus'
import 'element-plus/dist/index.css'
import vue3dLoader from "vue-3d-loader";
import dataV from '@jiaminghi/data-view'

import vueSeamlessScroll from 'vue-seamless-scroll/src';



const app = createApp(App)
app.use(ElementPlus).use(vue3dLoader).use(dataV).use(vueSeamlessScroll)
app.use(router).mount('#app')

