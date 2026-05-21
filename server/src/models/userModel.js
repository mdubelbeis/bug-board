import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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
    },
    password: {
      type: String,
      required: [true, 'A password is required'],
      minLength: [8, 'Password min length: 8'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
