const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
	symbol: {
		type: String, required: true, unique: true,
		minlength: 1, maxlength: 5
	},
	price: { type: Number, required: true, default: 100},
	date: { type: Date, default: Date.now }
});

module.exports = Price = mongoose.model('price', PriceSchema);