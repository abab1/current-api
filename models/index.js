import mongoose from 'mongoose';

import User from './User';
import Merchant from './Merchant';
import Transaction from './Transaction';

const connectDb = () => {
  return mongoose.connect('mongodb://localhost/conduit');
};

const models = { User, Merchant, Transaction };

export { connectDb };

export default models;
