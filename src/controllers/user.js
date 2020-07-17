import models from '../models';
import create from '../../utils/createDocument';

const { createUser } = create;
const { Merchant, Transaction, User } = models;

const getBalance = async (userId) => {
  const result = await Transaction.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $group: {
        _id: null,
        balance: { $sum: '$amountInCents' },
      },
    },
  ]);

  return result && result[0].balance / 100;
};

const getByUserId = async (req, res, next) => {
  let user = await User.findOne({ userId: req.params.id }).exec();
  if (!user) {
    return res.status(404).send('User not found');
  }
  return res.status(201).send(`user is ${user.toJSONString()}`);
};

const create = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    let user = await User.findOne({ email }).exec();

    if (!user) {
      const user = await createUser({
        firstName,
        lastName,
        password,
        email,
      });
      const createdUser = await user.save();
      return res.status(201).send(`User created successfully: ${createdUser.toJSONString()}`);
    } else {
      return res.status(422).send(`User already exists for email: ${email}`);
    }
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, newPassword } = req.body;
    let user = await User.findOne({ userId: req.params.id }).exec();

    if (password === newPassword) {
      return res.status(400).send('New and old password can not be the same');
    }

    if (!user) {
      return res.status(400).send('user doesnt exist with this id');
    }

    if (!email || !password) {
      return res.status(400).send('email and password must be provided for update');
    }

    if (!(await user.validatePassword(password))) {
      return res.status(400).send('Incorrect email and password combination');
    }

    // update user's properties
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    if (newPassword) {
      await user.setPassword(newPassword);
    }

    const updatedUser = await user.save();
    return res.status(201).send(updatedUser.toJSONString());
  } catch (e) {
    return next(e);
  }
};

const getBalance = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const balance = await getBalance(userId);
    return res.status(200).send(`User balance is $ ${balance}`);
  } catch (e) {
    return next(e);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId }).exec();
    return res.status(200).send(JSON.stringify(transactions));
  } catch (e) {
    return next(e);
  }
};

const getAllUserTransactionsByMerchant = async (req, res, next) => {
  try {
    const { userId, merchantId } = req.params;
    const transactions = await Transaction.find({ userId, merchantId }).exec();
    return res.status(200).send(transactions);
  } catch (e) {
    return next(e);
  }
};

const getUserTransactionSummary = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await Transaction.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: '$merchantId',
          balance: { $sum: '$amountInCents' },
        },
      },
    ]);

    const merchants = await Merchant.where({
      merchantId: { $in: result.map((summary) => summary._id) },
    });

    const merchantMap = {};
    merchants.forEach((merchant) => (merchantMap[merchant.merchantId] = merchant.name));

    const summary = [];
    result.forEach((item, index) => {
      const obj = {};
      obj.merchantName = merchantMap[item._id];
      obj.merchantId = item._id;
      obj.moneySpent = `$${item.balance / 100}`;
      summary.push(obj);
    });

    return res.status(200).send(summary);
  } catch (e) {
    return next(e);
  }
};

const authorizeTransaction = async (req, res, next) => {
  try {
    const { userId, transactionAmount } = req.body;
    const balance = await getBalance(userId);
    if (balance > transactionAmount) {
      return res.status(200).send({ status: 'APPROVED' });
    }
    return res.status(200).send({ status: 'DECLINED', reason: 'Insufficient balance' });
  } catch (e) {
    next(e);
  }
};

export default {
  authorizeTransaction,
  create,
  getAllUserTransactionsByMerchant,
  getBalance,
  getByUserId,
  getTransactions,
  getUserTransactionSummary,
  update,
};
