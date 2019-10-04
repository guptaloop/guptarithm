import { combineReducers } from 'redux';
import session from './session/session_reducer';
import errors from './errors/errors_reducer';
import modal from './modal/modal_reducer';
import modalAccount from './modal_account/modal_account_reducer';
import entities from './entities/entities_reducer';

const RootReducer = combineReducers({
	session,
	errors,
	modal,
	modalAccount,
	entities
});

export default RootReducer;