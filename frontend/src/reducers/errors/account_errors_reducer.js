import {
  RECEIVE_ACCOUNT_ERRORS,
  CLEAR_ACCOUNT_ERRORS
} from '../../actions/account_actions';

const _nullErrors = [];

const AccountErrorsReducer = (state = _nullErrors, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_ACCOUNT_ERRORS:
			return action.errors;
		case CLEAR_ACCOUNT_ERRORS:
			return _nullErrors;
		default:
			return state;
	}
};

export default AccountErrorsReducer;