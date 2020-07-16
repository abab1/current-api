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

var Merchant = _models["default"].Merchant,
    Transaction = _models["default"].Transaction;
router.get('/:merchantId/transactions', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var merchantId, transactions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            merchantId = req.params.merchantId;
            _context.next = 4;
            return Transaction.find(merchantId).exec();

          case 4:
            transactions = _context.sent;
            return _context.abrupt("return", res.status(200).send("Merchant transactions: ".concat(JSON.stringify(transactions))));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;