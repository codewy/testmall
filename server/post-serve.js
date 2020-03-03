const express = require("express");

const app = express()

//~ 解析,用req.body获取post参数
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//~ 设置跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
  if (req.method.toLowerCase() == "options") res.send(500);
  //让options尝试请求快速结束
  else next();
});

app.get('/get', (req, res) => {
  res.send('get连接成功')
})


app.post('/post',function (req,res) {
  // var result = req.body
  //   res.send(JSON.stringify(result));
  //   console.log(result)
  console.log(req.body)
  res.send(req.body);
})


app.listen(3000, err => {
  if(err) {
    consolel.log(err)
    return
  }
  console.log('OK')
})

