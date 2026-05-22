import Bug from '../models/bugModel.js';

export const getAllBugs = async (req, res) => {
  const bugs = await Bug.find();

  res.status(200).json({
    status: 'success',
    count: bugs.length,
    data: {
      bugs,
    },
  });
};

export const createBug = async (req, res) => {
  const bug = await Bug.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      bug,
    },
  });
};

export const findBug = async (req, res, next) => {
  const bug = await Bug.findById(req.params.id);

  if (!bug) {
    const err = new Error('Bug not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      bug,
    },
  });
};

export const updateBug = async (req, res, next) => {
  const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bug) {
    const err = new Error('Bug not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      bug,
    },
  });
};

export const deleteBug = async (req, res, next) => {
  const bug = await Bug.findByIdAndDelete(req.params.id);

  if (!bug) {
    const err = new Error('Bug not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(204).send();
};
