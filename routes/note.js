const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
  
  //一个假数据块
  const data = require('../database/data').notedata;
  res.render('note',{data:data});
});

module.exports = router;