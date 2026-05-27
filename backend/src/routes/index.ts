import { Router } from 'express';
import healthRouter from './health.routes';

const router = Router();

// Rutas agrupadas bajo /api
router.use('/health', healthRouter);

export default router;
