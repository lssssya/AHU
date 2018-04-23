const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/',function(req,res){
	res.render('login');
});

router.post('/', urlencodedParser, function (req, res, next) {
	var username = req.body.username;
	var pw = req.body.pw;
	var userModel = require('../database/userModel');
	var db = new userModel();
	db.init();
	db.select(username,pw,function(err,result){
		if(err){
			res.json({ "ret_code": 2, "ret_msg": "登陆失败"});
		}
		else if (result[0].pw === pw){
			res.json({ "ret_code": 0, "ret_msg": "登陆成功"});
		}
		else{
			res.json({ "ret_code": 1, "ret_msg": "帐号密码错误"});
		};
	});
});

module.exports = router;
