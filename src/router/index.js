
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {routerStack} from "@/stack";

const routes = [
    {path:'/',component:()=>import('@/view/home.vue')},
    {path:'/test',component:()=>import('@/view/test.vue')},
    {path:'/datav',component:()=>import('@/view/dataV.vue')},
    {path:'/echart',component:()=>import('@/view/echart/index.vue')},
    {path:'/css',component:()=>import('@/view/cssPage/index.vue')},
    {path:'/3d',component:()=>import('@/view/hong/index.vue')},
    {path:'/screen',component:()=>import('@/view/screen/index.vue')},
    {path:'/3ds',component:()=>import('@/view/3d/index.vue')},
    {path:'/3ds2',component:()=>import('@/view/3d/index2.vue')},
    {path:'/3ds3',component:()=>import('@/view/3d/index3.vue')},
    {path:'/index',component:()=>import('@/view/index.vue')},
    {path:'/page1',component:()=>import('@/view/page/page1.vue')},
    {path:'/page2',component:()=>import('@/view/page/page2.vue')},
    {path:'/page3',component:()=>import('@/view/page/page3.vue')},
    {path:'/mobileTable',component:()=>import('@/view/mobile/index.vue')},
    {path:'/mobileTable2',component:()=>import('@/view/mobile/index2.vue')},
    {path:'/file',component:()=>import('@/view/file/index.vue')},
    {path:'/qrcode',component:()=>import('@/view/file/qrcode.vue')},
]

const router = createRouter({
    history:createWebHashHistory(),
    routes,
});
router.beforeEach((to,form,next)=>{
    routerStack.stack_push({form:to.path,fullPath:to.fullPath})
    next()
})
export default  router

