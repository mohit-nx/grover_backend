import { Schema } from 'mongoose';


const alternators = new Schema({
	code: { type: String, required: true },
	name: { type: String, required: true },
	amp: { type: Number, required: true },
	connections: {type: String, required: true},
	fanPulleyType: {type: String, required: true},
	fixingPoint: { type: Number, required: true },
	fuelType: [String],
	transmissionType: String,
	make: String,
	startYear: Number,
	endYear: Number,
	model: String,
	engineCodes: [String],
	imgUrl: {type: [String], required: true},
	createdAt: { type: Date, required: true},
});

export default alternators;
