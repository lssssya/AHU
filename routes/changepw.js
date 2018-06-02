const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const checkLogin = require('../middlewares/checklogin').checkLogin;
const isYourself = require('../middlewares/isyou').isYourself;

router.get('/:userID', checkLogin, function (req, res) {
    var ID = parseInt(req.params.userID);
    var sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
    };
    res.render('changepw', {
        sessionpart: sessionPart
    });
});

router.post('/:userID', checkLogin, function (req, res) {
    var userID = req.session.user.userID;
    var md5_1 = crypto.createHash('md5');
    var encrypt_rowpw = md5_1.update(req.body.rowPw).digest('hex');
    var md5_2 = crypto.createHash('md5');
    var encrypt_pw = md5_2.update(req.body.pw).digest('hex');
    var userMode = require('../database/userModel');
    var db = new userMode();
    db.init();
    db.comparePassword(userID, function (err, result) {
        if (err) {
            console.log(err);
        } else {console.log(result[0].password)
            if (result[0].password != encrypt_rowpw) {
                
                res.json({"ret_code": 2});
            } else {
                db.passwordChange(userID, encrypt_pw, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.json({ "ret_code": 1, "ret_msg": "提交失败" });
                    } else {
                        res.json({ "ret_code": 0, "ret_msg": "修改成功" });
                    }
                })
            }
        }
    })

});


module.exports = router;
