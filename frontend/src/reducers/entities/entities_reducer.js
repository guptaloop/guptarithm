import { combineReducers } from 'redux';
import AccountsReducer from './accounts_reducer';
import AssetReducer from './asset_reducer';

export default combineReducers({
	accounts: AccountsReducer,
	assets: AssetReducer,
	
});