// ~导入数据库操作模块
const mongoose = require('mongoose')

// ~建立数据连接
mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModify: false
},function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log('数据库连接成功--->')
})

module.exports = mongoose

