import { combineReducers } from 'redux';
import AccountsReducer from './accounts_reducer';

export default combineReducers({
	accounts: AccountsReducer,
});