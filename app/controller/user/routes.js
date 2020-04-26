import { Router } from 'express';

import userController from './userController';
import auth from '../../middlewares/authMiddleWare';

const routes = Router();

routes.post('/login', userController.login);
routes.get('/verify', auth(), userController.verify);
routes.get('/list', auth('isAdmin'), userController.list);
routes.put('/reset', auth(), userController.changePassword)
routes.put('/reset/:id', auth('isAdmin'), userController.resetPassword);
routes.post('/create', auth('isAdmin'), userController.create);
routes.delete('/:id', auth('isAdmin'), userController.deleteUser);

export default routes;