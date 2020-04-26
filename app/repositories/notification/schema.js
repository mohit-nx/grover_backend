import { Schema } from 'mongoose';


const notification = new Schema({
	from: { type: String, required: true },
	name: { type: String, required: true },
	query: { type: String, required: true },
	createdAt: { type: Date, required: true },
	read: { type: Boolean, required: true },
	mobile: String,
	readBy: String,
	readAt: Date,
	emailDelivered: Boolean,
	emailDeliveredAt: Date,
});

export default notification;
