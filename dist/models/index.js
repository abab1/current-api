"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("./User"));

var _Merchant = _interopRequireDefault(require("./Merchant"));

var _Transaction = _interopRequireDefault(require("./Transaction"));

var _Record = _interopRequireDefault(require("./Record"));

var connectDb = function connectDb() {
  return _mongoose["default"].connect('mongodb://localhost/conduit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: 300000,
    connectTimeoutMS: 30000
  });
};

exports.connectDb = connectDb;
var models = {
  User: _User["default"],
  Merchant: _Merchant["default"],
  Transaction: _Transaction["default"],
  Record: _Record["default"]
};
var _default = models;
exports["default"] = _default;