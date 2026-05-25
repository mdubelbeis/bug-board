export const notFoundHandler = (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server`);
  err.statusCode = 404;
  err.status = 'fail';

  next(err);
};

export const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || 'error';
  let message = err.message || 'Something went wrong';
  const errors = [];

  if (err.code === 11000) {
    statusCode = 400;
    status = 'fail';
    message = 'Duplicate field value';

    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    errors.push({
      field,
      value,
      message: `${field} is already in use`,
    });
  }

  switch (err.name) {
    case 'ValidationError': {
      statusCode = 400;
      status = 'fail';
      message = 'Validation failed';

      const fieldErrors = Object.values(err.errors);

      for (const error of fieldErrors) {
        const field = error.path;
        const message = error.message;
        errors.push({ field, message });
      }

      break;
    }

    case 'CastError': {
      statusCode = 400;
      status = 'fail';
      message = 'Invalid ID format';

      const { path, value, kind } = err;
      const field = path === '_id' ? 'id' : path;

      errors.push({
        field,
        value,
        message: `Invalid ${kind} for ${field}`,
      });

      break;
    }
  }

  res.status(statusCode).json({
    status,
    message,
    errors,
  });
};
