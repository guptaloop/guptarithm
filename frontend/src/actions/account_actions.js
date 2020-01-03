import * as APIUtil from '../util/account_util';
import {fetchPricesFromDB} from '../actions/price_api_actions';

export const RECEIVE_ALL_ACCOUNTS = "RECEIVE_ALL_ACCOUNTS";

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

export const createHolding = holding => dispatch => (
	APIUtil.createHolding(holding)
		.then(holding => {
			const holdings = holding.data.holdings;
			const idx = holdings.length - 1;
			fetchPricesFromDB(holdings[idx].symbol);
			dispatch(fetchAccounts(holding.data.user));
		})
);