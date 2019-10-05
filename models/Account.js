const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
	custodian: { type: String, required: true, min: 3, max: 20	},
	type: { type: String,	required: true, enum: ["Roth IRA", "IRA", "401(k)"]	},
	last4: { type: String, min: 4, max: 4, required: true },
	date: { type: Date, default: Date.now	}
	// add 'taxable' and 'account type' later - Roth, IRA, 401(k), IND, Joint
	// taxable: {
	// 	type: Boolean,
	// 	default: false
	// },
	// type: {
	// 	type: String,
	// 	required: true
	// },
});

module.exports = Account = mongoose.model('account', AccountSchema);