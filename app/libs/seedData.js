import UserRepository from '../repositories/user';
import { hashPassword } from './utilities';
import config from '../config';

export default async () => {
	const usercount = await UserRepository.getInstance().count();
	if (usercount === 0) {
		console.log('Data seeding in progress');
		const hashedPassword = await hashPassword(config.password)
		await UserRepository.getInstance().create({
			email: 'mohit@yopmail.com',
			password: hashedPassword,
			name: 'Mohit Dang',
			isAdmin: true,
			notification: true,
		});
	}
}