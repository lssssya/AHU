/* 
  require引用集 
*/
const express = require('express');
const bodyParser = require('body-parser');
/* 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。*/
const cookieParser = require('cookie-parser');
const session = require("express-session");


/* 
  路由接口列表
*/
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const aboutRouter = require('./routes/about');
const homepageRouter = require('./routes/home');
const noteRouter = require('./routes/note');
const friendingRouter = require('./routes/friending');
const newnoteRouter = require('./routes/newnote');
const settingRouter = require('./routes/setting');
const changepwRouter = require('./routes/changepw');

/* 
  基本设置
*/
const app = express();
app.set('view engine','ejs');
//设置上传的文件目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'123456',
  cookie: { maxAge: 60 * 1000 * 60},// 单位毫秒 所以是一个小时
  // store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: true // 是否每次都重新保存会话，建议false
}));

// const jsonParser = bodyParser.json();  // 处理json
// const urlencodedParser = bodyParser.urlencoded({ extended: false });  //处理正常的


/* 
  静态文件挂载
*/
app.use(express.static('./public'));
app.use(express.static('./uploads'));


/*
  Router 
*/
app.use('/',aboutRouter);
app.use('/about', aboutRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/home',homepageRouter);
app.use('/newnote',newnoteRouter);
app.use('/note',noteRouter);
app.use('/friending',friendingRouter);
app.use('/setting', settingRouter);
app.use('/changepw', changepwRouter);



/* 
  错误处理
*/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000);
console.log('You are listening to port 3000');