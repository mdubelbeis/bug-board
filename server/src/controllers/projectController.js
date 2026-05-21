import Project from '../models/projectModel.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      status: 'success',
      count: projects.length,
      data: {
        projects,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const findProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    // await Project.insertOne(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Project created',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        updatedProject,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deletedProject = Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: `Deleted tour: ${req.params.id}`,
      deleteProject,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
