import { Router } from 'express';
import { userController } from '../controllers';

const userRoutes = Router();

userRoutes.get('/find-all', userController.findAll);

export default userRoutes;
