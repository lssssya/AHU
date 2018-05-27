module.exports = {
  isYourself: function isYourself(req, res, next) {
    if (parseInt(req.session.user.userID) != parseInt(req.params.userID)) {
      console.log('not you');
      req.isyourself = 0;
    } else {
      console.log('is you')
      req.isyourself = 1;
    }
    next();
  },

  isYourNote: function isYourNote(req, res, next) {
    var noteModel = require('../database/noteModel');
    var db = new noteModel();
    db.init();
    db.searchNote(req.params.noteID, function (err, result) {
      if (err) {
        throw err;
      } else {
        if (result[0] == undefined) {
          return res.redirect('back');//控制记本的路由
        }
        if (parseInt(result[0].userID) == parseInt(req.session.user.userID)) {
          console.log('is your note');
          req.isyournote = 1;
        } else {
          console.log('is not your note');
          req.isyournote = 0;
        }
        db.end();
        next();
      }
    });
  },

  isYourfriend: function isYourfriend(req, res, next) {
    var userModel = require('../database/userModel');
    var db = new userModel();
    db.init();
    db.searchrelationship(req.params.userID, req.session.user.userID, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        if (result[0] == undefined) {
          req.isyourfriend = 0;
        } else {
          req.isyourfriend = 1;
        }
        db.checkexist(req.params.userID,function(err,result){
          if (result[0] == undefined) {
            return res.redirect('back');//控制用户的路由
          }
          next();
        })
      }
    })
  },
  isYourFollowNote: function isYourFollowNote(req, res, next) {
    var userModel = require('../database/userModel');
    var db = new userModel();
    db.init();
    db.isNote(req.params.noteID, req.session.user.userID, function (err, result) {
      if (result[0] == undefined) {
        req.isyourfollownote = 0;
      } else {
        req.isyourfollownote = 1;
      }
      next();
    })
  },



}