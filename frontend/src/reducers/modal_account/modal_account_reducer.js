import { OPEN_HOLDING_MODAL, OPEN_DELETE_ACCOUNT_MODAL, CLOSE_MODAL } from '../../actions/modal_actions';

export default function modalAccountReducer(state = null, action) {
	switch (action.type) {
		case OPEN_HOLDING_MODAL:
			return action.accountId;
		case OPEN_DELETE_ACCOUNT_MODAL:
			return action.accountId;
		case CLOSE_MODAL:
			return null;
		default:
			return state;
	}
}