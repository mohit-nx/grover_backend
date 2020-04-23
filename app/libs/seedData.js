import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/user';
import config from '../config';

const hashPassword = async password => await bcrypt.hash(password, 10)

export default async () => {
	const usercount = await UserRepository.getInstance().count();
	if (usercount === 0) {
		console.log('Data seeding in progress');
		const hashedPassword = await hashPassword(config.password)
		await UserRepository.getInstance().create({ email: 'mohit@yopmail.com', password: hashedPassword, name: 'Mohit Dang', isAdmin: true });
	}
}