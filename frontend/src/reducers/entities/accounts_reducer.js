import { RECEIVE_ALL_ACCOUNTS } from '../../actions/account_actions';

const AccountsReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_ALL_ACCOUNTS:
			return action.accounts;
		default:
			return state;
	}
};

export default AccountsReducer;