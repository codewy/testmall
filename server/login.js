const { User } = require('./mongodb')
const express = require('express')
// const jwt = require('jsonwebtoken')


const app = express()

//~ 解析,用req.body获取post参数
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//~ 设置跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'); //允许的header类型
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
  next();
});

app.use(express.json())


// ~ 查询用户信息
app.get('/api/user', async(req, res) => {
  
  const user = await User.find()
  res.send(user)
})

// ~ POST查询用户信息
app.post('/api/query', async(req, res) => {

  const query = await User.find({
    username: req.body.username,
  })

  if (!query) {
    console.log(res.status.message)

    return res.status(422).send({
      message: '用户不存在'
    })

  }

  // if (this.req.body.password) {
  //   return res.status(422).send({
  //     message: '用户密码错误'
  //   })
  // }

  res.send(query)
})


// ~ 用户注册
app.post('/api/register', async(req, res) => {
  console.log(req.body)

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,

  })

  res.send(user)
})

// // ~ 个人信息
// app.get('/api/profile', (req, res) => {
  
//   console.log(req.user)


//   res.send(req.user)
// })



app.listen(3000, ()=> {console.log('http://localhost:3000/api')})


