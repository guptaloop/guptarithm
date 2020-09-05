import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import AccountErrorsReducer from './account_errors_reducer';

export default combineReducers({
	session: SessionErrorsReducer,
	account: AccountErrorsReducer
});