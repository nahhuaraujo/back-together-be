import { Router } from 'express';
import { reportController } from '../controllers';
import { checkId, checkReport } from '../validators';

const reportRoutes = Router();

reportRoutes.get('/find-all', reportController.findAll);
reportRoutes.post('/', checkReport(), reportController.createReport);
reportRoutes.post('/find', checkId(), reportController.findReportById);

export default reportRoutes;
