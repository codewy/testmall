const { User } = require('./mongodb')
const express = require('express')
const jwt = require('jsonwebtoken')


const app = express()

const SECRET = 'aksjd899h9a18'
app.use(express.json())


app.get('/api/user', async(req, res) => {
  const user = await User.find()
  res.send(user)
})


app.post('/api/register', async(req, res) => {
  console.log(req.body)

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,

  })

  res.send(user)
})


app.post('/api/login', async(req, res) => {
  console.log(req.body)

  const user = await User.findOne({
    username: req.body.username
    
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
    return res.status(422).send({
      message: '密码无效'
    })
  }

  // 生成token
  
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

app.get('/api/profile', auth, async(req, res) => {
  
  console.log(req.user)


  res.send(req.user)
})

app.listen(3000, ()=> {console.log('http://localhost:3000/api')})


