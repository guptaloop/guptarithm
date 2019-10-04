import { combineReducers } from 'redux';
import AccountsReducer from './accounts_reducer';
import AssetsReducer from './assets_reducer';
import HoldingsReducer from './holdings_reducer';

export default combineReducers({
	accounts: AccountsReducer,
	assets: AssetsReducer,
	holdings: HoldingsReducer
});