import user from './user';
import models from '../models';

const { User, Transaction, Merchant } = models;

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

  describe('createIfDoesntExist tests', () => {
    it('should not create a user if already exists with the same email', async (done) => {
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

    it('should not create a user on validation failures', async (done) => {
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
      req.body.firstName = '';
      req.body.lastName = '';
      req.body.password = 'sfwsf';
      req.body.email = 'gddg';
      await user.createIfDoesntExist(req, res, next);
      expect(mockSend).toHaveBeenCalledWith([
        { field: 'firstName', message: `Mandatory field` },
        { field: 'lastName', message: `Mandatory field` },
        { field: 'password', message: `Invalid password` },
        { field: 'email', message: 'Invalid email' },
      ]);
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

  describe('getAllUserTransactionsByMerchant tests', () => {
    it('should send 200 status code and return transactions', async (done) => {
      const req = { params: { userId: 1234, merchantId: 12 } };
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
      await user.getAllUserTransactionsByMerchant(req, res, next);
      expect(sendMock).toBeCalledWith(transactions);
      done();
    });
  });

  describe('getUserBalance tests', () => {
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
      Transaction.aggregate.mockResolvedValueOnce([{ _id: null, balance: 25050 }]);
      await user.getUserBalance(req, res, next);
      expect(sendMock).toBeCalledWith('User balance is $ 250.5');
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
      Transaction.aggregate.mockRejectedValueOnce(new Error({ status: 500 }));
      await user.getUserBalance(req, res, next);
      expect(next).toBeCalledWith(error);
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

  describe('getUserTransactionSummary tests', () => {
    it('should send 200 response with trxn summary', async (done) => {
      const req = getReq();
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(200);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      Merchant.where.mockResolvedValueOnce([
        { merchantId: 1, name: 'ABC' },
        { merchantId: 2, name: 'DEF' },
      ]);
      Transaction.aggregate.mockResolvedValueOnce([
        { _id: 1, balance: 10000 },
        { _id: 2, balance: 20000 },
      ]);
      await user.getUserTransactionSummary(req, res, next);
      expect(mockSend).toBeCalledWith([
        { merchantId: 1, merchantName: 'ABC', moneySpent: '$100' },
        { merchantId: 2, merchantName: 'DEF', moneySpent: '$200' },
      ]);
      done();
    });
  });

  describe('authorizeTransaction tests', () => {
    it('should send 200 with APPROVED code when balance is more than the trxn amount', async (done) => {
      const req = getReq();
      req.body.transactionAmount = 5000;
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(200);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      Transaction.aggregate.mockResolvedValueOnce([{ _id: null, balance: 25000 }]);
      await user.authorizeTransaction(req, res, next);
      expect(mockSend).toBeCalledWith({ status: 'APPROVED' });
      done();
    });

    it('should send 200 with APPROVED code when balance is same as the trxn amount', async (done) => {
      const req = getReq();
      req.body.transactionAmount = 25000;
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(200);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      Transaction.aggregate.mockResolvedValueOnce([{ _id: null, balance: 25000 }]);
      await user.authorizeTransaction(req, res, next);
      expect(mockSend).toBeCalledWith({ status: 'APPROVED' });
      done();
    });

    it('should send 200 with DECLINED code when balance is less than the trxn amoun', async (done) => {
      const req = getReq();
      req.body.transactionAmount = 25001;
      const mockSend = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(200);
          return { send: mockSend };
        },
      };
      const next = jest.fn();
      Transaction.aggregate.mockResolvedValueOnce([{ _id: null, balance: 25000 }]);
      await user.authorizeTransaction(req, res, next);
      expect(mockSend).toBeCalledWith({ status: 'DECLINED', reason: 'Insufficient balance' });
      done();
    });
  });
});
