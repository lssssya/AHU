const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
  var data = require('../database/data').friending;
  res.render('friending',{data,data});
});
module.exports = router;

