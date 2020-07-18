"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var User = _models["default"].User,
    Transaction = _models["default"].Transaction,
    Merchant = _models["default"].Merchant;

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
    var firstName, lastName, email, password, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            firstName = params.firstName, lastName = params.lastName, email = params.email, password = params.password;
            console.log('here');
            user = new User();
            console.log('user', user);
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            _context.next = 9;
            return user.setPassword(password);

          case 9:
            user.setUserId();
            console.log('user', user);
            return _context.abrupt("return", user);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createMerchant = function createMerchant(params) {
  var latitude = params.latitude,
      longitude = params.longitude,
      merchant = params.merchant;
  var mrchnt = new Merchant();
  mrchnt.latitude = latitude;
  mrchnt.longitude = longitude;
  mrchnt.name = merchant;
  mrchnt.setMerchantId();
  return mrchnt;
};

var createTransaction = function createTransaction(params) {
  var amountInCents = params.amountInCents,
      createdAt = params.createdAt,
      userId = params.userId,
      merchantId = params.merchantId;
  var transaction = new Transaction();
  transaction.userId = userId;
  transaction.merchantId = merchantId;
  transaction.timestamp = createdAt;
  transaction.amountInCents = amountInCents;
  return transaction;
};

var _default = {
  createMerchant: createMerchant,
  createUser: createUser,
  createTransaction: createTransaction
};
exports["default"] = _default;