"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var _models = require("./models");

// Express setup
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

app.use(function (err, req, res) {
  console.log(err.stack);
  res.status(err.status || 500);
  return res.send({
    errors: {
      message: err.message,
      error: err
    }
  });
});
var _default = app;
exports["default"] = _default;