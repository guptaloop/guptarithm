import * as APIUtil from '../util/price_api_util';

export const RECEIVE_PRICE = "RECEIVE_PRICE";

export const receivePrice = data => ({
	type: RECEIVE_PRICE,
	data
});

export const fetchPrice = symbol => (
	APIUtil.fetchPrice(symbol)
		.then(res => {
			// console.log(res.data["Global Quote"]);
			if (res.data["Global Quote"] !== undefined) {
				return res.data["Global Quote"]["05. price"];
			} else {
				return "";
			}
		})
	//.then(res => console.log(res.data["Global Quote"]["01. symbol"]))
);