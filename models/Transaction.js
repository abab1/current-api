import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amountInCents: {
    type: Number,
    required: [true, "can't be blank"],
  },
  merchantId: {
    type: String,
    required: [true, "can't be blank"],
  },
  userId: {
    type: String,
  },
  timestamp: {
    type: Number,
    required: [true, "can't be blank"],
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
