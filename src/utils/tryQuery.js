import models, { connectDb } from '../models';
import create from './createDocument';
const { createUser, createMerchant, createTransaction } = create;
const { Record, User, Merchant, Transaction } = models;

(async () => {
  try {
    await connectDb();
    let a = new Date().getTime();
    const result = await Transaction.find({
      userId: 'd8bd3966-7ff4-4f2f-9578-fde05cf39d51',
    }).exec();
    const amts = result.reduce((acc, trxn) => {
      acc.push(trxn.amountInCents);
      return acc;
    }, []);
    //const blance = result.reduce((acc, trxn) => acc + parseFloat(trxn.amountInCents), 0);
    const res = console.log(amts, new Date().getTime() - a);
  } catch (e) {
    console.log('error', e);
  }
  process.exit(0);
})();
