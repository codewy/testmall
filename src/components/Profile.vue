<template>
  <div>
    <h2>我的</h2>
    <p>我的信息</p>
    <p>{{$route.query.name}}</p>
    <p>{{$route.query.age}}</p>
    <p>{{$route.query.heigth}}</p>
    
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style scoped>

</style>