function homeModel(){
  var connection;
  this.init=function(){
    const mysql = require('mysql');
    connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'xiaozhu32',
      database:'xjmtest'
    });
    connection.connect();
  };
  
  this.progress=function(userID,callback){
    var sql ;
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    connection.end();
  };

  this.homePage=function(userID,callback){
    var sql = 'select userID,noteID,noteTitle,noteCoverUrl from note where userID = "' + userID + '" ';
    connection.query(sql,function (err,result) {
      callback(err,result);      
    });
    connection.end();
  };

  this.followNotePage = function (userID,callback) { 
    var sql = 'select userID,noteID,noteTitle,noteCoverUrl from note where noteID in (select noteID from focus_note where userID = "' + userID +'")';
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    connection.end();
  };

  this.followUserPage = function (userID,callback) {
    // user1ID 是被关注者  user2ID 是被关注者
    // 也就是 你的主页是user2ID 
    var sql = 'select userID,userPtoUrl,nickname from user where userID in (select user1ID from focus_user where user2ID = "'+userID+'")';    
    connection.query(sql,function (err,result) {
      callback(err,result);
    });
    connection.end();
  };

  this.followerPage = function (userID,callback) {
    // user1ID 是被关注者  user2ID 是关注者
    // 也就是 这里你要通过你的userID 为 where user1ID  
    var sql;
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    connection.end();
  };


};
module.exports = homeModel;
