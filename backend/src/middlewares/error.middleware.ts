import { Request, Response, NextFunction } from 'express';
import { env } from '../config/environment';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  if (env.isDevelopment || statusCode === 500) {
    console.error('💥 ERROR INTERNO:', err);
  }

  res.status(statusCode).json({
    status,
    message: err.message || 'Algo salió mal en el servidor.',
    ...(env.isDevelopment && { stack: err.stack }),
  });
};
