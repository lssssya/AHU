const express = require('express');
const router = express.Router();

router.post('/user', function (req, res) {
  var userModel = require('../database/userModel');
  var database = new userModel();
  database.init();
  database.followuser(req.body.userID, req.session.user.userID,function(err,result){
    if(err){
      console.log(err);
      res.json({"ret_code":1})
    }else{
      res.json({"ret_code":0})
    }
  });
});
router.post('/note', function (req, res) {
  var userModel = require('../database/userModel');
  var database = new userModel();
  database.init();
  database.follownote(req.body.noteID, req.session.user.userID, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ "ret_code": 1 })
    } else {
      res.json({ "ret_code": 0 })
    }
  });
});

module.exports = router;