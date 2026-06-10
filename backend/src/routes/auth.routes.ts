import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.authLogin);
router.post('/register', authController.authRegister);
router.get('/validate', authController.authValidate);

// Mantener compatibilidad temporal con GET para placeholders anteriores
router.get('/login', authController.authLogin);
router.get('/register', authController.authRegister);

export { router as authRouter };
