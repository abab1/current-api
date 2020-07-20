"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../../controllers/user"));

var router = _express["default"].Router();

router.get('/:userId', _user["default"].getByUserId);
router.get('/:userId/balance', _user["default"].getUserBalance);
router.get('/:userId/transactions', _user["default"].getTransactions);
router.get('/:userId/:merchantId/transactions', _user["default"].getAllUserTransactionsByMerchant);
router.get('/:userId/transactions-summary', _user["default"].getUserTransactionSummary);
router.post('/', _user["default"].createIfDoesntExist);
router.patch('/:userId', _user["default"].update);
router.post('/authorize-transaction', _user["default"].authorizeTransaction);
var _default = router;
exports["default"] = _default;