import * as APIUtil from '../util/price_api_util';

export const RECEIVE_PRICE = "RECEIVE_PRICE";

export const receivePrice = data => ({
	type: RECEIVE_PRICE,
	data
});

export const fetchPricesFromDB = symbol => dispatch => {
	return (
	APIUtil.fetchPriceFromDB(symbol)
		.then(res => {
			const data = res.data;
			dispatch(receivePrice(data));
		})
	);
};