import {
	RECEIVE_ASSET
} from '../../actions/asset_actions';

const AssetReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_ASSET:
			return Object.assign({}, state, 
				{ [action.asset.data.symbol]: action.asset.data} );
		default:
			return state;
	}
};

export default AssetReducer;