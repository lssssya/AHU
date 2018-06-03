const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;

router.get('/', checkNotLogin, function (req, res) {
	res.render('login');
});

router.post('/', urlencodedParser, function (req, res, next) {
	var username = req.body.username;
	var md5 = crypto.createHash('md5');
	var encrypt_pw = md5.update(req.body.pw).digest('hex');//加密后的密码
	var userModel = require('../database/userModel');
	var db = new userModel();
	db.init();
	db.select(username, function (err, result) {
		if (err) {
			console.log(err);
			res.json({ "ret_code": 2, "ret_msg": "登录失败" });
		} else if (result[0] == undefined) {
			res.json({ "ret_code": 3, "ret_msg": "不存在该用户" });
		} else if (result[0].password === encrypt_pw) {
			var data = {
				userID: result[0].userID,
				nickname: result[0].nickname,
				userPtoUrl: result[0].userPtoUrl
			};
			req.session.user = data;
			console.log(req.session.user);
			res.json({ "ret_code": 0, "ret_msg": "登录成功", "userID": result[0].userID });
		}
		else {
			res.json({ "ret_code": 1, "ret_msg": "帐号密码错误" });
		};
	});
});

module.exports = router;
