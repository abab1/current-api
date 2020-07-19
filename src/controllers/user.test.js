import user from './user';
import models from '../models';

const { User, Transaction } = models;

jest.mock('../models', () => ({
  __esModule: true,
  default: {
    Merchant: {
      find: jest.fn(),
      findOne: jest.fn(),
      where: jest.fn(),
    },
    Transaction: {
      find: jest.fn(),
      findOne: jest.fn(),
      aggregate: jest.fn(),
    },
    User: (() => {
      function User() {
        return {
          setPassword: jest.fn(),
          setUserId: jest.fn(),
          save: jest.fn(() => Promise.resolve({ id: 1, toJSONString: () => 'mock' })),
          toJSONString: () => 'mock',
        };
      }
      User.find = jest.fn();
      User.findOne = jest.fn();
      User.prototype.save = jest.fn();

      return User;
    })(),
  },
}));

const getReq = (params, body) => ({
  params: {
    userId: 1234,
    merchantId: 4321,
    ...params,
  },
  body: {
    firstName: 'Abhishek',
    lastName: 'Singh',
    password: 'fkhsfK2342',
    email: 'abhishek@gmail.com',
    ...body,
  },
});

describe('user controller tests', () => {
  beforeEach(() => {});

  describe('createIfDoesntExist tests', () => {
    it('should not create a userif already exists with the same email', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(422);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce({ id: 12 });
      await user.createIfDoesntExist(req, res, next);
      expect(mockSend).toHaveBeenCalledWith('User already exists for email: abhishek@gmail.com');
      done();
    });

    it('should create a user if already no user exists with the given email', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(201);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce(null);
      await user.createIfDoesntExist(req, res, next);
      expect(mockSend).toHaveBeenCalledWith('User created successfully: mock');
      done();
    });
  });

  describe('getByUserId tests', () => {
    it('should return 400 when user not found', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(400);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce(null);
      await user.getByUserId(req, res, next);
      expect(mockSend).toBeCalledWith('User not found');
      done();
    });

    it('should return 500 when error thrown', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        send: mockSend,
      };
      const next = jest.fn();
      const error = new Error({ status: 500 });
      User.findOne.mockRejectedValueOnce(new Error({ status: 500 }));
      await user.getByUserId(req, res, next);
      expect(next).toBeCalledWith(error);
      done();
    });

    it('should send 200 status code and return user if exists', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(201);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce({ id: 1, toJSONString: () => 'happy' });
      await user.getByUserId(req, res, next);
      expect(mockSend).toBeCalledWith('user is happy');
      done();
    });
  });

  describe('getTransactions tests', () => {
    it('should send 200 status code and return transactions', async (done) => {
      const req = { params: { userId: 1234 } };
      const sendMock = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(200);
          return { send: sendMock };
        },
      };
      const next = jest.fn();
      const transactions = [{ id: 1 }, { id: 2 }];
      Transaction.find.mockResolvedValueOnce(transactions);
      await user.getTransactions(req, res, next);
      expect(sendMock).toBeCalledWith(transactions);
      done();
    });
  });

  describe('update tests', () => {
    it('should send an error response when user does not exist', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(400);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce(null);
      await user.update(req, res, next);
      expect(mockSend).toHaveBeenCalledWith('user doesnt exist with this id');
      done();
    });

    it('should send an error response when new password and old password are same', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(400);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce({
        firstName: 'mockedName',
        lastName: 'mockedName',
        email: 'mockedEmail',
        userId: 'mockedsuerId',
      });
      req.body.newPassword = 'fkhsfK2342';
      await user.update(req, res, next);
      expect(mockSend).toHaveBeenCalledWith('New and old password can not be the same');
      done();
    });

    it('should send an error response when password is empty', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(400);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce({
        firstName: 'mockedName',
        lastName: 'mockedName',
        email: 'mockedEmail',
        userId: 'mockedUserId',
      });
      req.body.newPassword = 'fkhsTDfK2342';
      req.body.password = '';
      await user.update(req, res, next);
      expect(mockSend).toHaveBeenCalledWith('email and password must be provided for update');
      done();
    });

    it('should send an error response when password is wrong', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(400);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce({
        firstName: 'mockedName',
        lastName: 'mockedName',
        email: 'mockedEmail',
        userId: 'mockedUserId',
        validatePassword: () => Promise.resolve(false),
      });
      req.body.newPassword = 'fkhsTDfK2342';
      await user.update(req, res, next);
      expect(mockSend).toHaveBeenCalledWith('Incorrect email and password combination');
      done();
    });

    it('should send an error response when validation error', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(400);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce({
        firstName: 'mockedName',
        lastName: 'mockedName',
        email: 'mockedEmail@gmail.com',
        userId: 'mockedUserId',
        validatePassword: () => Promise.resolve(true),
      });
      req.body.newPassword = 'fkK2342';
      await user.update(req, res, next);
      expect(mockSend).toBeCalledWith([{ field: 'password', message: `Invalid password` }]);
      done();
    });

    it('should send 201 response when update successful', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(201);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      User.findOne.mockResolvedValueOnce({
        firstName: 'mockedName',
        lastName: 'mockedName',
        email: 'mockedEmail@gmail.com',
        userId: 'mockedUserId',
        validatePassword: () => Promise.resolve(true),
        setPassword: () => Promise.resolve(true),
        save: () => ({ toJSONString: () => 'mockUser' }),
      });
      req.body.newPassword = 'fkkK2342';
      await user.update(req, res, next);
      expect(mockSend).toBeCalledWith('mockUser');
      done();
    });
  });
});
