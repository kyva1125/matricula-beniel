import { Request, Response, NextFunction } from 'express';

export class HealthController {
  constructor() {}

  getHealth = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const healthData = {
        status: 'success',
        message: 'El servidor está activo y saludable.',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())}s`,
        memoryUsage: {
          rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100} MB`,
          heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100} MB`,
          heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`,
        },
        env: process.env.NODE_ENV || 'development',
      };
      res.status(200).json(healthData);
    } catch (error) {
      next(error);
    }
  };
}
