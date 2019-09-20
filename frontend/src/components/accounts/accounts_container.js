import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAccounts, createAccount } from '../../actions/account_actions';
import Accounts from './accounts';

const mapStateToProps = (state) => ({
	userId: state.session.user.id,
	accounts: state.entities.accounts,
	// errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
	fetchAccounts: (userId) => dispatch(fetchAccounts(userId)),
	createAccount: (account) => dispatch(createAccount(account))
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Accounts));