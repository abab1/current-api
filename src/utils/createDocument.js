import models from '../models';

const { User, Transaction, Merchant } = models;

const createUser = async (params) => {
  const { firstName, lastName, email, password } = params;
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  await user.setPassword(password);
  user.setUserId();
  return user;
};

const createMerchant = (params) => {
  const { latitude, longitude, merchant } = params;
  const mrchnt = new Merchant();
  mrchnt.latitude = latitude;
  mrchnt.longitude = longitude;
  mrchnt.name = merchant;
  mrchnt.setMerchantId();
  return mrchnt;
};

const createTransaction = (params) => {
  const { amountInCents, createdAt, userId, merchantId } = params;
  const transaction = new Transaction();
  transaction.userId = userId;
  transaction.merchantId = merchantId;
  transaction.timestamp = createdAt;
  transaction.amountInCents = amountInCents;
  return transaction;
};

export default {
  createMerchant,
  createUser,
  createTransaction,
};
