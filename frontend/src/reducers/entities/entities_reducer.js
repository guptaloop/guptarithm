import { combineReducers } from 'redux';
import AccountsReducer from './accounts_reducer';
import AssetsReducer from './assets_reducer';
import HoldingsReducer from './holdings_reducer';
import PriceAPIReducer from './price_api_reducer';

export default combineReducers({
	accounts: AccountsReducer,
	assets: AssetsReducer,
	holdings: HoldingsReducer,
	prices: PriceAPIReducer,
	
});