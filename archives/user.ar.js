import request from 'supertest';
import app from '../src/app';

describe('Test the root path', () => {
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

  beforeEach(() => {
    const models = require('../src/models').default;
    const { User, Transaction } = models;
    const findOne = jest.spyOn(models.User, 'findOne');

    findOne.mockImplementation(() => ({
      userId: 1234,
    }));
  });

  test('It should response the GET method', (done) => {
    request(app)
      .get('/api/user/8fffaca8-66a2-4dab-86e3-45c6dab3bdf1')
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  test('It should give the balance', (done) => {
    request(app)
      .get('/api/user/d8bd3966-7ff4-4f2f-9578-fde05cf39d51/balance')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
