<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link> -->
    <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about" tag="button" replace>关于</router-link>
    <router-link to="/user" tag="button" replace>用户</router-link>
    <router-link to="/cart" tag="button" replace>购物车</router-link>
    <router-link to="/post" tag="button" replace>Post</router-link>
    <router-link to="/login" tag="button" replace>登录</router-link>

    <button @click="proClick">我的</button>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- TabBar导航栏 -->
    <tab-bar>
      <tab-bar-item>
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon" />
        <img
          src="~assets/img/tabbar/home_active.svg"
          alt=""
          slot="item-icon-active"
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item>
        <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon" />
        <img
          src="~assets/img/tabbar/category_active.svg"
          alt=""
          slot="item-icon-active"
        />

        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item>
        <img src="~assets/img/tabbar/cart.svg" alt="" slot="item-icon" />
        <img
          src="~assets/img/tabbar/cart_active.svg"
          alt=""
          slot="item-icon-active"
        />

        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item>
        <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon" />
        <img
          src="~assets/img/tabbar/profile_active.svg"
          alt=""
          slot="item-icon-active"
        />

        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/tabbar/TabBar";
import TabBarItem from "components/tabbar/TabBarItem";

export default {
  name: "App",
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {
      result: []
    };
  },

  methods: {
    proClick() {
      // this.$router.push('/profile')
      this.$router.replace({
        path: "/profile",
        query: {
          name: "kebi",
          age: 18,
          heigth: 1.88
        }
      });
    }
  }
};
</script>

<style>
/* @import "assets/css/base.css"; */

.active {
  color: red;
}
</style>
