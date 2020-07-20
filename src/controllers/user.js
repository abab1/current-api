import models from '../models';
import create from '../utils/createDocument';

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

  return result && result[0].balance;
};

const getByUserId = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(400).send('User not found');
    }
    return res.status(201).send(`user is ${user.toJSONString()}`);
  } catch (e) {
    return next(e);
  }
};

const validateUser = ({ email, firstName, lastName, password }) => {
  const validationErrors = [];
  if (!firstName) {
    validationErrors.push({ field: 'firstName', message: `Mandatory field` });
  }

  if (!lastName) {
    validationErrors.push({ field: 'lastName', message: `Mandatory field` });
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
    validationErrors.push({ field: 'password', message: `Invalid password` });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    validationErrors.push({ field: 'email', message: 'Invalid email' });
  }

  return validationErrors;
};

const createIfDoesntExist = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const validationErrors = validateUser({ email, firstName, lastName, password });

      if (validationErrors.length > 0) {
        return res.status(400).send(validationErrors);
      }

      const userObj = await createUser({
        firstName,
        lastName,
        password,
        email,
      });

      const createdUser = await userObj.save();
      return res.status(201).send(`User created successfully: ${createdUser.toJSONString()}`);
    }
    return res.status(422).send(`User already exists for email: ${email}`);
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, newPassword } = req.body;
    const userId = req.params.userId;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(400).send('user doesnt exist with this id');
    }

    if (password === newPassword) {
      return res.status(400).send('New and old password can not be the same');
    }

    if (!email || !password) {
      return res.status(400).send('email and password must be provided for update');
    }

    if (!(await user.validatePassword(password))) {
      return res.status(400).send('Incorrect email and password combination');
    }

    // update user's properties
    // user.firstName = firstName || user.firstName;
    // user.lastName = lastName || user.lastName;
    // user.email = email || user.email;

    const validationErrors = validateUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: newPassword ? newPassword : password,
    });

    if (validationErrors.length > 0) {
      return res.status(400).send(validationErrors);
    }

    if (newPassword) {
      await user.setPassword(newPassword);
      await User.update({ userId }, { password: user.password });
    }

    if (email !== user.email) {
      await User.update({ userId }, { email });
    }

    if (firstName !== user.firstName) {
      await User.update({ userId }, { firstName });
    }

    console.log('here', firstName, user.firstName);

    if (lastName != user.lastName) {
      await User.update({ userId }, { lastName });
    }

    //const updatedUser = await user.save();
    return res.status(201).send('User updated');
  } catch (e) {
    return next(e);
  }
};

const getUserBalance = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const balance = await getBalance(userId);
    return res.status(200).send(`User balance is $ ${balance / 100}`);
  } catch (e) {
    return next(e);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    return res.status(200).send(transactions);
  } catch (e) {
    return next(e);
  }
};

const getAllUserTransactionsByMerchant = async (req, res, next) => {
  try {
    const { userId, merchantId } = req.params;
    const transactions = await Transaction.find({ userId, merchantId });
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
    merchants.forEach((merchant) => {
      merchantMap[merchant.merchantId] = merchant.name;
      return;
    });

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
    if (balance >= transactionAmount) {
      return res.status(200).send({ status: 'APPROVED' });
    }
    return res.status(200).send({ status: 'DECLINED', reason: 'Insufficient balance' });
  } catch (e) {
    return next(e);
  }
};

export default {
  authorizeTransaction,
  createIfDoesntExist,
  getAllUserTransactionsByMerchant,
  getUserBalance,
  getByUserId,
  getTransactions,
  getUserTransactionSummary,
  update,
};
