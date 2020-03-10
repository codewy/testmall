const express = require('express')
const News = require('./module/news')
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


// ~ 查询文章
app.get('/api/newslist', async(req, res) => {
  
  const news = await News.find()
  res.send(news)
})


// ~ 创建文章
app.post('/api/create', async(req, res) => {

  const news = await News.create(req.body)

  res.send(news)
})


// ~ 删除数据
app.delete('/api/delete/:id', async (req, res) => {
  await News.findByIdAndRemove(req.params.id)
  res.send({
    status: '文章删除成功~~~~~~~~'
  })
})


// ~ 文章详情
app.get('/api/contenlist/:id', async (req, res) => {
  const conten = await News.findById(req.params.id)
  res.send(conten)
})


// ~ 修改文章
app.put('/api/change/:id', async (req, res) => {
  const change = await News.findByIdAndUpdate(req.params.id, req.body)
  res.send(change)
})


app.listen(3000, ()=> {console.log('http://localhost:3000/api')})


