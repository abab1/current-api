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
    Transaction = _models["default"].Transaction,
    Merchant = _models["default"].Merchant;
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
            console.log('$$$$$', user, User);

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).send('User not found'));

          case 6:
            return _context2.abrupt("return", res.status(201).send("user is ".concat(user.toJSONString())));

          case 7:
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
            return _context4.abrupt("return", res.status(201).send(updatedUser.toJSONString()));

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
router.get('/:userId/transactions', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var userId, transactions;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            userId = req.params.userId;
            _context6.next = 4;
            return Transaction.find({
              userId: userId
            }).exec();

          case 4:
            transactions = _context6.sent;
            return _context6.abrupt("return", res.status(200).send(JSON.stringify(transactions)));

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", next(_context6.t0));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));

  return function (_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/:userId/:merchantId/transactions', /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var _req$params, userId, merchantId, transactions;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$params = req.params, userId = _req$params.userId, merchantId = _req$params.merchantId;
            _context7.next = 4;
            return Transaction.find({
              userId: userId,
              merchantId: merchantId
            }).exec();

          case 4:
            transactions = _context7.sent;
            return _context7.abrupt("return", res.status(200).send(transactions));

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", next(_context7.t0));

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 8]]);
  }));

  return function (_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}());
router.get('/:userId/transactions-summary', /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var userId, result, merchants, merchantMap, summary;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            userId = req.params.userId;
            _context8.next = 4;
            return Transaction.aggregate([{
              $match: {
                userId: userId
              }
            }, {
              $group: {
                _id: '$merchantId',
                balance: {
                  $sum: '$amountInCents'
                }
              }
            }]);

          case 4:
            result = _context8.sent;
            _context8.next = 7;
            return Merchant.where({
              merchantId: {
                $in: result.map(function (summary) {
                  return summary._id;
                })
              }
            });

          case 7:
            merchants = _context8.sent;
            merchantMap = {};
            merchants.forEach(function (merchant) {
              return merchantMap[merchant.merchantId] = merchant.name;
            });
            summary = [];
            result.forEach(function (item, index) {
              var obj = {};
              obj.merchantName = merchantMap[item._id];
              obj.merchantId = item._id;
              obj.moneySpent = "$".concat(item.balance / 100);
              summary.push(obj);
            });
            return _context8.abrupt("return", res.status(200).send(summary));

          case 15:
            _context8.prev = 15;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", next(_context8.t0));

          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 15]]);
  }));

  return function (_x20, _x21, _x22) {
    return _ref8.apply(this, arguments);
  };
}());
router.post('/authorize-transaction', /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var _req$body3, userId, transactionAmount, balance;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body3 = req.body, userId = _req$body3.userId, transactionAmount = _req$body3.transactionAmount;
            _context9.next = 4;
            return getBalance(userId);

          case 4:
            balance = _context9.sent;

            if (!(balance > transactionAmount)) {
              _context9.next = 7;
              break;
            }

            return _context9.abrupt("return", res.status(200).send({
              status: 'APPROVED'
            }));

          case 7:
            return _context9.abrupt("return", res.status(200).send({
              status: 'DECLINED',
              reason: 'Insufficient balance'
            }));

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            next(_context9.t0);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 10]]);
  }));

  return function (_x23, _x24, _x25) {
    return _ref9.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;