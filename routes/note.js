const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  var data=[
    {
      noteCoverUrl:"1.jpg",
      noteTitle: "yoyo"
    },
    {
      noteCoverUrl: "2.jpg",
      noteTitle: "yoyoyoyo"
    }
  ];
  
  res.render('note',{data:data});
});

module.exports = router;
