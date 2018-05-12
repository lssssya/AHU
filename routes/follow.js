const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  var userModel = require('../database/userModel');
  var database = new userModel();
  database.init();
  database.follow();
});
module.exports = router;