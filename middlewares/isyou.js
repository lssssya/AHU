module.exports =  {
  isYourself : function isYourself(req,res,next) { 
    if (parseInt(req.session.user.userID) != parseInt(req.params.userID)){
      console.log('not you');
      req.isyourself = 0;
    }else{
      console.log('is you')
      req.isyourself = 1;
    }
    next();
  },

  isYourNote : function isYourNote(req,res,next) {  
    var noteModel = require('../database/noteModel');
    var db = new noteModel();
    db.init();
    db.searchNote(req.params.noteID,function (err,result) {
      if(err){
        throw err ;
      }else{
        if (parseInt(result[0].userID) == parseInt(req.session.user.userID) ){
          console.log('is your note');
          req.isyournote = 1;
        }else{
          console.log('is not your note');
          req.isyournote = 0;
        }
        db.end();
      }
    });
    
    next();
  }


  
}