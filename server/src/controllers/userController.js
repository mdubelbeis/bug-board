import User from '../models/userModel.js';

// TODO: REDO WITH Controller with /api/auth

export const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
};

export const createUser = async (req, res, next) => {
  // TODO: Implement bcrypt on password?
  const user = await User.create(req.body);

  user.password = undefined;
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
};

export const findUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

export const updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

export const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(204).send();
};
