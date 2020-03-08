<template>

<el-form @submit.native.prevent="saveArticle" ref="form" :model="form" label-width="80px">
  <el-form-item label="文章标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>

  <el-form-item label="文章内容">
    <el-input type="textarea" v-model="form.conten"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" native-type="submit">保存</el-button>
    <el-button type="info" @click="resetForm">重置</el-button>

  </el-form-item>
</el-form>

</template>

<script>
  export default {
    name: 'EditArticle',
    data() {
      return {
        form: {}
      }
    },
   created() {
      this.findall()
    },
    methods: {
      findall() {
        this.$axios.get(`contenlist/${this.$route.params.id}`).then(res => {
          this.form = res.data
        })
      },

      saveArticle() {
        this.$axios.put(`change/${this.$route.params.id}`, this.form).then(res => {
          console.log(res.data);
          this.$message({
          message: '文章修改成功！',
          type: 'success'
          })

          this.$router.push('/news/listarticle')
        })
        
      },

      resetForm() {
      this.$refs.form.resetFields();
    },


    },

    
  }
</script>