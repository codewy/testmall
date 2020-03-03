<template>
  <div>
    <h2>我的</h2>
    <p>我的信息</p>
    <p>{{ $route.query.name }}</p>
    <p>{{ $route.query.age }}</p>
    <p>{{ $route.query.heigth }}</p>
    <div><span>姓名：</span><input type="text" v-model.lazy="message.name" />{{ message.name }}</div>
    <br />
    <div><span>性别：</span><input type="text" v-model.lazy="message.sex" />{{ message.sex }}</div>
    <br>
    <div><span>年龄：</span><input type="text" v-model.lazy="message.age" />{{ message.age }}</div>
    <br>
  <button @click="btnClick">提交</button>
  <br>
  <br>

<ul>
  <li v-for="(item,index) in message" :key="index">
    {{item.name}}--{{item.sex}}--{{item.age}}
  </li>
</ul>

<el-row>
  <el-button icon="el-icon-search" circle></el-button>
  <el-button type="primary" icon="el-icon-edit" circle></el-button>
  <el-button type="success" icon="el-icon-check" circle></el-button>
  <el-button type="info" icon="el-icon-message" circle></el-button>
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
  <el-button type="danger" icon="el-icon-delete" circle></el-button>
</el-row>

<i class="el-icon-edit"></i>


  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      message: [],
    };
  },
  methods: {
    btnClick() {
      this.message.push({name:this.message.name, sex:this.message.sex, age:this.message.age})
      console.log(this.message)

    },
    
    
  }
};
</script>

<style scoped></style>
