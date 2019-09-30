const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllocationSchema = new Schema({
	usStocks: { type: Number, default: 0, min: 0, max: 100 },
	forStocks: { type: Number, default: 0, min: 0, max: 100 },
	eM: { type: Number, default: 0, min: 0, max: 100 },
	smallCap: { type: Number, default: 0, min: 0, max: 100 },
	indStocks: { type: Number, default: 0, min: 0, max: 100 },
	bonds: { type: Number, default: 0, min: 0, max: 100 },
	other: { type: Number, default: 0, min: 0, max: 100 },
	date: { type: Date, default: Date.now }
});

module.exports = Allocation = mongoose.model('allocation', AllocationSchema);