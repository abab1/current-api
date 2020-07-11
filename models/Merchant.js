import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const MerchantSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, "can't be blank"],
  },
  longitude: {
    type: Number,
    required: [true, "can't be blank"],
  },
  name: {
    type: String,
    required: [true, "can't be blank"],
  },
  merchantId: {
    type: String,
    required: [true, "can't be blank"],
  },
  address: {
    type: String,
  },
});

MerchantSchema.methods.setMerchantId = function () {
  this.userId = uuid();
};

MerchantSchema.methods.setAddress = function () {
  this.address = 'random address';
};

const Merchant = mongoose.model('Merchant', MerchantSchema);

export default Merchant;
