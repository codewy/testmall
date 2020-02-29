<template>
  <div>
    <h2>首页</h2>
    <p>我是内容</p>
    <Cart :homelist="homedata" />
  </div>
</template>

<script>
// import axios from "axios";

import { homeadd } from "network/index";
import Cart from "./Cart";

export default {
  name: "Home",
  components: {
    Cart
  },
  data() {
    return {
      homedata: []
    };
  },
  created() {
    // ! 请求多个数据
    this.homeadd()
  },

  methods: {
    // ! 封装请求函数
    homeadd() {
      homeadd().then(res => {
      console.log(res.data.data.recommend.list);
      this.homedata = res.data.data.recommend.list;
    });
    }
  }
};
</script>

<style scoped></style>
