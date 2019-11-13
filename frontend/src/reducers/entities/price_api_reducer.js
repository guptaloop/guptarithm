import {
	RECEIVE_PRICE
} from '../../actions/price_api_actions';

const PriceAPIReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_PRICE:
			const symbol = action.data.symbol;
			const price = action.data.latestPrice;
			return Object.assign(
				{}, state, { [symbol]: price }
			);
		default:
			return state;
	}
};

export default PriceAPIReducer;