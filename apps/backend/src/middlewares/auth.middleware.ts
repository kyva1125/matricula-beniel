// import { Request, Response, NextFunction } from 'express';
// import { JwtAdapter, JwtPayload } from '../adapters/jwt.adapter';
//
// export interface AuthRequest extends Request {
//   user?: JwtPayload;
// }
//
// export function authMiddleware(
//     req: AuthRequest,
//     res: Response,
//     next: NextFunction
// ) {
//   const authHeader = req.headers.authorization;
//
//   if (!authHeader) {
//     return res.status(401).json({
//       message: 'Token no enviado',
//     });
//   }
//
//   const [type, token] = authHeader.split(' ');
//
//   if (type !== 'Bearer' || !token) {
//     return res.status(401).json({
//       message: 'Formato de token inválido',
//     });
//   }
//
//   try {
//     const decoded = JwtAdapter.verifyToken(token);
//
//     req.user = decoded;
//
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: 'Token inválido o expirado',
//     });
//   }
// }
