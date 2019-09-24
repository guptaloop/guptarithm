const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoldingSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users', required: true	},
	account: { type: Schema.Types.ObjectId,	ref: 'accounts', required: true	},
	name: { type: String,	required: true, minlength: 3, maxlength: 40 },
	symbol: {	type: String,	required: true,	minlength: 1,	maxlength: 5 },
	exp_ratio: { type: Number, required: true	},
	shares: {	type: Number,	required: true },
	allocation: {
		usStocks: { type: Number, default: 0, min: 0, max: 100 },
		forStocks: { type: Number, default: 0, min: 0, max: 100 },
		eM: { type: Number, default: 0,  min: 0, max: 100},
		smallCap: { type: Number, default: 0,  min: 0, max: 100},
		indStocks: { type: Number, default: 0,  min: 0, max: 100},
		bonds: { type: Number, default: 0,  min: 0, max: 100},
		other: { type: Number, default: 0,  min: 0, max: 100}
	},
	date: { type: Date,	default: Date.now	}
});

module.exports = Holding = mongoose.model('holding', HoldingSchema);