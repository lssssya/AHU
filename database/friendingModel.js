function friendingModel() {
  var connection;
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
  this.end = function () {
    connection.end();
  };

  this.searchliked = function (arr, callback) {
    var sql = 'select * from liked where recordID in (' + arr + ') ';
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
    connection.end();
  };
  this.recordcomment = function (arr, callback) {
    var sql = 'select user.userID,user.nickname,user.userPtoUrl,comment.* from comment,user where comment.user2ID=user.userID AND recordID in (' + arr + ')';
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
  };
  this.recordlist = function (userID, callback) {
    var sql = 'select note.noteTitle,record.* ,user.userID ,user.nickname, user.userPtoUrl from note,record,user where note.noteID=record.noteID and user.userID = record.userID and user.userID in (select user1ID from focuse_user where user2ID = "' + userID + '" )';
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
  };

  this.rank = function (callback) {
    var sql = 'select noteID,noteTitle,noteCoverUrl from note where noteID in (select noteID from record JOIN liked on record.recordID=liked.recordID group by noteID ORDER BY count(noteID) DESC)';
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
    connection.end()
  };

  this.searchclickforuser = function (string, callback) {
    var sql = 'select * from user where nickname like "%' + string + '%"';
    connection.query(sql, function (err, result) {
      callback(err, result);
    });
  }
  this.searchclickfornote = function (string, callback) {
    var sql = 'select * from note where noteTitle like "%' + string + '%"';
    connection.query(sql, function (err, result) {
      callback(err, result)
    });
  }


};
module.exports = friendingModel;