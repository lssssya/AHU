
const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/checklogin').checkLogin;

router.post('/', checkLogin, function (req, res) {
  var noteModel = require('../database/noteModel');
  var database = new noteModel();
  database.init();
  database.liked(req.body.recordID, req.session.user.userID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 1 });
    } else {
      res.json({ "ret_code": 0 });
    }
  })
})

module.exports = router;