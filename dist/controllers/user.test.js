"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _user = _interopRequireDefault(require("./user"));

var _models = _interopRequireDefault(require("../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var User = _models["default"].User,
    Transaction = _models["default"].Transaction,
    Merchant = _models["default"].Merchant;
jest.mock('../models', function () {
  return {
    __esModule: true,
    "default": {
      Merchant: {
        find: jest.fn(),
        findOne: jest.fn(),
        where: jest.fn()
      },
      Transaction: {
        find: jest.fn(),
        findOne: jest.fn(),
        aggregate: jest.fn()
      },
      User: function () {
        function User() {
          return {
            setPassword: jest.fn(),
            setUserId: jest.fn(),
            save: jest.fn(function () {
              return Promise.resolve({
                id: 1,
                toJSONString: function toJSONString() {
                  return 'mock';
                }
              });
            }),
            toJSONString: function toJSONString() {
              return 'mock';
            }
          };
        }

        User.find = jest.fn();
        User.findOne = jest.fn();
        User.prototype.save = jest.fn();
        return User;
      }()
    }
  };
});

var getReq = function getReq(params, body) {
  return {
    params: _objectSpread({
      userId: 1234,
      merchantId: 4321
    }, params),
    body: _objectSpread({
      firstName: 'Abhishek',
      lastName: 'Singh',
      password: 'fkhsfK2342',
      email: 'abhishek@gmail.com'
    }, body)
  };
};

describe('user controller tests', function () {
  beforeEach(function () {});
  describe('createIfDoesntExist tests', function () {
    it('should not create a userif already exists with the same email', /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(422);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce({
                  id: 12
                });
                _context.next = 7;
                return _user["default"].createIfDoesntExist(req, res, next);

              case 7:
                expect(mockSend).toHaveBeenCalledWith('User already exists for email: abhishek@gmail.com');
                done();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    it('should create a user if already no user exists with the given email', /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(201);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce(null);
                _context2.next = 7;
                return _user["default"].createIfDoesntExist(req, res, next);

              case 7:
                expect(mockSend).toHaveBeenCalledWith('User created successfully: mock');
                done();

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
  describe('getByUserId tests', function () {
    it('should return 400 when user not found', /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce(null);
                _context3.next = 7;
                return _user["default"].getByUserId(req, res, next);

              case 7:
                expect(mockSend).toBeCalledWith('User not found');
                done();

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
    it('should return 500 when error thrown', /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(done) {
        var req, mockSend, res, next, error;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  send: mockSend
                };
                next = jest.fn();
                error = new Error({
                  status: 500
                });
                User.findOne.mockRejectedValueOnce(new Error({
                  status: 500
                }));
                _context4.next = 8;
                return _user["default"].getByUserId(req, res, next);

              case 8:
                expect(next).toBeCalledWith(error);
                done();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());
    it('should send 200 status code and return user if exists', /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(201);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce({
                  id: 1,
                  toJSONString: function toJSONString() {
                    return 'happy';
                  }
                });
                _context5.next = 7;
                return _user["default"].getByUserId(req, res, next);

              case 7:
                expect(mockSend).toBeCalledWith('user is happy');
                done();

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }());
  });
  describe('getTransactions tests', function () {
    it('should send 200 status code and return transactions', /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(done) {
        var req, sendMock, res, next, transactions;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                req = {
                  params: {
                    userId: 1234
                  }
                };
                sendMock = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(200);
                    return {
                      send: sendMock
                    };
                  }
                };
                next = jest.fn();
                transactions = [{
                  id: 1
                }, {
                  id: 2
                }];
                Transaction.find.mockResolvedValueOnce(transactions);
                _context6.next = 8;
                return _user["default"].getTransactions(req, res, next);

              case 8:
                expect(sendMock).toBeCalledWith(transactions);
                done();

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x6) {
        return _ref6.apply(this, arguments);
      };
    }());
  });
  describe('update tests', function () {
    it('should send an error response when user does not exist', /*#__PURE__*/function () {
      var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce(null);
                _context7.next = 7;
                return _user["default"].update(req, res, next);

              case 7:
                expect(mockSend).toHaveBeenCalledWith('user doesnt exist with this id');
                done();

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x7) {
        return _ref7.apply(this, arguments);
      };
    }());
    it('should send an error response when new password and old password are same', /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce({
                  firstName: 'mockedName',
                  lastName: 'mockedName',
                  email: 'mockedEmail',
                  userId: 'mockedsuerId'
                });
                req.body.newPassword = 'fkhsfK2342';
                _context8.next = 8;
                return _user["default"].update(req, res, next);

              case 8:
                expect(mockSend).toHaveBeenCalledWith('New and old password can not be the same');
                done();

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x8) {
        return _ref8.apply(this, arguments);
      };
    }());
    it('should send an error response when password is empty', /*#__PURE__*/function () {
      var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce({
                  firstName: 'mockedName',
                  lastName: 'mockedName',
                  email: 'mockedEmail',
                  userId: 'mockedUserId'
                });
                req.body.newPassword = 'fkhsTDfK2342';
                req.body.password = '';
                _context9.next = 9;
                return _user["default"].update(req, res, next);

              case 9:
                expect(mockSend).toHaveBeenCalledWith('email and password must be provided for update');
                done();

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x9) {
        return _ref9.apply(this, arguments);
      };
    }());
    it('should send an error response when password is wrong', /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce({
                  firstName: 'mockedName',
                  lastName: 'mockedName',
                  email: 'mockedEmail',
                  userId: 'mockedUserId',
                  validatePassword: function validatePassword() {
                    return Promise.resolve(false);
                  }
                });
                req.body.newPassword = 'fkhsTDfK2342';
                _context10.next = 8;
                return _user["default"].update(req, res, next);

              case 8:
                expect(mockSend).toHaveBeenCalledWith('Incorrect email and password combination');
                done();

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      return function (_x10) {
        return _ref10.apply(this, arguments);
      };
    }());
    it('should send an error response when validation error', /*#__PURE__*/function () {
      var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce({
                  firstName: 'mockedName',
                  lastName: 'mockedName',
                  email: 'mockedEmail@gmail.com',
                  userId: 'mockedUserId',
                  validatePassword: function validatePassword() {
                    return Promise.resolve(true);
                  }
                });
                req.body.newPassword = 'fkK2342';
                _context11.next = 8;
                return _user["default"].update(req, res, next);

              case 8:
                expect(mockSend).toBeCalledWith([{
                  field: 'password',
                  message: "Invalid password"
                }]);
                done();

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      return function (_x11) {
        return _ref11.apply(this, arguments);
      };
    }());
    it('should send 201 response when update successful', /*#__PURE__*/function () {
      var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(201);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                User.findOne.mockResolvedValueOnce({
                  firstName: 'mockedName',
                  lastName: 'mockedName',
                  email: 'mockedEmail@gmail.com',
                  userId: 'mockedUserId',
                  validatePassword: function validatePassword() {
                    return Promise.resolve(true);
                  },
                  setPassword: function setPassword() {
                    return Promise.resolve(true);
                  },
                  save: function save() {
                    return {
                      toJSONString: function toJSONString() {
                        return 'mockUser';
                      }
                    };
                  }
                });
                req.body.newPassword = 'fkkK2342';
                _context12.next = 8;
                return _user["default"].update(req, res, next);

              case 8:
                expect(mockSend).toBeCalledWith('mockUser');
                done();

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      return function (_x12) {
        return _ref12.apply(this, arguments);
      };
    }());
  });
  describe('getUserTransactionSummary tests', function () {
    it('should send 200 response with trxn summary', /*#__PURE__*/function () {
      var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                req = getReq();
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(200);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                Merchant.where.mockResolvedValueOnce([{
                  merchantId: 1,
                  name: 'ABC'
                }, {
                  merchantId: 2,
                  name: 'DEF'
                }]);
                Transaction.aggregate.mockResolvedValueOnce([{
                  _id: 1,
                  balance: 10000
                }, {
                  _id: 2,
                  balance: 20000
                }]);
                _context13.next = 8;
                return _user["default"].getUserTransactionSummary(req, res, next);

              case 8:
                expect(mockSend).toBeCalledWith([{
                  merchantId: 1,
                  merchantName: 'ABC',
                  moneySpent: '$100'
                }, {
                  merchantId: 2,
                  merchantName: 'DEF',
                  moneySpent: '$200'
                }]);
                done();

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      return function (_x13) {
        return _ref13.apply(this, arguments);
      };
    }());
  });
  describe('getUserTransactionSummary tests', function () {
    it('should send 200 with APPROVED code when balance is more than the trxn amount', /*#__PURE__*/function () {
      var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                req = getReq();
                req.body.transactionAmount = 5000;
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(200);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                Transaction.aggregate.mockResolvedValueOnce([{
                  _id: null,
                  balance: 25000
                }]);
                _context14.next = 8;
                return _user["default"].authorizeTransaction(req, res, next);

              case 8:
                expect(mockSend).toBeCalledWith({
                  status: 'APPROVED'
                });
                done();

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      return function (_x14) {
        return _ref14.apply(this, arguments);
      };
    }());
    it('should send 200 with APPROVED code when balance is same as the trxn amount', /*#__PURE__*/function () {
      var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                req = getReq();
                req.body.transactionAmount = 25000;
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(200);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                Transaction.aggregate.mockResolvedValueOnce([{
                  _id: null,
                  balance: 25000
                }]);
                _context15.next = 8;
                return _user["default"].authorizeTransaction(req, res, next);

              case 8:
                expect(mockSend).toBeCalledWith({
                  status: 'APPROVED'
                });
                done();

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      return function (_x15) {
        return _ref15.apply(this, arguments);
      };
    }());
    it('should send 200 with DECLINED code when balance is less than the trxn amoun', /*#__PURE__*/function () {
      var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(done) {
        var req, mockSend, res, next;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                req = getReq();
                req.body.transactionAmount = 25001;
                mockSend = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(200);
                    return {
                      send: mockSend
                    };
                  }
                };
                next = jest.fn();
                Transaction.aggregate.mockResolvedValueOnce([{
                  _id: null,
                  balance: 25000
                }]);
                _context16.next = 8;
                return _user["default"].authorizeTransaction(req, res, next);

              case 8:
                expect(mockSend).toBeCalledWith({
                  status: 'DECLINED',
                  reason: 'Insufficient balance'
                });
                done();

              case 10:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      return function (_x16) {
        return _ref16.apply(this, arguments);
      };
    }());
  });
});