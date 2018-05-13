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
  db.identity(ID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    } else {
      userPart = Object.create(result[0]);
      db.homePage(ID, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 });
        } else {
          dataPart = result.concat();
          res.render('notelist', {
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

/* part -- progress  */
function insertliked(arr1, arr2) {
  arr1.forEach(function (item1) {
    item1['recordliked'] = 0
    arr2.forEach(function (item2) {
      if (parseInt(item1.recordID) == parseInt(item2.recordID)) {
        item1.recordliked += 1;
      }
    })
  })
  return arr1;
};
function insertcomment(arr1, arr2) { //把评论内容内嵌到每一个record中
  arr1.forEach(function (item1) {
    item1['comment'] = [];
    item1['recordcomment'] = 0;
    arr2.forEach(function (item2) {
      if (parseInt(item1.recordID) == parseInt(item2.recordID)) {
        item1.comment.push(item2);
        item1.recordcomment += 1;
      }
    })
  })
  return arr1;
};
router.get('/:userID/progress', checkLogin, isYourself, function (req, res) {
  var ID = parseInt(req.params.userID);
  var userPart,// 将模版的数据块分为3个部分
    dataPart = new Array();
  sessionPart = {
    userID: req.session.user.userID,
    nickname: req.session.user.nickname,
    userPtoUrl: req.session.user.userPtoUrl
  };
  var temparr = new Array();
  db.init();
  db.identity(ID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    } else {
      userPart = Object.create(result[0]);
      db.progressPage(ID, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 });
        } else {
          dataPart = result.concat();
          temparr = dataPart.map(function (item) {
            return parseInt(item.recordID);
          });
          db.searchliked(temparr, function (err, result) {
            if (err) {
              console.log(err);
              res.json({ "ret_code": 2 });
            } else {
              dataPart = insertliked(dataPart, result);
              db.recordcomment(temparr, function (err, result) {
                if (err) {
                  console.log(err);
                  res.json({ "ret_code": 2 });
                } else {
                  dataPart = insertcomment(dataPart, result);
                  res.render('progress', {
                    sessionpart: sessionPart,
                    datapart: dataPart,
                    userpart: userPart,
                    check: req.isyourself
                  });
                }
              })
            }
          })
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
  db.identity(ID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 });
    } else {
      userPart = Object.create(result[0]);
      db.followNotePage(ID, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 });
        } else {
          datapart = result.concat();
          res.render('follow-note', {
            sessionpart: sessionPart,
            userpart: userPart,
            datapart: dataPart,
            check: req.isyourself
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
