import axios from 'axios';

export const fetchAccounts = (userId) => {
	return axios.get(`api/accounts/user/${userId}`);
};