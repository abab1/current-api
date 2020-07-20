"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _models = _interopRequireDefault(require("../models"));

var Merchant = _models["default"].Merchant,
    Transaction = _models["default"].Transaction;

var updateAddress = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var merchantId, merchant, name, latitude, longitude, url, data, address;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            merchantId = req.params.merchantId;
            _context.next = 4;
            return Merchant.findOne({
              merchantId: merchantId
            });

          case 4:
            merchant = _context.sent;

            if (merchant) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              reason: 'Merchant doesnt exist'
            }));

          case 7:
            name = merchant.name, latitude = merchant.latitude, longitude = merchant.longitude;
            url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?\n    location=".concat(latitude, ",").concat(longitude, "&radius=1000&keyword=").concat(name.split(' ')[0], "&key=AIzaSyBMqSF2_WoK8ow89v8Qq4SHLb94mY9B5j8");
            _context.next = 11;
            return (0, _nodeFetch["default"])(url);

          case 11:
            data = _context.sent;
            address = data && data.results && data.results[0] && data.results[0].vicinity;

            if (!address) {
              _context.next = 18;
              break;
            }

            merchant.address = address;
            _context.next = 17;
            return merchant.save();

          case 17:
            return _context.abrupt("return", res.status(201).send("updated address: ".concat(address)));

          case 18:
            return _context.abrupt("return", res.status(400).send({
              reason: 'Could not find address on google places'
            }));

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next(_context.t0));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function updateAddress(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getAllTransactionsForMerchant = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var merchantId, transactions;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            merchantId = req.params.merchantId;
            _context2.next = 4;
            return Transaction.find({
              merchantId: merchantId
            });

          case 4:
            transactions = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(transactions));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", next(_context2.t0));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getAllTransactionsForMerchant(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getAllTransactionsForMerchant: getAllTransactionsForMerchant,
  updateAddress: updateAddress
};
exports["default"] = _default;