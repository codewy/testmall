<template>
  <div>
    <el-table :data="newslist">
        <el-table-column prop="title" label="标题" width="140">
        </el-table-column>
        <el-table-column prop="conten" label="内容" width="380">
        </el-table-column>

        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
        <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'ListArticle',
   data() {
      return {
        newslist: []
      }
    },
    created() {
      this.findall()
    },
    methods: {
      findall() {
      
        this.$axios.get('http://localhost:3000/api/newslist').then(res => {
        this.newslist = res.data
      })
      },

      edit(id) {
        this.$router.push(`/news/editarticle/${id}`)
      },
      
      remove(id) {
        this.$axios.delete(`delete/${id}`).then(res => {
          this.$message({
          message: res.data.status,
          type: 'success'
          })
        })
        this.findall()
      }
    }
}
</script>

<style scoped>

</style>