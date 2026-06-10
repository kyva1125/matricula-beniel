import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUserCreate } from '../validators/user.validator';

const router = Router();
const userController = new UserController();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUserCreate, userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export { router as userRouter };
