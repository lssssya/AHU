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
			console.log(err);
			res.json({ "ret_code": 2, "ret_msg": "登陆失败"});
		}
		else if (result[0].password === pw){
			var data={
				userID:result[0].userID,
				nickname:result[0].nickname,
				userPtoUrl:result[0].userPtoUrl
			};
			req.session.user = data;
			console.log(req.session.user);
			res.json({ "ret_code": 0, "ret_msg": "登陆成功","userID": result[0].userID });
		}
		else{
			res.json({ "ret_code": 1, "ret_msg": "帐号密码错误"});
		};
	});
});

module.exports = router;
