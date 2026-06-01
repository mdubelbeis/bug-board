import type { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.js';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
