import merchants from './merchants';

const mockTransactionFind = jest.fn();
const mockMerchnantFindOne = jest.fn();

jest.mock('../models', () => ({
  __esModule: true,
  default: {
    Merchant: { findOne: mockMerchnantFindOne },
    Transaction: {
      find: () => {
        return {
          exec: mockTransactionFind,
        };
      },
    },
  },
}));

describe('merchant controller tests', () => {
  beforeEach(() => {});

  it('test getAllTransactionsForMerchant', async (done) => {
    const req = { params: { merchantId: 1234 } };
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
    const response = await merchants.getAllTransactionsForMerchant(req, res, next);
    expect(sendMock).toBeCalledWith(transactions);
    done();
  });
});
