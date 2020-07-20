import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const UserSchema = new mongoose.Schema({
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
    minlength: 8,
    required: [true, "password can't be blank"],
  },
  userId: {
    type: String,
    required: [true, "userId can't be blank"],
  },
});

UserSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 8);
  return true;
};

UserSchema.methods.setUserId = function () {
  this.userId = uuid();
};

UserSchema.methods.toJSONString = function () {
  const { firstName, lastName, email, userId } = this;
  return JSON.stringify({ firstName, lastName, email, userId });
};

const User = mongoose.model('User', UserSchema);

export default User;
