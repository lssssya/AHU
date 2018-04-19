const express = require('express');
const router = express.Router();

/* part -- newnote */

router.get('/newnote',function(req,res){
  res.render('newnote');
});

/* part -- notelist */
router.get('/', function (req, res) {
  var data=require('../database/data').notelist;
  
  res.render('notelist', { data: data });
});

router.get('/notelist',function(req,res){
  var data = require('../database/data').notelist

  res.render('notelist', { data: data });
});

/* part -- progress  */

router.get('/progress', function (req, res) {
  var data = require('../database/data').progress;
  //根据数据库将数组调用进来  写在database中 形成 progress-model.js
  res.render('progress', { data: data });
});


/* part -- follow */
router.get('/follow', function (req, res) {

  var data = require('../database/data').follow
  res.render('follow-user',{data,data});
});
router.get('/follow/note', function (req, res) {

  var data = require('../database/data').follow
  res.render('follow-note',{data,data});
});
router.get('/follow/user', function (req, res) {
  var data = require('../database/data').follow
  res.render('follow-user',{data,data});
});

/* part -- follower */
router.get('/follower', function (req, res) {
  var data = require('../database/data').follower
  res.render('follower',{data,data});
});


module.exports = router;
