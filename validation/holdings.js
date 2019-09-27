const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateHoldingInput(data) {
	let errors = {};

	// data.name = validText(data.name) ? data.name : '';

	// if (!Validator.isLength(data.name, { min: 3 })) {
	// 	errors.text = 'Account name must be at least 3 characters - e.g. Fidelity 401(k) or Roth IRA *6789';
	// }

	// if (Validator.isEmpty(data.name)) {
	// 	errors.text = 'Account name is required - for your security, do NOT enter full account numbers';
	// }

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	};
};