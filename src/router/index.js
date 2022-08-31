
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {routerStack} from "@/stack";

const routes = [
    {path:'/',component:()=>import('@/view/home.vue')},
    {path:'/echarts',component:()=>import('@/view/echart/index.vue')},
    {path:'/css',component:()=>import('@/view/cssPage/index.vue')},
    {path:'/3d',component:()=>import('@/view/3dmode/index.vue')},
    {path:'/index',component:()=>import('@/view/index.vue')},
    {path:'/page1',component:()=>import('@/view/page/page1.vue')},
    {path:'/page2',component:()=>import('@/view/page/page2.vue')},
    {path:'/page3',component:()=>import('@/view/page/page3.vue')},
]

const router = createRouter({
    history:createWebHistory(),
    routes
});
router.beforeEach((to,form,next)=>{
    routerStack.stack_push({form:to.path,fullPath:to.fullPath})
    next()
})
export default  router

