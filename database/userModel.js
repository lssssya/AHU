function userModel(){
  var connection;
  
  this.init = function(){
    const mysql = require('mysql');
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'xiaozhu32',
      port: '3306',
      database: 'xjmtest1'
    });
    connection.connect();
  };
  this.end = function () {
    connection.end();
  };


  this.insert = function(username,pw,nickname,callback){
    var userAddSql = 'insert into user(username,password,nickname,userPtoUrl) value(?,?,?,?)';
    var userAddSql_params = [username,pw,nickname,'/img/sysPto.jpg'];
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
  
  this.settingUpdate = function (userID, nickname, gender, signUp, callback) {
    var commonSql = 'Update user set nickname="' + nickname + '", sex="' + gender + '", qianming="' + signUp + '" where userID="' + userID + '"';
    connection.query(commonSql, function (err, result) {
      callback(err, result);
    });
    connection.end();
  }
  this.comparePassword = function (userID, callback) {
    var commonSql = 'select password from user where userID ="' + userID + '"';
    connection.query(commonSql, function (err, result) {
      callback(err, result);
    });
  }

  
  this.passwordChange = function (userID, pw, callback) {
    var commonSql = 'Update user set password="' + pw + '" where userID="' + userID + '"';
    connection.query(commonSql, function (err, result) {
      callback(err, result);
    });
    connection.end();
  }

};
module.exports = userModel;
   