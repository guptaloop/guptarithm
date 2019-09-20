import axios from 'axios';

export const fetchAccounts = (userId) => {
	return axios.get(`api/accounts/user/${userId}`);
};

export const createAccount = (account) => {
	console.log('axios');
	return axios.post(`api/accounts/`, account);
};