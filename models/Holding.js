const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoldingSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users', required: true	},
	account: { type: Schema.Types.ObjectId,	ref: 'accounts', required: true	},
	allocation: { type: Schema.Types.ObjectId,	ref: 'allocation', required: true },
	symbol: {	type: String,	required: true,	minlength: 1,	maxlength: 5 },
	name: { type: String,	required: true, minlength: 3, maxlength: 50 },
	type: { enum: ['ETF', 'Mutual Fund', 'Stock', 'Other'], 
					type: String,	required: true },
	exp_ratio: { type: Number, required: true	},
	shares: {	type: Number,	required: true },
	date: { type: Date,	default: Date.now	}
});

module.exports = Holding = mongoose.model('holding', HoldingSchema);