const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

var users = require('../database/users.js').items;
router.get('/',function(req,res){
  res.render('register');
});

router.post('/', urlencodedParser, function (req, res) {
  var index = findElem(users, "username", req.body.username);
  if (index == -1) {
    users.push(req.body);
    console.log(users);
    res.json({ "ret_code": 0, "ret_msg": "注册成功" });
  } else {
    res.json({ "ret_code": 1, "ret_msg": "注册重复" });
  }
});
function findElem(array, attr, val) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][attr] === val) {
      return i;
    }
  }
  return -1;
};



module.exports=router;