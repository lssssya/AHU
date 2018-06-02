const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;
router.get('/', checkNotLogin, function (req, res) {
  res.render('about');
});

module.exports = router;