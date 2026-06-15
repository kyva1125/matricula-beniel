import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';

export class AuthController {
  private authService = new AuthService();

  authRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.register(req.body);
      sendSuccess(res, result, 'Registro exitoso', 201);
    } catch (error) {
      next(error);
    }
  };

  authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const result = await this.authService.login(req.body);
      sendSuccess(res, result, 'Inicio de sesión exitoso');
    } catch (error) {
      next(error);
    }
  };

  authValidate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      sendSuccess(res, { valid: true }, 'Token válido');
    } catch (error) {
      next(error);
    }
  };
}
