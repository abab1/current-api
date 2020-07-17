import mongoose from 'mongoose';

import User from './User';
import Merchant from './Merchant';
import Transaction from './Transaction';
import Record from './Record';

const connectDb = () => {
  return mongoose.connect('mongodb://localhost/conduit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: 300000,
    connectTimeoutMS: 30000,
  });
};

const models = { User, Merchant, Transaction, Record };

export { connectDb };

export default models;
