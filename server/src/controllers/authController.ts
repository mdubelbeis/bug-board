import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';

const signToken = (id: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT secret is not defined');
  }

  const jwtExpiresIn = (process.env.JWT_EXPIRES_IN || '1d') as StringValue;

  return jwt.sign({ id }, secret, {
    expiresIn: jwtExpiresIn,
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(user._id.toString());

  user.password = '';
  user.passwordConfirm = '';

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = !email
      ? new AppError('Email is required', 400)
      : new AppError('Password is required', 400);
    return next(err);
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    '+password'
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id.toString());

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

export const updateAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in.', 401));
  }

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-password.',
        400
      )
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );

  if (!updatedUser) {
    return next(new AppError('User not found.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    },
  });
};

export const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in.', 401));
  }

  if (!req.body.currentPassword) {
    return next(new AppError('Current password is required.', 400));
  }

  if (!req.body.password || !req.body.passwordConfirm) {
    return next(
      new AppError('New password and password confirmation are required.', 400)
    );
  }

  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const isPasswordCorrect = await user.correctPassword(
    req.body.currentPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    return next(new AppError('Current password is incorrect.', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangedAt = new Date(Date.now() - 1000);

  await user.save();

  const token = signToken(user._id.toString());

  res.status(200).json({
    status: 'success',
    token,
  });
};

export const getAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in.', 401));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    },
  });
};
