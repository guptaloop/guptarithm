import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Accounts from './accounts';
import {
	fetchAccounts, createAccount
} from '../../../actions/account_actions';
import { openModal, closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state) => ({
	user: state.session.user,
	accounts: state.entities.accounts,
	// errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
	fetchAccounts: (userId) => dispatch(fetchAccounts(userId)),
	createAccount: (account) => dispatch(createAccount(account)),
	// deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
	closeModal: () => dispatch(closeModal()),
	openAccountModal: () => dispatch(openModal("addAccount")),
	openHoldingModal: () => dispatch(openHoldingModal("addHolding")),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Accounts));