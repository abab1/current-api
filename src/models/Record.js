import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  firstName: {
    type: String,
    required: [true, "firstName can't be blank"],
  },
  lastName: {
    type: String,
    required: [true, "lastName can't be blank"],
  },
  password: {
    type: String,
    required: [true, "password can't be blank"],
  },
  latitude: {
    type: Number,
    required: [true, "latitude can't be blank"],
  },
  longitude: {
    type: Number,
    required: [true, "longitude can't be blank"],
  },
  merchant: {
    type: String,
    required: [true, "name can't be blank"],
  },
  amountInCents: {
    type: Number,
    required: [true, "amountInCents can't be blank"],
  },
  createdAt: {
    type: Number,
    required: [true, "can't be blank"],
  },
});

RecordSchema.index({ latitude: 1, longitude: 1, merchant: 1 }, { unique: true });

const Record = mongoose.model('Record', RecordSchema);

export default Record;
