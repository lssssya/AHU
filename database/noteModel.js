function noteModel(){
  var connection ; 
  this.init = function () {
    const mysql = require('mysql');
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'xiaozhu32',
      database: 'xjmtest1'
    });
    connection.connect();
  };
  this.end = function(){
    connection.end();
  };
  this.searchNote = function(noteID,callback){
    var sql = 'select * from note where noteID = "'+noteID + '"';
    connection.query(sql,function (err,result) {
      callback(err,result);      
    });
  };
  this.searchRecord = function (noteID, callback) {
    var sql = 'select * from record where noteID = "' + noteID + '" order by recordtime DESC ';//select
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
  };
  this.searchComment = function(noteID,callback){
    // user1ID 是被评论者  user2ID 是评论者
    var sql = 'select user.userID,user.nickname,user.userPtoUrl,comment.* from comment,user where comment.user2ID=user.userID AND recordID in (select recordID from record where noteID = "' + noteID + '");';
    connection.query(sql,function(err,result){
      callback(err,result);
      //记得自己关  end()
    });
  };

  this.newNote = function (userID, noteTitle, noteIntroduction, noteCoverUrl, callback) {
    var newNoteSql = 'insert into note(userID,noteTitle,noteIntroduction,noteCoverUrl) value(?,?,?,?)'
    var newNoteSql_params = [userID, noteTitle, noteIntroduction, noteCoverUrl];
    connection.query(newNoteSql, newNoteSql_params, function (err, result) {
      callback(err, result);
    });
    connection.end();
  };

  this.addRecord = function (noteID, recordContent, callback) {
    var addRecordSql;//insert
    var addRecordSql_parmas;
    connection.query(addRecordSql, addRecordSql_parmas, function (err, result) {
      callback(err, result);
    });
    connection.end();
  };

  this.liked = function (noteID, recordID, callback) {
    var likedSql;//update or insert
    var likedSql_parmas;
    connection.query(likedSql, likedSql_parmas, function (err, result) {
      callback(err, result);
    });
    connection.end();
  };

};
module.exports = noteModel;