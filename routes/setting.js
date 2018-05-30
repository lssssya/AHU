const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const checkLogin = require('../middlewares/checklogin').checkLogin;
const isYourself = require('../middlewares/isyou').isYourself;

var multer = require('multer');
var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
var uploadFolder = './uploads/';
createFolder(uploadFolder);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+'-'+ Date.now()+'.jpg');
  }
});
var upload = multer({ storage: storage });

var cpUpload = upload.fields([{ name: 'nickname' }, { name: 'sex' }, { name: 'qianming' }, { name: 'userPtoUrl' }])
router.post('/:userID', checkLogin, isYourself,cpUpload, function (req, res) {
    var nickname = req.body.nickname;
    var userID = req.session.user.userID;
    var sex = req.body.sex;
    var signUp = req.body.qianming;
    var userPtoUrl = '/'+req.files['userPtoUrl'][0].filename;
    var userModel = require('../database/userModel');
    var db = new userModel();
    db.init();
    db.settingUpdate(userID, nickname, sex, signUp, userPtoUrl,function (err, result) {
        if (err) {
            console.log(err);
            res.json({ "ret_code": 1, "ret_msg": "提交失败" });
        } else {
            res.json({ "ret_code": 0, "ret_msg": "修改成功" });
        }
    });
});

router.get('/:userID', checkLogin, isYourself, function (req, res) {
    var ID = parseInt(req.params.userID);
    var sessionPart = {
        userID: req.session.user.userID,
        nickname: req.session.user.nickname,
        userPtoUrl: req.session.user.userPtoUrl
    };
    res.render('setting', {
        sessionpart: sessionPart
    });
});
module.exports = router;