import axios from 'axios';

export const fetchAsset = (symbol) => {
	return axios.get(`api/assets/${symbol}`, asset);
};

export const createAsset = (asset) => {
	return axios.post(`api/assets/`, asset);
};

// export const editAsset = (asset) => {
// 	return axios.put(`api/assets/${assetId}`, asset);
// };

export const deleteAsset = (asset) => {
	return axios.delete(`api/assets/`, asset);
};