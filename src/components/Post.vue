<template>
<el-container style="height: 100%vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%vh">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-notebook-2"></i>新闻类别</template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><i class="el-icon-document"></i>内容1</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-document"></i>内容2</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
     
          </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: center; font-size: 18px; color:#fff; ">
      
      <span>微元新闻管理系统</span>
      
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(8).fill(item)
      }
    }
  };
</script>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
