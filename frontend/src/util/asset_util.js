import axios from 'axios';

export const fetchAsset = (symbol) => {
	return axios.get(`api/assets/${symbol}`);
};

export const fetchAllAssets = () => {
	return axios.get(`api/assets/`);
};