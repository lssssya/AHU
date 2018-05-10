const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const checkLogin = require('../middlewares/checklogin').checkLogin;
const isYourself = require('../middlewares/isyou').isYourself;

router.get('/:userID', checkLogin, isYourself,function(req,res){
    var ID = parseInt(req.params.userID);
    var sessionPart = {
            userID: req.session.user.userID,
            nickname: req.session.user.nickname,
            userPtoUrl: req.session.user.userPtoUrl
    };
    res.render('changepw',{
        sessionpart: sessionPart
    });
});

router.post('/:userID', checkLogin, isYourself, urlencodedParser, function (req, res) {
    var userID = req.session.user.userID;
    var pw=req.body.pw;
    var rowpw = req.body.rowPw;
    var userMode=require('../database/userModel');
    var db=new userMode();
    db.init();
    db.comparePassword(userID,function(err,result){
        if(err){
            console.log(err);
        }else{
            if(result[0].password != rowpw){
                res.json({
                    "ret_code": 2
                });
            }else{
                 db.passwordChange(userID,pw,function (err,result){
                    if (err){
                        console.log(err);
                        res.json({ "ret_code": 1, "ret_msg": "提交失败" });
                    } else{
                        res.json({ "ret_code": 0, "ret_msg": "修改成功" });
                    }
                })
            }
        }
    })
   
});


module.exports = router;
