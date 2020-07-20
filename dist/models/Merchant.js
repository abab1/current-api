"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = require("uuid");

var MerchantSchema = new _mongoose["default"].Schema({
  latitude: {
    type: Number,
    required: [true, "latitude can't be blank"]
  },
  longitude: {
    type: Number,
    required: [true, "longitude can't be blank"]
  },
  name: {
    type: String,
    required: [true, "name can't be blank"]
  },
  merchantId: {
    type: String,
    required: [true, "merchantId can't be blank"]
  },
  address: {
    type: String
  }
});

MerchantSchema.methods.setMerchantId = function () {
  this.merchantId = (0, _uuid.v4)();
};

MerchantSchema.methods.setAddress = function (address) {
  this.address = address;
};

var Merchant = _mongoose["default"].model('Merchant', MerchantSchema);

var _default = Merchant;
exports["default"] = _default;