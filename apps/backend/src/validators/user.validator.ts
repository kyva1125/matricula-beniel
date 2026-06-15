import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app.error';

export const validateUserCreate = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, correo, rol } = req.body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
    return next(new AppError('El nombre es obligatorio', 400));
  }

  if (!correo || typeof correo !== 'string' || !correo.includes('@')) {
    return next(new AppError('El correo es inválido o obligatorio', 400));
  }

  const validRoles = ['administrador', 'apoderado', 'estudiante'];
  if (!rol || !validRoles.includes(rol)) {
    return next(new AppError('El rol debe ser administrador, apoderado o estudiante', 400));
  }

  next();
};
