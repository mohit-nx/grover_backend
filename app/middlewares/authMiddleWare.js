import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user';
import config from '../config';


const authMiddleware = async (req, res, next) => {
	const { headers: { authorization } } = req;
	if (!authorization) {
		next({ error: 'Unauthorized', message: 'authorization not found', status: 401 });
	}

	const { secret } = config;
	let user;
	try {
		user = jwt.verify(authorization.split(' ')[1], secret);
	} catch (err) {
		return next({ error: 'Unauthorized', message: 'User not Authorized', status: 401 });
	}

	if (!user) {
		return next({ error: 'Unauthorized', message: 'User not Authorized', status: 403 });
	}
	const userData = await UserRepository.getInstance().getById(user._id);

	if (!userData) {
		return next({ error: 'Unauthorized', message: 'Permission Denied', status: 401 });
	}

	req.user = userData;
	next();
}

export default authMiddleware