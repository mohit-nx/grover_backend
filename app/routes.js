import { Router } from 'express';
import user from './controller/user/routes';
import alternator from './controller/alternators/routes';

const route = Router();
route.use('/health-check', (req, res) => {
	res.send("I AM OK!");
})

route.use('/user', user);
route.use('/alternator', alternator)

export default route;