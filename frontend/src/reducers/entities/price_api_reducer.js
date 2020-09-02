import {
	RECEIVE_PRICE
} from '../../actions/price_api_actions';

const PriceAPIReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_PRICE:

			// logic for single stock price requests.
			const symbol = action.data.symbol;
			const price = action.data.iexRealtimePrice;
			return Object.assign( {}, state, { [symbol]: price } );

			// logic for batch price requests.
			// const symbols = Object.keys(action.data);
			// const priceObj = {};
			// symbols.forEach(symbol => {
			// 	console.log(action.data[symbol]);
			// 	priceObj[symbol] = action.data[symbol].quote.latestPrice;
			// });
			// return Object.assign( {}, state, priceObj );
		default:
			return state;
	}
};

export default PriceAPIReducer;