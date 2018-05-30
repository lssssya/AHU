function homeModel(){
  var connection;
  this.init=function(){
    const mysql = require('mysql');
    connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'xiaozhu32',
      database:'bw'
    });
    connection.connect();
  };
  this.end = function () {
    connection.end();
  };


  this.identity=function(userID,callback){
    // get who you want to 
    var sql = 'select userID,nickname,userPtoUrl from user where userID = "' + userID + '"';
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
  };
  this.searchliked = function (arr, callback) {
    var sql = 'select * from liked where recordID in (' + arr + ') ';
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
  }
  this.recordcomment = function (arr, callback) {
    var sql = 'select user.userID,user.nickname,user.userPtoUrl,comment.* from comment,user where comment.user2ID=user.userID AND recordID in (' + arr + ')';
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
    connection.end();
  }
  this.progressPage=function(userID,callback){
    // 看sql 是不是能优化 我这个是瞎写的！！
    // so sad...
    var sql = 'select noteTitle,record.* from note,record where note.noteID=record.noteID and note.userID = "' + userID + '" order by record.recordtime DESC ';
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    
  };

  this.homePage=function(userID,callback){
    var sql = 'select noteID,noteTitle,noteCoverUrl from note where userID = "' + userID + '" ';
    connection.query(sql,function (err,result) {
      callback(err,result);      
    });
    connection.end();
  };

  this.followNotePage = function (userID,callback) { 
    var sql = 'select userID,noteID,noteTitle,noteCoverUrl from note where noteID in (select noteID from focuse_note where userID = "' + userID +'")';
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    connection.end();
  };

  this.followUserPage = function (userID,callback) {
    // user1ID 是被关注者  user2ID 是关注者
    // 也就是 你的主页是user2ID 
    // sql 关系正确 不用多想了！！！
    var sql = 'select userID,userPtoUrl,nickname from user where userID in (select user1ID from focuse_user where user2ID = "'+userID+'")';    
    connection.query(sql,function (err,result) {
      callback(err,result);
    });
    connection.end();
  };

  this.followerPage = function (userID,callback) {
    // user1ID 是被关注者  user2ID 是关注者
    // 也就是 这里你要通过你的userID 为 where user1ID  
    // sql 关系正确 不用多想了！！！
    var sql = 'select userID,userPtoUrl,nickname from user where userID in (select user2ID from focuse_user where user1ID = "' + userID + '")';
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    connection.end();
  };

  this.searchfollow = function (userID,callback) {
    var sql = 'select userID from user where userID in (select user1ID from focuse_user where user2ID = "' + userID +'")'
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    connection.end();
  }


};
module.exports = homeModel;
