<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDilogVisble = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table stripe border :data="userlist">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <!-- 修改按钮 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini" @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="角色管理"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDilogVisble" width="30%"
    @close="addDilogClosed">

      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormBules"
        ref="addFormRef"
        label-width="70px">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>

      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDilogVisble = false">取 消</el-button>
        <el-button type="primary" @click="addUser"
          >确 定</el-button
        >
      </span>
    </el-dialog>

     <!-- 修改用户对话框-->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%"
    @close="editDialogClose">

    <el-form :model="editform" :rules="editFormRules" ref="editFormRef" label-width="70px">
    
    <el-form-item label="用户名">
      <el-input v-model="editform.username" disabled></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="editform.email"></el-input>
    </el-form-item>

    <el-form-item label="手机" prop="mobile">
      <el-input v-model="editform.mobile"></el-input>
    </el-form-item>

  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    
    return {
      // ~获取用户列表参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },

      userlist: [],
      total: 0,
      // ~控制用户对话框的显示与隐藏
      addDilogVisble: false,
      // ~控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // ~查询到的用户信息对象
      editform: {},

      // ~添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // ~添加表单的验证规则对象
      addFormBules: {
        username: [
        { required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        { min: 3, max:10,
            message:'用户名的长度在3~10个字符之间',
            trigger: 'blur'
        }
      ],

      password: [
        { required: true,
          message: '请输入用户密码',
          trigger: 'blur'
        },
        { min: 6, max:15,
            message:'用户密码的长度在6~15个字符之间',
            trigger: 'blur'
        }
      ],

      email: [
        { required: true,
          message: '请输入用户邮箱',
          trigger: 'blur',
        },
        {
          validator: checkEmail, trigger: 'blur'
        }
      ],

      mobile: [
        { required: true,
          message: '请输入用户手机',
          trigger: 'blur'
        },
        {
          validator: checkMobile, trigger: 'blur'
        }
      ]
      },
      
      // ~修改表单的验证规则对象
      editFormRules: {
        email: [
        { required: true,
          message: '请输入用户邮箱',
          trigger: 'blur',
        },
        {
          validator: checkEmail, trigger: 'blur'
        }
      ],

      mobile: [
        { required: true,
          message: '请输入用户手机',
          trigger: 'blur'
        },
        {
          validator: checkMobile, trigger: 'blur'
        }
      ]
    }


    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$axios.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userlist = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    // ~监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },

    // ~监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },

    // ~监听 switch 开关的状态的改变
    async userStateChanged(userinfo) {
      const { data: res } = await this.$axios.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )

      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户操作失败')
      }
      this.$message.success('更新用户状态成功')
    },

    // ~监听添加用户对话框的关闭事件
    addDilogClosed() {
      this.$refs.addFormRef.resetFields()
    },

    // ~点击按钮 添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if(!valid) return
        // ~可以发起添加用户的网络请求
        const {data: res} = await this.$axios.post('users', this.addForm)

        if (res.meta.status !== 201) {
        return this.$message.error('用户添加失败')
      }
        this.$message.success('用户添加成功')
        // ~隐藏添加用户的对话框
        this.addDilogVisble = false
        this.getUserList()
      })
    },
    // ~展示用户编辑的对话框
    async showEditDialog(id) {
      const {data:res} = await this.$axios.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('用户修改失败')
      }
      this.editform = res.data

      this.editDialogVisible = true

    },

    // ~监听修改用户关闭事件
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },

    // ~修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if(!valid) return
        // ~发起修改用户信息的数据请求
        const {data: res} = await this.$axios.put('users/' + this.editform.id,{
          email: this.editform.email,
          mobile: this.editform.mobile
          
        })

        if(res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败')
        }
        // ~关闭对话框
        this.editDialogVisible = false

        // ~刷新数据列表
        this.getUserList()

        // ~提示修改成功
        this.$message.success('用户添加成功')

      })
    },

    // ~根据ID删除用户信息
    async removeUserById(id) {
      // ~询问用户是否删除弹窗
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        // ~如果用户确认删除，则返回值为字符串 confirm
        // ~如果用户取消删除，则返回值为字符串 cancel
        // console.log(confirmResult)
        if(confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }
        // ~确认删除用户信息
        const {data: res} = await this.$axios.delete('users/' + id)

        if(res.meta.status !== 200) {
          return this.$message.error('删除用户失败')
        }
        this.$message.success('删除用户成功')
        this.getUserList()

    }

  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-table {
  margin-top: 15px;
  font-size: 12px;
}

.el-pagination {
  margin-top: 15px;
}
</style>
