const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// var users = require('../database/users.js').items;
router.get('/',function(req,res){
  res.render('register');
});

router.post('/', urlencodedParser, function (req, res) {
  var username = req.body.username;
  var pw = req.body.pw;
  var nickname = req.body.nickname;
  var userModel = require('../database/userModel');
  var db = new userModel();
  db.init();
  db.insert(username,pw,nickname,function(err,result){
    if(err){
      console.log(err);
      res.json({ "ret_code": 1, "ret_msg": "注册重复" });
    }else{
      res.json({ "ret_code": 0, "ret_msg": "注册成功" });
    };
  });
});

module.exports=router;