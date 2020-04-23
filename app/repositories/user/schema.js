import { Schema } from 'mongoose';

const user = new Schema({
	email: String,
	password: String,
	isAdmin: Boolean,
	name: String,
});

export default user;
