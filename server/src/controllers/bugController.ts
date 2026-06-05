import type { NextFunction, Request, Response } from 'express';
import Bug from '../models/bugModel.js';
import AppError from '../utils/AppError.js';

export const getAllBugs = async (req: Request, res: Response) => {
  const bugs = await Bug.find();

  res.status(200).json({
    status: 'success',
    count: bugs.length,
    data: {
      bugs,
    },
  });
};

export const createBug = async (req: Request, res: Response) => {
  // TODO: Do not send req.body. Assign each field to an object to pass to .create()
  // TODO: Role/Ownership - Set req.user to user._id
  const bug = await Bug.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      bug,
    },
  });
};

export const findBug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bug = await Bug.findById(req.params.id);

  if (!bug) {
    const err = new AppError('Bug not found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      bug,
    },
  });
};

export const updateBug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Do not send req.body. Assign each field to an object to pass to .create()
  // TODO: Role/Ownership - Set req.user to user._id
  const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!bug) {
    const err = new AppError('Bug not found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      bug,
    },
  });
};

export const deleteBug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bug = await Bug.findByIdAndDelete(req.params.id);

  if (!bug) {
    const err = new AppError('Bug not found', 404);
    return next(err);
  }

  res.status(204).send();
};
