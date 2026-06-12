import type { NextFunction, Request, Response } from 'express';
import Bug from '../models/bugModel.js';
import Project from '../models/projectModel.js';
import AppError from '../utils/AppError.js';

export const getAllBugs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const bugs = await Bug.find({ createdBy: req.user._id });

  res.status(200).json({
    status: 'success',
    count: bugs.length,
    data: {
      bugs,
    },
  });
};

export const createBug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const { title, description, priority, severity, project } = req.body;

  const projectExists = await Project.findOne({
    _id: project,
    owner: req.user._id,
  });

  if (!projectExists) {
    return next(new AppError('Project not found', 404));
  }

  const bug = await Bug.create({
    title,
    description,
    priority,
    severity,
    project,
    createdBy: req.user._id,
  });

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
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }
  const bug = await Bug.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
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

export const updateBug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const { title, description, status, priority, severity } = req.body;

  const bug = await Bug.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user._id,
    },

    {
      title,
      description,
      status,
      priority,
      severity,
    },

    {
      returnDocument: 'after',
      runValidators: true,
    }
  );

  if (!bug) {
    return next(new AppError('Bug not found', 404));
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
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const bug = await Bug.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!bug) {
    const err = new AppError('Bug not found', 404);
    return next(err);
  }

  res.status(204).send();
};
