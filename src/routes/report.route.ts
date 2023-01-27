import { Router } from 'express';
import { reportController } from '../controllers';
import { authHandler } from '../middlewares';
import { checkId, checkReport } from '../validators';

const reportRoutes = Router();

reportRoutes.get('/find-all', reportController.findAll);
reportRoutes.post('/', checkReport(), reportController.create);
reportRoutes.use(authHandler);
reportRoutes.post('/find-by-id', checkId(), reportController.findById);

export default reportRoutes;
