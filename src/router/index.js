
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {routerStack} from "@/stack";

const routes = [
    {path:'/index',component:import('@/view/index.vue')},
    {path:'/page1',component:import('@/view/page/page1.vue')},
    {path:'/page2',component:import('@/view/page/page2.vue')},
    {path:'/page3',component:import('@/view/page/page3.vue')},
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

router.afterEach((to ,form)=>{
    routerStack.stack_push({form:to.path,fullPath:to.fullPath})
})
router.afterEach()
export default  router

