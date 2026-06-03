import type { NextFunction, Request, Response } from 'express';
import Project from '../models/projectModel.js';
import AppError from '../utils/AppError.js';

export const getAllProjects = async (req: Request, res: Response) => {
  const projects = await Project.find();

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
  const project = await Project.findById(req.params.id);

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

export const createProject = async (req: Request, res: Response) => {
  const project = await Project.create(req.body);

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
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!project) {
    const err = new AppError('Comment not found', 404);
    return next(err);
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
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    const err = new AppError('Comment not found', 404);
    return next(err);
  }

  res.status(204).send();
};
