import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';
import type { IUser, UserDocument } from '../types/userTypes.js';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'A name is required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'An email is required'],
      trim: true,
      unique: true,
      validate: [validator.isEmail, 'A valid email is required'],
    },
    password: {
      type: String,
      required: [true, 'A password is required'],
      minLength: [8, 'Password min length: 8'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A password confirmation is required'],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('validate', function (this: UserDocument) {
  if (this.password !== this.passwordConfirm) {
    this.invalidate('passwordConfirm', 'Passwords are not matching');
  }
});

userSchema.pre('save', async function (this: UserDocument) {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.set('passwordConfirm', undefined);
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
