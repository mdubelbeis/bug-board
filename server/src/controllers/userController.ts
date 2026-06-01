import type { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';

// TODO: REDO WITH Controller with /api/auth

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Implement bcrypt on password?
  const user = await User.create(req.body);

  user.password = '';
  user.passwordConfirm = '';
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
};

export const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    const err = new AppError('User not found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    const err = new AppError('User not found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    const err = new AppError('User not found', 404);
    return next(err);
  }

  res.status(204).send();
};
