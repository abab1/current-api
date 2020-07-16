"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var _models = _interopRequireWildcard(require("./models"));

//Express setup
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use('/', _routes["default"]);
(0, _models.connectDb)(); /// catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  return next(err);
}); /// error handler

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500);
  return res.json({
    errors: {
      message: err.message,
      error: err
    }
  });
});
app.listen(3000, function () {
  console.log("app listening on port 3000! ".concat(process.env.MY_SECRET));
});