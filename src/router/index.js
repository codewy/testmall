//配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'

//用过懒加载方式加载组件
const Home = () => import ('../components/Home')
const About = () => import ('../components/About')
const User = () => import ('../components/User')
const Profile = () => import ('../components/Profile')

// 1.通过Vue.use安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/profile',
    component: Profile
  },

]

// 2.创建VueRouter对象
const router = new VueRouter({
// 配置路由和组件之间的关系
routes,
mode: 'history',
// 活跃的选择使用以下Class
linkActiveClass: 'active'
})
  

export default router
