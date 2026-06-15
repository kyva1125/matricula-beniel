import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { AppError } from '../utils/app.error';

// Middleware de error controla el error tiene 4 parametros
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error('💥 Error inesperado:', error);

  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    stack: env.isDevelopment ? error.stack : undefined,
  });
};
