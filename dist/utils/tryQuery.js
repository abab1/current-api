"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireWildcard(require("../models"));

var _createDocument = _interopRequireDefault(require("./createDocument"));

var createUser = _createDocument["default"].createUser,
    createMerchant = _createDocument["default"].createMerchant,
    createTransaction = _createDocument["default"].createTransaction;
var Record = _models["default"].Record,
    User = _models["default"].User,
    Merchant = _models["default"].Merchant,
    Transaction = _models["default"].Transaction;
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var a, sum, mers, mersum, res;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _models.connectDb)();

        case 3:
          a = new Date().getTime();
          _context.next = 6;
          return Merchant.find({
            name: 'WENDYS #3050'
          }).exec();

        case 6:
          sum = _context.sent;
          _context.next = 9;
          return Transaction.find({
            userId: 'd8bd3966-7ff4-4f2f-9578-fde05cf39d51',
            merchantId: '67738d18-d6de-41d0-a2d1-efc5aa0718e3'
          }).exec();

        case 9:
          mers = _context.sent;
          console.log('$$$$$', sum);
          mersum = mers.reduce(function (acc, ele) {
            return acc + ele.amountInCents;
          }, 0);
          /*const result = await Transaction.find({
            userId: 'd8bd3966-7ff4-4f2f-9578-fde05cf39d51',
          }).exec();
          const amts = result.reduce((acc, trxn) => {
            acc.push(trxn.amountInCents);
            return acc;
          }, []);*/
          //const blance = result.reduce((acc, trxn) => acc + parseFloat(trxn.amountInCents), 0);

          res = console.log(mersum, new Date().getTime() - a);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log('error', _context.t0);

        case 18:
          process.exit(0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 15]]);
}))();