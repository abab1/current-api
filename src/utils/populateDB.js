import models, { connectDb } from '../models';
import create from './createDocument';
const { createUser, createMerchant, createTransaction } = create;
const { Record, User, Merchant, Transaction } = models;

const onInsert = (err, docs) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.info('successfully stored', docs.length);
  }
};

const addUsers = async () => {
  try {
    const emails = await Record.distinct('email');
    const users = [];
    await Promise.all(
      emails.map(async (emailId) => {
        const record = await Record.findOne({ email: emailId }).exec();
        const { firstName, lastName, email, password } = record;
        const user = await createUser({ firstName, lastName, email, password });
        users.push(user);
      })
    );
    await User.insertMany(users, onInsert);
  } catch (e) {
    console.log(e);
  }
};

const addmerchants = async () => {
  try {
    const res = await Record.aggregate([
      {
        $group: {
          _id: { latitude: '$latitude', longitude: '$longitude', merchant: '$merchant' },
        },
      },
    ]);

    const merchants = res.reduce((acc, mrchnt) => {
      const { latitude, longitude, merchant } = mrchnt._id;
      acc.push(createMerchant({ latitude, longitude, merchant }));
      return acc;
    }, []);

    await Merchant.insertMany(merchants, onInsert);
  } catch (e) {
    console.log(e);
  }
};

const addTransactions = async () => {
  const users = await User.find().exec();
  const merchants = await Merchant.find().exec();
  let transactions = [];
  let trxnCount = 0;
  for await (const record of Record.find()) {
    const { email, latitude, longitude, merchant, amountInCents, createdAt } = record;
    const { userId } = users.find((user) => user.email === email);
    const { merchantId } = merchants.find(
      (mrchnt) =>
        mrchnt.latitude === latitude && mrchnt.longitude === longitude && mrchnt.name === merchant
    );
    transactions.push(createTransaction({ userId, merchantId, amountInCents, createdAt }));
    trxnCount++;
    if (trxnCount % 10000 === 0) {
      await Transaction.insertMany(transactions, { lean: true }, onInsert);
      transactions = [];
    }
  }
  await Transaction.insertMany(transactions, { lean: true }, onInsert);
};

(async () => {
  try {
    await connectDb();
    await addUsers();
    await addmerchants();
    await addTransactions();
    const res = await Record.find().sort({ _id: -1 }).limit(1);
    console.log(res);
  } catch (e) {
    console.log('error', e);
  }
  process.exit(0);
})();
