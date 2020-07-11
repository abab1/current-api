import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  firstName: {
    type: String,
    required: [true, "can't be blank"],
  },
  lastName: {
    type: String,
    required: [true, "can't be blank"],
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
  },
  userId: {
    type: String,
    required: [true, "can't be blank"],
  },
});

UserSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 8);
};

UserSchema.methods.setUserId = function () {
  this.userId = uuid();
};

const User = mongoose.model('User', UserSchema);

export default User;
