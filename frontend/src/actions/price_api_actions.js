import * as APIUtil from '../util/price_api_util';

export const RECEIVE_PRICE = "RECEIVE_PRICE";

export const receivePrice = data => ({
	type: RECEIVE_PRICE,
	data
});

export const fetchPrice = symbol => dispatch => (
	APIUtil.fetchPrice(symbol)
		.then(res => dispatch(receivePrice(res.data["Global Quote"])))
	//.then(res => console.log(res.data["Global Quote"]["01. symbol"]))
);