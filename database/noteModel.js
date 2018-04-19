function noteModel(){
  var connection;
  this.init=function(){
    const mysql = require('mysql');
    connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'xiaozhu32',
      database:'test'
    });
    connection.connect();
  };

  this.addRecord=function(noteID,recordContent,callback){
    var addRecordSql;//insert
    var addRecordSql_parmas;
    connection.query(addRecordSql,addRecordSql_parmas,function(err,result){
      callback(err,result);
    });
    connection.end();
  };

  this.searchNote=function(noteID,callback){
    var seacrhNoteSql;//select
    var seacrhNoteSql_parmas;
    connection.query(searchNoteSql,seacrhNoteSql_parmas,function(err,result){
      callback(err,result);
    });
    connection.end();
  };

  this.liked=function(noteID,recordID,callback){
    var likedSql;//update or insert
    var likedSql_parmas;
    connection.query(likedSql,likedSql_parmas,function(err,result){
      callback(err,result);
    });
    connection.end();
  };



};
module.exports = noteModel;
