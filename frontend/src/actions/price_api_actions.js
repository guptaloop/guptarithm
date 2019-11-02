import * as APIUtil from '../util/price_api_util';

export const RECEIVE_PRICE = "RECEIVE_PRICE";

export const receivePrice = quote => ({
	type: RECEIVE_PRICE,
	quote
});

export const fetchPrice = symbol => dispatch => (
	APIUtil.fetchPrice(symbol)
		.then(res => {
			const quote = res.data["Global Quote"];
			dispatch(receivePrice(quote));
		})
);