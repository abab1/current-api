"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _uuid = require("uuid");

var UserSchema = new _mongoose["default"].Schema({
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
    minlength: 8,
    required: [true, "password can't be blank"]
  },
  userId: {
    type: String,
    required: [true, "userId can't be blank"]
  }
});

UserSchema.methods.validatePassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _bcryptjs["default"].compare(password, this.password));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

UserSchema.methods.setPassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].hash(password, 8);

          case 2:
            this.password = _context2.sent;
            return _context2.abrupt("return", true);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

UserSchema.methods.setUserId = function () {
  this.userId = (0, _uuid.v4)();
};

UserSchema.methods.toJSONString = function () {
  var firstName = this.firstName,
      lastName = this.lastName,
      email = this.email,
      userId = this.userId;
  return JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email,
    userId: userId
  });
};

var User = _mongoose["default"].model('User', UserSchema);

var _default = User;
exports["default"] = _default;