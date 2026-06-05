import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT secret is not defined');
  }

  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access', 401)
    );
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string' || typeof decoded.id !== 'string') {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('Invalid user. Login or register again.', 401));
    }

    if (typeof decoded.iat !== 'number') {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }

    if (user.passwordChangedAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password. Please log in again.',
          401
        )
      );
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof Error && err.name === 'TokenExpiredError') {
      return next(new AppError('Token expired. Please log in again.', 401));
    }

    if (err instanceof Error && err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }

    return next(err);
  }
};
