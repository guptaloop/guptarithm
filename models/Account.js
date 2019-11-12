const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
	date: { type: Date, default: Date.now	},
	custodian: { type: String, required: true, min: 3, max: 20	},
	type: { type: String,	required: true, enum: ["Roth IRA", "IRA", "401k"]	},
	last4: { type: String, min: 4, max: 4, required: true },
	// holdings array of holding objects
	holdings: [{
		symbol: { type: String, required: true },
		shares: { type: Number, required: true },
		// each holding has the asset info hash (stored in Asset collection)
		asset: {
			type: {	type: String, required: true,
				enum: ['ETF', 'Mutual Fund', 'Stock', 'Other']
			},
			exp_ratio: { type: Number, required: true, min: 0, max: 1 },
			allocation: {
				usStocks: { type: Number, min: 0, max: 100 },
				forStocks: { type: Number, min: 0, max: 100 },
				eM: { type: Number, min: 0, max: 100 },
				smallCap: { type: Number, min: 0, max: 100 },
				indStocks: { type: Number, min: 0, max: 100 },
				bonds: { type: Number, min: 0, max: 100 },
				other: { type: Number, min: 0, max: 100 },
			}
		}
	}],
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