import Comment from '../models/commentModel.js';

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json({
      status: 'success',
      data: {
        comments,
      },
    });
  } catch (err) {}
};

export const createComment = async (req, res) => {
  try {
    const comment = await Comment.insertOne(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const findComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.send(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
