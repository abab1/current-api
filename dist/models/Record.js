"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var RecordSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: [true, "email can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  firstName: {
    type: String,
    required: [true, "firstName can't be blank"]
  },
  lastName: {
    type: String,
    required: [true, "lastName can't be blank"]
  },
  password: {
    type: String,
    required: [true, "password can't be blank"]
  },
  latitude: {
    type: Number,
    required: [true, "latitude can't be blank"]
  },
  longitude: {
    type: Number,
    required: [true, "longitude can't be blank"]
  },
  merchant: {
    type: String,
    required: [true, "name can't be blank"]
  },
  amountInCents: {
    type: Number,
    required: [true, "amountInCents can't be blank"]
  },
  createdAt: {
    type: Number,
    required: [true, "can't be blank"]
  }
});
RecordSchema.index({
  latitude: 1,
  longitude: 1,
  merchant: 1
}, {
  unique: true
});

var Record = _mongoose["default"].model('Record', RecordSchema);

var _default = Record;
exports["default"] = _default;