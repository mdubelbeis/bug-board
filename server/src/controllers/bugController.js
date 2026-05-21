import Bug from '../models/bugModel.js';

export const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();

    res.status(200).json({
      status: 'success',
      data: {
        bugs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const createBug = async (req, res) => {
  try {
    const bug = await Bug.insertOne(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        bug,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        bug,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const findBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        bug,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        bug,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
