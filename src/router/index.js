//~ 配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'

//~ 用过懒加载方式加载组件
const Home = () => import ('components/Home')
const News = () => import ('components/homechild/News')
const Message = () => import ('components/homechild/Message')

const About = () => import ('components/About')
const User = () => import ('components/User')
const Profile = () => import ('components/Profile')
const Cart = () => import ('components/Cart')
const Post = () => import ('components/Post')

//~ 1.通过Vue.use安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'news',
        component: News
      },
      {
        path: 'message',
        component: Message
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '用户'
    },
    //~ 路由独享守卫
    beforeEnter: (to, from, next) => {
      next()
      console.log('---用户----')
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    },
  },
  {
    path: '/post',
    component: Post,
    meta: {
      title: 'post'
    }
  }

]

//~ 2.创建VueRouter对象
const router = new VueRouter({
//~ 配置路由和组件之间的关系
routes,
mode: 'history',
//~ 活跃的选择使用以下Class
linkActiveClass: 'active'
})

//~ 路由全局导航守卫（前置守卫 guard）
router.beforeEach((to, from, next) => {
  next()
  document.title = to.matched[0].meta.title
})

//~ 后置钩子（hook）
router.afterEach((to, from) => {
})

export default router
