import {
	RECEIVE_PRICE
} from '../../actions/price_api_actions';

const PriceAPIReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_PRICE:
			return Object.assign(
				{}, state, { [action.data["01. symbol"]]: action.data["05. price"]}
			);
		default:
			return state;
	}
};

export default PriceAPIReducer;