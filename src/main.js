import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI, { MessageBox } from 'element-ui'
import 'assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'

// import store from './store'

// @ 配置请求地址路径
// axios.defaults.baseURL = 'http://localhost:3000/api'
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// @设置axios请求头拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$axios = axios
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

new Vue({
  router,
  // axios,
  render: h => h(App)
}).$mount('#app')
