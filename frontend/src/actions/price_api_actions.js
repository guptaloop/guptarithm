import * as APIUtil from '../util/price_api_util';
import axios from 'axios';

export const RECEIVE_PRICE = "RECEIVE_PRICE";

export const receivePrice = data => ({
	type: RECEIVE_PRICE,
	data
});

export const fetchPrice = symbol => dispatch => {
	return (
	// APIUtil.fetchPrice(symbol)
	axios.get(`api/prices/${symbol}`)
		.then(res => {
			console.log(res);
			dispatch(receivePrice(res));
		})
	);
};