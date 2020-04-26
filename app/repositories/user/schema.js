import { Schema } from 'mongoose';

const user = new Schema({
	email: {required: true, type: String, unique: true },
	password: {required: true, type: String},
	isAdmin: {required: true, type: Boolean},
	notification: Boolean,
	name: {required: true, type: String},
});

export default user;
