const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('follow-note');
});

module.exports = router;
