const express = require('express');

const router = express.Router();


router.get('/', function (req, res) {
  res.render('follow-user');
});
router.get('/note', function (req, res) {
  res.render('follow-note');
});
router.get('/user', function (req, res) {
  res.render('follow-user');
});

module.exports = router;
