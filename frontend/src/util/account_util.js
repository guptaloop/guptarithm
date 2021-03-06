import axios from 'axios';

export const fetchAccounts = (userId) => {
	return axios.get(`api/accounts/user/${userId}`, userId);
};

export const createAccount = account => {
	return axios.post(`api/accounts/`, account);
};

export const deleteAccount = accountId => {
	return axios.delete(`api/accounts/${accountId}`);
};

// NEW
export const createHolding = holding => {
	return axios.put(`api/accounts/`, holding);
};

export const getAccountValue = (account, prices) => {
	let accountValue = 0;
	(account.holdings).forEach(holding => {
		accountValue += (holding.shares * prices[holding.symbol]);
	});
	return Math.round(accountValue);
};

export const getPortValue = (accounts, prices) => {
	let portValue = 0;
	accounts.forEach(account => {
		portValue += getAccountValue(account, prices);
	});
	return portValue.toLocaleString();
};