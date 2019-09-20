import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAccounts } from '../../actions/account_actions';
import Accounts from './accounts';

const mapStateToProps = (state) => ({
	userId: state.session.user.id,
	accounts: state.entities.accounts
});

const mapDispatchToProps = dispatch => ({
	fetchAccounts: (userId) => dispatch(fetchAccounts(userId)),
	// createAccount: () => dispatch
});

export default withRouter(connect(
	mapStateToProps, mapDispatchToProps)(Accounts));