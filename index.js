const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const express = require('express')
const PORT = 3000;
// setup route middlewares
const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })

// create express app
const app = express()

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());
app.use(csrfProtection);

function attach_cookie(url, cookie, value) {
  return function(req, res, next) {
    if (req.url == url) {
      res.cookie('CSRF-TOKEN', req.csrfToken())
    }
    next();
  }
}


app.use(attach_cookie('/', 'mycookie', 'value'));
app.use('/', express.static(__dirname +'/public'));


app.post('/process', parseForm, function (req, res) {
  res.send('data is being processed')
});

app.listen(PORT, function () {
  console.log('Web app listening on port %d!', PORT);
});