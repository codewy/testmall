const express = require("express");
//~ 引入数据库
var mysql = require("mysql");

const app = express();

//~ 设置跨域
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
  if (req.method.toLowerCase() == "options") res.send(500);
  //让options尝试请求快速结束
  else next();
});

// ~ 对外暴露请求API
app.get("/api", (request, response) => {
  //创建一个connection
var connection = mysql.createConnection({
  host: "localhost", //主机
  user: "root", //MySQL认证用户名
  password: "123456", //MySQL认证用户密码
  database: "test"
});
//创建一个connection
connection.connect(function(err) {
  if (err) {
    console.log("[query] - :" + err);
    return;
  }
  console.log("创建 connection 成功");
});
  //执行SQL语句
  let sql = "SELECT * FROM test";
  connection.query(sql, function(err, rows, fields) {
    if (err) {
      console.log("[query] - :" + err);
      return;
    }
    console.log("查询数据：", rows);
    response.send(rows)
  });
  
  //关闭connection
connection.end(function(err) {
  if (err) {
    return;
  }
  console.log("关闭数据库");
});

});



app.get("/sql", (req, res) => {
  res.send([
    {
      name: "张三",
      age: 18
    },
    {
      name: "李四",
      age: 28
    }
  ]);
});



app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("服务器已经启动，请访问 http://localhost:3000");
});
