const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
	symbol: { type: String, required: true, minlength: 1, maxlength: 5 },
	name: { type: String, required: true, minlength: 3, maxlength: 50 },
	type: { type: String, required: true,
		enum: ['ETF', 'Mutual Fund', 'Stock', 'Other'] },
	exp_ratio: { type: Number, required: true },
	allocation: {
		usStocks: { type: Number, default: 0, min: 0, max: 100 },
		forStocks: { type: Number, default: 0, min: 0, max: 100 },
		eM: { type: Number, default: 0, min: 0, max: 100 },
		smallCap: { type: Number, default: 0, min: 0, max: 100 },
		indStocks: { type: Number, default: 0, min: 0, max: 100 },
		bonds: { type: Number, default: 0, min: 0, max: 100 },
		other: { type: Number, default: 0, min: 0, max: 100 },
	},
	date: { type: Date, default: Date.now }
});

module.exports = Asset = mongoose.model('asset', AssetSchema);