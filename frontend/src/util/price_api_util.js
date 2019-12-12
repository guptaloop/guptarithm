import axios from 'axios';

export const fetchPrices = symbols => {
	return axios.get(`api/prices/${symbols}`);
};