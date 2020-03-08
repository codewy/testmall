const mongoose = require('./mongodb')


// ~定义数据表-集合的映射，字段名称必须跟数据库保存一致
const NewsSchema = new mongoose.Schema({
  title: { type: String },
  conten: { type: String },
    
})

// ~导出User数据库模块
module.exports = mongoose.model('News', NewsSchema, 'news')

