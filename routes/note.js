
const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/checklogin').checkLogin;
const isYourNote = require('../middlewares/isyou').isYourNote;

function insertinto(arr1,arr2){ //把评论内容内嵌到每一个record中
    arr1.forEach(function(item1) {
      item1['comment'] = [];
      arr2.forEach(function (item2) {
        if (parseInt(item1.recordID) == parseInt(item2.recordID)){
          item1.comment.push(item2);
        }
      })
    })
  return arr1;
};

router.get('/:noteID',checkLogin,isYourNote, function(req,res){  
  var noteID = parseInt(req.params.noteID);
  var noteModel = require('../database/noteModel');
  var db = new noteModel();
  db.init();
  var recordArray = new Array();
  var commentArray = new Array();
  // var newarr = new Array();
  var notePart,recordPart = new Array();
  db.searchNote(noteID,function (err,result) {
    if(err){
      res.json({"ret_code":2});
    }else{
      // noteArray = result.concat();
      notePart = Object.create(result[0]);
      db.searchRecord(noteID,function(err,result){
        if(err){
          res.json({"ret_code":2});
        }else{
          recordArray = result.concat();
          
            //这里挖个坑，要把时间格式调整一下

          db.searchComment(noteID,function (err,result) {
            if(err){
              res.json({"ret_code":2});
            }else{
              commentArray = result.concat();
              recordPart = insertinto(recordArray,commentArray);
              console.log(recordPart);
              db.end();
              res.render('note',{
                checknote: req.isyournote,
                notepart:notePart,
                recordpart:recordPart
              });
            }
          });
        };   
      });
    }
  });
  
});

router.post('/:noteID',function(req,res){

});


module.exports = router;