"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("../../models"));

var _createDocument = _interopRequireDefault(require("../../utils/createDocument"));

var router = _express["default"].Router();

var User = _models["default"].User,
    Transaction = _models["default"].Transaction;
var createUser = _createDocument["default"].createUser;

var getBalance = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Transaction.aggregate([{
              $match: {
                userId: userId
              }
            }, {
              $group: {
                _id: null,
                balance: {
                  $sum: '$amountInCents'
                }
              }
            }]);

          case 2:
            result = _context.sent;
            return _context.abrupt("return", result && result[0].balance / 100);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getBalance(_x) {
    return _ref.apply(this, arguments);
  };
}();

router.get('/:id', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({
              userId: req.params.id
            }).exec();

          case 2:
            user = _context2.sent;
            res.status(201).send("user is ".concat(user.toJSONString()));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$body, email, firstName, lastName, password, user, _user, createdUser;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, email = _req$body.email, firstName = _req$body.firstName, lastName = _req$body.lastName, password = _req$body.password;
            _context3.next = 4;
            return User.findOne({
              email: email
            }).exec();

          case 4:
            user = _context3.sent;

            if (user) {
              _context3.next = 15;
              break;
            }

            _context3.next = 8;
            return createUser({
              firstName: firstName,
              lastName: lastName,
              password: password,
              email: email
            });

          case 8:
            _user = _context3.sent;
            _context3.next = 11;
            return _user.save();

          case 11:
            createdUser = _context3.sent;
            return _context3.abrupt("return", res.status(201).send("User created successfully: ".concat(createdUser.toJSONString())));

          case 15:
            return _context3.abrupt("return", res.status(422).send("User already exists for email: ".concat(email)));

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", next(_context3.t0));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
router.patch('/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$body2, email, firstName, lastName, password, newPassword, user, updatedUser;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, firstName = _req$body2.firstName, lastName = _req$body2.lastName, password = _req$body2.password, newPassword = _req$body2.newPassword;
            _context4.next = 4;
            return User.findOne({
              userId: req.params.id
            }).exec();

          case 4:
            user = _context4.sent;

            if (!(password === newPassword)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).send('New and old password can not be the same'));

          case 7:
            if (user) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(400).send('user doesnt exist with this id'));

          case 9:
            if (!(!email || !password)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(400).send('email and password must be provided for update'));

          case 11:
            _context4.next = 13;
            return user.validatePassword(password);

          case 13:
            if (_context4.sent) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.status(400).send('Incorrect email and password combination'));

          case 15:
            // update user's properties
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;

            if (!newPassword) {
              _context4.next = 21;
              break;
            }

            _context4.next = 21;
            return user.setPassword(newPassword);

          case 21:
            _context4.next = 23;
            return user.save();

          case 23:
            updatedUser = _context4.sent;
            return _context4.abrupt("return", res.status(201).send("User updated successfully: ".concat(updatedUser.toJSONString())));

          case 27:
            _context4.prev = 27;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", next(_context4.t0));

          case 30:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 27]]);
  }));

  return function (_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/:userId/balance', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var userId, balance;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            userId = req.params.userId;
            _context5.next = 4;
            return getBalance(userId);

          case 4:
            balance = _context5.sent;
            return _context5.abrupt("return", res.status(200).send("User balance is $ ".concat(balance)));

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", next(_context5.t0));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function (_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}());
router.post('/authorize-transacion', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _req$body3, userId, transactionAmount, balance;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body3 = req.body, userId = _req$body3.userId, transactionAmount = _req$body3.transactionAmount;
            _context6.next = 4;
            return getBalance(userId);

          case 4:
            balance = _context6.sent;

            if (!(balance > transactionAmount)) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(200).send({
              status: 'APPROVED'
            }));

          case 7:
            return _context6.abrupt("return", res.status(200).send({
              status: 'DECLINED',
              reason: 'Insufficient balance'
            }));

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            next(_context6.t0);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 10]]);
  }));

  return function (_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;