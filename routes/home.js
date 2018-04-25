const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/* 
  上传文件的中间件以及修改文件名的模块
*/
var multer = require('multer');
var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
var uploadFolder = './uploads/';
createFolder(uploadFolder);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });


/* part -- newnote */

router.get('/:userID/newnote',function(req,res){
  res.render('newnote',{data:data});
});
var cpUpload = upload.fields([{ name: 'noteCover' }, { name: 'noteIntroduction' }, { name: 'noteTitle' }])
router.post('/:userID/newnote', cpUpload, function(req,res){
  console.log(req.body.noteTitle);
  console.log(req.body.noteIntroduction);
  console.dir(req.files['noteCover'][0]);
  res.json({ "ret_code": 0, "ret_msg": "创建记本成功" });
});

/* part -- notelist */
router.get('/:userID/notelist', function (req, res) {
  
  console.dir(req.params.userID);
  var ID = parseInt(req.params.userID);
  var noteModel = require('../database/noteModel');
  var db = new noteModel();
  db.init();
  db.homePage(ID, function (err, result){
    if(err){
      console.log(err);
      res.json({"ret_code":2});
    }else{
      function fordata() {};
      fordata.prototype.userID = result[0].userID;//从session取出
      fordata.prototype.nickname = "xiannv"; //从session取出
      fordata.prototype.userPtoUrl = "/1.jpg"; //从session取出
      fordata.prototype.notelist = new Array();
      result.forEach(function(item){
        fordata.prototype.notelist.push(item);
      });
      var data = new fordata();
      console.dir(data.notelist);
      res.render('notelist', { data: data });
    };
  });
  
});


/* part -- progress  */

router.get('/:userID/progress', function (req, res) {
  var data = require('../database/data').progress;
  //根据数据库将数组调用进来  写在database中 形成 progress-model.js
  res.render('progress', { data: data });
});


/* part -- follow */
router.get('/:userID/follow', function (req, res) {

  var data = require('../database/data').follow
  res.render('follow-user',{data,data});
});
router.get('/:userID/follow/note', function (req, res) {

  var data = require('../database/data').follow
  res.render('follow-note',{data,data});
});
router.get('/:userID/follow/user', function (req, res) {
  var data = require('../database/data').follow
  res.render('follow-user',{data,data});
});

/* part -- follower */
router.get('/:userID/follower', function (req, res) {
  var data = require('../database/data').follower
  res.render('follower',{data,data});
});


module.exports = router;
