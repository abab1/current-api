"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var _models = _interopRequireWildcard(require("../models"));

var _createDocument = _interopRequireDefault(require("./createDocument"));

var createUser = _createDocument["default"].createUser,
    createMerchant = _createDocument["default"].createMerchant,
    createTransaction = _createDocument["default"].createTransaction;
var Record = _models["default"].Record,
    User = _models["default"].User,
    Merchant = _models["default"].Merchant,
    Transaction = _models["default"].Transaction;

var onInsert = function onInsert(err, docs) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.info('successfully stored', docs.length);
  }
};

var addUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var emails, users;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Record.distinct('email');

          case 3:
            emails = _context2.sent;
            users = [];
            _context2.next = 7;
            return Promise.all(emails.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(emailId) {
                var record, firstName, lastName, email, password, user;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return Record.findOne({
                          email: emailId
                        }).exec();

                      case 2:
                        record = _context.sent;
                        firstName = record.firstName, lastName = record.lastName, email = record.email, password = record.password;
                        _context.next = 6;
                        return createUser({
                          firstName: firstName,
                          lastName: lastName,
                          email: email,
                          password: password
                        });

                      case 6:
                        user = _context.sent;
                        users.push(user);

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 7:
            _context2.next = 9;
            return User.insertMany(users, onInsert);

          case 9:
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function addUsers() {
    return _ref.apply(this, arguments);
  };
}();

var addmerchants = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var res, merchants;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Record.aggregate([{
              $group: {
                _id: {
                  latitude: '$latitude',
                  longitude: '$longitude',
                  merchant: '$merchant'
                }
              }
            }]);

          case 3:
            res = _context3.sent;
            merchants = res.reduce(function (acc, mrchnt) {
              var _mrchnt$_id = mrchnt._id,
                  latitude = _mrchnt$_id.latitude,
                  longitude = _mrchnt$_id.longitude,
                  merchant = _mrchnt$_id.merchant;
              acc.push(createMerchant({
                latitude: latitude,
                longitude: longitude,
                merchant: merchant
              }));
              return acc;
            }, []);
            _context3.next = 7;
            return Merchant.insertMany(merchants, onInsert);

          case 7:
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function addmerchants() {
    return _ref3.apply(this, arguments);
  };
}();

var addTransactions = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var users, merchants, transactions, trxnCount, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _value;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return User.find().exec();

          case 2:
            users = _context5.sent;
            _context5.next = 5;
            return Merchant.find().exec();

          case 5:
            merchants = _context5.sent;
            transactions = [];
            trxnCount = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context5.prev = 10;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
              var record, email, latitude, longitude, merchant, amountInCents, createdAt, _users$find, userId, _merchants$find, merchantId;

              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      record = _value;
                      email = record.email, latitude = record.latitude, longitude = record.longitude, merchant = record.merchant, amountInCents = record.amountInCents, createdAt = record.createdAt;
                      _users$find = users.find(function (user) {
                        return user.email === email;
                      }), userId = _users$find.userId;
                      _merchants$find = merchants.find(function (mrchnt) {
                        return mrchnt.latitude === latitude && mrchnt.longitude === longitude && mrchnt.name === merchant;
                      }), merchantId = _merchants$find.merchantId;
                      transactions.push(createTransaction({
                        userId: userId,
                        merchantId: merchantId,
                        amountInCents: amountInCents,
                        createdAt: createdAt
                      }));
                      trxnCount++;

                      if (!(trxnCount % 10000 === 0)) {
                        _context4.next = 10;
                        break;
                      }

                      _context4.next = 9;
                      return Transaction.insertMany(transactions, {
                        lean: true
                      }, onInsert);

                    case 9:
                      transactions = [];

                    case 10:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            });
            _iterator = (0, _asyncIterator2["default"])(Record.find());

          case 13:
            _context5.next = 15;
            return _iterator.next();

          case 15:
            _step = _context5.sent;
            _iteratorNormalCompletion = _step.done;
            _context5.next = 19;
            return _step.value;

          case 19:
            _value = _context5.sent;

            if (_iteratorNormalCompletion) {
              _context5.next = 25;
              break;
            }

            return _context5.delegateYield(_loop(), "t0", 22);

          case 22:
            _iteratorNormalCompletion = true;
            _context5.next = 13;
            break;

          case 25:
            _context5.next = 31;
            break;

          case 27:
            _context5.prev = 27;
            _context5.t1 = _context5["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context5.t1;

          case 31:
            _context5.prev = 31;
            _context5.prev = 32;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context5.next = 36;
              break;
            }

            _context5.next = 36;
            return _iterator["return"]();

          case 36:
            _context5.prev = 36;

            if (!_didIteratorError) {
              _context5.next = 39;
              break;
            }

            throw _iteratorError;

          case 39:
            return _context5.finish(36);

          case 40:
            return _context5.finish(31);

          case 41:
            _context5.next = 43;
            return Transaction.insertMany(transactions, {
              lean: true
            }, onInsert);

          case 43:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[10, 27, 31, 41], [32,, 36, 40]]);
  }));

  return function addTransactions() {
    return _ref4.apply(this, arguments);
  };
}();

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
  var res;
  return _regenerator["default"].wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _models.connectDb)();

        case 3:
          _context6.next = 5;
          return addUsers();

        case 5:
          _context6.next = 7;
          return addmerchants();

        case 7:
          _context6.next = 9;
          return addTransactions();

        case 9:
          _context6.next = 11;
          return Record.find().sort({
            _id: -1
          }).limit(1);

        case 11:
          res = _context6.sent;
          console.log(res);
          _context6.next = 18;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          console.log('error', _context6.t0);

        case 18:
          process.exit(0);

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, null, [[0, 15]]);
}))();