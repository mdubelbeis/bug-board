import Project from '../models/projectModel.js';

export const getAllProjects = async (req, res) => {
  const projects = await Project.find();

  res.status(200).json({
    status: 'success',
    count: projects.length,
    data: {
      projects,
    },
  });
};

export const findProject = async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
};

export const createProject = async (req, res) => {
  const project = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      project,
    },
  });
};

export const updateProject = async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
};

export const deleteProject = async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(204).send();
};
