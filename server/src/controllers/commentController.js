import Comment from '../models/commentModel.js';

export const getAllComments = async (req, res) => {
  const comments = await Comment.find();

  res.status(200).json({
    status: 'success',
    count: comments.length,
    data: {
      comments,
    },
  });
};

export const createComment = async (req, res) => {
  const comment = await Comment.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      comment,
    },
  });
};

export const findComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    const err = new Error('Comment not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
};

export const updateComment = async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    const err = new Error('Comment not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    const err = new Error('Comment not found');
    err.statusCode = 404;
    err.status = 'fail';
    return next(err);
  }

  res.status(204).send();
};
