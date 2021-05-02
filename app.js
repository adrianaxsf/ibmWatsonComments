var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var app = express();
var db = require("./models")
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/', indexRouter);

//sync db
db
    .sequelize
    .sync({force: true})

module.exports = app;
