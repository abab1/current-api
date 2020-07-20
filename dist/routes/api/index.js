"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user"));

var _merchants = _interopRequireDefault(require("./merchants"));

var router = _express["default"].Router();

router.use('/user', _user["default"]);
router.use('/merchant', _merchants["default"]);
var _default = router;
exports["default"] = _default;