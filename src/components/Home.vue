<template>
  <div>
    <h2>首页</h2>
    <p>我是内容</p>

    <router-link to="/home/newss" tag="button">新闻</router-link>
    <router-link to="/home/message" tag="button">信息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      homedata: [],
      path: "/home/newss"
    };
  },
  created() {
    // ! 请求多个数据
    console.log("home created");
    // getHmoeMultidata().then(res => {
    //   console.log(res.data.data.recommend.list);
    //   this.homedata = res.data.data.recommend.list;
    // });
  },
  destroyed() {
    // ~ 组件销毁时触发
    // console.log('home destroyed')
  },
  activated() {
    // ~ 组件活跃状态
    this.$router.push(this.path);
  },
  beforeRouteLeave(to, from, next) {
    // ~ 组件导航守卫
    this.path = this.$route.path;
    next();
  },

  methods: {}
};
</script>

<style scoped></style>
