import axios from 'axios';

export const fetchAsset = (assetId) => {
	return axios.get(`api/assets/${assetId}`, assetId);
};

export const createAsset = (asset) => {
	return axios.post(`api/assets/`, asset);
};

export const deleteAsset = (asset) => {
	return axios.delete(`api/assets/`, asset);
};