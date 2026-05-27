import type { NextFunction, Request, Response } from 'express';
import type { FieldError } from '../types/errorTypes.js';
import AppError from '../utils/AppError.js';

interface ApiError extends Error {
  statusCode?: number;
  status?: 'fail' | 'error';
  code?: number;
  keyValue?: Record<string, string>;
  errors?: Record<
    string,
    {
      path?: string;
      message?: string;
    }
  >;
  path?: string;
  value?: string;
  kind?: string;
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};

export const globalErrorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || 'error';
  let message = err.message || 'Something went wrong';

  const errors: FieldError[] = [];

  if (err.code === 11000 && err.keyValue) {
    statusCode = 400;
    status = 'fail';
    message = 'Duplicate field value';

    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field!];

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

      if (err.errors) {
        const fieldErrors = Object.values(err.errors);

        for (const error of fieldErrors) {
          errors.push({
            field: error.path,
            message: error.message || 'Invalid field value',
          });
        }
      }

      break;
    }

    case 'CastError': {
      statusCode = 400;
      status = 'fail';
      message = 'Invalid ID format';

      const field = err.path === '_id' ? 'id' : err.path;

      errors.push({
        field,
        value: err.value,
        message: `Invalid ${err.kind} for ${field}`,
      });

      break;
    }

    default:
      break;
  }

  res.status(statusCode).json({
    status,
    message,
    errors,
  });
};
