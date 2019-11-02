import axios from 'axios';

export const fetchHoldings = userId => {
	return axios.get(`api/holdings/user/${userId}`);
};

export const createHolding = holding => {
	return axios.post(`api/holdings/`, holding);
};

export const uniqSymbols = holdings => {
	let symbols = [];
	holdings.forEach(function(holding) {
		if (symbols.includes(holding.symbol)) {
			return;
		} else {
			symbols.push(holding.symbol);
		}
	});
	return symbols;
};