import fetch from 'node-fetch';
import merchants from './merchants';
import models from '../models';

const { Merchant, Transaction } = models;

jest.mock('node-fetch', () => {
  return jest.fn();
});

jest.mock('../models', () => ({
  __esModule: true,
  default: {
    Merchant: (() => {
      function Merchant() {
        return {
          save: jest.fn(() => Promise.resolve({ id: 1 })),
        };
      }
      Merchant.findOne = jest.fn();
      return Merchant;
    })(),
    Transaction: { find: jest.fn() },
  },
}));

describe('merchant controller tests', () => {
  describe('getAllTransactionsForMerchant tests', () => {
    it('should send 500 on error', async (done) => {
      const req = { params: { merchantId: 1234 } };
      const sendMock = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(500);
          return { send: sendMock };
        },
      };
      const next = jest.fn();
      const error = new Error({ status: 500 });
      Transaction.find.mockRejectedValueOnce(error);
      await merchants.getAllTransactionsForMerchant(req, res, next);
      expect(next).toBeCalledWith(error);
      done();
    });

    it('should send 200 with trxns when on success', async (done) => {
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
      Transaction.find.mockResolvedValueOnce(transactions);
      await merchants.getAllTransactionsForMerchant(req, res, next);
      expect(sendMock).toBeCalledWith(transactions);
      done();
    });
  });

  describe('updateAddress tests', () => {
    it('should send 400 when merchant does not exist', async (done) => {
      const req = { params: { merchantId: 1234 } };
      const sendMock = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(400);
          return { send: sendMock };
        },
      };
      const next = jest.fn();
      Merchant.findOne.mockResolvedValueOnce(null);
      await merchants.updateAddress(req, res, next);
      expect(sendMock).toBeCalledWith({ reason: 'Merchant doesnt exist' });
      done();
    });

    it('should send 400 when address not found', async (done) => {
      const req = { params: { merchantId: 1234 } };
      const sendMock = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(400);
          return { send: sendMock };
        },
      };
      const next = jest.fn();
      Merchant.findOne.mockResolvedValueOnce({ id: 1234, name: 'Taco bell' });
      fetch.mockResolvedValueOnce({ results: [] });
      await merchants.updateAddress(req, res, next);
      expect(sendMock).toBeCalledWith({ reason: 'Could not find address on google places' });
      done();
    });

    it('should send 201  when on success', async (done) => {
      const req = { params: { merchantId: 1234 } };
      const sendMock = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(201);
          return { send: sendMock };
        },
      };
      const next = jest.fn();
      Merchant.findOne.mockResolvedValueOnce({ id: 1234, name: 'Taco bell', save: jest.fn() });
      fetch.mockResolvedValueOnce({ results: [{ vicinity: 'mocked place' }] });
      await merchants.updateAddress(req, res, next);
      expect(sendMock).toBeCalledWith('updated address: mocked place');
      done();
    });

    it('should send 500 on error', async (done) => {
      const req = { params: { merchantId: 1234 } };
      const sendMock = jest.fn();
      const res = {
        status: (code) => {
          expect(code).toEqual(200);
          return { send: sendMock };
        },
      };
      const next = jest.fn();
      const error = new Error({ status: 500 });
      Merchant.findOne.mockRejectedValueOnce(error);
      await merchants.updateAddress(req, res, next);
      expect(next).toBeCalledWith(error);
      done();
    });
  });
});
