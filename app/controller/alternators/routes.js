import { Router } from 'express';

import AlternatorController from './alternatorController';
import auth from '../../middlewares/authMiddleWare';

const routes = Router();
const alternatorController = new AlternatorController();

routes.get('/list', (r,rs, n) => alternatorController.list(r,rs, n));
routes.post('/add', auth(), (r,rs, n) => alternatorController.create(r,rs, n));
routes.post('/update/:id', auth(), (r,rs, n) => alternatorController.update(r,rs, n))
routes.delete('/:id', auth(), (r,rs, n) => alternatorController.delete(r,rs, n))

export default routes;