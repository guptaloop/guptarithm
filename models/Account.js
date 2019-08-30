const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
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