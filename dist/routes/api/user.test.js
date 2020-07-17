"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../../app"));

describe('Test the root path', function () {
  /*jest.mock('../../models', () => ({
    __esModule: true, // this property makes it work
    default: {
      User: {
        findOne: () => {
          userId: 1234;
        },
      },
    },
  }));*/
  beforeEach(function () {
    var models = require('../../models')["default"];

    var User = models.User,
        Transaction = models.Transaction;
    var findOne = jest.spyOn(models.User, 'findOne');
    findOne.mockImplementation(function () {
      return {
        userId: 1234
      };
    });
  });
  test('It should response the GET method', function (done) {
    (0, _supertest["default"])(_app["default"]).get('/api/user/8fffaca8-66a2-4dab-86e3-45c6dab3bdf1').then(function (response) {
      expect(response.statusCode).toBe(201);
      done();
    });
  });
  test('It should give the balance', function (done) {
    (0, _supertest["default"])(_app["default"]).get('/api/user/d8bd3966-7ff4-4f2f-9578-fde05cf39d51/balance').then(function (response) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});