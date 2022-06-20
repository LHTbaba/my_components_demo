//引入依赖及组件
import Vue from 'vue'
import VueRouter from 'vue-router'

const login = resolve => require(['@/views/login'], resolve)
const index = resolve => require(['@/views/index'], resolve)
const multiCom = resolve => require(['@/views/multiCom/index'], resolve)
const multiComEdit = resolve => require(['@/views/multiCom/multiComEdit'], resolve)

Vue.use(VueRouter)
//设置组件映射规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/multiCom',
    name: 'multiCom',
    component: multiCom
  },
  {
    path: '/multiCom/edit',
    name: 'multiComEdit',
    component: multiComEdit
  }
]

const router = new VueRouter({
  model: "history",
  routes
})
//导出
export default router