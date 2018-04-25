function userModel(){
  var connection;
  
  this.init = function(){
    const mysql = require('mysql');
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'xiaozhu32',
      port: '3306',
      database: 'xjmtest'
    });
    connection.connect();
    
  };
  this.insert = function(username,pw,nickname,callback){
    var userAddSql = 'insert into user(username,password,nickname) value(?,?,?)';
    var userAddSql_params = [username,pw,nickname];
    connection.query(userAddSql,userAddSql_params,function(err,result){
      callback(err,result);
    });
    connection.end();
  };
  this.select = function(username,pw,callback){
    var userFindSql = 'select * from user where username = "'+username+'" ';
    connection.query(userFindSql,function(err,result){
      callback(err,result);
    });
    connection.end();
  };

};
module.exports = userModel;
   