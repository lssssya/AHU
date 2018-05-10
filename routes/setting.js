const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const checkLogin = require('../middlewares/checklogin').checkLogin;
const isYourself = require('../middlewares/isyou').isYourself;

router.get('/:userID',checkLogin,isYourself,function(req,res){
    var ID = parseInt(req.params.userID);
    var sessionPart = {
					userID: req.session.user.userID,
					nickname: req.session.user.nickname,
					userPtoUrl: req.session.user.userPtoUrl
    };
    res.render('setting',{
			sessionpart: sessionPart
    });
});

router.post('/:userID', urlencodedParser,checkLogin, isYourself,  function (req, res) {
		var nickname=req.body.nickname;
    var userID=req.session.user.userID;
    var gender=req.body.gender;
		var signUp=req.body.signUp;
		console.log(userID,gender,nickname,signUp);
		var userModel = require('../database/userModel');
		var db = new userModel();
		db.init();
    db.settingUpdate(userID,nickname,gender,signUp,function (err,result) {
        if (err){
            console.log(err);
            res.json({ "ret_code": 1, "ret_msg": "提交失败" });
        } else{
            res.json({ "ret_code": 0, "ret_msg": "修改成功" });
        }
    });
});

module.exports = router;