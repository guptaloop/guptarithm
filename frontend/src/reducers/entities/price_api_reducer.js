import {
	RECEIVE_PRICE
} from '../../actions/price_api_actions';

const PriceAPIReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_PRICE:
			const symbols = Object.keys(action.data);
			const priceObj = {};
			symbols.forEach(symbol => {
				priceObj[symbol] = action.data[symbol].quote.latestPrice;
			});
			return Object.assign( {}, state, priceObj );
		default:
			return state;
	}
};

export default PriceAPIReducer;