const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    // set(val) {
    //   return require('bcrypt').hashSync(val,10)
    // }
  },
})

const User = mongoose.model('User', UserSchema)

// User.db.dropCollection('users')

// ~ 新闻系统数据库
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const NewsSchema = new mongoose.Schema({
  title: { type: String },
  conten: { type: String },
    
})

const News = mongoose.model('News', NewsSchema)

module.exports = { User, News }





