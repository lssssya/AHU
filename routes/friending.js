const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/checklogin').checkLogin;
const isYourself = require('../middlewares/isyou').isYourself;
const friendingModel = require('../database/friendingModel');
const db = new friendingModel();

function insertinto(arr1, arr2) { //把评论内容内嵌到每一个record中
  arr1.forEach(function (item1) {
    item1['comment'] = [];
    arr2.forEach(function (item2) {
      if (parseInt(item1.recordID) == parseInt(item2.recordID)) {
        item1.comment.push(item2);
      }
    })
  })
  return arr1;
};

router.post('/', checkLogin, function (req, res) {
  var noteModel = require('../database/noteModel');
  var database = new noteModel();
  database.init();
  database.addcomment(
    parseInt(req.body.userID),//  被评论者
    req.session.user.userID, //评论者
    req.body.recordID,
    req.body.comment,
    function (err, result) {
      if (err) {
        console.log(err);
        res.json({ "ret_code": 2 });
      } else {
        res.json({
          "ret_code": 0,
          "userID": req.session.user.userID,
          "nickname": req.session.user.nickname
        });
      }
    });
  });


router.get('/:userID', checkLogin, isYourself,function(req,res){
  var ID = parseInt(req.params.userID);
  var userPart,// 将模版的数据块分为3个部分
      dataPart = new Array();
      sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
  };
  var temparr = new Array();
  var recordArray = new Array();
  var commentArray = new Array();
  db.init();
  db.recordlist(ID,function (err,result) {
    if(err){
      console.log(err);
    }else{
      recordArray = result.concat();
      temparr = result.map(function(item){
        return parseInt(item.recordID);
      });
      db.recordcomment(temparr,function(err,result){
        if(err){
          console.log(err);
        }else{         
          commentArray = result.concat();
          recordArray = insertinto(recordArray, commentArray);
          console.log(recordArray);
          res.render('friending',{
            sessionpart: sessionPart,
            datapart:recordArray
          });
        }
      })
    }
  })
  
});
module.exports = router;

