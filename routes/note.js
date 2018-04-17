const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
  var data = [
    {
      nickname: "tracer",
      userPtoUrl: "/4.jpg",
      noteTitle: "yoyoyo",
      noteContent: "this is my test!",
      time: "2018",
      zan: 10,
      comment: 1,
    },
    {
      nickname: "dayaozi",
      userPtoUrl: "/4.jpg",
      noteTitle: "yoyoyo",
      noteContent: "something just like this!",
      time: "2017",
      zan: 11,
      comment: 2,
    }
  ];
  res.render('note',{data:data});
});

module.exports = router;