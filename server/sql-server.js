var mysql = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({
    host: 'localhost',             //主机
    user: 'root',                  //MySQL认证用户名
    password: '123456',         //MySQL认证用户密码
    database: 'test'
});
//创建一个connection
connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('创建 connection 成功');
});
//执行SQL语句
let sql = 'SELECT * FROM test'
connection.query(sql, function (err, rows, fields) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('查询数据：', rows);
});

//关闭connection
connection.end(function (err) {
  if (err) {
      return;
  }
  console.log('关闭数据库');
});
