<template>
  <div class="login_container">
    <div class="login_box">
      <!--  头像区 -->
      <div class="avatar_box">
        <img src="~assets/img/login/niao.jpg" alt="" />
      </div>
      <!-- 登录表单区 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginform"
        :rules="rules"
        ref="longFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-s-custom"
            v-model="loginform.username"
          ></el-input>
        </el-form-item>

        <!-- 登录密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-upload"
            v-model="loginform.password"
          ></el-input>
        </el-form-item>

        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    // ~点击重置按钮重置
    resetLoginForm() {
      this.$refs.longFormRef.resetFields();
    },

    // ~ 查询
    query() {
      this.$refs.longFormRef.validate(async valid => {
        const { data:res } = await this.$axios.post("/query", this.loginform)
            console.log(res)
            this.$message({
          message: '查询结果：' + res[0].username,
          type: 'success'
          })
           

          })

    },

    // ~点击登录按钮
    login() {
      this.$refs.longFormRef.validate(async valid => {
        // console.log(this.loginform)

        const { data: res } = await this.$axios.post("/register", this.loginform)
        this.$message({
          message: '注册成功：' + res.username,
          type: 'success'
          })
        console.log(res);
      });
    },

    login1() {
      this.$refs.longFormRef.validate(async valid => {
        // console.log(this.loginform)

        const result = await this.$axios.get("/user", this.loginform);
        console.log(result);
      });
    }
  },

  data() {
    return {
      //# 登录表单的数据绑定对象
      loginform: {
        username: "admin",
        password: "123456"
      },
      // # 表单的验证规则对象
      rules: {
        //~ 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        //~ 验证密码是否合法
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 50px;
  width: 100%;
  padding: 0 20px;
}
</style>
