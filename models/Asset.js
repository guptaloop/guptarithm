const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
	symbol: { type: String, required: true, unique: true, 
		minlength: 1, maxlength: 5 },
	type: { type: String, required: true,
		enum: ['ETF', 'Mutual Fund', 'Stock', 'Other'] },
	exp_ratio: { type: Number, required: true, min: 0, max: 1 },
	allocation: {
		usStocks: { type: Number, min: 0, max: 100 },
		forStocks: { type: Number, min: 0, max: 100 },
		eM: { type: Number, min: 0, max: 100 },
		smallCap: { type: Number, min: 0, max: 100 },
		indStocks: { type: Number, min: 0, max: 100 },
		bonds: { type: Number, min: 0, max: 100 },
		other: { type: Number, min: 0, max: 100 },
	},
	date: { type: Date, default: Date.now }
});

module.exports = Asset = mongoose.model('asset', AssetSchema);