import axios from 'axios';

export const fetchHoldings = userId => {
	return axios.get(`api/holdings/user/${userId}`);
};

export const createHolding = holding => {
	return axios.post(`api/holdings/`, holding);
};