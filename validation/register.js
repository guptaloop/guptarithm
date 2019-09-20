const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	
	data.username = validText(data.username) ? data.username : '';
	// data.email = validText(data.email) ? data.email : '';
	data.password = validText(data.password) ? data.password : '';

	if (!Validator.isLength(data.username, { min: 4, max: 50 })) {
		errors.username = 'Username must be between 4 and 50 characters';
	}

	if (Validator.isEmpty(data.username)) {
		errors.username = 'Username is required';
	}

	if (Validator.isEmail(data.username)) {
		errors.username = 'Do not use an email for your username';
	}

	if (Validator.contains(data.username, '@')) {
		errors.username = `Username cannot contain '@'`;
	}

	if (Validator.contains(data.username, 'gmail')) {
		errors.username = `Username cannot contain 'gmail'`;
	}

	if (Validator.contains(data.username, '.com')) {
		errors.username = `Username cannot contain '.com'`;
	}

	// if (Validator.isEmpty(data.email)) {
	// 	errors.email = 'Email is required';
	// }

	// if (!Validator.isEmail(data.email)) {
	// 	errors.email = 'Email is invalid';
	// }

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