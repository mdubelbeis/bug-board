import type { NextFunction, Request, Response } from 'express';
import Comment from '../models/commentModel.js';
import AppError from '../utils/AppError.js';

export const getAllComments = async (req: Request, res: Response) => {
  const comments = await Comment.find();

  res.status(200).json({
    status: 'success',
    count: comments.length,
    data: {
      comments,
    },
  });
};

export const createComment = async (req: Request, res: Response) => {
  const comment = await Comment.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      comment,
    },
  });
};

export const findComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    const err = new AppError('Comment not found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    const err = new AppError('Comment not found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    const err = new AppError('Comment not found', 404);
    return next(err);
  }

  res.status(204).send();
};
