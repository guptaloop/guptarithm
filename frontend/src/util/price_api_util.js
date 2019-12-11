import axios from 'axios';

export const fetchPrice = symbol => {
	return axios.get(`api/prices/${symbol}`);
};