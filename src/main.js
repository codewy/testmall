import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios"
import ElementUI from "element-ui";
import "assets/css/base.css";
import "element-ui/lib/theme-chalk/index.css";

// import store from './store'

// Vue.use(ElementUI);
// @ 配置请求地址路径
axios.defaults.baseURL = 'http://localhost:3000/api'
Vue.prototype.$axios = axios

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false;

new Vue({
  router,
  // axios,
  render: h => h(App)
}).$mount("#app");
