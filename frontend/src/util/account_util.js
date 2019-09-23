import axios from 'axios';

export const fetchAccounts = (userId) => {
	return axios.get(`api/accounts/user/${userId}`, userId);
};

export const createAccount = (account) => {
	return axios.post(`api/accounts/`, account);
};

// export const deleteAccount = (accountId) => {
// 	return axios.post(`api/accounts/${accountId}`, accountId);
// };