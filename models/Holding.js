const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoldingSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users', required: true	},
	account: { type: Schema.Types.ObjectId,	ref: 'accounts', required: true	},
	asset: { type: Schema.Types.ObjectId,	ref: 'assets', required: true },
	shares: {	type: Number,	required: true },
	date: { type: Date,	default: Date.now	}
});

module.exports = Holding = mongoose.model('holding', HoldingSchema);