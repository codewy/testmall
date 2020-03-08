const { User } = require('./mongodb')
const express = require('express')
const jwt = require('jsonwebtoken')


const app = express()

//~ 设置跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
  if (req.method.toLowerCase() == "options") res.send(500);
  //让options尝试请求快速结束
  else next();
});

const SECRET = 'aksjd899h9a18'
app.use(express.json())


// ~ 查询用户信息
app.get('/api/user', async(req, res) => {
  const user = await User.find()
  res.send(user)
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


// ~ 登录信息
app.post('/api/login', async(req, res) => {
  console.log(req.body)

  const user = await User.find({
    username: req.body.username,
    password: req.body.password
  })

  if (!user) {
    return res.status(422).send({
      message: '用户不存在'
    })
  }

  const isPassword = require('bcrypt').compareSync(
    req.body.password,
    user.password
  )

  if (!isPassword) {
    return res.status(432).send({
      message: '密码无效'
    })
  }


  //~ 生成token
  
  const token = jwt.sign({
    id: String(user._id),

  }, SECRET)

  res.send({user, token})
})


//~ 创建中间件
const auth = async (req, res, next) => {
  const raw = String(req.headers.authorization).split(' ').pop()
  const {id} = jwt.verify(raw, SECRET)
  req.user = await User.findById(id)

  next()
}


// ~ 个人信息
app.get('/api/profile', auth, async(req, res) => {
  
  console.log(req.user)


  res.send(req.user)
})



app.listen(3000, ()=> {console.log('http://localhost:3000/api')})


