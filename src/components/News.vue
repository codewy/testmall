<template>
<el-container style="height: 100%vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%vh">
    <el-menu router :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-notebook-2"></i>新闻管理</template>
        <el-menu-item-group>
          <el-menu-item index="/news/createarticle"><i class="el-icon-document"></i>新建文章</el-menu-item>
          <el-menu-item index="/news/listarticle"><i class="el-icon-document"></i>文章列表</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
     
          </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: center; font-size: 18px; color:#fff; ">
      
      <span>微元新闻管理系统</span>
      
    </el-header>
    
    <el-main>
    <router-view></router-view>
      
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  export default {
    name: 'News'
   
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
