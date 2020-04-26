import { Router } from 'express';
import user from './controller/user/routes';
import alternator from './controller/alternators/routes';
import notification from './controller/notification/routes';

const route = Router();
route.use('/health-check', (req, res) => {
	res.send("I AM OK!");
})

route.use('/user', user);
route.use('/alternator', alternator)
route.use('/notification', notification)

export default route;