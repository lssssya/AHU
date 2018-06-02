const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/checklogin').checkLogin;

router.post('/follow/user',checkLogin, function (req, res) {
  var userModel = require('../database/userModel');
  var database = new userModel();
  database.init();
  database.followuser(req.body.userID, req.session.user.userID,function(err,result){
    if(err){
      console.log(err);
      res.json({"ret_code":2})
    }else{
      res.json({"ret_code":0})
    }
  });
});
router.post('/follow/note',checkLogin, function (req, res) {
  var userModel = require('../database/userModel');
  var database = new userModel();
  database.init();
  database.follownote(req.body.noteID, req.session.user.userID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 })
    } else {
      res.json({ "ret_code": 0 })
    }
  });
});


router.post('/unfollow/user',checkLogin,function(req,res){
  var userModel = require('../database/userModel');
  var database = new userModel();
  database.init();
  database.unfollowuser(req.body.userID, req.session.user.userID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 })
    } else {
      res.json({ "ret_code": 0 })
    }
  });
})

router.post('/unfollow/note',checkLogin,function(req,res){
  var userModel = require('../database/userModel');
  var database = new userModel();
  database.init();
  database.unfollownote(req.body.noteID, req.session.user.userID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 2 })
    } else {
      res.json({ "ret_code": 0 })
    }
  });
})


module.exports = router;