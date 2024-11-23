import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

interface ErrorWithStatus extends Error {
  status?: number;
  errors?: string[];
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Default error
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [message];

  // Handle specific error types
  if (err instanceof MongooseError.ValidationError) {
    status = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map(error => error.message);
  } else if (err instanceof MongooseError.CastError) {
    status = 400;
    message = 'Invalid ID Format';
    errors = ['The provided ID is not in the correct format'];
  } else if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    status = 401;
    message = 'Authentication Error';
    errors = [err.message];
  }

  res.status(status).json({
    message,
    errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
