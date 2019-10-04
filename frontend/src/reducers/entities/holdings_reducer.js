import {
	RECEIVE_ALL_HOLDINGS
} from '../../actions/holding_actions';

const HoldingsReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_ALL_HOLDINGS:
			return action.holdings.data;
		default:
			return state;
	}
};

export default HoldingsReducer;