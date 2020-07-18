"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _merchants = _interopRequireDefault(require("./merchants"));

var mockTransactionFind = jest.fn();
var mockMerchantFindOne = jest.fn();
jest.mock('../models', function () {
  return {
    __esModule: true,
    "default": {
      Merchant: {
        findOne: mockMerchantFindOne
      },
      Transaction: {
        find: function find() {
          return {
            exec: mockTransactionFind
          };
        }
      }
    }
  };
});
describe('merchant controller tests', function () {
  beforeEach(function () {});
  it('test getAllTransactionsForMerchant', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
      var req, sendMock, res, next, transactions, response;
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
              _context.next = 8;
              return _merchants["default"].getAllTransactionsForMerchant(req, res, next);

            case 8:
              response = _context.sent;
              expect(sendMock).toBeCalledWith(transactions);
              done();

            case 11:
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
});