import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const MerchantSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, "latitude can't be blank"],
  },
  longitude: {
    type: Number,
    required: [true, "longitude can't be blank"],
  },
  name: {
    type: String,
    required: [true, "name can't be blank"],
  },
  merchantId: {
    type: String,
    required: [true, "merchantId can't be blank"],
  },
  address: {
    type: String,
  },
});

MerchantSchema.methods.setMerchantId = function () {
  this.merchantId = uuid();
};

MerchantSchema.methods.setAddress = function (address) {
  this.address = address;
};

const Merchant = mongoose.model('Merchant', MerchantSchema);

export default Merchant;
