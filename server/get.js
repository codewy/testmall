// ~ mysql数据库操作封装
function data(objHost, sql, callback, add = null) {
  let mysql = require("mysql");
  let connection = mysql.createConnection(objHost);
  connection.connect();
  //~ 增删改查
  if (add != null) {
    connection.query(sql, add, callback);
  } else {
    connection.query(sql, callback);
  }
  connection.end();
}

// ~ 导出模块
module.exports = data;
