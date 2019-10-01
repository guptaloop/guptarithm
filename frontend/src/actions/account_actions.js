import * as APIUtil from '../util/account_util';

export const RECEIVE_ALL_ACCOUNTS = "RECEIVE_ALL_ACCOUNTS";
// export const RECEIVE_ACCOUNT = "RECEIVE_ACCOUNT";

export const receiveAccounts = accounts => ({
	type: RECEIVE_ALL_ACCOUNTS,
	accounts
});

// export const receiveAccount = account => ({
// 	type: RECEIVE_ACCOUNT,
// 	account
// });

export const fetchAccounts = userId => dispatch => (
	APIUtil.fetchAccounts(userId)
		.then((accounts) => dispatch(receiveAccounts(accounts)))
);

export const createAccount = account => dispatch => (
	APIUtil.createAccount(account)
		.then((account) => dispatch(fetchAccounts(account.data.user)))
);

// export const deleteAccount = accountId => (
// 	APIUtil.deleteAccount(accountId)
// );