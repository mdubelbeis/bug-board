import type { NextFunction, Request, Response } from 'express';
import Project from '../models/projectModel.js';
import AppError from '../utils/AppError.js';

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in.', 401));
  }

  const projects = await Project.find({ owner: req.user._id });

  res.status(200).json({
    status: 'success',
    count: projects.length,
    data: {
      projects,
    },
  });
};

export const findProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const project = await Project.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!project) {
    const err = new AppError('Project not found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const project = await Project.create({
    title: req.body.title,
    description: req.body.description,
    owner: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      project,
    },
  });
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const project = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    {
      title: req.body.title,
      description: req.body.description,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );

  if (!project) {
    return next(new AppError('Project not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('You are not logged in', 401));
  }

  const project = await Project.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!project) {
    return next(new AppError('Project not found', 404));
  }

  res.status(204).send();
};
