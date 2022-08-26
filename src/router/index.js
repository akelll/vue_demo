
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = [
    {path:'/index',component:import('@/view/index.vue')}
]

const router = createRouter({
    history:createWebHistory(),
    routes
});
export default  router

