const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  var data = [
    {
      nickname: "tracer",
      userPtoUrl: "4.jpg",
      noteTitle: "yoyoyo",
      noteContent: "this is my test!",
      userContentPtoUrl: "3.jpg",
      time: "2018",
      zan: 10,
      comment: 1,
    }, 
    {
      nickname: "dayaozi",
      userPtoUrl: "4.jpg",
      noteTitle: "yoyoyo",
      noteContent: "something just like this!",
      userContentPtoUrl: "1.jpg",
      time: "2017",
      zan: 11,
      comment: 2,
    }
  ];
  //根据数据库将数组调用进来  写在database中 形成 progress-model.js
  res.render('progress',{ data: data});
});

module.exports = router;