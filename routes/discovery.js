const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/checklogin').checkLogin;
const isYourself = require('../middlewares/isyou').isYourself;

router.get('/', checkLogin, isYourself, function (req, res) {
  var sessionPart = {
    userID: req.session.user.userID,
    nickname: req.session.user.nickname,
    userPtoUrl: req.session.user.userPtoUrl
  };
  var dataPart = new Array();
  const model = require('../database/friendingModel');
  const db = new model();
  db.init();
  db.rank(function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 })
    } else {
      dataPart = result.concat();
      res.render('discovery', {
        sessionpart: sessionPart,
        ranklist: dataPart
      });
    }
  })

});

router.post('/', checkLogin, isYourself, function (req, res) {
  const model = require('../database/friendingModel');
  const db = new model();
  var str = req.body.str;
  var arr = str.split("");
  str = arr.join("%");
  console.log(str);
  var userdata = new Array();
  var notedata = new Array();
  var usercount, notecount;
  db.init();
  db.searchclickforuser(str, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 })
    } else {
      console.log(result);
      userdata = result.concat();
      usercount = result.length;
      db.searchclickfornote(str, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ "ret_code": 2 })
        } else {
          console.log(result.length);

          notecount = result.length;
          notedata = result.concat();
          res.json({
            "usercount": usercount,
            "notecount": notecount,
            "userdata": userdata,
            "notedata": notedata,
            "ret_code": 0
          })
          db.end();
        }
      })
    }
  })
})

module.exports = router;