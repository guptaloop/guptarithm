// checks if given string consists of valid input (#trim removes whitespace)
const validText = str => {
	return typeof str === 'string' && str.trim().length > 0;
};

module.exports = validText;