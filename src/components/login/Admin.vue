<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="~assets/img/login/niao2.png" alt="" />
        <span>电商后台管理系统</span>
      </div>

      <el-button type="info" @click="logout">退出</el-button></el-header
    >

    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#373d41" text-color="#fff"
          active-text-color="#409eff" unique-opened :collapse="isCollapse"
          :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>

              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单  -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      menulist: [],
      iconObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-help',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-data'
      },
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    logout() {
      // ~清空token并退出
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // ~获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$axios.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    // ~折叠菜单
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // ~保持连接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
}

.el-aside {
  background-color: #373d41;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
