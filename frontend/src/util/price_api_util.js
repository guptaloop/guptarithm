import axios from 'axios';

export const fetchPrice = symbol => {
	return axios.get(
		`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=1X9A0NDZ1HT6P6SE`
	);
};