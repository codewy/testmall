<template>
  <div>
    <h2>用户</h2>
    <p>用户内容</p>
    <br>
    <hr>

    <table>
        <!-- ! 表格头部    -->
        <thead>
          <tr>
            <th>用户ID</th>
            <th>用户名称</th>
            <th>性别</th>
            <th>年龄</th>
          </tr>
        </thead>
        <!-- ! 表格body -->
        <tbody>
          <tr v-for="(item,index) in userid" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.sex }}</td>
            <td>{{ item.age }}</td>
          </tr>
        </tbody>
      </table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      userid: null,
    }
  },
  created() {
    axios({
        url: 'http://127.0.0.1:3000/api'
      }).then(res => {
        console.log(res.data)
        this.userid = res.data

      })
  }
  
};


</script>

<style scoped>
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 20px;
  margin-left: 20px;
  text-align: center;
}

th,
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}
</style>
