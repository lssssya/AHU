const express = require('express');
const router = express.Router();


/* part -- notelist */

router.get('/:userID/notelist', function (req, res) {
  console.dir(req.params.userID);
  var ID = parseInt(req.params.userID);
  var homeModel = require('../database/homeModel');
  var db = new homeModel();
  db.init();
  db.homePage(ID, function (err, result){
    if(err){
      console.log(err);
      res.json({"ret_code":2});
    }else{
      function forHomePageData() {};
      forHomePageData.prototype.userID = ID;//从session取出
      forHomePageData.prototype.nickname = "xiannv"; //从session取出
      forHomePageData.prototype.userPtoUrl = "/1.jpg"; //从session取出
      forHomePageData.prototype.notelist = new Array();
      result.forEach(function(item){
        forHomePageData.prototype.notelist.push(item);
      });
      var data = new forHomePageData();
      console.log(data.notelist);
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
  var ID = parseInt(req.params.userID);
  var homeModel = require('../database/homeModel');
  var db = new homeModel();
  db.init();
  db.followUserPage(ID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    } else {
      console.log(result);
      function forFollowPagedata() { };
      forFollowPagedata.prototype.userID = ID;//从session取出
      forFollowPagedata.prototype.nickname = "xiannv"; //从session取出
      forFollowPagedata.prototype.userPtoUrl = "/1.jpg"; //从session取出
      forFollowPagedata.prototype.userlist = new Array();
      result.forEach(function (item) {
        forFollowPagedata.prototype.userlist.push(item);
      });
      var data = new forFollowPagedata();
      console.dir(data.userlist);
      res.render('follow-user', { data: data });
    };
  });
});

router.get('/:userID/follow/note', function (req, res) {
  var ID = parseInt(req.params.userID);
  var homeModel = require('../database/homeModel');
  var db = new homeModel();
  db.init();
  db.followNotePage(ID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    } else {
      function forFollowPagedata() { };
      forFollowPagedata.prototype.userID = ID;//从session取出
      forFollowPagedata.prototype.nickname = "xiannv"; //从session取出
      forFollowPagedata.prototype.userPtoUrl = "/1.jpg"; //从session取出
      forFollowPagedata.prototype.notelist = new Array();
      result.forEach(function (item) {
        forFollowPagedata.prototype.notelist.push(item);
      });
      var data = new forFollowPagedata();
      console.dir(data.notelist);
      res.render('follow-note', { data: data });
    };
  });
});

router.get('/:userID/follow/user', function (req, res) {
  var ID = parseInt(req.params.userID);
  var homeModel = require('../database/homeModel');
  var db = new homeModel();
  db.init();
  db.followUserPage(ID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    } else {
      console.log(result);
      function forFollowPagedata() { };
      forFollowPagedata.prototype.userID = ID;//从session取出
      forFollowPagedata.prototype.nickname = "xiannv"; //从session取出
      forFollowPagedata.prototype.userPtoUrl = "/1.jpg"; //从session取出
      forFollowPagedata.prototype.userlist = new Array();
      result.forEach(function (item) {
        forFollowPagedata.prototype.userlist.push(item);
      });
      var data = new forFollowPagedata();
      console.dir(data.userlist.length);
      res.render('follow-user', { data: data });
    };
  });
});

/* part -- follower */
router.get('/:userID/follower', function (req, res) {
  var data = require('../database/data').follower
  res.render('follower',{data,data});
});


module.exports = router;
