<template>

<el-form @submit.native.prevent="saveArticle" ref="form" :model="form" label-width="80px">
  <el-form-item label="文章标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>

  <el-form-item label="文章内容">
    <el-input type="textarea" v-model="form.conten"></el-input>
  </el-form-item>
  <el-form-item >
    <el-button type="primary" native-type="submit">立即创建</el-button>
    <el-button type="info">重置</el-button>

  </el-form-item>
</el-form>

</template>

<script>
  export default {
    name: 'CreateArticle',
    data() {
      return {
        form: {
          title: '',
          conten: ''
        }
      }
    },
    methods: {
      saveArticle() {
        this.$axios.post('http://localhost:3000/api/create', this.form).then(res => {
          this.$message({
          message: '文章创建成功！',
          type: 'success'
          })

          this.$router.push('/news/listarticle')
        })
        
      },

    }
  }
</script>