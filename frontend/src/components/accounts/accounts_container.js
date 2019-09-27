import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAccounts, createAccount } from '../../actions/account_actions';
import Accounts from './accounts';

const mapStateToProps = (state) => ({
	user: state.session.user,
	accounts: state.entities.accounts,
	// errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
	fetchAccounts: (userId) => dispatch(fetchAccounts(userId)),
	createAccount: (account) => dispatch(createAccount(account)),
	// deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Accounts));