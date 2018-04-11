const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

var users = require('../database/users.js').items;
router.get('/',function(req,res){
	res.render('login');
});

router.post('/', urlencodedParser, function (req, res, next) {
	var user = findUserAndPw(req.body.username, req.body.pw);
	if (user) {
		res.json({ "ret_code": 0, "ret_msg": "登陆成功" });
	} else {
		res.json({ "ret_code": 1, "ret_msg": "帐号密码错误" });
	}
});
function findUserAndPw(username, pw) {
	return users.find(function (item) {
		return item.username === username && item.pw === pw;
	});
};

module.exports = router;
