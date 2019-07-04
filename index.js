const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const express = require('express');
const PORT = 3000;
// setup route middlewares
const csrfProtection = csrf({
  cookie: {
    path: '/',
    domain: 'localhost',
    httpOnly: true,
    sameSite: true
  }
});
const parseForm = bodyParser.urlencoded({ extended: false });

// create express app
const app = express();

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());
app.use(csrfProtection);

function attach_cookie(url) {
  return function(req, res, next) {
    if (req.url == url) {
      res.cookie('csrf-token', req.csrfToken())
    }
    next();
  }
}

// attaching the csrf cookie for request to '/' route
app.use(attach_cookie('/'));

// This route serves the static files that will run in the browser
// with the cookie attached
app.use('/', express.static(__dirname +'/public'));


app.post('/process', parseForm, function (req, res) {
  // This route is protected with csrf token
  res.send('data is being processed')
});



app.listen(PORT, function () {
  console.log('Web app listening on port %d!', PORT);
});