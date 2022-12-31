import { Router } from 'express';
import { authController } from '../controllers';
import { checkLogin, checkRegister } from '../validators';

const authRoutes = Router();

authRoutes.post('/login', checkLogin(), authController.login);
authRoutes.post('/register', checkRegister(), authController.register);

export default authRoutes;
