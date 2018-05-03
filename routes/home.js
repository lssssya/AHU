const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/checklogin').checkLogin;
const isYourself = require('../middlewares/isyou').isYourself;
const homeModel = require('../database/homeModel');
const db = new homeModel();

/* part -- notelist */
router.get('/:userID/notelist', checkLogin, isYourself, function (req, res) {
  var ID = parseInt(req.params.userID);
  var userPart,// 将模版的数据块分为3个部分
      dataPart = new Array();
      sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
  };
  db.init();
  db.identity(ID,function (err,result) {
    if(err){
      console.log(err);
      res.json({ "ret_code": 2 });
    }else{
      userPart = Object.create(result[0]);
      db.homePage(ID, function (err, result){
        if(err){
          console.log(err);
          res.json({"ret_code":2});
        }else{
          dataPart = result.concat();
          res.render('notelist', {
            sessionpart : sessionPart, 
            datapart : dataPart ,
            userpart : userPart ,
            check : req.isyourself });
        };
      });
    };
  });
});

/* part -- progress  */
router.get('/:userID/progress', checkLogin, isYourself, function (req, res) {
  var ID = parseInt(req.params.userID);
  var userPart,// 将模版的数据块分为3个部分
      dataPart = new Array();
      sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
  };
  db.init();
  db.identity(ID,function(err,result){
    if(err){
      console.log(err);
      res.json({ "ret_code": 2 });
    }else{
      userPart = Object.create(result[0]);
      db.progressPage(ID, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 });
        } else {
          dataPart = result.concat();
          res.render('progress', {
            sessionpart: sessionPart,
            datapart: dataPart,
            userpart: userPart,
            check: req.isyourself
          });
        };
      });
    };
  });
});

/* part -- follow */
router.get('/:userID/follow', checkLogin, isYourself, function (req, res) {
  var ID = parseInt(req.params.userID);
  var userPart,// 将模版的数据块分为3个部分
      dataPart = new Array();
      sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
  };
  db.init();
  db.identity(ID,function(err,result){
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    }else{
      userPart = Object.create(result[0]);
      db.followUserPage(ID, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 });
        } else {
          dataPart = result.concat();
          res.render('follow-user', { 
            sessionpart: sessionPart,
            datapart: dataPart,
            userpart: userPart,
            check: req.isyourself
          });
        }; 
      });
    };
  });
});
/* 想个办法把这两个合并了   大概也就是正则表达式的问题吧 */
router.get('/:userID/follow/user', checkLogin, isYourself, function (req, res) {
  var ID = parseInt(req.params.userID);
  var userPart,// 将模版的数据块分为3个部分
      dataPart = new Array();
      sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
  };
  db.init();
  db.identity(ID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    } else {
      userPart = Object.create(result[0]);
      db.followUserPage(ID, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 });
        } else {
          dataPart = result.concat();
          res.render('follow-user', {
            sessionpart: sessionPart,
            datapart: dataPart,
            userpart: userPart,
            check: req.isyourself
          });
        };
      });
    };
  });
});
router.get('/:userID/follow/note', checkLogin, isYourself, function (req, res) {
  var ID = parseInt(req.params.userID);
  var userPart,// 将模版的数据块分为3个部分
      dataPart = new Array();
      sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
  };
  db.init();
  db.identity(ID,function(err,result){
    if(err){
      console.log(err);
      res.json({ "ret_code": 2 });
    }else{
      userPart = Object.create(result[0]);
      db.followNotePage(ID, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 });
        } else {
          datapart = result.concat();
          res.render('follow-note', {
            sessionpart : sessionPart,
            userpart : userPart,
            datapart : dataPart,
            check : req.isyourself
          });
        };
      });
    };
  });
});

/* part -- follower */
router.get('/:userID/follower', checkLogin, isYourself, function (req, res) {
  var ID = parseInt(req.params.userID);
  var userPart,// 将模版的数据块分为3个部分
      dataPart = new Array();
      sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
  };
  db.init();
  db.identity(ID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    } else {
      userPart = Object.create(result[0]);
      db.followerPage(ID, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 });
        } else {
          dataPart = result.concat();
          res.render('follower', {
            sessionpart: sessionPart,
            userpart: userPart,
            datapart: dataPart,
            check: req.isyourself
          });
        }
      });
    };
  });
});


module.exports = router;
