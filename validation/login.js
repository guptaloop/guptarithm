const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.username = validText(data.username) ? data.username : '';
	data.password = validText(data.password) ? data.password : '';

	if (Validator.isEmail(data.username)) {
		errors.username = 'Username is invalid - email not allowed';
	}

	if (Validator.isEmpty(data.username)) {
		errors.username = 'Username cannot be empty';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password cannot be empty";
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	};
};