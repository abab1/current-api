"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _user = _interopRequireDefault(require("./user"));

var _models = _interopRequireDefault(require("../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var User = _models["default"].User;
var mockTransactionFind = jest.fn();
var mockMerchantFind = jest.fn();
var mockUserFind = jest.fn();
var mockTransactionFindOne = jest.fn();
var mockUserFindOne = jest.fn();
var mockMerchantFindOne = jest.fn();
var mockMerchantWhere = jest.fn();
var mockTransactionAggregate = jest.fn();
var mockUserSave = jest.fn();
var mockUserConstructor = jest.fn();
var mockUser = jest.fn();
jest.mock('../models', function () {
  return {
    __esModule: true,
    "default": {
      Merchant: {
        find: function find() {
          return {
            exec: mockMerchantFind
          };
        },
        findOne: function findOne() {
          return {
            exec: mockMerchantFindOne
          };
        },
        where: mockMerchantWhere
      },
      Transaction: {
        find: function find() {
          return {
            exec: mockTransactionFind
          };
        },
        findOne: function findOne() {
          return {
            exec: mockTransactionFindOne
          };
        },
        aggregate: mockTransactionAggregate
      },
      User: function () {
        function User() {
          return jest.fn();
        }

        User.find = jest.fn(function () {
          return {
            exec: exec
          };
        });
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
      password: 'fkhsfk2342',
      email: 'abhishek@gmail.com'
    }, body)
  };
};

describe('merchant controller tests', function () {
  beforeEach(function () {
    mockTransactionFind.mockReset();
    mockMerchantFind.mockReset();
    mockUserFind.mockReset();
    mockTransactionFindOne.mockReset();
    mockUserFindOne.mockReset();
    mockMerchantFindOne.mockReset();
    mockMerchantWhere.mockReset();
    mockTransactionAggregate.mockReset();
  });
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
                expect(mockSend).toHaveBeenCalled();
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
                console.log('User', User);
                User.findOne.mockResolvedValueOnce(null);
                _context2.next = 8;
                return _user["default"].createIfDoesntExist(req, res, next);

              case 8:
                expect(mockSend).toHaveBeenCalled();
                done();

              case 10:
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
                mockUserFindOne.mockResolvedValueOnce(null);
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
                mockUserFindOne.mockRejectedValueOnce(new Error({
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
                mockUserFindOne.mockResolvedValueOnce({
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
                mockTransactionFind.mockResolvedValueOnce(transactions);
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
});