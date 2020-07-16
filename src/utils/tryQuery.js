import models, { connectDb } from '../models';
import create from './createDocument';
const { createUser, createMerchant, createTransaction } = create;
const { Record, User, Merchant, Transaction } = models;

(async () => {
  try {
    await connectDb();
    let a = new Date().getTime();
    const mers = await Transaction.find({
      userId: 'd8bd3966-7ff4-4f2f-9578-fde05cf39d51',
      merchantId: '67738d18-d6de-41d0-a2d1-efc5aa0718e3',
    }).exec();
    const mersum = mers.reduce((acc, ele) => acc + ele.amountInCents, 0);
    /*const result = await Transaction.find({
      userId: 'd8bd3966-7ff4-4f2f-9578-fde05cf39d51',
    }).exec();
    const amts = result.reduce((acc, trxn) => {
      acc.push(trxn.amountInCents);
      return acc;
    }, []);*/
    //const blance = result.reduce((acc, trxn) => acc + parseFloat(trxn.amountInCents), 0);
    const res = console.log(mersum, new Date().getTime() - a);
  } catch (e) {
    console.log('error', e);
  }
  process.exit(0);
})();
