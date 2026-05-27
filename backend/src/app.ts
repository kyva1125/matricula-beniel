import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler, AppError } from './middlewares/error.middleware';
import { env } from './config/environment';

const app: Application = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors());

// Logger de solicitudes HTTP
if (env.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Parsers de peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/api', routes);

// Capturar rutas 404 no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`No se encontró la ruta ${req.originalUrl} en este servidor.`, 404));
});

// Middleware global de manejo de errores
app.use(errorHandler);

export default app;
