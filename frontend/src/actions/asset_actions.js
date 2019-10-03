import * as APIUtil from '../util/asset_util';

export const RECEIVE_ASSET = "RECEIVE_ASSET";

export const receiveAsset = asset => ({
	type: RECEIVE_ASSET,
	asset
});

export const fetchAsset = symbol => dispatch => (
	APIUtil.fetchAsset(symbol)
		.then((asset) => dispatch(receiveAsset(asset)))
);