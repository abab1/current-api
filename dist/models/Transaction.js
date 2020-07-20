"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var TransactionSchema = new _mongoose["default"].Schema({
  amountInCents: {
    type: Number,
    required: [true, "amountInCents can't be blank"]
  },
  merchantId: {
    type: String,
    required: [true, "can't be blank"],
    index: true
  },
  userId: {
    type: String,
    required: [true, "can't be blank"],
    index: true
  },
  timestamp: {
    type: Number,
    required: [true, "can't be blank"]
  }
});

var Transaction = _mongoose["default"].model('Transaction', TransactionSchema);

var _default = Transaction;
exports["default"] = _default;