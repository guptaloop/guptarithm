const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.handle = validText(data.handle) ? data.handle : '';
	data.email = validText(data.email) ? data.email : '';
	data.password = validText(data.password) ? data.password : '';

	if (!Validator.isLength(data.handle, { min: 1, max: 30 })) {
		errors.handle = 'Handle must be between 1 and 30 characters';
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'Handle is required';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email is required';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is required.';
	}

	if (!Validator.isLength(data.password, { min: 6 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (!Validator.isLength(data.password, { max: 50 })) {
		errors.password = 'Password must be fewer than 50 characters';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	};
};