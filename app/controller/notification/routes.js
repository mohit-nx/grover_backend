import { Router } from 'express';

import NotificationController from './notificationController';
import auth from '../../middlewares/authMiddleWare';

const routes = Router();
const notificationController = new NotificationController();

routes.post('/create', (r,rs, n) => notificationController.create(r,rs, n));
// routes.post('/update/:id', auth(), (r,rs, n) => notificationController.update(r,rs, n))
// routes.delete('/:id', auth(), (r,rs, n) => notificationController.delete(r,rs, n))

export default routes;