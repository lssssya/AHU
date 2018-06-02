const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;
router.get('/', checkNotLogin,function(req,res){
  res.render('register');
});

router.post('/',urlencodedParser, function (req, res) {
  var username = req.body.username;
  var md5 = crypto.createHash('md5');
	var encrypt_pw= md5.update(req.body.pw).digest('hex');//加密后的密码
  var nickname = req.body.nickname;
  var userModel = require('../database/userModel');
  var db = new userModel();
  db.init();
  db.insert(username,encrypt_pw,nickname,function(err,result){
    if(err){
      console.log(err);
      res.json({ "ret_code": 1, "ret_msg": "注册重复" });
    }else{
      res.json({ "ret_code": 0, "ret_msg": "注册成功" });
    };
  });
});

module.exports=router;