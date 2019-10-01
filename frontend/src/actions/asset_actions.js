import * as APIUtil from '../util/asset_util';

export const RECEIVE_ALL_ACCOUNTS = "RECEIVE_ALL_ACCOUNTS";

export const receiveAccounts = accounts => ({
	type: RECEIVE_ALL_ACCOUNTS,
	accounts
});

export const fetchAccounts = userId => dispatch => (
	APIUtil.fetchAccounts(userId)
		.then((accounts) => dispatch(receiveAccounts(accounts)))
);

export const createAccount = account => (
	APIUtil.createAccount(account)
);