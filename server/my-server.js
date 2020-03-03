const express = require("express");
const data = require("./get");

const app = express();


//~ 解析,用req.body获取post参数
const bodyParser = require("body-parser");
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

// ~ MySQL数据库接口信息
const host = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test"
};

let sql = "SELECT * FROM test"
let sqlDel = "DELETE FROM test WHERE id=5"

let userid = {id:5}

//~ get请求
app.get("/api", (req, res) => {
  
  data(host, sql, (err, results) => {
    if (err) {
      throw err;
    }
    if (results) {
      res.status(200);
      res.json(results);
    }
  });
});


//~ post请求
app.post("/post", (req, res) => {
  console.log(req.body)
  res.send(res.data)

  
});


app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("服务器已经启动，请访问 http://localhost:3000/api");
});




