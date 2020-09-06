import * as APIUtil from '../util/account_util';
import {fetchPricesFromDB} from '../actions/price_api_actions';

export const RECEIVE_ALL_ACCOUNTS = "RECEIVE_ALL_ACCOUNTS";
export const RECEIVE_ACCOUNT_ERRORS = "RECEIVE_ACCOUNT_ERRORS";
export const CLEAR_ACCOUNT_ERRORS = 'CLEAR_ACCOUNT_ERRORS';

export const receiveAccounts = accounts => ({
	type: RECEIVE_ALL_ACCOUNTS,
	accounts
});

export const receiveErrors = errors => ({
	type: RECEIVE_ACCOUNT_ERRORS,
	errors
});

export const clearErrors = () => ({
	type: CLEAR_ACCOUNT_ERRORS
});

export const fetchAccounts = userId => dispatch => (
	APIUtil.fetchAccounts(userId)
		.then((accounts) => dispatch(receiveAccounts(accounts)))
);

export const createAccount = account => dispatch => (
	APIUtil.createAccount(account)
		.then(account => {
			dispatch(clearErrors());
			dispatch(fetchAccounts(account.data.user));
		})
		.catch(err => {
			dispatch(receiveErrors(err.response.data));	
		})
);

export const deleteAccount = (accountId, userId) => dispatch => (
	APIUtil.deleteAccount(accountId)
		.then(() => {
			dispatch(fetchAccounts(userId));
		})
		.catch(err => {
			dispatch(receiveErrors(err.response.data));	
		})
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