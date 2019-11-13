import axios from 'axios';

export const fetchAsset = (symbol) => {
	return axios.get(`api/assets/${symbol}`);
};