var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var app = express();
var methodOverride = require('method-override');
var db = require("./models")
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const axios = require('axios')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', indexRouter);


app.post('/postComments', async (req, res) => {
  if (req.body.comment.replace(/\s/g, '').length == 0) {
      res.redirect('/')
  } else {
      const options = {
          url: "http://0.0.0.0:3000/insertComments",
          method: "POST",
          headers: {
              "Content-Type": "Application/json"
          },
          data: {
              comment: req.body.comment,
              id: req.body.id
          }
      }
      const response = await axios(options)
      res.redirect('/')
  }
})


module.exports = app;
