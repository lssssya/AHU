module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      // req.flash('error', '未登录'); req.flash 是已经被淘汰的东西
      return res.redirect('/login');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      // req.flash('error', '已登录');
      return res.redirect('/home/'+req.session.user.userID+'/notelist');//返回之前的页面
    }
    next();
  }
};