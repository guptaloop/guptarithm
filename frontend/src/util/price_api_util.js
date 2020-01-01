import axios from 'axios';

export const fetchPrices = symbol => {
	return axios.get(`api/prices/${symbol}`);
};