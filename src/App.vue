<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link> -->
    <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about" tag="button" replace>关于</router-link>
    <router-link to="/user" tag="button" replace>用户</router-link>

    <button @click="proClick">我的</button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    proClick() {
      // this.$router.push('/profile')
      this.$router.replace('/profile')
    }
  }
}
</script>

<style>
  .active{
    color:red;
  }
</style>
