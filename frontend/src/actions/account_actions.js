import * as APIUtil from '../util/account_util';
import {fetchPrice} from '../actions/price_api_actions';

export const RECEIVE_ALL_ACCOUNTS = "RECEIVE_ALL_ACCOUNTS";
// export const RECEIVE_ACCOUNT = "RECEIVE_ACCOUNT";

export const receiveAccounts = accounts => ({
	type: RECEIVE_ALL_ACCOUNTS,
	accounts
});

export const fetchAccounts = userId => dispatch => (
	APIUtil.fetchAccounts(userId)
		.then((accounts) => dispatch(receiveAccounts(accounts)))
);

export const createAccount = account => dispatch => (
	APIUtil.createAccount(account)
		.then((account) => dispatch(fetchAccounts(account.data.user)))
);

// NEW
export const createHolding = holding => dispatch => (
	APIUtil.createHolding(holding)
		// .then(holding => console.log(holding))
		.then(holding => {
			const holdings = holding.data.holdings;
			const idx = holdings.length - 1;
			fetchPrice(holdings[idx].symbol);
			dispatch(fetchAccounts(holding.data.user));
		})
);

// export const deleteAccount = accountId => (
// 	APIUtil.deleteAccount(accountId)
// );