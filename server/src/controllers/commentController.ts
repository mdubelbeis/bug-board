import type { NextFunction, Request, Response } from 'express';
import Bug from '../models/bugModel.js';
import Comment from '../models/commentModel.js';
import Project from '../models/projectModel.js';
import AppError from '../utils/AppError.js';

export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const comments = await Comment.find({ author: req.user._id });

  res.status(200).json({
    status: 'success',
    count: comments.length,
    data: {
      comments,
    },
  });
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const { body, bug } = req.body;

  if (!body || !bug) {
    return next(new AppError('Comment body and bug are required', 400));
  }

  const existingBug = await Bug.findById(bug);

  if (!existingBug) {
    return next(new AppError('Bug not found', 404));
  }

  const project = await Project.findOne({
    _id: existingBug.project,
    owner: req.user._id,
  });

  if (!project) {
    return next(new AppError('Bug not found', 404));
  }

  const comment = await Comment.create({
    body,
    bug: existingBug._id,
    author: req.user._id,
  });

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
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const comment = await Comment.findOne({
    _id: req.params.id,
    author: req.user._id,
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

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const comment = await Comment.findOneAndUpdate(
    {
      _id: req.params.id,
      author: req.user._id,
    },
    {
      body: req.body.body,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );

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
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const comment = await Comment.findOneAndDelete({
    _id: req.params.id,
    author: req.user._id,
  });

  if (!comment) {
    const err = new AppError('Comment not found', 404);
    return next(err);
  }

  res.status(204).send();
};
