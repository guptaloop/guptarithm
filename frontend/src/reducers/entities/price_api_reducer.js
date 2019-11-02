import {
	RECEIVE_PRICE
} from '../../actions/price_api_actions';

const PriceAPIReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_PRICE:
			// console.log(action.quote["01. symbol"]);
			const symbol = action.quote["01. symbol"];
			const price = action.quote["05. price"];
			return Object.assign(
				{}, state, { [symbol]: price }
			);
		default:
			return state;
	}
};

export default PriceAPIReducer;