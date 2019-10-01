const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateAccountInput(data) {
	let errors = {};

	data.custodian = validText(data.custodian) ? data.custodian : '';
	data.type = validText(data.type) ? data.type : '';
	data.last4 = validText(data.last4) ? data.last4 : '';

	// isLength
	if (!Validator.isLength(data.custodian, { min: 3, max: 30 })) {
		errors.text = 'Custodian must be between 3 - 30 characters';
	}
	if (!Validator.isLength(data.last4, {min: 4, max: 4})) {
		errors.text = 'Last 4 must be 4 characters';
	}

	// isEmpty
	if (Validator.isEmpty(data.custodian)) {
		errors.text = 'Custodian is required';
	}
	if (Validator.isEmpty(data.type)) {
		errors.text = 'Account type is required';
	}
	if (Validator.isEmpty(data.last4)) {
		errors.text = 'Last 4 of account # are required';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	};
};