function userModel() {
  var connection;

  this.init = function () {
    const mysql = require('mysql');
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'xiaozhu32',
      port: '3306',
      database: 'bw'
    });
    connection.connect();
  };
  this.end = function () {
    connection.end();
  };
  this.isNote = function(noteID,userID,callback){ //是否关注了这个记本
    var sql = 'select * from focuse_note where noteID = "'+noteID+'" and userID = "'+userID+'"';
    connection.query(sql,function (err,result) {  
      callback(err,result);
    })
    connection.end();
  }
  this.searchrelationship =function (user1ID,user2ID,callback) {  
    var sql ='select * from focuse_user where user1ID = "'+user1ID+'" and user2ID ="'+user2ID+'"';
    connection.query(sql,function (err,result) {  
      callback(err,result);
    });
  }
  this.checkexist=function (userID,callback) {
    var sql='select * from user where userID ="'+userID+'"'
    connection.query(sql,function (err,result) {
      callback(err,result);
    })
    connection.end();
  }


  this.follownote = function (noteID,userID,callback) {  
    var sql = 'insert into focuse_note(noteID,userID) value(?,?)'
    var sql_params = [noteID,userID];
    connection.query(sql,sql_params,function (err,result) {  
      callback(err,result);
    });
    connection.end();
  }
  this.followuser = function (user1ID, user2ID, callback) {
    var sql = 'insert into focuse_user(user1ID,user2ID ) value(?,?)'
    var sql_params = [user1ID, user2ID];
    connection.query(sql, sql_params, function (err, result) {
      callback(err, result);
    })
    connection.end();
  }
  this.unfollownote = function (noteID,userID,callback) {  
    var sql = 'delete from focuse_note where noteID = "'+noteID+'" and userID = "'+userID+'"';
    connection.query(sql,function (err,result) {  
      callback(err,result);
    })
    connection.end();
  }

  this.unfollowuser = function (user1ID, user2ID, callback) {
    var sql = 'delete from focuse_user where user1ID = "' + user1ID + '" and user2ID = "' + user2ID + '"';
    connection.query(sql,function(err,result){
      callback(err,result);
    })
    connection.end();
  }



  this.insert = function (username, pw, nickname, callback) {
    var userAddSql = 'insert into user(username,password,nickname,userPtoUrl) value(?,?,?,?)';
    var userAddSql_params = [username, pw, nickname, '/img/sysPto.jpg'];
    connection.query(userAddSql, userAddSql_params, function (err, result) {
      callback(err, result);
    });
    connection.end();
  };
  this.select = function (username, pw, callback) {
    var userFindSql = 'select * from user where username = "' + username + '" ';
    connection.query(userFindSql, function (err, result) {
      callback(err, result);
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
