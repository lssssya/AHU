function noteModel(){
  var connection ; 
  this.init = function () {
    const mysql = require('mysql');
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'xiaozhu32',
      database: 'bw'
    });
    connection.connect();
  };
  this.end = function(){
    connection.end();
  };

  this.searchliked = function (noteID,callback) {
    var sql = 'select * from liked,record where noteID = "'+noteID+'" and record.recordID = liked.recordID ';
    connection.query(sql,function (err,result) {
      callback(err,result);
    });
  }

  this.searchfollow = function (noteID,callback) {
    var sql ='select count(*) as notefollow from focuse_note where noteID = "'+noteID+'"';
    connection.query(sql,function (err,result) {  
      callback(err,result);
    });
  }

  this.searchNote = function(noteID,callback){
    var sql = 'select note.*,user.userID,user.nickname,user.userPtoUrl from note join user on user.userID=note.userID where noteID = "'+ noteID + '"';
    connection.query(sql,function (err,result) {
      callback(err,result);      
    });
  };
  this.searchRecord = function (noteID, callback) {
    var sql = 'select * from record where noteID = "' + noteID + '" order by recordtime DESC ';
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

  this.deleteRecord = function(recordID,callback){
    var sql = 'delete from record where recordID = "'+recordID+'"';
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    connection.end();
  };

  this.deletenote =function (noteID,callback) {
    var sql = 'delete from note where noteID = "'+noteID+'"';
    connection.query(sql,function(err,result){
      callback(err,result);
    });
    connection.end();
  }

  this.addRecord = function (noteID, recordContent,userID, callback) {
    var addRecordSql = 'insert into record(noteID,recordContent,userID) value(?,?,?)'
    var addRecordSql_parmas = [noteID,recordContent,userID];
    connection.query(addRecordSql, addRecordSql_parmas, function (err, result) {
      callback(err, result);
    });
    connection.end();
  };
  this.addcomment = function (user1ID, user2ID, recordID, comment,callback){
    var sql = 'insert into comment(user1ID,user2ID,recordID,comment) value(?,?,?,?)'
    var sql_params = [user1ID,user2ID,recordID,comment];
    connection.query(sql,sql_params,function (err,result) {
      callback(err,result);      
    });
    connection.end();
  };

  this.liked = function (recordID, userID, callback) {
    var likedSql = 'insert into liked(recordID,userID) value(?,?)';//update or insert
    var likedSql_parmas = [recordID,userID];
    connection.query(likedSql, likedSql_parmas, function (err, result) {
      callback(err, result);
    });
    connection.end();
  };

};
module.exports = noteModel;