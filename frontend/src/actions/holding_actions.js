import * as APIUtil from '../util/holding_util';

export const RECEIVE_ALL_HOLDINGS = "RECEIVE_ALL_HOLDINGS";

export const receiveAllHoldings = holdings => ({
	type: RECEIVE_ALL_HOLDINGS,
	holdings
});

export const fetchHoldings = userId => dispatch => (
	APIUtil.fetchHoldings(userId)
		.then(holdings => dispatch(receiveAllHoldings(holdings)))
);

export const createHolding = holding => dispatch => (
	APIUtil.createHolding(holding)
		.then(holding => dispatch(fetchHoldings(holding.data.user)))
);