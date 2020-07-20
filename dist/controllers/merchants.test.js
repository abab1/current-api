"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _merchants = _interopRequireDefault(require("./merchants"));

var _models = _interopRequireDefault(require("../models"));

var Merchant = _models["default"].Merchant,
    Transaction = _models["default"].Transaction;
jest.mock('node-fetch', function () {
  return jest.fn();
});
jest.mock('../models', function () {
  return {
    __esModule: true,
    "default": {
      Merchant: function () {
        function Merchant() {
          return {
            save: jest.fn(function () {
              return Promise.resolve({
                id: 1
              });
            })
          };
        }

        Merchant.findOne = jest.fn();
        return Merchant;
      }(),
      Transaction: {
        find: jest.fn()
      }
    }
  };
});
describe('merchant controller tests', function () {
  describe('getMerchant tests', function () {
    it('should send 500 on error', /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
        var req, sendMock, res, next, error;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
                  }
                };
                sendMock = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(500);
                    return {
                      send: sendMock
                    };
                  }
                };
                next = jest.fn();
                error = new Error({
                  status: 500
                });
                Merchant.findOne.mockRejectedValueOnce(error);
                _context.next = 8;
                return _merchants["default"].getMerchant(req, res, next);

              case 8:
                expect(next).toBeCalledWith(error);
                done();

              case 10:
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
    it('should send 400 if merchant not found', /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(done) {
        var req, sendMock, res, next;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
                  }
                };
                sendMock = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: sendMock
                    };
                  }
                };
                next = jest.fn();
                Merchant.findOne.mockResolvedValueOnce(null);
                _context2.next = 7;
                return _merchants["default"].getMerchant(req, res, next);

              case 7:
                expect(sendMock).toBeCalledWith('Merchant not found');
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
    it('should send 200 on success', /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(done) {
        var req, sendMock, res, next;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
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
                Merchant.findOne.mockResolvedValueOnce({
                  id: 1
                });
                _context3.next = 7;
                return _merchants["default"].getMerchant(req, res, next);

              case 7:
                expect(sendMock).toBeCalledWith({
                  id: 1
                });
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
  });
  describe('getAllTransactionsForMerchant tests', function () {
    it('should send 500 on error', /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(done) {
        var req, sendMock, res, next, error;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
                  }
                };
                sendMock = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(500);
                    return {
                      send: sendMock
                    };
                  }
                };
                next = jest.fn();
                error = new Error({
                  status: 500
                });
                Transaction.find.mockRejectedValueOnce(error);
                _context4.next = 8;
                return _merchants["default"].getAllTransactionsForMerchant(req, res, next);

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
    it('should send 200 with trxns when on success', /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(done) {
        var req, sendMock, res, next, transactions;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
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
                _context5.next = 8;
                return _merchants["default"].getAllTransactionsForMerchant(req, res, next);

              case 8:
                expect(sendMock).toBeCalledWith(transactions);
                done();

              case 10:
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
  describe('updateAddress tests', function () {
    it('should send 400 when merchant does not exist', /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(done) {
        var req, sendMock, res, next;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
                  }
                };
                sendMock = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: sendMock
                    };
                  }
                };
                next = jest.fn();
                Merchant.findOne.mockResolvedValueOnce(null);
                _context6.next = 7;
                return _merchants["default"].updateAddress(req, res, next);

              case 7:
                expect(sendMock).toBeCalledWith({
                  reason: 'Merchant doesnt exist'
                });
                done();

              case 9:
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
    it('should send 400 when address not found', /*#__PURE__*/function () {
      var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(done) {
        var req, sendMock, res, next;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
                  }
                };
                sendMock = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(400);
                    return {
                      send: sendMock
                    };
                  }
                };
                next = jest.fn();
                Merchant.findOne.mockResolvedValueOnce({
                  id: 1234,
                  name: 'Taco bell'
                });

                _nodeFetch["default"].mockResolvedValueOnce({
                  json: function json() {
                    return Promise.resolve({
                      results: []
                    });
                  }
                });

                _context7.next = 8;
                return _merchants["default"].updateAddress(req, res, next);

              case 8:
                expect(sendMock).toBeCalledWith({
                  reason: 'Could not find address on google places'
                });
                done();

              case 10:
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
    it('should send 201  when on success', /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(done) {
        var req, sendMock, res, next;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
                  }
                };
                sendMock = jest.fn();
                res = {
                  status: function status(code) {
                    expect(code).toEqual(201);
                    return {
                      send: sendMock
                    };
                  }
                };
                next = jest.fn();
                Merchant.findOne.mockResolvedValueOnce({
                  id: 1234,
                  name: 'Taco bell',
                  save: jest.fn()
                });

                _nodeFetch["default"].mockResolvedValueOnce({
                  json: function json() {
                    return Promise.resolve({
                      results: [{
                        vicinity: 'mocked place'
                      }]
                    });
                  }
                });

                _context8.next = 8;
                return _merchants["default"].updateAddress(req, res, next);

              case 8:
                expect(sendMock).toBeCalledWith('updated address: mocked place');
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
    it('should send 500 on error', /*#__PURE__*/function () {
      var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(done) {
        var req, sendMock, res, next, error;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                req = {
                  params: {
                    merchantId: 1234
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
                error = new Error({
                  status: 500
                });
                Merchant.findOne.mockRejectedValueOnce(error);
                _context9.next = 8;
                return _merchants["default"].updateAddress(req, res, next);

              case 8:
                expect(next).toBeCalledWith(error);
                done();

              case 10:
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
  });
});