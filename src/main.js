import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import axios from 'axios'
// import store from './store'

// Vue.use(ElementUI);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false;

new Vue({
  router,
  // axios,
  render: h => h(App)
}).$mount("#app");
