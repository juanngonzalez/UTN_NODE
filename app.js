var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('dotenv').config();
var fileUpload = require('express-fileupload')
var session = require('express-session');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminLogin = require('./routes/admin/admin');
var adminRouter = require('./routes/admin/products');
var adminSkates = require('./routes/admin/products/skates')
var adminClothes = require('./routes/admin/products/clothes')
var adminTrucksAndWheels = require('./routes/admin/products/trucks_&_wheels')
const async = require('hbs/lib/async');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(session({
  secret: 'PW2021awqyeudj',
  cookie: {maxAge: null},
  resave: false,
  saveUninitialized: true
}));

secured = async (req, res, next) => {
  try{
    console.log(req.session.id_user);
    if(req.session.id_user){
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch(error){
    console.log(error);
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', adminLogin);
app.use('/admin/products',secured, adminRouter);

app.use('/admin/products/skates/skates_list',secured, adminSkates);
app.use('/admin/products/clothes/clothes_list', secured, adminClothes);
app.use('/admin/products/trucks_&_wheels/T&W_list', secured, adminTrucksAndWheels)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
