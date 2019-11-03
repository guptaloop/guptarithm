const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoldingSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users', required: true	},
	account: { type: Schema.Types.ObjectId,	ref: 'accounts', required: true	},
	symbol: { type: String, required: true },
	shares: {	type: Number,	required: true },
	pct: {	type: String, default: "",	required: false },
	date: { type: Date,	default: Date.now	}
});

module.exports = Holding = mongoose.model('holding', HoldingSchema);