"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _merchants = _interopRequireDefault(require("../../controllers/merchants"));

var _models = _interopRequireDefault(require("../../models"));

var router = _express["default"].Router();

var Merchant = _models["default"].Merchant,
    Transaction = _models["default"].Transaction;
router.get('/:merchantId/transactions', _merchants["default"].getAllTransactionsForMerchant);
router.patch('/:merchantId', _merchants["default"].updateAddress);
var _default = router;
exports["default"] = _default;