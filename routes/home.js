const express = require('express');
const router = express.Router();

/* part -- newnote */

router.get('/newnote',function(req,res){
  res.render('newnote');
});

/* part -- notelist */
router.get('/', function (req, res) {
  var data = [
    {
      noteCoverUrl: "/1.jpg",
      noteTitle: "yoyo"
    },
    {
      noteCoverUrl: "/2.jpg",
      noteTitle: "yoyoyoyo"
    }
  ];
  res.render('notelist', { data: data });
});
router.get('/notelist',function(req,res){
  var data = [
    {
      noteCoverUrl: "/2.jpg",
      noteTitle: "yoyo"
    },
    {
      noteCoverUrl: "/2.jpg",
      noteTitle: "yoyoyoyo"
    }
  ];
  res.render('notelist', { data: data });
});

/* part -- progress  */

router.get('/progress', function (req, res) {
  var data = [
    {
      nickname: "tracer",
      userPtoUrl: "/4.jpg",
      noteTitle: "yoyoyo",
      noteContent: "世界是一个回音谷，念念不忘，必有回响，你大声喊唱，山谷雷鸣，音传千里，一叠一叠，一浪一浪，彼岸世界都收到了。凡事念念不忘，必有回响。因为他有传递你心里的声音，绵绵不绝，遂相印于心。",
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
  //根据数据库将数组调用进来  写在database中 形成 progress-model.js
  res.render('progress', { data: data });
});


/* part -- follow */
router.get('/follow', function (req, res) {
  res.render('follow-user');
});
router.get('/follow/note', function (req, res) {
  res.render('follow-note');
});
router.get('/follow/user', function (req, res) {
  res.render('follow-user');
});

/* part -- follower */
router.get('/follower', function (req, res) {
  res.render('follower');
});


module.exports = router;
