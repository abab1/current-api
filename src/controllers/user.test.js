import user from './user';

const mockTransactionFind = jest.fn();
const mockMerchantFind = jest.fn();
const mockUserFind = jest.fn();
const mockTransactionFindOne = jest.fn();
const mockUserFindOne = jest.fn();
const mockMerchantFindOne = jest.fn();
const mockMerchantWhere = jest.fn();
const mockTransactionAggregate = jest.fn();

jest.mock('../models', () => ({
  __esModule: true,
  default: {
    Merchant: {
      find: () => {
        return {
          exec: mockMerchantFind,
        };
      },
      findOne: () => {
        return {
          exec: mockMerchantFindOne,
        };
      },
      where: mockMerchantWhere,
    },
    Transaction: {
      find: () => {
        return {
          exec: mockTransactionFind,
        };
      },
      findOne: () => {
        return {
          exec: mockTransactionFindOne,
        };
      },
      aggregate: mockTransactionAggregate,
    },
    User: {
      find: () => {
        return {
          exec: mockUserFind,
        };
      },
      findOne: () => {
        return {
          exec: mockUserFindOne,
        };
      },
    },
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
    password: 'fkhsfk2342',
    email: 'abhishek@gmail.com',
    ...body,
  },
});

describe('merchant controller tests', () => {
  beforeEach(() => {
    mockTransactionFind.mockReset();
    mockMerchantFind.mockReset();
    mockUserFind.mockReset();
    mockTransactionFindOne.mockReset();
    mockUserFindOne.mockReset();
    mockMerchantFindOne.mockReset();
    mockMerchantWhere.mockReset();
    mockTransactionAggregate.mockReset();
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
      mockUserFindOne.mockResolvedValueOnce(null);
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
      mockUserFindOne.mockRejectedValueOnce(new Error({ status: 500 }));
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
      mockUserFindOne.mockResolvedValueOnce({ id: 1, toJSONString: () => 'happy' });
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
      mockTransactionFind.mockResolvedValueOnce(transactions);
      await user.getTransactions(req, res, next);
      expect(sendMock).toBeCalledWith(transactions);
      done();
    });
  });
});
